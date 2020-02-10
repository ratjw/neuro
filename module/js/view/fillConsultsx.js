
import { PATIENT } from "../control/const.js"
import { obj_2_ISO, nextdates } from "../util/date.js"
import { getLatestKey, getLatestValue } from "../util/util.js"
import { getSTAFFparsed } from "../util/getSTAFFparsed.js"

// The staff who has latest startoncall date, is to start
export function fillConsults(tableID = 'maintbl')
{
  let table = document.getElementById(tableID),
    saturdayRows = Array.from(table.querySelectorAll("tr.Saturday")),
    saturdateAll = saturdayRows.map(e => e.dataset.opdate),
    saturdates = [...new Set(saturdateAll)],
    firstsat = saturdates.length && saturdates[0] || "",
    staffs = getSTAFFparsed(),
    staffoncall = staffs.filter(staff => (staff.profile.oncall > 0)),
    slen = staffoncall.length,
    startStaffs = staffoncall.filter(staff => staff.profile.start)

  if (!startStaffs.length) { return }

  let latestStart = getLatestStart(startStaffs),
    dateoncall = obj_2_ISO(new Date(latestStart.startDate)),
    staffStart = latestStart.profile.staffname,
    sindex = staffoncall.findIndex(e => e.profile.staffname === staffStart)

  // queuetbl have no opdated case
  if (!firstsat) return

  // wrong staff setting
  if (sindex === -1) return

  // find dateoncall before firstsat
  while (dateoncall > firstsat) {
    dateoncall = nextdates(dateoncall, -7 * slen)
  }

  // find first date to begin
  while (dateoncall < firstsat) {
    dateoncall = nextdates(dateoncall, 7)
    sindex = (sindex + 1) % slen
  }

  let prevDate = firstsat
  saturdayRows.forEach((e, i) => {
    if (e.dataset.opdate !== prevDate) {
      sindex = (sindex + 1) % slen
      prevDate = e.dataset.opdate
    }
    dataAttr(e.cells[PATIENT], staffoncall[sindex].profile.staffname)
  })
}

// find latest entry within each staff (maxKey) and get the date value for startDate
// then store maxKey to startKey, store date value to startDate
// return the staff of the latest key
function getLatestStart(staffs)
{
  staffs.forEach(staff => {
    staff.startKey = getLatestKey(staff.profile.start)
    staff.startDate = getLatestValue(staff.profile.start)
  })

  return staffs.reduce((a, b) => a.startKey > b.startKey ? a : b, 0)
}

function dataAttr(pointing, staffname)
{
  pointing.dataset.consult = staffname
  pointing.classList.add("consult")
}
