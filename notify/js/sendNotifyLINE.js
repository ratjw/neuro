
import { OPDATE, HN, PATIENT, DIAGNOSIS, TREATMENT, EQUIPMENT } from "./const.js"
import { string25 } from './util.js'
import { Alert } from "./util.js"
import { postData, LINENOTIFY } from "./fetch.js"

export async function sendNotifyLINE(message)
{
  let notifywrapper = document.querySelector("#notifywrapper"),
    capture = document.querySelector("#capture"),
    tbody = capture.querySelector("tbody"),
    selected = document.querySelectorAll(".selected"),
    template = document.querySelector('#capturerow')

  tbody.innerHTML = template.innerHTML
  selected.forEach(e => {
    capture.querySelector("tbody").appendChild(e.cloneNode(true))
  })

  notifywrapper.style.display = 'block'
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

  let canvas = await html2canvas(capture)
  
  postData(LINENOTIFY, {
    "user": "ตารางผ่าตัด",
    "message": message,
    "image": canvas.toDataURL("image/png", 1.0)
  }).catch(error => alert(error.stack))
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
