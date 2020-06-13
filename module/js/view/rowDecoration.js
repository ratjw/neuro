
import { OPDATE, DIAGNOSIS, NAMEOFDAYFULL, MAXDATE } from "../control/const.js"
import { ISO_2_th } from "../util/date.js"
import { findHoliday } from "../setting/findHoliday.js"

export function rowDecoration(row, date)
{
  // set row background color
  row.className = dayName(NAMEOFDAYFULL, date) || "nodate"

  // change to Thai date
  row.cells[OPDATE].innerHTML = ISO_2_th(date)

  // show holiday at DIAGNOSIS column
  if (date < MAXDATE) {
    const holidayName = findHoliday(date)
    if (holidayName) {
      fillHoliday(row.cells[DIAGNOSIS], holidayName)
    }
  }
}

function dayName(DAYNAME, date)
{
  return date === MAXDATE
          ? ""
          : DAYNAME[(new Date(date)).getDay()]
}

export function fillHoliday(showHoli, holidayName)
{
  showHoli.classList.add("holiday")
  showHoli.dataset.holiday = holidayName
}
