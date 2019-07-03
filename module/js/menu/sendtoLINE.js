
import { USER, isMobile } from "../main.js"
import {
  OPDATE, THEATRE, OPTIME, CASENUM, HN, PATIENT, DIAGNOSIS, TREATMENT, EQUIPMENT, CONTACT
} from "../model/const.js"

const LINEBOT = "line/lineBot.php"
const LINENOTIFY = "line/lineNotify.php"
//const HIDE = [THEATRE, OPTIME, CASENUM, PATIENT, CONTACT]

export function sendtoLINE()
{
  let wrapper = document.querySelector("#wrapper"),
    cssmenu = document.querySelector("#cssmenu"),
    notifywrapper = document.querySelector("#notifywrapper"),
    dialogNotify = document.querySelector("#dialogNotify"),
    buttonLINE = document.querySelector("#buttonLINE"),
    cancelnotify = document.querySelector("#cancelnotify"),
    capture = document.querySelector("#capture"),
    tbody = capture.querySelector("tbody"),
    selected = document.querySelectorAll(".selected"),
    notify = dialogNotify.querySelector('span'),
    loader = dialogNotify.querySelector(".loader"),
    txtarea = dialogNotify.querySelector('textarea'),
    message = txtarea.innerHTML,
    template = document.querySelector('#capturerow'),
    closeNotify = function() {
      loader.style.display = 'none'
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
  rows.forEach(e => e.classList.remove('lastselected'))
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

  buttonLINE.onclick = function() {
    loader.style.display = 'block'
    // setTimeout to wait loader css rendering
    setTimeout(function() {
      html2canvas(capture).then(function(canvas) {
        capture.style.display = 'none'
        $.post(LINENOTIFY, {
          'user': USER,
          'message': message,
          'image': canvas.toDataURL('image/png', 1.0)
        })
        closeNotify()
      })
    }, 100)
  }

  cancelnotify.onclick = closeNotify
}

function string25(txt)
{
  let result1 = [],
   result2 = [],
   result3 = [],
   result4 = [],
   endresult = [],
   temp = '',
   i = 0

  if (!txt) { return '' }
  txt = txt.replace(/ {1,}/g, ' ')
  result1 = txt.split('<br>')
  result1.forEach(e => e.trim())
  result1.forEach(e => {
    if (e.length > 25) {
      result2 = e.split(' ')
      result2.forEach(el => {
        temp += temp ? (' ' + el) : el
        if (temp.length > 25) {
          if (temp.length <= 30) {
            result3.push(temp)
            temp = ''
          } else {
            result4 = temp.match(/(.{1,28})/g)
            temp = result4.pop()
            result3.push(...result4)
          }
        }
      })
      if (temp) { result3.push(temp) }
      temp = ''
    }
    if (result3.length) {
      result1.splice(result1.indexOf(e), 1, result3.join('<br>'))
      result3 = []
    }
  })

  result1.filter(e => e)
  result1 = result1.join('<br>')
  result1 = result1.split('<br>')
  while ((i < 2) && (i < result1.length)) {
    endresult.push(result1[i])
    i++
  }

  return endresult.join('<br>')
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
