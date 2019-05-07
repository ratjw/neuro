
import { RECORDSHEET, OPERATION, RADIOSURG, ENDOVASC } from "../model/const.js"
import { editableSV } from "./setSERVICE.js"
import { htmlProfile } from '../view/html.js'
import { winHeight, radioHack, deepEqual } from "../util/util.js"
import { saveService } from './savePreviousCellService.js'

let $dialogRecord = $('#dialogRecord'),
  maxHeight = winHeight(90),
  rowRecord = {},
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

  appendProcedure('operated', OPERATION, operated)
  appendProcedure('radiosurg', RADIOSURG, radiosurg)
  appendProcedure('endovasc', ENDOVASC, endovasc)

  $dialogRecord.dialog({ height: 'auto' })

  $dialogRecord.dialog({
    title: `${hn} ${patient}`,
    closeOnEscape: true,
    modal: true,
    width: 400,
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

function appendProcedure(id, proc, item)
{
  let i = 0,
    el = document.getElementById(id)

  while (i < item.length) {
    el.appendChild(divProcedure(proc, item, i))
    i++
  }
}

function clickAddDel()
{
  $dialogRecord.find('button').off('click').on('click', function() {
    if (this.innerHTML === '+') {
      if (/Operation/.test(this.name)) {
        addProcedure(divProcedure, '#operated', OPERATION, operated)
      } else if (/Radiosurgery/.test(this.name)) {
        addProcedure(divProcedure, '#radiosurg', RADIOSURG, radiosurg)
      } else if (/Endovascular/.test(this.name)) {
        addProcedure(divProcedure, '#endovasc', ENDOVASC, endovasc)
      }
    } else if (this.innerHTML === '-') {
      delProcedure(this, )
    }
  }) 
}

// add a procedure, reposition the dialog, and renew click button
function addProcedure(func, id, proc, item) {
  let div = $(id).find('div'),
    i = 0

  if (div.length) {
    i = div.last().find('input')[0].name.replace(/\D/g, '')
  }

  $(id).append(func(proc, item, ++i))
  resizeScroll()
  clickAddDel()
}

function delProcedure(that, ) {
  that.closest('div').remove()
  resizeScroll()
  clickAddDel()
}

function resizeScroll()
{
  $dialogRecord.dialog({ height: 'auto' })
  $dialogRecord.dialog({
    height: ($dialogRecord.height() > maxHeight) ? maxHeight : 'auto'
  })
  $dialogRecord.scrollTop($dialogRecord.height())
}

// add op to e.name to make it unique
function divProcedure(procedure, item, i)
{
  let div = document.createElement("div")
  div.innerHTML = htmlProfile(procedure)

  let inputs = div.querySelectorAll("input"),
    inputname = ''

  Array.from(inputs).forEach(e => {
    inputname = e.name
    e.name = e.name + i
    if (item && item[i]) {
      e.checked = (e.value === (item[i][inputname]))
    }
  })

  return div  
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

  $('#operated div').each((i, div) => {
    if (!recordJSON.operated[i]) { recordJSON.operated[i] = {} }
    div.querySelectorAll('input').forEach(e => {
      if ((e.type === 'button') || e.checked) {
        recordJSON.operated[i][e.name.replace(i, '')] = e.value
      }
    })
  })

  $('#radiosurg div').each((i, div) => {
    if (!recordJSON.radiosurg[i]) { recordJSON.radiosurg[i] = {} }
    div.querySelectorAll('input').forEach(e => {
      if ((e.type === 'button') || e.checked) {
        recordJSON.radiosurg[i][e.name.replace(i, '')] = e.value
      }
    })
  })

  $('#endovasc div').each((i, div) => {
    if (!recordJSON.endovasc[i]) { recordJSON.endovasc[i] = {} }
    div.querySelectorAll('input').forEach(e => {
      if ((e.type === 'button') || e.checked) {
        recordJSON.endovasc[i][e.name.replace(i, '')] = e.value
      }
    })
  })

  if (!recordJSON.radiosurg.length) { delete recordJSON.radiosurg }
  if (!recordJSON.endovasc.length) { delete recordJSON.endovasc }

  if (deepEqual(recordJSON, rowRecord)) { return }

  saveService(pointed, "profile", JSON.stringify(recordJSON))
}

function getLastOp()
{
  let inputop = document.querySelectorAll("#operated input")

  inputop = Array.from(inputop).filter(e => /op/.test(e.name))

  return inputop.length
}
