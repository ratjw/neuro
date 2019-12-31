
import { LARGESTDATE } from "./const.js"

// Make dialog box dialogAlert containing error message
export function Alert(title, message) {
  let $dialogAlert = $("#dialogAlert")

  $dialogAlert.css({
    "fontSize":" 14px",
    "textAlign" : "center"
  })
  $dialogAlert.html(message)
  $dialogAlert.dialog({
    title: title,
    closeOnEscape: true,
    modal: true,
    hide: 200,
    minWidth: 400,
    height: 230
  }).fadeIn();
}

export function string25(longtext)
{
  let result1 = stringChopper(longtext, 25),
    endresult = [],
    i = 0

  while ((i < 2) && (i < result1.length)) {
    endresult.push(result1[i])
    i++
  }

  return endresult.join('<br>')
}

export function string25_1(longtext)
{
   return stringChopper(longtext, 25)[0]
}

export function string50(longtext)
{
   return stringChopper(longtext, 50)[0]
}

export function stringChopper(longtext, width)
{
  let result1 = [],
   result2 = [],
   result3 = [],
   result4 = [],
   temp = ''

  if (!longtext) { return '' }
  longtext = longtext.replace(/ {1,}/g, ' ')
  result1 = longtext.split('<br>')
  result1.forEach(e => e.trim())
  result1.forEach(e => {
    if (e.length > width) {
      result2 = e.split(' ')
      result2.forEach(el => {
        temp += temp ? (' ' + el) : el
        if (temp.length > width) {
          if (temp.length <= (width + 5)) {
            result3.push(temp)
            temp = ''
          } else {
            if (width === 25) {
              result4 = temp.match(/(.{1,28})/g)
            } else if (width === 50) {
              result4 = temp.match(/(.{1,53})/g)
            }
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

  return result1
}
