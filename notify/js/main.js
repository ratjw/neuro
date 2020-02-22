
import { notifyLINE } from './notifyLINE.js'

// msec in a day
const OneDay = 24 * 60 * 60 * 1000

// find 18.00 o'clock
const now = new Date()
const timer = new Date()
timer.setHours(18, 0, 0)

// find time to first start
let msecRemain = timer - now
if (msecRemain < 0)
  msecRemain = msecRemain + OneDay

// set timer to start at 18.00
//setTimeout(run, msecRemain)
notifyLINE()

function run()
{
  setInterval(notifyLINE, OneDay)
  notifyLINE()
}
