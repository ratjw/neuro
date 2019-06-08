
import { RECORDSHEET, OPERATION, RADIOSURG, ENDOVASC, THAIMONTH } from "../model/const.js"
import { editableSV } from "./setSERVICE.js"
import { htmlProfile } from '../view/html.js'
import { URIcomponent, winHeight, radioHack, deepEqual } from "../util/util.js"
import { numDate, thDate, datepicker } from '../util/date.js'
import { saveService } from './savePreviousCellService.js'
import { saveRecord } from './saveRecord.js'

let $dialogRecord = $('#dialogRecord'),
  maxHeight = winHeight(90),
  opdate,
  treatment,
  operated,
  radiosurg,
  endovasc
  

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

  operated = profile && profile.operated && [...profile.operated] || []
  radiosurg = profile && profile.radiosurg && [...profile.radiosurg] || []
  endovasc = profile && profile.endovasc && [...profile.endovasc] || []
  opdate = row.dataset.opdate
  treatment = row.dataset.treatment

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
          saveRecord(pointing, profile)
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

  let inputs = div.querySelectorAll("div.textarea, input"),
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
          $(e).datepicker("setDate", new Date(opdate))
          e.value = thDate(opdate)
        } else {
          $(e).datepicker("setDate", new Date(numDate(item[i][inputname])))
          e.value = item[i][inputname]
        }
      } else if (e.className === 'textarea') {
        if ((i === 0) && !(item[i] && item[i].procedure) && !usedTreatment()) {
          e.innerHTML = treatment
        } else {
          e.innerHTML = item[i].procedure
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
  let txtarea = $dialogRecord.find('div.textarea')

  return Array.from(txtarea).some(e => !!e.innerHTML)
}
