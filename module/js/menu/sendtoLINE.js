
import { USER, isMobile } from "../main.js"
import { OPDATE, HN, PATIENT, DIAGNOSIS, TREATMENT, EQUIPMENT } from "../control/const.js"
import { string25 } from '../util/util.js'
import { sqlSendToLINE } from '../model/sqlSendToLINE.js'

const LINENOTIFY = "line/lineNotify.php"

export function sendtoLINE()
{
  let wrapper = document.querySelector("#wrapper"),
    notifywrapper = document.querySelector("#notifywrapper"),
    dialogNotify = document.querySelector("#dialogNotify"),
    buttonLINE = document.querySelector("#buttonLINE"),
    cancelnotify = document.querySelector("#cancelnotify"),
    capture = document.querySelector("#capture"),
    tbody = capture.querySelector("tbody"),
    selected = document.querySelectorAll(".selected"),
    notify = dialogNotify.querySelector('div'),
    txtarea = dialogNotify.querySelector('textarea'),
    message = txtarea.innerHTML,
    template = document.querySelector('#capturerow'),
    closeNotify = function() {
      buttonLINE.classList.remove('waiting')
      notifywrapper.style.display = 'none'
      wrapper.style.visibility = 'visible'
    }

  wrapper.style.visibility = 'hidden'
  notifywrapper.style.display = 'block'
  capture.style.width = (isMobile ? '500' : '1000') + 'px'
  notify.innerHTML += USER

  tbody.innerHTML = template.innerHTML
  selected.forEach(e => {
    capture.querySelector("tbody").appendChild(e.cloneNode(true))
  })

  let rows = capture.querySelectorAll('tr')

  rows.forEach(e => e.classList.remove('selected'))
  rows.forEach(e => e.classList.remove('beginselected'))
  rows.forEach(tr => {
    let cell = tr.cells

    if (cell.length && cell[0].nodeName !== 'TH') {
      let hn = cell[HN].innerHTML,
        patient = cell[PATIENT].innerHTML
      // สัปดาห์ Consult has no HN
      cell[OPDATE].innerHTML = cell[OPDATE].innerHTML.replace(' ', '<br>')
      cell[PATIENT].innerHTML = hn ? (hn + '<br>' + patient.split(" ")[0]) : ''
      cell[DIAGNOSIS].innerHTML = string25(cell[DIAGNOSIS].innerHTML)
      cell[TREATMENT].innerHTML = string25(cell[TREATMENT].innerHTML)
      cell[EQUIPMENT].innerHTML = cell[EQUIPMENT].innerHTML.replace(/\<br\>/g, '')
      equipImage(cell[EQUIPMENT])
    }
  })

  // setTimeout to wait css render waiting
  buttonLINE.onclick = function() {
    buttonLINE.classList.add('waiting')
    setTimeout(function() {
      html2canvas(capture).then(function(canvas) {
        sqlSendToLINE(message, canvas).then(response => console.log(response))
/*
        $.post(LINENOTIFY, {
          'user': USER,
          'message': message,
          'image': canvas.toDataURL('image/png', 1.0)
        }, function(response) {
          console.log(response)
        })
*/
        capture.style.display = 'none'
        closeNotify()
      })
    }, 100)
  }

  cancelnotify.onclick = closeNotify
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
