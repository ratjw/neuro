
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
  setInterval(notifyLINE, OneDay)
  notifyLINE()
}
