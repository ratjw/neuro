
import { EQUIPMENT, NAMEOFDAYTHAI } from "../model/const.js"
import { clearEditcell } from "../control/edit.js"
import { USER } from "../main.js"
import { sqlGetEditedBy, sqlSaveEquip, sqlCancelAllEquip } from "../model/sqlEquip.js"
import { putAgeOpdate, putThdate } from "../util/date.js"
import { getTableRowByQN } from "../util/rowsgetting.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { viewEquipJSON } from "../view/viewEquip.js"
import { Alert, winWidth, winHeight, radioHack, deepEqual } from "../util/util.js"

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

let rowEquip,
  JsonEquip,
  thisqn,
  $dialogEquip = $('#dialogEquip')

export function getEQUIP(pointing)
{
  let row = pointing.closest('tr'),
    qn = row.dataset.qn,
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
      diagnosisequip: row.dataset.diagnosis.split(' ').slice(0,6).join(' '),
      treatmentequip: row.dataset.treatment.split(' ').slice(0,6).join(' ')
    }

  let resizeDialogEquip = () => {
    $dialogEquip.dialog({
      width: winWidth(95),
      height: winHeight(95)
    })
  }

  if (!qn) { return }

  for (let key in thisEquip) {
    document.getElementById(key).innerHTML = thisEquip[key]
  }

  rowEquip = row.dataset.equipment
  JsonEquip = rowEquip? JSON.parse(rowEquip) : {}
  thisqn = qn

  $dialogEquip.dialog({
    title: "เครื่องมือผ่าตัด",
    closeOnEscape: true,
    modal: true,
    width: 650,
    height: winHeight(95),
    clse: function() {
      $(window).off("resize", resizeDialogEquip)
    }
  })

  fillEquip($dialogEquip, JsonEquip)

  clearEditcell()

  //for resizing dialogs in landscape / portrait view
  $(window).on("resize", resizeDialogEquip)
}

function fillEquip($dialogEquip, JsonEquip)
{
  // clear all previous dialog values
  $dialogEquip.find('input[type=text]').val('')
  $dialogEquip.find('textarea').val('')
  $dialogEquip.find('input').prop('checked', false)

  if (JsonEquip) {
    Object.entries(JsonEquip).forEach(([key, val]) => {
      if (val.constructor === Array) {
        val.forEach(e => {
          checkMatchValue(key, e)
        })
      } else {
        checkMatchValue(key, val)
      }
    })
    showNonEditableEquip()
    getEditedBy(thisqn)
  } else {
    showEditableEquip()
    $('#editedby').html("")
  }
}

function checkMatchValue(key, val)
{
  let dd = document.querySelector(`#dialogEquip div[title='${key}']`)

  if (!dd) { return }
  if (dd.querySelector('textarea')) {
    dd.querySelector('textarea').value = val
    return
  }

  for ( let e of dd.querySelectorAll('input')) {
    if (e.type === 'text') {
      if (e.value) { continue }
      e.value = val
      break
    } else if (val === e.value) {
      e.checked = true
      break
    }
  }
}

function showNonEditableEquip()
{
  $dialogEquip.dialog("option", "buttons", [
    {
      text: "ยกเลิกทุกรายการ",
      click: function () {
        if (confirm("ลบออกทั้งหมด")) {
          cancelAllEquip()
          $dialogEquip.dialog('close')
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
  disableInput()
}

// having any equip must have copay. if no copay, ->alert
// having no equip, cancel copay
let showEditableEquip = function () {
  $dialogEquip.dialog("option", "buttons", [
    {
      text: "Save",
      click: function () {
        if (checkEquip()) {
          if ($(`#dialogEquip div[title=copay] input[type=text]`).val()) {
            checklistEquip()
            showNonEditableEquip()
          } else {
            Alert("checklistEquip", "<br>ต้องระบุจำนวนเงิน<br>จ่ายไม่ได้เลย = 0")
          }
        } else {
          cancelAllEquip()
          $dialogEquip.dialog('close')
        }
      }
    }
  ])
  enableInput()
}

function disableInput()
{
  $('#dialogEquip label:has(input[type=radio])').off('mousedown')
  $('#dialogEquip input').prop('disabled', true)
  $('#dialogEquip textarea').prop('disabled', true)
}

function enableInput()
{
  $('#dialogEquip label:has(input[type=radio])').on('mousedown')
  $('#dialogEquip input').prop('disabled', false)
  $('#dialogEquip textarea').prop('disabled', false)
  radioHack('#dialogEquip')
}

function getEditedBy()
{
  sqlGetEditedBy(thisqn).then(response => {
    let hasData = function () {
      let Editedby = ""
      $.each(response, function(key, val) {
        Editedby += (val.editor + " : " + val.editdatetime + "<br>")
      });
      $('#editedby').html(Editedby)
    };

    typeof response === "object"
    ? hasData()
    : Alert("getEditedby", response)
  }).catch(error => {})
}

function checkEquip()
{
  let equip = false

  document.querySelectorAll('#dialogEquip div:not([title=copay]) input, #dialogEquip textarea').forEach(e => {
    if (e.checked) {
      equip = true
      return false
    } else if (e.type === "text" || e.type === "textarea") {
      if (e.value) {
        equip = true
        return false
      }
    }
  })

  return equip
}

let checklistEquip = function () {
  let equipJSON = {},
    equipment = "",
    sql = ""

  EQUIPITEMS.forEach(e => {
    let dd = `#dialogEquip div[title='${e}']`
    document.querySelectorAll(`${dd} input, ${dd} textarea`).forEach(i => {
      if (i.checked || ((i.type === 'text') && i.value)) {
        if (equipJSON[e]) {
          if (typeof equipJSON[e] === 'string') { equipJSON[e] = equipJSON[e].split() }
          equipJSON[e].push(i.value)
        } else {
          equipJSON[e] = i.value
        }
      } else if ((i.type === 'textarea') && i.value) {
        equipJSON[e] = i.value
      }
    })
  })

  if (deepEqual(equipJSON, JsonEquip)) { return }

  equipment = JSON.stringify(equipJSON)

  // escape the \ (escape) and ' (single quote) for sql string, not for JSON
  equipment = equipment.replace(/\\/g,"\\\\").replace(/'/g,"\\'")
  sqlSaveEquip(equipment, thisqn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
      $dialogEquip.dialog('close')
    } else {
      // Error update server
      Alert("checklistEquip", response)

      // Roll back
      fillEquip($dialogEquip, JsonEquip)
    }
  }).catch(error => {})
}

function cancelAllEquip()
{
  sqlCancelAllEquip(thisqn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
      delelteAllEquip()
    } else {
      Alert("cancelAllEquip", response)

      // Roll back
      fillEquip($dialogEquip, JsonEquip)
    }
  }).catch(error => {})
}

function delelteAllEquip()
{
  let $row = getTableRowByQN("maintbl", thisqn)

  $row.find("td").eq(EQUIPMENT).html('')
}
