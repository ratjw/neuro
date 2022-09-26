
import { sqlGetName } from "../model/sqlGetHNName.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert, winHeight } from "../util/util.js"
import { OLDCONTENT, reCreateEditcell } from "../control/edit.js"
import { saveHN } from '../save/saveHN.js'

export function savePATIENT(pointed)
{
  const wrapper = document.querySelector('#wrapper'),
    editcell = document.querySelector('#editcell'),
    name = editcell.querySelector('input[name=name]').value,
    surname = editcell.querySelector('input[name=surname]').value,
    patientname = name.trim() + ' ' + surname.trim(),
    controller = new AbortController(),
    signal = controller.signal

  if (!name && !surname) { return }

  let timer = setTimeout(() => {
      controller.abort()
      wrapper.style.cursor = 'default'
      Alert(patientname, 'มีรายชื่อมากเกินไป<br><br>ควรใส่ชื่อและนามสกุล ให้เจาะจงกว่านี้')
    }, 10000)

  wrapper.style.cursor = 'wait'
  sqlGetName(pointed, patientname, signal).then(response => {
    clearTimeout(timer)
    wrapper.style.cursor = 'default'
    if (typeof response === "object") {
      if ("BOOK" in response) {
        updateBOOK(response)
        reCreateEditcell()
      } else {
        showPatientNames(response, pointed, patientname)
      }
    } else {
      Alert("savePATIENT", patientname + "<br><br>" + response)
      pointed.innerHTML = ""
      // unsuccessful entry
    }
  }).catch(error => { clearTimeout(timer) })
}

function showPatientNames(response, pointed, patientname)
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

  $patienttbl.find('tr').click(function() {
    saveHN(pointed, this.cells[0].innerHTML)
    $dialogPatient.dialog('close')
  })

  $dialogPatient.dialog({ modal: true })
  $dialogPatient.dialog({ height: 'auto' })
  $dialogPatient.dialog({
    title: patientname,
    closeOnEscape: true,
    show: 200,
    hide: 200,
    width: 'auto',
    height: ($dialogPatient.height() > maxHeight) ? maxHeight : 'auto',
    close: function() { pointed.innerHTML = OLDCONTENT }
  })
}

jQuery.fn.extend({
  filldataPatient : function (q) {
    let row = this[0],
      cells = row.cells,
      initial = (typeof q.initial_name === 'object') ? '' : q.initial_name

    cells[0].innerHTML = q.hn
    cells[1].innerHTML = initial + q.first_name + " " + q.last_name
  }
})
