
import { DIAGNOSIS } from "../control/const.js"
import { findHoliday } from "../setting/findHoliday.js"

const COMPENSATE = "ชดเชย"
const NEWYEAR = "วันขึ้นปีใหม่"

export function fillCompensate(row, date, holidayName)
{
  let cells = row.cells,
    showHoli = cells[DIAGNOSIS],
    dayofweek = (new Date(date)).getDay(),
    Sat = dayofweek === 6,
    Sun = dayofweek === 0,
    Mon = dayofweek === 1,
    Tue = dayofweek === 2

  if (holidayName) {
    fillHoliday(showHoli, holidayName)
  }
  else if (row.rowIndex > 2) {
    if (Mon) {
      holidayName = compensateMon(row)
      if (holidayName) {
        fillHoliday(showHoli, COMPENSATE + holidayName)
      }
    }
    else if (Tue) {
      holidayName = compensateTue(row)
      if (holidayName) {
        fillHoliday(showHoli, COMPENSATE + holidayName)
      }
    }
  }
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
