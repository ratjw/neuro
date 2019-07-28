
import { EQUIPMENT, NAMEOFDAYTHAI } from "../control/const.js"
import { clearEditcell } from "../control/edit.js"
import { USER } from "../main.js"
import { sqlGetEditedBy, sqlSaveEquip, sqlCancelAllEquip } from "../model/sqlEquip.js"
import { putAgeOpdate, putThdate } from "../util/date.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert, winWidth, winHeight, radioHack, deepEqual, string50 } from "../util/util.js"

const EQUIPITEMS = [
  "copay",
  "Position",
  "Imaging",
  "อุปกรณ์ยึดผู้ป่วย",
  "เครื่องตัดกระดูก",
  "กล้อง",
  "Retractor",
  "CUSA",
  "U/S",
  "Shunt",
  "เครื่องมือบริษัท",
  "อุปกรณ์อื่นๆ",
  "Monitor",
  "Notice"
]
//
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
      opdatethequip: putThdate(row.dataset.opdate),
      staffnameequip: row.dataset.staffname,
      hnequip: row.dataset.hn,
      patientnameequip: row.dataset.patient,
      ageequip: putAgeOpdate(row.dataset.dob, row.dataset.opdate),
      diagnosisequip: string50(row.dataset.diagnosis),
      treatmentequip: string50(row.dataset.treatment)
    }

  let resizeDialogEquip = () => {
    _$dialogEquip.dialog({
      width: winWidth(95),
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
    let title = document.querySelector(`#dialogEquip div[title='${key}']`)

    // convert string to array
    if (typeof val === 'string') { val = val.split() }

    if (!title) { return }
    if (key === 'Notice') {
      title.querySelectorAll('textarea').forEach((e, i) =>
        e.value = val[i]
      )
      return
    }

    let remain = fillValue(title, val)
    if (remain.length) {
      title.querySelectorAll('input[type=text]').forEach((e, i) =>
        e.value = remain[i]
      )
    }
  })
}

function fillValue(title, val)
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
  }).catch(error => {})
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
    let title = `#dialogEquip div[title='${e}']`
    document.querySelectorAll(`${title} input, ${title} textarea`).forEach(i => {
      if (i.checked || ((i.type === 'text') && i.value)
        || ((i.type === 'textarea') && i.value)) {
          if (!equipJSON[e]) { equipJSON[e] = [] }
          equipJSON[e].push(i.value)
      }
    })
  })

  if (deepEqual(equipJSON, _JsonEquip)) { return }

  equipment = JSON.stringify(equipJSON)

  // escape the \ (escape) and ' (single quote) for sql string, not for JSON
  equipment = equipment.replace(/\\/g,"\\\\").replace(/'/g,"\\'")
  sqlSaveEquip(equipment, _qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
      _$dialogEquip.dialog('close')
    } else {
      Alert("saveEquip", response)

      // failed save, roll back
      fillEquip()
    }
  }).catch(error => {})
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
  }).catch(error => {})
}
