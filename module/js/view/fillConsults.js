
import { PATIENT } from "../control/const.js"
import { objDate_2_ISOdate, nextdates } from "../util/date.js"
import { JSONparsedSTAFF } from "../util/JSONparsedSTAFF.js"

const UNIXEPOCH = '1970-01-01'

// The staff who has latest startoncall date, is to start
export function fillConsults(tableID = 'maintbl')
{
  let table = document.getElementById(tableID),
    saturdayRows = Array.from(table.querySelectorAll("tr.Saturday")),
    saturdateAll = saturdayRows.map(e => e.dataset.opdate),
    saturdates = [...new Set(saturdateAll)],
    firstsat = saturdates.length && saturdates[0] || "",
    staffs = JSONparsedSTAFF(),
    staffoncall = staffs.filter(staff => (staff.oncall > '0')),
    slen = staffoncall.length,
    startStaffs = staffoncall.filter(staff => staff.startoncall)

  if (!startStaffs.length) { return }

  let latestStart = getLatestStart(startStaffs),
    dateoncall = objDate_2_ISOdate(new Date(latestStart.startDate)),
    staffStart = latestStart.staffname,
    sindex = staffoncall.findIndex(e => e.staffname === staffStart)

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
    dataAttr(e.cells[PATIENT], staffoncall[sindex].staffname)
  })
}

// find latest entry within each staff (maxKey) and get the date value for startDate
// then store maxKey to startKey, store date value to startDate
// return the staff of the latest key
function getLatestStart(staffs)
{
  staffs.forEach(staff => {
    let maxKey = Math.max(...Object.keys(staff.startoncall))
    staff.startKey = maxKey
    staff.startDate = staff.startoncall[maxKey]
  })

  return staffs.reduce((a, b) => a.startKey > b.startKey ? a : b, 0)
}

function dataAttr(pointing, staffname)
{
  pointing.dataset.consult = staffname
  pointing.classList.add("consult")
}
