
import { OPDATE, DIAGNOSIS, LARGESTDATE } from "../control/const.js"
import { putThdate } from "../util/date.js"
import { findHoliday } from "../view/findHoliday.js"

// for row, and 1st column colors
const NAMEOFDAYFULL = ["Sunday", "Monday", "Tuesday",
  "Wednesday", "Thursday", "Friday", "Saturday"
]

export function rowDecoration(row, date)
{
  const cells = row.cells,
    cellDiag = cells[DIAGNOSIS]

  row.className = dayName(NAMEOFDAYFULL, date) || "nodate"
  cells[OPDATE].innerHTML = putThdate(date)

  if (date < LARGESTDATE) {
    cellDiag.classList.add("holiday")
    cellDiag.dataset.holiday = findHoliday(date)
  }
}

function dayName(DAYNAME, date)
{
  return date === LARGESTDATE
    ? ""
    : DAYNAME[(new Date(date)).getDay()]
}
