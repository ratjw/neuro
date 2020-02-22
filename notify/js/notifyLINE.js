
import { postData, MYSQLIPHP } from "./fetch.js"
import { fillmain } from "./fill.js"
import { fillConsults } from "./fillConsults.js"
import { updateBOOK } from "./updateBOOK.js"
import { holiday } from './holiday.js'
import { obj_2_ISO, nextdates } from './date.js'
import { sendNotifyLINE } from './sendNotifyLINE.js'

export async function notifyLINE()
{
  const beginEnd = getBeginEnd(),
    thisday = beginEnd.thisday,
    begindate = beginEnd.begindate,
    enddate = beginEnd.enddate,
    message = beginEnd.message

  // No notify on Sunday nad Saturday
  if (!(thisday % 6)) { return }
  if (await start(begindate, enddate)) {
    fillmain(begindate, enddate)
    fillConsults()
    selectRows(begindate, enddate).forEach(e => e.classList.add('selected'))
    sendNotifyLINE(message)
  }
}

export function getBeginEnd()
{
  const today = new Date(),
    day = today.getDay(),
    todate = obj_2_ISO(today),
    tomorrow = nextdates(todate, 1),
    thisSaturday = getDayInSameWeek(today, 6),
    nextMonday = getDayInNextWeek(today, 1),
    nextSaturday = getDayInNextWeek(today, 6),
    thisWeek = day < 5
  
  return {
    thisday: day,
    begindate: thisWeek ? tomorrow : nextMonday,
    enddate: thisWeek ? thisSaturday : nextSaturday,
    message: thisWeek ? 'สัปดาห์นี้' : 'สัปดาห์หน้า'
  }
}

async function start(begindate, enddate)
{
  let response = await postData(MYSQLIPHP, {
    "begindate": begindate,
    "enddate": enddate
  })
  
  if (typeof response === "object") {
    updateBOOK(response)
    return true
  } else {
    alert(`Database Error\n\n${response}`)
  }
}

function getDayInSameWeek(today, dayOfWeek)
{
  let d = new Date(today),
    date = d.setDate(d.getDate() + (dayOfWeek + 7 - d.getDay()) % 7)

  return obj_2_ISO(new Date(date))
}

function getDayInNextWeek(today, dayOfWeek)
{
  let d = new Date(today),
    date = d.setDate(d.getDate() + dayOfWeek + 7 - d.getDay())

  return obj_2_ISO(new Date(date))
}

function selectRows(begindate, enddate)
{
  const maintbl = document.querySelector('#maintbl'),
    rows = maintbl.querySelectorAll('tr')

  return [...rows].filter(row => {
    let opdate = row.dataset.opdate
    return opdate >= begindate && opdate <= enddate 
  })
}
