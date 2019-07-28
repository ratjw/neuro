
import { LAB, NAMEOFDAYTHAI } from "../control/const.js"
import { clearEditcell } from "../control/edit.js"
import { USER } from "../main.js"
import { sqlGetLab, sqlSaveLab, sqlCancelAllLab } from "../model/sqlGetLab.js"
import { putAgeOpdate, putThdate } from "../util/date.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert, winHeight, string25Oneline, deepEqual } from "../util/util.js"

let _JsonLab,
  _qn,
  _$dialogLab = $('#dialogLab')

export function getLAB(pointing)
{
  let tableID = pointing.closest('table').id,
    row = pointing.closest('tr'),
    hn = row.dataset.hn,
    qn = row.dataset.qn,
    rowLab = row.dataset.lab,
    thisLab = {
      opdaylab: NAMEOFDAYTHAI[(new Date(row.dataset.opdate)).getDay()],
      opdatethlab: putThdate(row.dataset.opdate),
      staffnamelab: row.dataset.staffname,
      hnlab: row.dataset.hn,
      patientnamelab: row.dataset.patient,
      agelab: putAgeOpdate(row.dataset.dob, row.dataset.opdate),
      diagnosislab: string25Oneline(row.dataset.diagnosis),
      treatmentlab: string25Oneline(row.dataset.treatment)
    }

  if (!hn || !qn) { return }

  for (let key in thisLab) {
    document.getElementById(key).innerHTML = thisLab[key]
  }

  _JsonLab = rowLab ? JSON.parse(rowLab) : {}
  _qn = qn

  _$dialogLab.dialog({
    title: "Blood Request",
    closeOnEscape: true,
    modal: true
  })

  fillLab()

  clearEditcell()
}

function fillLab()
{
  // clear all previous dialog values
  _$dialogLab.find('input').val('')

  if (Object.keys(_JsonLab).length) {
    Object.entries(_JsonLab).forEach(([key, val]) => 
      document.getElementById(key).value = val)
    showNonEditableLab()
   } else {
    showEditableLab()
  }

}

function showNonEditableLab()
{
  _$dialogLab.dialog("option", "buttons", [
    {
      text: "ยกเลิกทุกรายการ",
      style: "margin-right:50px",
      click: function () {
        if (confirm("ลบออกทั้งหมด")) {
          cancelAllLab()
          _$dialogLab.dialog('close')
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

  _$dialogLab.find('input').prop('disabled', true)
}

function showEditableLab()
{
  _$dialogLab.dialog("option", "buttons", [
    {
      text: "Save",
      click: function () {
        let checkLab = Array.from(document.querySelectorAll('#dialogLab input')).some(e => e.value)
        if (checkLab) {
          saveLab()
          showNonEditableLab()
        } else {
          cancelAllLab()
          _$dialogLab.dialog('close')
        }
      }
    }
  ])

  _$dialogLab.find('input').prop('disabled', false)
}

function saveLab()
{
  let labJSON = {},
    lab = "",
    sql = ""

  document.querySelectorAll('#dialogLab input').forEach(e => {
    if (e.value) {
      labJSON[e.id] = e.value
    }
  })

  if (deepEqual(labJSON, _JsonLab)) { return }

  lab = JSON.stringify(labJSON)

  // escape the \ (escape) and ' (single quote) for sql string, not for JSON
  lab = lab.replace(/\\/g,"\\\\").replace(/'/g,"\\'")
  sqlSaveLab(lab, _qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
      _$dialogLab.dialog('close')
    } else {
      Alert("saveLab", response)

      // failed save, roll back
      fillLab()
    }
  }).catch(error => {})
}

function cancelAllLab()
{
  sqlCancelAllLab(_qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
    } else {
      Alert("cancelAllLab", response)

      // failed cancel, roll back
      fillLab()
    }
  }).catch(error => {})
}
