
import { notifyLINE } from './notifyLINE.js'

// msec in a day
const OneDay = 24 * 60 * 60 * 1000

// find 18.00 o'clock
const now = new Date()
const sixPM = new Date()

sixPM.setHours(18, 0, 0)

// find time to first start
let msecRemain = sixPM - now
if (msecRemain < 0) {
  msecRemain = msecRemain + OneDay
}
console.log("setTimeout " + msecRemain)

// set timer to start at 18.00
setTimeout(function() {
  setInterval(notifyLINE, OneDay)
  notifyLINE()
  console.log(`setInterval ${new Date()} + ${msecRemain} msec`)
}, msecRemain)
