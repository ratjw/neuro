
import { OPDATE, DIAGNOSIS, LARGESTDATE } from "../control/const.js"
import { putThdate } from "../util/date.js"
import { findHoliday } from "../view/findHoliday.js"

// for row, and 1st column colors
const NAMEOFDAYFULL = ["Sunday", "Monday", "Tuesday",
  "Wednesday", "Thursday", "Friday", "Saturday"
]
const COMPENSATE = "ชดเชย"
const ENDYEAR = "วันสิ้นปี"
const NEWYEAR = "วันขึ้นปีใหม่"
const SONGKRAN = "วันสงกรานต์"

export function rowDecoration(row, date)
{
  const cells = row.cells,
    cellDiag = cells[DIAGNOSIS],
    dayofweek = (new Date(date)).getDay(),
    Mon = dayofweek === 1,
    Tue = dayofweek === 2

  row.className = dayName(NAMEOFDAYFULL, date) || "nodate"
  cells[OPDATE].innerHTML = putThdate(date)

  if (date < LARGESTDATE) {
    if (holidayName) {
      cellDiag.classList.add("holiday")
      cellDiag.dataset.holiday = findHoliday(date)
    }
    else if (row.rowIndex > 2) {
      if (Mon) { compensateMon(row) }
      else if (Tue) { compensateTue(row) }
    }
  }
}

function dayName(DAYNAME, date)
{
  return date === LARGESTDATE
    ? ""
    : DAYNAME[(new Date(date)).getDay()]
}

function compensateMon(row)
{
  const Sunday = row.previousElementSibling.previousElementSibling
    Satday = Sunday.previousElementSibling,
    cellSun = Sunday.cells[DIAGNOSIS],
    cellSat = Satday.cells[DIAGNOSIS],
    cellDiag = cells[DIAGNOSIS],
    holidayName = ""

  if (cellSat.className.includes("holiday")) {
    holidayName = cellSat.dataset.holiday
  }
    cellDiag.classList.add("holiday")
    cellDiag.dataset.holiday = COMPENSATE + holidayName
}

function compensateTue(row)
{
  const Sunday = row.previousElementSibling.previousElementSibling.previousElementSibling
    Satday = Sunday.previousElementSibling,
    cellSun = Sunday.cells[DIAGNOSIS],
    cellSat = Satday.cells[DIAGNOSIS],
    cellDiag = cells[DIAGNOSIS]

  if ((holidayName === ENDYEAR) || (holidayName === NEWYEAR)) {
    const Tuesday = Monday.previousElementSibling
    if (!Tuesday) { return }
    const cellTue = Tuesday.cells[DIAGNOSIS]
    cellTue.classList.add("holiday")
    cellTue.dataset.holiday = COMPENSATE + holidayName
  }
  else if (holidayName !== SONGKRAN) {
    cellMon.classList.add("holiday")
    cellMon.dataset.holiday = COMPENSATE + holidayName
  }
}
