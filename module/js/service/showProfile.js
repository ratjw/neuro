
import { PROFILESHEET, OPERATION, RADIOSURG, ENDOVASC, THAIMONTH } from "../model/const.js"
import { editableSV } from "./setSERVICE.js"
import { htmlProfile } from '../view/html.js'
import { URIcomponent, winHeight, radioHack, deepEqual } from "../util/util.js"
import { numDate, thDate, datepicker } from '../util/date.js'
import { saveService } from './savePreviousCellService.js'
import { saveProfile } from './saveProfile.js'

let $dialogProfile = $('#dialogProfile'),
  maxHeight = winHeight(90),
  opdate,
  treatment,
  operated,
  radiosurg,
  endovasc
  

// e.name === column in Mysql
// e.value === value of this item
// JSON.parse('null') = null
export function showProfile(pointing)
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

  $dialogProfile.html(htmlProfile(PROFILESHEET))

  let inputs = $dialogProfile.find("input")
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

  let operateddiv = $('#operated div').length,
    radiosurgdiv = $('#radiosurg div').length,
    endovascdiv = $('#endovasc div').length

  if (!operateddiv && !radiosurgdiv && !endovascdiv) {
    $dialogProfile.find('div.treatdiv').html(treatment).show()
  }

  $dialogProfile.dialog({ height: 'auto' })
  $dialogProfile.dialog({
    title: `${hn} ${patient}`,
    closeOnEscape: true,
    modal: true,
    width: 'auto',
    height: ($dialogProfile.height() > maxHeight) ? maxHeight : 'auto',
    buttons: [
      {
        text: "Save",
        click: function () {
          saveProfile(pointing, profile)
          $dialogProfile.dialog('close')
        }
      }
    ]
  })

  radioHack('#dialogProfile')
  clickAddDel()
  $dialogProfile.find("input").focus()
  // make it respond to closeOnEscape
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
  $dialogProfile.find('button').off('click').on('click', function() {
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
  $dialogProfile.dialog({ height: 'auto', width: 'auto' })
  $dialogProfile.dialog({
    height: ($dialogProfile.height() > maxHeight) ? maxHeight : 'auto'
  })
  $dialogProfile.scrollTop($dialogProfile.height())
}

// add op to e.name to make it unique
function divProcedure(procedure, item, suffix, i)
{
  let div = document.createElement("div")
  div.innerHTML = htmlProfile(procedure)

  let inputs = div.querySelectorAll("div.textdiv, input"),
    inputname = ''

  Array.from(inputs).forEach(e => {
    inputname = e.name
    e.name = e.name + suffix + i
    if (e.id === 'opdatepicker') {
      e.id = 'opdatepicker' + suffix + i
      datepicker($(e))
    }
    if (item && item[i]) {
      if (inputname === 'opdateth') {
        if ((i === 0) && !item[i][inputname]) {
          $(e).datepicker("setDate", new Date(opdate))
          e.value = thDate(opdate)
        } else {
          $(e).datepicker("setDate", new Date(numDate(item[i][inputname])))
          e.value = item[i][inputname]
        }
      } else if (e.className === 'textdiv') {
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
  let txtarea = $dialogProfile.find('div.textdiv')

  return Array.from(txtarea).some(e => !!e.innerHTML)
}
