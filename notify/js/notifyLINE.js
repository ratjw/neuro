
import { postData, MYSQLIPHP } from "./fetch.js"
import { fillmain } from "./fill.js"
import { updateBOOK } from "./updateBOOK.js"
import { holiday } from './holiday.js'
import { Alert } from "./util.js"
import { ISOdate, nextdates } from './date.js'
import { sendNotifyLINE } from './sendNotifyLINE.js'

export function notifyLINE()
{
  let maintbl = document.querySelector('#maintbl'),
    rows = maintbl.querySelectorAll('tr'),
    today = new Date(),
    day = today.getDay(),
    todate = ISOdate(today),
    tomorrow = nextdates(todate, 1),
    thisSatday = today.setDate(today.getDate() + 6 - today.getDay() % 7),
    thisSatdate = ISOdate(new Date(thisSatday)),
    nextMonday = nextdates(thisSatdate, 2),
    nextSatdate = nextdates(thisSatdate, 7),
    Friday = day === 5,
    weekEnd = day === 6 || day === 0,
    begindate = Friday ? nextMonday : tomorrow,
    enddate = Friday ? nextSatdate : thisSatdate,
    isHoliday = holiday(todate)

  if (weekEnd || isHoliday) { return }
  if (!inMemory(rows, begindate)) { start() }
  selectCases(rows, begindate, enddate)
  sendNotifyLINE(Friday)
}

function inMemory(rows, begindate)
{
  let opdates = [...rows].map(e => e.dataset.opdate)

  return opdates.includes(begindate)
}

function selectCases(rows, begindate, enddate)
{
  rows.forEach(e => {
    let edate = e.dataset.opdate
    if (edate >= begindate && edate < enddate) {
      e.classList.add('selected')
    }
  })
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

  notifyLINE()
}

function failed(response) {
  let title = "Server Error",
    error = error + "<br><br>Response from server has no data"

  Alert(title, error + "No localStorage backup")
}
