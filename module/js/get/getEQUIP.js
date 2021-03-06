
import { EQUIPMENT, NAMEOFDAYTHAI, EQUIPITEMS } from "../control/const.js"
import { clearEditcell } from "../control/edit.js"
import { USER } from "../main.js"
import { sqlGetEditedBy, sqlSaveEquip, sqlCancelAllEquip } from "../model/sqlEquip.js"
import { putAgeOpdate, ISO_2_th } from "../util/date.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { apostrophe, Alert, winWidth, winHeight, radioHack, deepEqual, string50 } from "../util/util.js"

let _JsonEquip,
  _qn,
  _$dialogEquip = $('#dialogEquip')

export function getEQUIP(pointing)
{
  let row = pointing.closest('tr'),
    hn = row.dataset.hn,
    qn = row.dataset.qn,
    rowEquip = row.dataset.equipment,
    thisEquip = {
      oproomequip: row.dataset.oproom || "",
      casenumequip: row.dataset.casenum || "",
      optimeequip: row.dataset.optime,
      opdayequip: NAMEOFDAYTHAI[(new Date(row.dataset.opdate)).getDay()],
      opdatethequip: ISO_2_th(row.dataset.opdate),
      staffnameequip: row.dataset.staffname,
      hnequip: row.dataset.hn,
      patientnameequip: row.dataset.patient,
      ageequip: putAgeOpdate(row.dataset.dob, row.dataset.opdate),
      diagnosisequip: string50(row.dataset.diagnosis),
      treatmentequip: string50(row.dataset.treatment)
    }

  let resizeDialogEquip = () => {
    _$dialogEquip.dialog({
      width: 620,
      height: winHeight(95)
    })
  }

  if (!hn || !qn) { return }

  for (let key in thisEquip) {
    document.getElementById(key).innerHTML = thisEquip[key]
  }

  _JsonEquip = rowEquip? JSON.parse(rowEquip) : {}
  _qn = qn

  _$dialogEquip.dialog({
    title: "เครื่องมือผ่าตัด",
    closeOnEscape: true,
    modal: true,
    width: 620,
    height: winHeight(95),
    close: function() {
      $(window).off("resize", resizeDialogEquip)
    }
  })

  fillEquip()

  clearEditcell()

  //for resizing dialogs in landscape / portrait view
  $(window).on("resize", resizeDialogEquip)
}

function fillEquip()
{
  // clear all previous dialog values
  _$dialogEquip.find('input[type=text]').val('')
  _$dialogEquip.find('textarea').val('')
  _$dialogEquip.find('input').prop('checked', false)

  if (Object.keys(_JsonEquip).length) {
    fillMatchValue(_JsonEquip)
    showNonEditableEquip()
    getEditedBy()
  } else {
    showEditableEquip()
    $('#editedby').html("")
  }
}

function fillMatchValue(_JsonEquip)
{
  Object.entries(_JsonEquip).forEach(([key, val]) => {
    let title = document.querySelector(`#dialogEquip div[title='${key}']`),
      textareas = title.querySelectorAll('textarea')

    if (!title) { return }

    // convert string to array
    if (typeof val === 'string') { val = val.split() }
    if (!Array.isArray(val)) { return }

    let remain = fillRadioCheckbox(title, val)
    if (remain.length) {
      remain = fillText(title, remain)
    }
    if (remain.length) {
      textareas.forEach((e, i) => e.value = val[i] || '' )
    }
  })
}

function fillRadioCheckbox(title, val)
{
  let radios = title.querySelectorAll('input[type=radio]'),
    checkboxes = title.querySelectorAll('input[type=checkbox]'),
    radioCheckbox = Array.from(radios).concat(Array.from(checkboxes)),
    mapValue = radioCheckbox.map(e => e.value),
    copyval = [...val]

  val.forEach(v => {
    if (mapValue.includes(v)) {
      radioCheckbox[mapValue.indexOf(v)].checked = true
      copyval.splice(copyval.indexOf(v), 1)
    }
  })

  return copyval
}

function fillText(title, val)
{
  let copyval = [...val]

  title.querySelectorAll('input[type=text]').forEach((e, i) => {
    if (val[i]) {
      e.value = val[i]
      copyval.splice(copyval.indexOf(val[i]), 1)
    }
  })

  return copyval
}

function showNonEditableEquip()
{
  _$dialogEquip.dialog("option", "buttons", [
    {
      text: "ยกเลิกทุกรายการ",
      click: function () {
        if (confirm("ลบออกทั้งหมด")) {
          cancelAllEquip()
          _$dialogEquip.dialog('close')
        }
      }
    },
    {
      text: "แก้ไข",
      click: function () {
        showEditableEquip()
      }
    }
  ])

  _$dialogEquip.find('input').prop('disabled', true)
  _$dialogEquip.find('textarea').prop('disabled', true)
  _$dialogEquip.find('label').off('mousedown click')
}

// having any equip must have copay. if no copay, ->alert
// having no equip, cancel copay
function showEditableEquip()
{
  _$dialogEquip.dialog("option", "buttons", [
    {
      text: "Save",
      click: function () {
        if (checkEquip()) {
          if (_$dialogEquip.find(`div[title=copay] input[type=text]`).val()) {
            saveEquip()
            showNonEditableEquip()
          } else {
            Alert("saveEquip", "<br>ต้องระบุจำนวนเงิน<br>จ่ายไม่ได้เลย = 0")
          }
        } else {
          cancelAllEquip()
          _$dialogEquip.dialog('close')
        }
      }
    }
  ])

  _$dialogEquip.find('input').prop('disabled', false)
  _$dialogEquip.find('textarea').prop('disabled', false)
  radioHack('#dialogEquip')
}

function getEditedBy()
{
  sqlGetEditedBy(_qn).then(response => {
    if (typeof response === "object") {
      let Editedby = ""
      $.each(response, function(key, val) {
        Editedby += (val.editor + " : " + val.editdatetime + "<br>")
      });
      $('#editedby').html(Editedby)
    } else {
      Alert("getEditedby", response)
    }
	}).catch(error => alert(error.stack))
}

function checkEquip()
{
  return Array.from(document.querySelectorAll('#dialogEquip input, #dialogEquip textarea')).some(e => {
    if (e.type === "text" || e.type === "textarea") {
      return e.value
    } else {
      return e.checked
    }
  })
}

function saveEquip()
{
  let equipJSON = {},
    equipment = "",
    sql = ""

  EQUIPITEMS.forEach(e => {
    let title = document.querySelector(`#dialogEquip div[title='${e}']`)
    title.querySelectorAll(`input, textarea`).forEach(i => {
      let itext = (i.type === 'text') && i.value
      let iarea = (i.type === 'textarea') && i.value
      if (i.checked || itext || iarea) {
          if (!equipJSON[e]) {
            equipJSON[e] = ((e === "เครื่องมือบริษัท") && (i.placeholder)) ? [''] : []
          }
          equipJSON[e].push(i.value)
      }
    })
  })

  if (deepEqual(equipJSON, _JsonEquip)) { return }

  equipment = JSON.stringify(equipJSON)
  equipment = apostrophe(equipment)

  sqlSaveEquip(equipment, _qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
      _$dialogEquip.dialog('close')
    } else {
      Alert("saveEquip", response)

      // failed save, roll back
      fillEquip()
    }
  }).catch(error => alert(error.stack))
}

function cancelAllEquip()
{
  sqlCancelAllEquip(_qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
    } else {
      Alert("cancelAllEquip", response)

      // failed cancel, roll back
      fillEquip()
    }
  }).catch(error => alert(error.stack))
}
