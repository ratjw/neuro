
import { OPDATE, HN, PATIENT, DIAGNOSIS, TREATMENT, EQUIPMENT } from "../control/const.js"
import { ISOdate, nextdays } from '../util/date.js'
import { string25 } from '../util/util.js'

const LINENOTIFY = "line/lineNotify.php"

export function notifySchedule()
{
  selectWeekDays()
  notifyLINE()
}

function selectWeekDays()
{
  let today = new Date(),
    todate = ISOdate(today),
    tomorrow = nextdays(todate, 1),
    nextSatday = today.setDate(today.getDate() + 6 - today.getDay() % 7),
    nextSatdate = ISOdate(new Date(nextSatday)),
    maintbl = document.querySelector('#maintbl'),
    rows = maintbl.querySelectorAll('tr')

  rows.forEach(e => {
    let edate = e.dataset.opdate
    if (edate >= tomorrow && edate < nextSatdate) {
      e.classList.add('selected')
    }
  })
}

function notifyLINE()
{
  let wrapper = document.querySelector("#wrapper"),
    notifywrapper = document.querySelector("#notifywrapper"),
    capture = document.querySelector("#capture"),
    tbody = capture.querySelector("tbody"),
    selected = document.querySelectorAll(".selected"),
    template = document.querySelector('#capturerow')

  tbody.innerHTML = template.innerHTML
  selected.forEach(e => {
    capture.querySelector("tbody").appendChild(e.cloneNode(true))
  })

  notifywrapper.style.display = 'block'
  wrapper.remove()
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
      'user': 'ตารางผ่าตัด Neurosurgery',
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
