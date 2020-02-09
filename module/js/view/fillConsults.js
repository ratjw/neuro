
import { PATIENT } from "../control/const.js"
import { objDate_2_ISOdate, nextdates } from "../util/date.js"
import { getSTAFFparsed, getStaffOncall, getLatestStart } from "../util/getSTAFFparsed.js"

// The staff who has latest startoncall date, is to start
export function fillConsults(tableID = 'maintbl')
{
  let table = document.getElementById(tableID),
    saturdayRows = Array.from(table.querySelectorAll("tr.Saturday")),
    saturdateRows = saturdayRows.map(e => e.dataset.opdate),
    saturdates = [...new Set(saturdateRows)],
    satlength = saturdates.length

  // queuetbl have no opdated case
  if (!satlength) { return }

  let firstsat = saturdates[0],
    lastsat = saturdates[saturdates.length-1],
    startStaff = getLatestStart()

  // no start date is set
  if (!startStaff) { return }

  let startDate = objDate_2_ISOdate(new Date(startStaff.startDate)),
    startName = startStaff.profile.staffname,
    startEnum = startStaff.profile.oncall,
    start = new Date(startDate)

  // get first Saturday from startDate
  if (start.getDay() !== 6) {
    start.setDate(start.getDate() - start.getDay() + 6)
  }

  let saturdays = [],
    staffs = getStaffOncall(),
    staffnames = staffs.map(e => e.profile.staffname),
    stafflen = staffnames.length,
    startsat = objDate_2_ISOdate(start),
    sat = startsat

  if (firstsat < startsat) {
    while (firstsat < sat) {
      sat = nextdates(sat, 7)
      startEnum = (stafflen + startEnum - 1) % stafflen
    }
  } else {
    while (sat < firstsat) {
      saturdays.push(sat)
      sat = nextdates(sat, 7)
    }
  }

  let allSaturdays = saturdays.length ? [...saturdays, ...saturdates] : saturdates,
    allLen = allSaturdays.length,
    lenx = allLen + 20,
    allStaffOncall = [],
    n = startEnum - 1,
    rotated = staffnames.map((e, i) => staffnames[(i + n) % stafflen])

  while (allStaffOncall.length < lenx) {
    allStaffOncall = [...allStaffOncall, ...rotated]
  }

  staffs.forEach(staff => {
    if (staff.profile.skip) {
      allStaffOncall = truncateSkip(allSaturdays, allStaffOncall, staff)
    }
  })

  let i = allSaturdays.indexOf(firstsat)
  let prevDate = firstsat

  allStaffOncall = allStaffOncall.slice(i)
  saturdayRows.forEach((e, i) => {
    if (e.dataset.opdate !== prevDate) {
      prevDate = e.dataset.opdate
    }
    dataAttr(e.cells[PATIENT], allStaffOncall[i])
  })
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
      delete skip[key]
    }
  })
  Object.entries(skip).forEach(([key, val]) => {
    let begin = val.begin
    let end = val.end
    let allSat = [...allSaturdays]
    let skipped = allSat.filter(e => (e >= begin) && (e <= end))

    skipSat = [...skipSat, ...skipped]
  })

  return [...new Set(skipSat)]
}

function dataAttr(pointing, staffname)
{
  pointing.dataset.consult = staffname
  pointing.classList.add("consult")
}
