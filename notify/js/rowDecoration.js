
import { OPDATE, DIAGNOSIS, LARGESTDATE } from "./const.js"
import { putThdate } from "./date.js"
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
    let oldImg = cells[DIAGNOSIS].style.backgroundImage
    let newImg = findHoliday(date)

    if (oldImg) { cells[DIAGNOSIS].style.backgroundImage = newImg }
    else if (newImg) { cells[DIAGNOSIS].style.backgroundImage = newImg }
  }
}

function dayName(DAYNAME, date)
{
  return date === LARGESTDATE
    ? ""
    : DAYNAME[(new Date(date)).getDay()]
}
