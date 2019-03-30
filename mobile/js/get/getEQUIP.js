
import { EQUIPMENT, NAMEOFDAYTHAI } from "../model/const.js"
import { clearEditcell } from "../control/edit.js"
import { USER } from "../main.js"
import { sqlGetEquip, sqlSaveEquip, sqlCancelAllEquip } from "../model/sqlGetEquip.js"
import { putAgeOpdate, putThdate } from "../util/date.js"
import { getTableRowByQN } from "../util/rowsgetting.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert, winHeight } from "../util/util.js"
import { viewEquipJSON } from "../view/viewEquip.js"

let rowEquip,
  JsonEquip,
  thisqn,
  $dialogEquip = $('#dialogEquip')

export function getEQUIP(pointing)
{
  let tableID = pointing.closest('table').id,
    row = pointing.closest('tr'),
    qn = row.dataset.qn,
    height = winHeight(95),
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
      diagnosisequip: row.dataset.diagnosis,
      treatmentequip: row.dataset.treatment
    }

  if (!qn) { return }

  for (let key in thisEquip) {
    document.getElementById(key).innerHTML = thisEquip[key]
  }

  rowEquip = row.dataset.equipment
  JsonEquip = rowEquip? JSON.parse(rowEquip) : {}
  thisqn = qn

  // clear all previous dialog values
  $dialogEquip.show()
  $dialogEquip.find('input').val('')
  $dialogEquip.find('textarea').val('')
  $dialogEquip.find('input').prop('checked', false)
  $dialogEquip.dialog({
    title: "เครื่องมือผ่าตัด",
    closeOnEscape: true,
    modal: true,
    width: 700,
    height: height > 1000 ? 1000 : height
  })

  // If ever filled, show checked equips & texts
  // .prop("checked", true) shown in radio and checkbox
  // .val(val) shown in <input text> && <textarea>
  if ( Object.keys(JsonEquip).length ) {
    $.each(JsonEquip, function(key, val) {
      if (val === 'checked') {
        $("#"+ key).prop("checked", true)
      } else {
        $("#"+ key).val(val)
      }
    })
    showNonEditableEquip()
    getEditedBy(thisqn)
   } else {
    showEditableEquip()
    $('#editedby').html("")
  }

  clearEditcell()
}

// hack for click to uncheck a radio input
function clickRadioInput()
{
  $('#dialogEquip label:has(input[type=radio])').off('mousedown').on('mousedown', function(e) {
    var radios = $(this).find('input[type=radio]')
    var wasChecked = radios.prop('checked')

    radios[0].turnOff = wasChecked
    radios.prop('checked', !wasChecked)
  })
  .off('click').on('click', function(e) {
    var radios = $(this).find('input[type=radio]')
    radios.prop('checked', !radios[0].turnOff)
  })
}

function showNonEditableEquip()
{
  $dialogEquip.dialog("option", "buttons", [
    {
      text: "ยกเลิกทุกรายการ",
      style: "margin-right:450px",
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
          if ($('#copay').val()) {
            Checklistequip()
            showNonEditableEquip()
          } else {
            Alert("Checklistequip", "<br>ต้องระบุจำนวนเงิน<br>จ่ายไม่ได้เลย = 0")
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
  $('#clearPosition').off('click')
  $('#clearShunt').off('click')
}

// clearPosition : uncheck radio button of Positions
// clearShunt : uncheck radio button of Shunts
function enableInput()
{
  $('#dialogEquip input').prop('disabled', false)
  $('#dialogEquip textarea').prop('disabled', false)
  $('#clearPosition').off("click").on("click", clearPosition)
  $('#clearShunt').off("click").on("click", clearShunt)
  clickRadioInput()
}

function clearPosition()
{
  $('#dialogEquip input[name=pose]').prop('checked', false)
}

function clearShunt()
{
  $('#dialogEquip input[name=head]').prop('checked', false)
  $('#dialogEquip input[name=peritoneum]').prop('checked', false)
  $('#dialogEquip input[name=program]').prop('checked', false)
}

function getEditedBy()
{
  sqlGetEquip(thisqn).then(response => {
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

  $('#dialogEquip input:not(#copay), #dialogEquip textarea').each((i, e) => {
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

let Checklistequip = function () {
  let equipJSON = {},
    equipment = "",
    sql = ""

  document.querySelectorAll('#dialogEquip input, #dialogEquip textarea').forEach(e => {
    if (e.checked) {
      equipJSON[e.id] = "checked"
    } else if (e.type === "text" || e.type === "textarea") {
      if (e.value) {
        equipJSON[e.id] = e.value
      }
    }
  })

  equipment = JSON.stringify(equipJSON)
  if (equipment === rowEquip) {
    return
  }

  // escape the \ (escape) and ' (single quote) for sql string, not for JSON
  equipment = equipment.replace(/\\/g,"\\\\").replace(/'/g,"\\'")
  sqlSaveEquip(equipment, thisqn).then(response => {
    let showup = function () {
      updateBOOK(response)
      $dialogEquip.dialog('close')
    }
    let rollback = function () {
      // Error update server
      Alert("Checklistequip", response)

      // Roll back
      $('#dialogEquip input').val('')
      $('#dialogEquip textarea').val('')
      rowEquip &&
        Object.entries(JSON.parse(rowEquip)).forEach(([key, val]) => {
          val === 'checked'
          ? document.getElementById("#"+ key).checked = true
          : document.getElementById("#"+ key).value = val
        });
    };

    typeof response === "object" ? showup() : rollback()
  }).catch(error => {})
}

function cancelAllEquip()
{
  sqlCancelAllEquip(thisqn).then(response => {
    let hasData = function () {
      updateBOOK(response)
      delelteAllEquip()
    }

    typeof response === "object"
    ? hasData()
    : restoreAllEquip(response, rowEquip, JsonEquip)

  }).catch(error => {})
}

function delelteAllEquip()
{
  let $row = getTableRowByQN("maintbl", thisqn)

  $row.find("td").eq(EQUIPMENT).html('')
}

function restoreAllEquip(response, rowEquip, JsonEquip)
{
  // Error update server
  // Roll back. If old form has equips, fill checked & texts
  // prop("checked", true) : radio and checkbox
  // .val(val) : <input text> && <textarea>
  Alert("cancelAllEquip", response)
  $('#dialogEquip input').val('')
  $('#dialogEquip textarea').val('')
  if ( rowEquip ) {
    $.each(JsonEquip, function(key, val) {
      if (val === 'checked') {
        $("#"+ key).prop("checked", true)
      } else {
        $("#"+ key).val(val)
      }
    })
  }
}
