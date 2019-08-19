
import { sqlGetNameHN } from "../model/sqlsavehn.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert, winHeight } from "../util/util.js"
import { reCreateEditcell } from "../control/edit.js"

export function saveNameHN(pointed, content)
{
  sqlGetNameHN(pointed, content).then(response => {
    if (typeof response === "object") {
      if ("BOOK" in response) {
        updateBOOK(response)
        reCreateEditcell()
      } else {
        showPatientNames(response, content)
      }
    } else {
      Alert("saveNameHN", response)
      pointed.innerHTML = ""
      // unsuccessful entry
    }
  }).catch(error => { })
}

function showPatientNames(response, content)
{
  const $dialogPatient = $("#dialogPatient"),
    maxHeight = winHeight(90),
    $patienttbl = $("#patienttbl"),
    $tbody = $patienttbl.find('tbody')

  $patienttbl.find('tr').slice(1).remove()

  Object.values(response).forEach(item => {
    $('#patientcells tr').clone()
      .appendTo($tbody)
        .filldataPatient(item)
  });

  $dialogPatient.dialog({ height: 'auto' })
  $dialogPatient.dialog({
    title: content,
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    width: 'auto',
    height: ($dialogPatient.height() > _maxHeight) ? _maxHeight : 'auto',
  })
}

jQuery.fn.extend({
  filldataPatient : function (q) {
    let row = this[0]
    let cells = row.cells

    cells[0].innerHTML = q.hn
    cells[1].innerHTML = q.initial_name + q.first_name + " " + q.last_name
  }
})
