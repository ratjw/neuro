
import { OPDATE, DIAGNOSIS, LARGESTDATE } from "../control/const.js"
import { putThdate } from "../util/date.js"
import { findHoliday } from "./findHoliday.js"

// for row, and 1st column colors
const NAMEOFDAYFULL = ["Sunday", "Monday", "Tuesday",
  "Wednesday", "Thursday", "Friday", "Saturday"
]

export function rowDecoration(row, date)
{
  let  cells = row.cells

  row.className = dayName(NAMEOFDAYFULL, date) || "nodate"
  cells[OPDATE].innerHTML = putThdate(date)

  if (date < LARGESTDATE) {
    let img = findHoliday(date)
    if (img) { cells[DIAGNOSIS].style.backgroundImage = img }
  }
}

function dayName(DAYNAME, date)
{
  return date === LARGESTDATE
    ? ""
    : DAYNAME[(new Date(date)).getDay()]
}
