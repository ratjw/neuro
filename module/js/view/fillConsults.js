
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
    allSaturdays = getAllSaturdays(startFirstSat, tableSaturdates),
    allLen = allSaturdays.length + 20,
    allStaffOncall = getAllStaffOncall(startStaff, allLen)

  getStaffOncall().forEach(staff => {
    if (staff.profile.skip) {
      allStaffOncall = truncateSkip(allSaturdays, allStaffOncall, staff)
    }
  })

  let dateStaffname = {}
  allSaturdays.forEach((e, i) => {
    dateStaffname[e] = allStaffOncall[i]
  })

  tableSaturdayRows.forEach(e => {
    dataAttr(e.cells[PATIENT], dateStaffname[e.dataset.opdate])
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
