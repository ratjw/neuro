
import { USER, isMobile } from "../main.js"
import {
  OPDATE, THEATRE, OPTIME, CASENUM, HN, PATIENT, DIAGNOSIS, TREATMENT, EQUIPMENT, CONTACT
} from "../model/const.js"

const LINEBOT = "line/lineBot.php"
const LINENOTIFY = "line/lineNotify.php"
const HIDE = [THEATRE, OPTIME, CASENUM, PATIENT, CONTACT]

export function sendtoLINE()
{
  let maintbl = document.querySelector("#maintbl"),
    cssmenu = document.querySelector("#cssmenu"),
    capture = document.querySelector("#capture"),
    $capture = $("#capture"),
    $selected = $(".selected"),
    $dialogNotify = $('#dialogNotify'),
    $textarea = $dialogNotify.find('textarea'),
    message = $textarea.val()

  $capture.find("tr").slice(1).remove()
  $.each($selected, function() {
    $capture.find("tbody").append($(this).clone())
  })

  let $rows = $capture.find('tr')

  $rows.removeClass('selected')
  $rows.removeClass('lastselected')

  $.each($rows, function() {
    let cell = this.cells,
      tr = this,
      td = tr.querySelectorAll('td')
    HIDE.forEach(e => tr.cells[e].style.display = 'none')
    if (td.length) {
      cell[OPDATE].innerHTML = cell[OPDATE].innerHTML.replace(' ', '<br>')
      cell[HN].innerHTML += '<br>' + cell[PATIENT].innerHTML.split(" ")[0]
      cell[DIAGNOSIS].innerHTML = string25(cell[DIAGNOSIS].innerHTML)
      cell[TREATMENT].innerHTML = string25(cell[TREATMENT].innerHTML)
      cell[EQUIPMENT].innerHTML = cell[EQUIPMENT].innerHTML.replace(/\<br\>/g, '')
      equipImage(cell[EQUIPMENT])
    }
  })

  maintbl.style.visibility = 'hidden'
  cssmenu.style.visibility = 'hidden'
  $capture.show()
  $capture.width(isMobile ? '500' : '1000')

  $dialogNotify.dialog({
    title: `<img src="css/pic/general/linenotify.png" width="40" style="float:left">
            <span style="font-size:20px">Qbook: ${USER}</span>`,
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    width: 270,
    height: 300,
    close: function() {
      capture.style.display = 'none'
      maintbl.style.visibility = 'visible'
      cssmenu.style.visibility = 'visible'
    }
  })
  $textarea.one('click', function() {
    $textarea.removeAttr('onfocus')
    $textarea.focus()
  })
  $('#buttonLINE').one('click', function() {
    $dialogNotify.find('.loader').show()
    // setTimeout to wait loader css rendering
    setTimeout(function() {
      $('#dialogNotify .loader').show()
      html2canvas(capture).then(function(canvas) {
        capture.style.display = 'none'
        $.post(LINENOTIFY, {
          'user': USER,
          'message': message,
          'image': canvas.toDataURL('image/png', 1.0)
        })
        $('#dialogNotify .loader').hide()
        $dialogNotify.dialog('close')
      })
    }, 100)
  })
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
