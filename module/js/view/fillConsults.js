
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
    saturdayS = table.querySelectorAll("tr.Saturday"),
    saturdayA = Array.from(saturdayS),
    saturdateS = saturdayA.map(e => e.dataset.opdate),
    saturdates = [...new Set(saturdateS)],
    firstsat = saturdates.length && saturdates[0] || "",
    staffoncall = STAFF.filter(staff => (staff.oncall === "1")),
    slen = staffoncall.length,
    start = staffoncall.filter(staff => staff.startoncall)
      .reduce((a, b) => a.startoncall > b.startoncall ? a : b, 0),
    dateoncall = start.startoncall,
    staffstart = start.staffname,
    sindex = staffoncall.findIndex(e => e.staffname === staffstart),
    prevDate = saturdates[0]

  // find first date to begin
  while (dateoncall < firstsat) {
    dateoncall = nextdates(dateoncall, 7)
    sindex = (sindex + 1) % slen
  }

  saturdayA.forEach((e, i) => {
    if (e.dataset.opdate !== prevDate) {
      sindex = (sindex + 1) % slen
      prevDate = e.dataset.opdate
    }
    dataAttr(e.cells[PATIENT], staffoncall[sindex].staffname)
  })
}

function dataAttr(pointing, staffname)
{
  pointing.dataset.consult = staffname
  pointing.classList.add("consult")
}
