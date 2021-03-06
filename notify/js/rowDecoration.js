
import { OPDATE, DIAGNOSIS, LARGESTDATE } from "./const.js"
import { putThdate } from "./date.js"
import { findHoliday } from "./findHoliday.js"

// for row, and 1st column colors
const NAMEOFDAYFULL = ["Sunday", "Monday", "Tuesday",
  "Wednesday", "Thursday", "Friday", "Saturday"
]
const COMPENSATE = "ชดเชย"
const NEWYEAR = "วันขึ้นปีใหม่"

export function rowDecoration(row, date)
{
  let cells = row.cells,
    cellDiag = cells[DIAGNOSIS],
    dayofweek = (new Date(date)).getDay(),
    Mon = dayofweek === 1,
    Tue = dayofweek === 2,
    holidayName = ""

  row.className = dayName(NAMEOFDAYFULL, date) || "nodate"
  cells[OPDATE].innerHTML = putThdate(date)

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
