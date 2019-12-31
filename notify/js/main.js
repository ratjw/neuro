
import { sqlStart } from "./sqlupdate.js"
import { fillmain } from "./fill.js"
import { updateBOOK } from "./updateBOOK.js"
import { holiday } from './holiday.js'
import { ISOdate } from './date.js'
import { Alert } from "./util.js"
import { notifyLINE } from './notifyLINE.js'

// msec in a day
const OneDay = 24 * 60 * 60 * 1000

const now = new Date()
const timer = new Date()
timer.setHours(18, 0, 0)

let msecRemain = timer - now
if (msecRemain < 0)
  msecRemain = msecRemain + OneDay

setTimeout(run, msecRemain)

function run()
{
  setInterval(start, OneDay)
  start()
}

function start() {
  if (workday()) {
    sqlStart().then(response => {
      typeof response === "object"
      ? success(response)
      : failed(response)
    }).catch(error => alert(error.stack))
  }
}

function workday()
{
  let today = new Date(),
    todate = ISOdate(today)

  return !holiday(todate)
}

// Success return from server
function success(response) {
  updateBOOK(response)
  fillmain()

  notifyLINE()
}

// *** to do -> offline browsing by service worker ***
function failed(response) {
  let title = "Server Error",
    error = error + "<br><br>Response from server has no data"

  Alert(title, error + "No localStorage backup")
}
