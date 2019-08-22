
import { sqlGetNameHN } from "../model/sqlGetNameHN.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert, winHeight } from "../util/util.js"
import { OLDCONTENT, reCreateEditcell } from "../control/edit.js"
import { saveHN } from '../save/saveHN.js'

export function saveNameHN(pointed, content)
{
  const wrapper = document.querySelector('#wrapper'),
    timer = setTimeout( function() { controller.abort();wrapper.style.cursor = 'default' }, 30000),
    controller = new AbortController(),
    signal = controller.signal

  wrapper.style.cursor = 'wait'
  pointed.innerHTML = content
  fetch(sqlGetNameHN(pointed, content), {
    method: 'get',
    signal: signal,
  })
  .then(async (response) => {
    wrapper.style.cursor = 'default'
    const text = await response.text()
    let result = ''
    try {
      result = JSON.parse(text)
    } catch(e) {
      result = text
    }
    if (typeof result === "object") {
      if ("BOOK" in result) {
        updateBOOK(result)
        reCreateEditcell()
      } else {
        showPatientNames(result, pointed, content)
      }
    } else {
      Alert("saveNameHN", content + "<br><br>" + result)
      pointed.innerHTML = ""
      // unsuccessful entry
    }
  }).catch(error => { })
}

function showPatientNames(response, pointed, content)
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

  $dialogPatient.dialog({ height: 'auto' })
  $dialogPatient.dialog({
    title: content,
    closeOnEscape: true,
    modal: true,
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
