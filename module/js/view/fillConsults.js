
import { PATIENT } from "../control/const.js"
import { objDate_2_ISOdate, nextdates } from "../util/date.js"
import { STAFF } from "../util/updateBOOK.js"

// refill after deleted or written over
export function showStaffOnCall(opdate)
{
  if (new Date(opdate).getDay() === 6) {
    fillConsults()
  }
}

// The staff who has latest startoncall date, is to start
export function fillConsults(tableID = 'maintbl')
{
  let table = document.getElementById(tableID),
    saturdayRows = Array.from(table.querySelectorAll("tr.Saturday")),
    saturdateAll = saturdayRows.map(e => e.dataset.opdate),
    saturdates = [...new Set(saturdateAll)],
    firstsat = saturdates.length && saturdates[0] || "",
    staffoncall = STAFF.filter(staff => (staff.oncall > '0')),
    slen = staffoncall.length,
    latestStart = getStartoncall(staffoncall),
    dateoncall = latestStart.startoncall,
    staffstart = latestStart.staffname,
    sindex = staffoncall.findIndex(e => e.staffname === staffstart)

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
    // TypeError: staffoncall[sindex] is undefined ???
  })
}

function getStartoncall(staffoncall)
{
  let staffs = [...staffoncall]

  return staffs.filter(staff => staff.startoncall && staff.startoncall.date)
            .reduce((a, b) => a.startoncall > b.startoncall ? a : b, 0)
}

function dataAttr(pointing, staffname)
{
  pointing.dataset.consult = staffname
  pointing.classList.add("consult")
}
