
import { OPDATE, DIAGNOSIS, LARGESTDATE } from "../control/const.js"
import { putThdate } from "../util/date.js"
import { findHoliday } from "../view/findHoliday.js"

// for row, and 1st column colors
const NAMEOFDAYFULL = ["Sunday", "Monday", "Tuesday",
  "Wednesday", "Thursday", "Friday", "Saturday"
]

export function rowDecoration(row, date)
{
  const  cells = row.cells,
   Dstyle = cells[DIAGNOSIS].style

  row.className = dayName(NAMEOFDAYFULL, date) || "nodate"
  cells[OPDATE].innerHTML = putThdate(date)

  if (date < LARGESTDATE) {
    const oldImg = Dstyle.backgroundImage
    const newImg = findHoliday(date)

    if (oldImg || newImg) { Dstyle.backgroundImage = newImg }
  }
}

function dayName(DAYNAME, date)
{
  return date === LARGESTDATE
    ? ""
    : DAYNAME[(new Date(date)).getDay()]
}
