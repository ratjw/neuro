
import { postData, MYSQLIPHP } from "./fetch.js"
import { fillmain } from "./fill.js"
import { updateBOOK } from "./updateBOOK.js"
import { holiday } from './holiday.js'
import { Alert } from "./util.js"
import { ISOdate, nextdates } from './date.js'
import { sendNotifyLINE } from './sendNotifyLINE.js'

export function notifyLINE()
{

  const today = new Date(),
    day = today.getDay(),
    todate = ISOdate(today),
    weekEnd = day === 6 || day === 0,
    isHoliday = holiday(todate)

  if (weekEnd || isHoliday) { return }
  start()
}

function start() {
  postData(MYSQLIPHP, "start=''").then(response => {
    typeof response === "object"
    ? success(response)
    : failed(response)
  }).catch(error => alert(error.stack))
}

// Success fetch data from server
function success(response) {
  updateBOOK(response)
  fillmain()
  sendNotify()
}

function failed(response) {
  let title = "Server Error",
    error = error + "<br><br>Response from server has no data"

  Alert(title, error + "No localStorage backup")
}

function sendNotify()
{
  const today = new Date(),
    day = today.getDay(),
    todate = ISOdate(today),
    tomorrow = nextdates(todate, 1),
    thisSaturday = getDayOfThisWeek(6),
    nextMonday = getDayOfNextWeek(1),
    nextSaturday = getDayOfNextWeek(6),
    Friday = day === 5,
    begindate = Friday ? nextMonday : tomorrow,
    enddate = Friday ? nextSaturday : thisSaturday,
    message = Friday ? 'สัปดาห์หน้า' : 'สัปดาห์นี้',
    selectedRows = selectRows(begindate, enddate)

  selectedRows.forEach(e => e.classList.add('selected'))
  sendNotifyLINE(message)
}

function getDayOfThisWeek(dayOfWeek)
{
  const now = new Date(),
    theDay = now.setDate(now.getDate() + (dayOfWeek + 7 - now.getDay()) % 7)

  return ISOdate(new Date(theDay))
}

function getDayOfNextWeek(dayOfWeek)
{
  const now = new Date(),
    theDay = now.setDate(now.getDate() + dayOfWeek + 7 - now.getDay())

  return ISOdate(new Date(theDay))
}

function selectRows(begindate, enddate)
{
  const maintbl = document.querySelector('#maintbl'),
    rows = maintbl.querySelectorAll('tr')

  return [...rows].filter(row => {
    let opdate = row.dataset.opdate
    return opdate >= begindate && opdate < enddate 
  })
}
