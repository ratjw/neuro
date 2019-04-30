
import { RECORDSHEET, OPERATION } from "../model/const.js"
import { editableSV } from "./setSERVICE.js"
import { htmlProfile } from '../view/html.js'
import { winHeight, radioHack, deepEqual } from "../util/util.js"
import { saveService } from './savePreviouscellService.js'

let rowRecord = {},
  operated,
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
    admitted = profile && profile.admitted,
    $dialogRecord = $('#dialogRecord'),
    height = winHeight(90)

  if (!qn) { return }

  rowRecord = profile
  operated = profile && [...profile.operated] || []
  pointed = pointing

  $dialogRecord.html(htmlProfile(RECORDSHEET))

  let inputs = $dialogRecord.find("input")
  Array.from(inputs).forEach(e => {
    if (e.name === "admitted") {
      e.value = admitted
                ? admitted
                : row.dataset.admit
                  ? 1
                  : 0
    } else {
      e.checked = (e.value === (profile && profile[e.name]))
    }
  })

  let i = 0
  while (i < operated.length) {
    $dialogRecord.append(divOperation(i))
    i++
  }

  $dialogRecord.dialog({ height: 'auto' })

  $dialogRecord.dialog({
    title: `${hn} ${patient}`,
    closeOnEscape: true,
    modal: true,
    width: 340,
    height: ($dialogRecord.height() > height) ? height : 'auto',
    buttons: [
      {
        text: "Add Op",
        click: function () {
          let op = getLastOp()
          // add another element to operated and reposition the dialog
          if (op === operated.length) {
            $dialogRecord.append(divOperation(op))
            resizeScroll($dialogRecord, height)
          }
        }
      },
      {
        text: "Delete Op",
        click: function () {
          $dialogRecord.find('div').last().remove()
          resizeScroll($dialogRecord, height)
          if (operated.length > $dialogRecord.find('div').length) {
            operated.pop()
          }
        }
      },
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
}

function resizeScroll($dialogRecord, height)
{
  $dialogRecord.dialog({ height: 'auto' })
  $dialogRecord.dialog({ height: ($dialogRecord.height() > height) ? height : 'auto' })
  $dialogRecord.scrollTop($dialogRecord.height())
}

// add op to e.name to make it unique
function divOperation(op)
{
  let div = document.createElement("div")
  div.innerHTML = htmlProfile(OPERATION)

  let inputs = div.querySelectorAll("input"),
    inputname = ''

  Array.from(inputs).forEach(e => {
    inputname = e.name
    e.name = e.name + op
    if (inputname === "op") {
      e.value = Number(op) + 1
    } else {
      if (operated && operated[op]) {
        e.checked = (e.value === (operated[op][inputname]))
      }
    }
  })

  return div  
}

function saveRecord()
{
  let recordJSON = {
      operated: []
    }

  $('#dialogRecord input:not(#dialogRecord div input)').each(function() {
    if (this.name === "admitted") {
      if (this.value) {
        recordJSON[this.name] = this.value
      }
    } else if (this.type === "checkbox") {
      if (this.checked) {
        recordJSON[this.name] = this.value
      }
    }
  })

  $('#dialogRecord div').each((i, div) => {
    if (!recordJSON.operated[i]) { recordJSON.operated[i] = {} }
    div.querySelectorAll('input').forEach(e => {
      if ((e.type === 'button') || e.checked) {
        recordJSON.operated[i][e.name.replace(i, '')] = e.value
      }
    })
  })

  if (deepEqual(recordJSON, rowRecord)) { return }

  saveService(pointed, "profile", JSON.stringify(recordJSON))
}

function getLastOp()
{
  let inputop = document.querySelectorAll("#dialogRecord input")

  inputop = Array.from(inputop).filter(e => /op/.test(e.name))

  return inputop.length
}
