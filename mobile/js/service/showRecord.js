
import { RECORDSHEET, OPERATION, RADIOSURG, ENDOVASC, THAIMONTH } from "../model/const.js"
import { editableSV } from "./setSERVICE.js"
import { htmlProfile } from '../view/html.js'
import { URIcomponent, winHeight, radioHack, deepEqual } from "../util/util.js"
import { numDate, thDate, datepicker } from '../util/date.js'
import { saveService } from './savePreviousCellService.js'

let $dialogRecord = $('#dialogRecord'),
  maxHeight = winHeight(90),
  rowRecord = {},
  opdate,
  treatment,
  operated,
  radiosurg,
  endovasc,
  pointed
  

// e.name === column in Mysql
// e.value === value of this item
// JSON.parse('null') = null
export function showRecord(pointing)
{
  let row = pointing.closest('tr'),
    hn = row.dataset.hn,
    patient = row.dataset.patient,
    qn = row.dataset.qn,
    profile = JSON.parse(row.dataset.profile),
    admitted = profile && profile.admitted

  if (!qn) { return }

  rowRecord = profile
  operated = profile && profile.operated && [...profile.operated] || []
  radiosurg = profile && profile.radiosurg && [...profile.radiosurg] || []
  endovasc = profile && profile.endovasc && [...profile.endovasc] || []
  opdate = row.dataset.opdate
  treatment = row.dataset.treatment
  pointed = pointing

  $dialogRecord.html(htmlProfile(RECORDSHEET))

  let inputs = $dialogRecord.find("input")
  Array.from(inputs).forEach(e => {
    if (e.name === "admitted") {
      e.value = admitted ? admitted : 0
    } else {
      e.checked = (e.value === (profile && profile[e.name]))
    }
  })

  appendProcedure('#operated', OPERATION, operated, 'Op')
  appendProcedure('#radiosurg', RADIOSURG, radiosurg, 'RS')
  appendProcedure('#endovasc', ENDOVASC, endovasc, 'ET')

  $dialogRecord.dialog({ height: 'auto' })

  $dialogRecord.dialog({
    title: `${hn} ${patient}`,
    closeOnEscape: true,
    modal: true,
    width: 'auto',
    height: ($dialogRecord.height() > maxHeight) ? maxHeight : 'auto',
    buttons: [
      {
        text: "Save",
        click: function () {
          saveRecord()
          $dialogRecord.dialog('close')
        }
      }
    ]
  })

  radioHack('#dialogRecord')
  clickAddDel()
}

function appendProcedure(id, proc, item, suffix)
{
  let i = 0,
    el = document.querySelector(id)

  while (i < item.length) {
    el.appendChild(divProcedure(proc, item, suffix, i))
    i++
  }
}

function clickAddDel()
{
  $dialogRecord.find('button').off('click').on('click', function() {
    if (this.innerHTML === '+') {
      if (/Operation/.test(this.name)) {
        addProcedure(divProcedure, '#operated', OPERATION, operated, 'Op')
      } else if (/Radiosurgery/.test(this.name)) {
        addProcedure(divProcedure, '#radiosurg', RADIOSURG, radiosurg, 'RS')
      } else if (/Endovascular/.test(this.name)) {
        addProcedure(divProcedure, '#endovasc', ENDOVASC, endovasc, 'ET')
      }
    } else if (this.innerHTML === '-') {
      delProcedure(this)
    }
  }) 
}

// add a procedure, reposition the dialog, and renew click button
function addProcedure(func, id, proc, item, suffix) {
  let div = $(id).find('div'),
    i = 0

  if (div.length) {
    i = div.last().find('input')[0].name.replace(/\D/g, '')
    i++
  }

  $(id).append(func(proc, item, suffix, i))
  resizeScroll()
  radioHack(id)
  clickAddDel()
}

function delProcedure(that) {
  that.closest('div').remove()
  resizeScroll()
  clickAddDel()
}

function resizeScroll()
{
  $dialogRecord.dialog({ height: 'auto', width: 'auto' })
  $dialogRecord.dialog({
    height: ($dialogRecord.height() > maxHeight) ? maxHeight : 'auto'
  })
  $dialogRecord.scrollTop($dialogRecord.height())
}

// add op to e.name to make it unique
function divProcedure(procedure, item, suffix, i)
{
  let div = document.createElement("div")
  div.innerHTML = htmlProfile(procedure)

  let inputs = div.querySelectorAll("textarea, input"),
    inputname = ''

  Array.from(inputs).forEach(e => {
    inputname = e.name
    e.name = e.name + suffix + i
    if (e.id === 'opdatepicker') {
      e.id = 'opdatepicker' + suffix + i
      datepicker($(e))
    }
    if (item && item[i]) {
      if (inputname === 'opdate') {
        if ((i === 0) && !item[i][inputname]) {
          e.value = thDate(opdate)
          $(e).datepicker("setDate", new Date(opdate))
        } else {
          e.value = item[i][inputname]
        }
      } else if (e.type === 'textarea') {
        if ((i === 0) && !e.value && !usedTreatment()) {
          e.value = treatment
        } else {
          e.value = item[i][inputname]
        }
      } else {
        e.checked = (e.value === (item[i][inputname]))
      }
    }
  })

  return div  
}

function usedTreatment()
{
  return (rowRecord.operated && rowRecord.operated[0] && rowRecord.operated[0].procedure)
    || (rowRecord.radiosurg && rowRecord.radiosurg[0] && rowRecord.radiosurg[0].procedure)
    || (rowRecord.endovasc && rowRecord.endovasc[0] && rowRecord.endovasc[0].procedure)
}

function saveRecord()
{
  let recordJSON = {
      operated: [],
      radiosurg: [],
      endovasc: []
    }

  $('#dialogRecord input:not(#dialogRecord div input)').each(function() {
    if (this.name === "admitted") {
      if (this.value) {
        recordJSON[this.name] = this.value
      }
    } else {
      if (this.checked) {
        recordJSON[this.name] = this.value
      }
    }
  })

  saveProcedure('#operated', recordJSON.operated, 'Op')
  saveProcedure('#radiosurg', recordJSON.radiosurg, 'RS')
  saveProcedure('#endovasc', recordJSON.endovasc, 'ET')

  if (!recordJSON.radiosurg.length) { delete recordJSON.radiosurg }
  if (!recordJSON.endovasc.length) { delete recordJSON.endovasc }

  if (deepEqual(recordJSON, rowRecord)) { return }

  let content = JSON.stringify(recordJSON)
    content = URIcomponent(content)

  saveService(pointed, "profile", content)
}

function saveProcedure(id, procedure, suffix)
{
  $(id + ' div').each((i, div) => {
    if (!procedure[i]) { procedure[i] = {} }
    div.querySelectorAll('input, textarea').forEach(e => {
      if ((e.type === 'text') || (e.type === 'textarea') || e.checked) {
        procedure[i][e.name.replace(suffix + i, '')] = e.value
      }
    })
  })
}
