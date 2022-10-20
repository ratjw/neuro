
import { OPDATE, MAXDATE, NODATE, NAMEOFDAYFULL } from "../control/const.js"
import { ISO_2_th } from "../util/date.js"

export function rowDecoration(row, date)
{
  // set row background color
  row.className = date === MAXDATE
                  ? NODATE
                  : NAMEOFDAYFULL[(new Date(date)).getDay()]

  // change to Thai date
  row.cells[OPDATE].innerHTML = ISO_2_th(date)
}
