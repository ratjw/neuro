
import { DIAGNOSIS, TREATMENT } from "../control/const.js"
import { fillAnnounce } from "../view/fillAnnounce.js"
import { removeAnnounce } from "../view/removeAnnounce.js"

// create td banner for announcement
export function fillAnnouncement(table)
{
  Array.from(table.rows).forEach(e => {
    if (e.dataset.hn) {
      if (e.cells[DIAGNOSIS].classList.contains("announce")) {
        removeAnnounce(e.cells[DIAGNOSIS])
      }
      else if (e.cells[TREATMENT].classList.contains("announce")) {
        removeAnnounce(e.cells[TREATMENT])
      }
    } else {
      if (e.dataset.diagnosis) {
        fillAnnounce(e.cells[DIAGNOSIS])
      }
      else if (e.dataset.treatment) {
        fillAnnounce(e.cells[TREATMENT])
      }
    }
  })
}
