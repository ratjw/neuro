
import { OPDATE, HN, PATIENT, DIAGNOSIS, TREATMENT, EQUIPMENT } from "../control/const.js"
import { ISOdate, nextdays } from '../util/date.js'
import { string25 } from '../util/util.js'

const LINENOTIFY = "line/lineNotify.php"

export function notifyNextWeek()
{
  selectNextWeek()
  notifyLINE()
}

function selectNextWeek()
{
  const todate = ISOdate(new Date())
  const nextMonday = nextdays(todate, 3)
  const nextSatday = nextdays(todate, 4)
  const maintbl = document.querySelector('#maintbl')
  const rows = maintbl.querySelectorAll('tr')
  const findMon = Array.from(rows).find(e => e.dataset.opdate === nextMonday)
  const findSat = Array.from(rows).find(e => e.dataset.opdate === nextSatday)

  rows.forEach(e => {
    if (e.dataset.opdate >= nextMonday && e.dataset.opdate < nextSatday) {
      e.classList.add('selected')
    }
  })
}

function notifyLINE()
{
  let wrapper = document.querySelector("#wrapper"),
    capture = document.querySelector("#capture"),
    tbody = capture.querySelector("tbody"),
    selected = document.querySelectorAll(".selected"),
    template = document.querySelector('#capturerow')

  tbody.innerHTML = template.innerHTML
  selected.forEach(e => {
    capture.querySelector("tbody").appendChild(e.cloneNode(true))
  })

//  wrapper.remove()
  capture.style.width = '1000px'

  let rows = capture.querySelectorAll('tr')

  rows.forEach(e => e.classList.remove('selected'))
  rows.forEach(e => e.classList.remove('beginselected'))
  rows.forEach(tr => {
    let cell = tr.cells

    if (cell.length && cell[0].nodeName !== 'TH') {
      let hn = cell[HN].innerHTML,
        patient = cell[PATIENT].innerHTML
      // Sat. สัปดาห์ Consult has no HN
      cell[OPDATE].innerHTML = cell[OPDATE].innerHTML.replace(' ', '<br>')
      cell[PATIENT].innerHTML = hn ? (hn + '<br>' + patient.split(" ")[0]) : ''
      cell[DIAGNOSIS].innerHTML = string25(cell[DIAGNOSIS].innerHTML)
      cell[TREATMENT].innerHTML = string25(cell[TREATMENT].innerHTML)
      cell[EQUIPMENT].innerHTML = cell[EQUIPMENT].innerHTML.replace(/\<br\>/g, '')
      equipImage(cell[EQUIPMENT])
    }
  })

  html2canvas(capture).then(function(canvas) {
    $.post(LINENOTIFY, {
      'user': 'ตารางผ่าตัดสัปดาห์หน้า',
      'message': '',
      'image': canvas.toDataURL('image/png', 1.0)
    })
  })
}

function equipImage(equip)
{
  equip.childNodes.forEach(e => (e.nodeName === '#text') && e.remove())
  equip.querySelectorAll('img').forEach(e => {
    if (e.className === 'imgpale') {
      e.src = e.src.replace('.jpg', 'pale.jpg')
    }
  })
}
