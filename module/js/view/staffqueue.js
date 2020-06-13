 
import { OPDATE } from "../control/const.js"
import { obj_2_ISO } from "../util/date.js"
import { getBOOK, getCONSULT } from "../util/updateBOOK.js"
import { isSplit } from "../util/util.js"
import { splitPane } from "./splitPane.js"
import { fillDatedCases, fillBlankDates } from "./fill.js"
import { fillConsults } from "./fillConsults.js"
import { scrolltoToday } from "./scrolltoThisCase.js"
import { fillExtHoliday } from "../view/fillExtHoliday.js"

export function staffqueue(staffname) {
  let mtable = document.getElementById("maintbl"),
    qtable = document.getElementById("queuetbl"),
    refill = (document.getElementById('titlename').innerHTML === staffname)

  document.getElementById('titlename').innerHTML = staffname
  if (!isSplit()) { splitPane(mtable, qtable) }

  if (staffname === "Consults") {
    const consult = getCONSULT(),
      until = obj_2_ISO(new Date()),

    date = fillDatedCases(qtable, consult)

    fillBlankDates(qtable, date, until)
  } else {
    const book = getBOOK().filter(e => e.staffname === staffname)

    fillDatedCases(qtable, book)
    reNumberNodateRows()
  }

  fillExtHoliday(qtable)
  fillConsults('queuetbl')
  if (!qtable.closest('div').scrollTop && !refill) { scrolltoToday('queuetbl') }
}

function reNumberNodateRows()
{
  let queuetbl = document.getElementById('queuetbl'),
    nodates = Array.from(queuetbl.querySelectorAll('tr')).filter(e => e.className === 'nodate')

  nodates.forEach((row, i) => {
    row.cells[OPDATE].dataset.number = i + 1
  })

}