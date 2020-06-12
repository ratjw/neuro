
import { OPDATE, DIAGNOSIS, NAMEOFDAYFULL, LARGESTDATE } from "../control/const.js"
import { ISO_2_th } from "../util/date.js"
import { findHoliday } from "../setting/findHoliday.js"

const COMPENSATE = "ชดเชย"
const NEWYEAR = "วันขึ้นปีใหม่"

// show holiday to that date row at DIAGNOSIS column
// every Mon, Tue: check back on Sat and Sun
// if found holiday, show COMPENSATE
export function rowDecoration(row, date)
{
  let cells = row.cells,
    cellDiag = cells[DIAGNOSIS],
    dayofweek = (new Date(date)).getDay(),
    Mon = dayofweek === 1,
    Tue = dayofweek === 2,
    holidayName = ""

  row.className = dayName(NAMEOFDAYFULL, date) || "nodate"
  cells[OPDATE].innerHTML = ISO_2_th(date)

  if (date < LARGESTDATE) {
    holidayName = findHoliday(date)
    if (holidayName) {
      fillHoliday(cellDiag, holidayName)
    }
    else if (row.rowIndex > 2) {
      if (Mon) {
        holidayName = compensateMon(row)
        if (holidayName) {
          fillHoliday(cellDiag, COMPENSATE + holidayName)
        }
      }
      else if (Tue) {
        holidayName = compensateTue(row)
        if (holidayName) {
          fillHoliday(cellDiag, COMPENSATE + holidayName)
        }
      }
    }
  }
}

function dayName(DAYNAME, date)
{
  return date === LARGESTDATE
          ? ""
          : DAYNAME[(new Date(date)).getDay()]
}

function fillHoliday(cellDiag, holidayName)
{
  cellDiag.classList.add("holiday")
  cellDiag.dataset.holiday = holidayName
}

function compensateMon(row)
{
  const Sunday = row.previousElementSibling.previousElementSibling,
    Satday = Sunday.previousElementSibling,
    cellSun = Sunday.cells[DIAGNOSIS],
    cellSat = Satday.cells[DIAGNOSIS]

  if (cellSat.className.includes("holiday")) {
    return cellSat.dataset.holiday
  } else if (cellSun.className.includes("holiday")) {
    return cellSun.dataset.holiday
  }
}

function compensateTue(row)
{
  const Sunday = row.previousElementSibling
                      .previousElementSibling
                        .previousElementSibling,
    cellSun = Sunday.cells[DIAGNOSIS]

  if (cellSun.dataset.holiday === NEWYEAR) {
    return cellSun.dataset.holiday
  }
}
