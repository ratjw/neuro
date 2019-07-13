
import { LAB, NAMEOFDAYTHAI } from "../control/const.js"
import { clearEditcell } from "../control/edit.js"
import { USER } from "../main.js"
import { sqlGetLab, sqlSaveLab, sqlCancelAllLab } from "../model/sqlGetLab.js"
import { putAgeOpdate, putThdate } from "../util/date.js"
import { getTableRowByQN } from "../util/rowsgetting.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert, winHeight } from "../util/util.js"
import { string25 } from '../util/util.js'
//import { viewLabJSON } from "../view/viewLab.js"

let rowLab,
  JsonLab,
  thisqn,
  $dialogLab = $('#dialogLab')

export function getLAB(pointing)
{
  let tableID = pointing.closest('table').id,
    row = pointing.closest('tr'),
    qn = row.dataset.qn,
    thisLab = {
      opdaylab: NAMEOFDAYTHAI[(new Date(row.dataset.opdate)).getDay()],
      opdatethlab: putThdate(row.dataset.opdate),
      staffnamelab: row.dataset.staffname,
      hnlab: row.dataset.hn,
      patientnamelab: row.dataset.patient,
      agelab: putAgeOpdate(row.dataset.dob, row.dataset.opdate),
      diagnosislab: string25(row.dataset.diagnosis),
      treatmentlab: string25(row.dataset.treatment)
    }

  if (!qn) { return }

  for (let key in thisLab) {
    document.getElementById(key).innerHTML = thisLab[key]
  }

  rowLab = row.dataset.lab
  JsonLab = rowLab ? JSON.parse(rowLab) : {}
  thisqn = qn

  // clear all previous dialog values
  $dialogLab.show()
  $dialogLab.find('input').val('')
  $dialogLab.find('textarea').val('')
  $dialogLab.find('input').prop('checked', false)
  $dialogLab.dialog({
    title: "Laboratory",
    closeOnEscape: true,
    modal: true,
    width: 320
  })

  // If ever filled, show checked equips & texts
  // .prop("checked", true) shown in radio and checkbox
  // .val(val) shown in <input text> && <textarea>
  if ( Object.keys(JsonLab).length ) {
    $.each(JsonLab, function(key, val) {
      if (val) {
        $("#"+ key).val(val)
      }
    })
    showNonEditableLab()
   } else {
    showEditableLab()
  }

  clearEditcell()
}

function showNonEditableLab()
{
  $dialogLab.dialog("option", "buttons", [
    {
      text: "ยกเลิกทุกรายการ",
      style: "margin-right:50px",
      click: function () {
        if (confirm("ลบออกทั้งหมด")) {
          cancelAllLab()
          $dialogLab.dialog('close')
        }
      }
    },
    {
      text: "แก้ไข",
      click: function () {
        showEditableLab()
      }
    }
  ])
  disableInput()
}

let showEditableLab = function () {
  $dialogLab.dialog("option", "buttons", [
    {
      text: "Save",
      click: function () {
        if (checkLab()) {
          ChecklistLab()
          showNonEditableLab()
        } else {
          cancelAllLab()
          $dialogLab.dialog('close')
        }
      }
    }
  ])
  enableInput()
}

function disableInput()
{
  $('#dialogLab input').prop('disabled', true)
}

function enableInput()
{
  $('#dialogLab input').prop('disabled', false)
}

function checkLab()
{
  let equip = false

  $('#dialogLab input[type=number]').each((i, e) => {
    if (e.value) {
      equip = true
      return false
    }
  })

  return equip
}

let ChecklistLab = function () {
  let equipJSON = {},
    lab = "",
    sql = ""

  document.querySelectorAll('#dialogLab input[type=number]').forEach(e => {
    if (e.value) {
      equipJSON[e.id] = e.value
    }
  })

  lab = JSON.stringify(equipJSON)
  if (lab === rowLab) {
    return
  }

  // escape the \ (escape) and ' (single quote) for sql string, not for JSON
  lab = lab.replace(/\\/g,"\\\\").replace(/'/g,"\\'")
  sqlSaveLab(lab, thisqn).then(response => {
    let showup = function () {
      updateBOOK(response)
      $dialogLab.dialog('close')
    }
    let rollback = function () {
      // Error update server
      Alert("Checklistequip", response)

      // Roll back
      $('#dialogLab input').val('')
      $('#dialogLab textarea').val('')
      rowLab &&
        Object.entries(JSON.parse(rowLab)).forEach(([key, val]) => {
          val === 'checked'
          ? document.getElementById("#"+ key).checked = true
          : document.getElementById("#"+ key).value = val
        });
    };

    typeof response === "object" ? showup() : rollback()
  }).catch(error => {})
}

function cancelAllLab()
{
  sqlCancelAllLab(thisqn).then(response => {
    let hasData = function () {
      updateBOOK(response)
      delelteAllLab()
    }

    typeof response === "object"
    ? hasData()
    : restoreAllLab(response, rowLab, JsonLab)

  }).catch(error => {})
}

function delelteAllLab()
{
  let $row = getTableRowByQN("maintbl", thisqn)

  $row.find("td").eq(LAB).html('')
}

// Error from server
function restoreAllLab(response, rowLab, JsonLab)
{
  Alert("cancelAllLab", response)
  $('#dialogLab input').val('')
  $('#dialogLab textarea').val('')
  if ( rowLab ) {
    $.each(JsonLab, function(key, val) {
      if (val === 'checked') {
        $("#"+ key).prop("checked", true)
      } else {
        $("#"+ key).val(val)
      }
    })
  }
}
