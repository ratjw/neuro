
import { PATIENT } from "../control/const.js"
import { obj_2_ISO, nextdates } from "../util/date.js"
import {
  getSTAFFparsed, getStaffOncall, getLatestStart, getOncallExchange
} from "../util/getSTAFFparsed.js"

// The staff who has latest startoncall date, is to start
export function fillConsults(tableID = 'maintbl')
{
  const table = document.getElementById(tableID),
    tableSaturdayRows = Array.from(table.querySelectorAll("tr.Saturday")),
    tableSaturdateRows = tableSaturdayRows.map(e => e.dataset.opdate),
    tableSaturdates = [...new Set(tableSaturdateRows)]

  // queuetbl have no opdated case
  if (!tableSaturdates.length) { return }

  const tableFirstSat = tableSaturdates[0],
    startStaff = getLatestStart()

  // no start date is set
  if (!startStaff) { return }

  const startFirstSat = getFirstSat(startStaff),
    allSaturdays = getAllSaturdays(startFirstSat, tableSaturdates),
    allLen = allSaturdays.length + 20,
    oncallList = getOncallList(startStaff, allLen),
    staffsOncall = getStaffOncall()

  staffsOncall.forEach(staff => {
    if (staff.profile.skip) {
      staff["skipSat"] = getSkipSat(allSaturdays, staff)
    }
  })

  allSaturdays.forEach((sat, i) => {
    staffsOncall.forEach(staff => {
      const matchname = staff.profile.staffname === oncallList[i]
      const matchskip = staff.skipSat && staff.skipSat.includes(sat)
      if (matchname && matchskip) {
        oncallList.splice(i, 1)
      }
    })
  })

  allSaturdays.forEach((e, i) => allSaturdays[e] = oncallList[i])

  tableSaturdayRows.forEach(e => {
    dataAttr(e.cells[PATIENT], allSaturdays[e.dataset.opdate])
  })

  const exchange = getOncallExchange()
  Object.entries(exchange).forEach(([staffname, obj]) => {
    Object.values(obj).forEach(date => {
      tableSaturdayRows.some(row => {
        const rowdate = row.dataset.opdate
        if (rowdate === date) {
          const cell = row.cells[PATIENT]
          let original = cell.dataset.originConsult
          if (!original) {  cell.dataset.originConsult = cell.dataset.consult }
          dataAttr(cell, staffname)
        }
        else if (rowdate > date) {
          return true
        }
      })
    })
  })
}

function getAllSaturdays(startFirstSat, tableSaturdates)
{
  let satDays = [],
    sat = startFirstSat,
    last = tableSaturdates[tableSaturdates.length-1]

  do {
    satDays.push(sat)
    sat = nextdates(sat, 7)
  } while (sat <= last)

  return satDays
}

function getOncallList(startStaff, allLen)
{
  const staffs = getStaffOncall(),
    staffnames = staffs.map(e => e.profile.staffname),
    stafflen = staffnames.length,
    num = startStaff.profile.oncall - 1,
    rotated = staffnames.map((e, i) => staffnames[(i + num) % stafflen])

  let list = []
  while (list.length < allLen) {
    list = [...list, ...rotated]
  }

  return list
}

// get first Saturday from startDate
function getFirstSat(startStaff)
{
  let start = new Date(startStaff.startDate)

  if (start.getDay() !== 6) {
    start.setDate(start.getDate() - start.getDay() + 6)
  }
  
  return obj_2_ISO(start)
}

function getSkipSat(allSaturdays, staff)
{
  let skip = staff.profile.skip
  let skipSat = []

  Object.entries(skip).forEach(([key, val]) => {
    if (val.end > allSaturdays[0]) {
      let begin = obj_2_ISO(new Date(val.begin))
      let end = obj_2_ISO(new Date(val.end))
      let allSat = [...allSaturdays]
      let skips = allSat.filter(e => (e >= begin) && (e <= end))

      skipSat = [...skipSat, ...skips]
    }
  })

  return [...new Set(skipSat)]
}

function dataAttr(pointing, staffname)
{
  pointing.dataset.consult = staffname
  pointing.classList.add("consult")
}
