
import { sqlGetName } from "../model/sqlGetName.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert, winHeight } from "../util/util.js"
import { OLDCONTENT, reCreateEditcell } from "../control/edit.js"
import { saveHN } from '../save/saveHN.js'

export function savePATIENT(pointed, content)
{
  const wrapper = document.querySelector('#wrapper'),
    controller = new AbortController(),
    signal = controller.signal,
    timer = setTimeout(() => {
      controller.abort()
      wrapper.style.cursor = 'default'
      Alert(content, 'มีรายชื่อมากเกินไป<br><br>ควรใส่ชื่อและนามสกุล ให้เจาะจงกว่านี้')
    }, 10000)

  wrapper.style.cursor = 'wait'
  pointed.innerHTML = content
  sqlGetName(pointed, content, signal).then(response => {
    clearTimeout(timer)
    wrapper.style.cursor = 'default'
    if (typeof response === "object") {
      if ("BOOK" in response) {
        updateBOOK(response)
        reCreateEditcell()
      } else {
        showPatientNames(response, pointed, content)
      }
    } else {
      Alert("savePATIENT", content + "<br><br>" + response)
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
