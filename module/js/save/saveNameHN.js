
import { sqlGetNameHN } from "../model/sqlsavehn.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert } from "../util/util.js"
import { reCreateEditcell } from "../control/edit.js"

export function saveNameHN(pointed, content)
{
  sqlGetNameHN(pointed, content).then(response => {
    if (typeof response === "object") {
      if ("BOOK" in response) {
        updateBOOK(response)
        reCreateEditcell()
      } else {
        showPatientNames(response)
      }
    } else {
      Alert("saveNameHN", response)
      pointed.innerHTML = ""
      // unsuccessful entry
    }
  }).catch(error => { })
}

function showPatientNames(names)
{
  let $patienttbl = $("#patienttbl"),
    $tbody = $patienttbl.find('tbody')

  $patienttbl.find('tr').slice(1).remove()

  Object.values(names).forEach(item => {
    $('#patientcells tr').clone()
      .appendTo($tbody)
        .filldataPatient(item)
  });
}

jQuery.fn.extend({
  filldataPatient : function (q) {
    let row = this[0]
    let cells = row.cells
    let patient = q.initial_name + q.first_name + " " + q.last_name

    cells[0].innerHTML = q.hn
    cells[1].innerHTML = patient
  }
})
