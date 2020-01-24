
import { OPDATE, HN, PATIENT, DIAGNOSIS, TREATMENT, EQUIPMENT } from "../control/const.js"
import { dateObj_2_ISOdate, nextdates } from '../util/date.js'
import { string25 } from '../util/util.js'

const LINENOTIFY = "line/lineNotify.php"

export function notifyLINE()
{
  let today = new Date(),
    day = today.getDay(),
    todate = dateObj_2_ISOdate(today),
    tomorrow = nextdates(todate, 1),
    thisSatday = today.setDate(today.getDate() + 6 - today.getDay() % 7),
    thisSatdate = dateObj_2_ISOdate(new Date(thisSatday)),
    nextMonday = nextdates(thisSatdate, 2),
    nextSatdate = nextdates(thisSatdate, 7),
    ifFriday = day === 5,
    ifWeekEnd = day === 6 || day === 0,
    begindate = ifFriday ? nextMonday : tomorrow,
    enddate = ifFriday ? nextSatdate : thisSatdate

  if (ifWeekEnd) { return }
  selectCases(begindate, enddate)
  sendNotifyLINE(ifFriday)
}

function selectCases(begindate, enddate)
{
  let maintbl = document.querySelector('#maintbl'),
    rows = maintbl.querySelectorAll('tr')

  rows.forEach(e => {
    let edate = e.dataset.opdate
    if (edate >= begindate && edate < enddate) {
      e.classList.add('selected')
    }
  })
}

function sendNotifyLINE(ifFriday)
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
      'user': 'ตารางผ่าตัด',
      'message': ifFriday ? 'สัปดาห์หน้า' : 'สัปดาห์นี้',
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
