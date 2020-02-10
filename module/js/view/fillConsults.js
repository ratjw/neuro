
import { PATIENT } from "../control/const.js"
import { obj_2_ISO, nextdates } from "../util/date.js"
import { getSTAFFparsed, getStaffOncall, getLatestStart } from "../util/getSTAFFparsed.js"

// The staff who has latest startoncall date, is to start
export function fillConsults(tableID = 'maintbl')
{
  let table = document.getElementById(tableID),
    tableSaturdayRows = Array.from(table.querySelectorAll("tr.Saturday")),
    tableSaturdateRows = tableSaturdayRows.map(e => e.dataset.opdate),
    tableSaturdates = [...new Set(tableSaturdateRows)]

  // queuetbl have no opdated case
  if (!tableSaturdates.length) { return }

  let tableFirstSat = tableSaturdates[0],
    startStaff = getLatestStart()

  // no start date is set
  if (!startStaff) { return }

  let startFirstSat = getFirstSat(startStaff),
    allSaturdays = getAllSaturdays(startStaff, tableFirstSat, tableSaturdates),
    allLen = allSaturdays.length + 20,
    allStaffOncall = getAllStaffOncall(startStaff, allLen)

  getStaffOncall().forEach(staff => {
    if (staff.profile.skip) {
      allStaffOncall = truncateSkip(allSaturdays, allStaffOncall, staff)
    }
  })

  if (startFirstSat < tableFirstSat) {
    let i = allSaturdays.indexOf(tableFirstSat)

    allStaffOncall = allStaffOncall.slice(i)
  }
  else if (startFirstSat > tableFirstSat) {
    
  }

  let prevDate = tableFirstSat
  tableSaturdayRows.forEach((e, i) => {
    if (e.dataset.opdate !== prevDate) {
      prevDate = e.dataset.opdate
    }
    dataAttr(e.cells[PATIENT], allStaffOncall[i])
  })
}

function getAllSaturdays(startFirstSat, tableFirstSat, tableSaturdates)
{
  if (startFirstSat === tableFirstSat) {
    return tableSaturdates
  }
  if (startFirstSat < tableFirstSat) {
    let prevSaturdays = getPrevSaturdays(tableFirstSat, startFirstSat)

    return [...prevSaturdays, ...tableSaturdates]
  }

  let i = tableSaturdates.indexOf(startFirstSat)

  return tableSaturdates.slice(i)
}

function getAllStaffOncall(startStaff, allLen)
{
  let staffs = getStaffOncall(),
    staffnames = staffs.map(e => e.profile.staffname),
    stafflen = staffnames.length,
    allStaffOncall = [],
    startEnum = startStaff.profile.oncall,
    n = startEnum - 1,
    rotated = staffnames.map((e, i) => staffnames[(i + n) % stafflen])

  while (allStaffOncall.length < allLen) {
    allStaffOncall = [...allStaffOncall, ...rotated]
  }

  return allStaffOncall
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

function getPrevSaturdays(tableFirstSat, sat)
{
  let satDays = []

  while (sat < tableFirstSat) {
    satDays.push(sat)
    sat = nextdates(sat, 7)
  }

  return satDays
}

function truncateSkip(allSaturdays, allStaffOncall, staff)
{
  let staffname = staff.profile.staffname
  let skipSat = getSkipSat(allSaturdays, staff)

  for (let i=0; i<allStaffOncall.length; i++) {
    if (allStaffOncall[i] === staffname && skipSat.includes(allSaturdays[i])) {
      allStaffOncall.splice(i, 1)
    }
  }

  return allStaffOncall
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
