
import { DIAGNOSIS, TREATMENT } from "../control/const.js"
import { nextAll } from "../util/util.js"
import { removeAnnounce } from "../view/removeAnnounce.js"

// create td banner for announcement
export function removeAnnouncement()
{
  let table = document.getElementById("maintbl")

  Array.from(table.rows).forEach(e => {
    if (e.dataset.hn) {
      if (e.cells[DIAGNOSIS].classList.contains("announce")) {
        removeAnnounce(e.cells[DIAGNOSIS])
      }
      if (e.cells[TREATMENT].classList.contains("announce")) {
        removeAnnounce(e.cells[TREATMENT])
      }
    } else {
      if (e.cells[DIAGNOSIS].classList.contains("announce")) {
        if (!e.dataset.diagnosis) {
          removeAnnounce(e.cells[DIAGNOSIS])
        }
      }
      if (e.cells[TREATMENT].classList.contains("announce")) {
        if (!e.dataset.treatment) {
          removeAnnounce(e.cells[TREATMENT])
        }
      }
    }
  })
}
