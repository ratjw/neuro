 
import { OPDATE } from "../control/const.js"
import { ISOdate } from "../util/date.js"
import { BOOK, CONSULT } from "../util/updateBOOK.js"
import { isSplit } from "../util/util.js"
import { splitPane } from "./splitPane.js"
import { fillDatedCases, fillBlankDates, makenextrow } from "./fill.js"
import { fillConsults } from "./fillConsults.js"
import { scrolltoToday } from "./scrolltoThisCase.js"

export function staffqueue(staffname) {
  let mtable = document.getElementById("maintbl"),
    qtable = document.getElementById("queuetbl"),
    refill = (document.getElementById('titlename').innerHTML === staffname),
    book,
    date,
    until

  document.getElementById('titlename').innerHTML = staffname
  if (!isSplit()) { splitPane(mtable, qtable) }

  if (staffname === "Consults") {
    book = CONSULT
    until = ISOdate(new Date())

    date = fillDatedCases(qtable, book)

    fillBlankDates(qtable, date, until)
  } else {
    book = BOOK.filter(e => e.staffname === staffname)
    fillDatedCases(qtable, book)
    reNumberNodateRows()
  }

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