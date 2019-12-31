
import { sqlStart } from "./sqlupdate.js"
import { fillmain } from "./fill.js"
import { updateBOOK } from "./updateBOOK.js"
import { Alert } from "./util.js"
import { notifyLINE } from './notifyLINE.js'

// msec in a day
const OneDay = 24 * 60 * 60 * 1000

const timer = new Date;
timer.setHours(18, 0, 0); // 6pm
let msecRemain = ((timer - now) / 1000)
if (msecRemain < 0)
  msecRemain = msecRemain + (24 * 60 * 60 * 1000)

setTimeout(run, secondsRemain)

function run()
{
  setInterval(start, OneDay)
}

function start() {
  sqlStart().then(response => {
    typeof response === "object"
    ? success(response)
    : failed(response)
  }).catch(error => alert(error.stack))
}

// Success return from server
function success(response) {

  document.getElementById("wrapper").style.display = "block"
  document.getElementById("mainwrapper").style.height = window.innerHeight
    - document.getElementById("cssmenu").style.height

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
