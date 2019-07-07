
import { PROFILESHEET, OPERATION, RADIOSURG, ENDOVASC, THAIMONTH } from "../control/const.js"
import { editableSV } from "./setSERVICE.js"
import { htmlProfile } from '../control/html.js'
import { URIcomponent, winHeight, radioHack, deepEqual } from "../util/util.js"
import { numDate, thDate, datepicker } from '../util/date.js'
import { saveService } from './savePreviousCellService.js'
import { saveProfile } from './saveProfile.js'

let _$dialogProfile = $('#dialogProfile'),
  _maxHeight = winHeight(90),
  _opdate,
  _treatment,
  _operated,
  _radiosurg,
  _endovasc
  

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

  _opdate = row.dataset.opdate
  _treatment = row.dataset.treatment
  _operated = profile && profile.operated && [...profile.operated] || []
  _radiosurg = profile && profile.radiosurg && [...profile.radiosurg] || []
  _endovasc = profile && profile.endovasc && [...profile.endovasc] || []

  _$dialogProfile.html(htmlProfile(PROFILESHEET))

  let inputs = _$dialogProfile.find("input")
  Array.from(inputs).forEach(e => {
    if (e.name === "admitted") {
      e.value = admitted ? admitted : 0
    } else {
      e.checked = (e.value === (profile && profile[e.name]))
    }
  })

  appendProcedure('#operated', OPERATION, _operated, 'Op')
  appendProcedure('#radiosurg', RADIOSURG, _radiosurg, 'RS')
  appendProcedure('#endovasc', ENDOVASC, _endovasc, 'ET')

  showTreatment()

  _$dialogProfile.dialog({ height: 'auto' })
  _$dialogProfile.dialog({
    title: `${hn} ${patient}`,
    closeOnEscape: true,
    modal: true,
    width: 'auto',
    height: (_$dialogProfile.height() > _maxHeight) ? _maxHeight : 'auto',
    buttons: [
      {
        text: "Save",
        click: function () {
          saveProfile(pointing, profile)
          _$dialogProfile.dialog('close')
        }
      }
    ]
  })

  radioHack('#dialogProfile')
  clickAddDel()
  _$dialogProfile.find("div").focus()
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

function showTreatment()
{
  let operateddiv = $('#operated div.textdiv').html(),
    radiosurgdiv = $('#radiosurg div.textdiv').html(),
    endovascdiv = $('#endovasc div.textdiv').html()

  if (!operateddiv && !radiosurgdiv && !endovascdiv) {
    _$dialogProfile.find('div.treatdiv').html(_treatment).show()
  }
}

function clickAddDel()
{
  _$dialogProfile.find('button').off('click').on('click', function() {
    if (this.innerHTML === '+') {
      if (/Operation/.test(this.name)) {
        addProcedure(divProcedure, '#operated', OPERATION, _operated, 'Op')
      } else if (/Radiosurgery/.test(this.name)) {
        addProcedure(divProcedure, '#radiosurg', RADIOSURG, _radiosurg, 'RS')
      } else if (/Endovascular/.test(this.name)) {
        addProcedure(divProcedure, '#endovasc', ENDOVASC, _endovasc, 'ET')
      }
    } else if (this.innerHTML === '-') {
      delProcedure(this)
    }
  }) 
}

// add a procedure, reposition the dialog, and renew click button
function addProcedure(func, id, proc, item, suffix) {
  let div = $(id + ' > div'),
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
  showTreatment()
  resizeScroll()
  clickAddDel()
}

function resizeScroll()
{
  _$dialogProfile.dialog({ height: 'auto', width: 'auto' })
  _$dialogProfile.dialog({
    height: (_$dialogProfile.height() > _maxHeight) ? _maxHeight : 'auto'
  })
  _$dialogProfile.scrollTop(_$dialogProfile.height())
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
//    if (e.id === 'opdateth') {
//      e.id = 'opdateth' + suffix + i
//      datepicker($(e))
//    }
    if (item && item[i]) {
      if (inputname === 'opdateth') {
        e.id = e.id + suffix + i
        if ((i === 0) && !item[i][inputname]) {
          datepicker($(e))
          $(e).datepicker("setDate", new Date(_opdate))
          e.value = thDate(_opdate)
        } else {
          let date = new Date(numDate(item[i][inputname]))
          if (!isNaN(date)) {
            datepicker($(e))
            $(e).datepicker("setDate", date)
          }
          e.value = item[i][inputname]
        }
      } else if (e.className === 'textdiv') {
        if ((i === 0) && (item[i] && item[i].procedure === undefined) && !usedTreatment()) {
          e.innerHTML = _treatment
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
  let txtarea = _$dialogProfile.find('div.textdiv')

  return Array.from(txtarea).some(e => !!e.innerHTML)
}
