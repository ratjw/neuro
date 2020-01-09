
import { postData, MYSQLIPHP } from "./fetch.js"
import { fillmain } from "./fill.js"
import { updateBOOK } from "./updateBOOK.js"
import { holiday } from './holiday.js'
import { Alert } from "./util.js"
import { ISOdate, nextdates } from './date.js'
import { sendNotifyLINE } from './sendNotifyLINE.js'

export function notifyLINE()
{
  let today = new Date(),
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
    begindate = Friday ? nextMonday : tomorrow,
    enddate = Friday ? nextSatdate : thisSatdate

  selectCases(rows, begindate, enddate)
  sendNotifyLINE(Friday)
}

function failed(response) {
  let title = "Server Error",
    error = error + "<br><br>Response from server has no data"

  Alert(title, error + "No localStorage backup")
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
