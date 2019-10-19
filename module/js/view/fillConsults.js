
import { PATIENT } from "../control/const.js"
import { nextdates } from "../util/date.js"
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
    saturdays = table.querySelectorAll("tr.Saturday"),
    firstsat = saturdays.length && saturdays[0].dataset.opdate || "",
    staffoncall = STAFF.filter(staff => (staff.oncall === "1")),
    slen = staffoncall.length,
    start = staffoncall.filter(staff => staff.startoncall)
      .reduce((a, b) => a.startoncall > b.startoncall ? a : b, 0),
    dateoncall = start.startoncall,
    staffstart = start.staffname,
    sindex = staffoncall.findIndex(e => e.staffname === staffstart)

  // find first date to begin
  while (dateoncall < firstsat) {
    dateoncall = nextdates(dateoncall, 7)
    sindex = (sindex + 1) % slen
  }

  Array.from(saturdays).forEach(e => {
    dataAttr(e.cells[PATIENT], staffoncall[sindex].staffname)
    sindex = (sindex + 1) % slen
  })
}

function dataAttr(pointing, staffname)
{
  pointing.dataset.consult = staffname
  pointing.classList.add("consult")
}
