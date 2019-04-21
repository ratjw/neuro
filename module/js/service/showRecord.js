
import { RECORDSHEET, OPERATION } from "../model/const.js"
import { editableSV } from "./setSERVICE.js"
import { htmlProfile } from '../view/html.js'
import { winHeight, radioHack, deepEqual } from "../util/util.js"
import { saveService } from './savePreviouscellService.js'

let rowRecord = {},
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
    operated = profile && profile.operated,
    operleng = operated ? operated.length : 0,
    $dialogRecord = $('#dialogRecord'),
    height = winHeight(90)

  if (!qn) { return }

  rowRecord = profile
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

  if (operated && operated.length) {
    let i = 0
    do {
      $dialogRecord.append(divOperation(operated, i))
      i++
    } while (i<operated.length)
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
          if (op === operleng) {
            $dialogRecord.append(divOperation(operated, op))
            resizeScroll($dialogRecord, height)
          }
        }
      },
      {
        text: "Delete Op",
        click: function () {
          document.querySelector('#dialogRecord').lastElementChild.remove()
          resizeScroll($dialogRecord, height)
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
function divOperation(operated, op)
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
    },
    i = 0

  document.querySelectorAll('#dialogRecord input').forEach(e => {
    if (e.name === "admitted") {
      if (e.value) {
        recordJSON[e.name] = e.value
      }
    } else if (e.type === "checkbox") {
      if (e.checked) {
        recordJSON[e.name] = e.value
      }
    } else if (/op/.test(e.name)) {
      if (e.value) {
        i = e.name.replace('op', '')
        recordJSON.operated[i] = {}
        recordJSON.operated[i]['op'] = e.value
      }
    } else {
      if (e.checked) {
        recordJSON.operated[i][e.name.replace(i, '')] = e.value
      }
    }
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
