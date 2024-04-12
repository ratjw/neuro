
import { DIAGNOSIS, TREATMENT } from "../control/const.js"
import { nextAll } from "../util/util.js"
import { removeAnnounce } from "../view/removeAnnounce.js"

// create td banner for announcement
export function removeAnnouncement()
{
  let table = document.getElementById("maintbl")

  Array.from(table.rows).forEach(e => {
    let dx = e.cells[DIAGNOSIS]
    let rx = e.cells[TREATMENT]

    if (e.dataset.hn) {
      if (dx.classList.contains("announce")) {
        removeAnnounce(dx)
      }
      if (rx.classList.contains("announce")) {
        removeAnnounce(rx)
      }
    } else {
      if (dx.classList.contains("announce")) {
        if (!e.dataset.diagnosis) {
          removeAnnounce(dx)
        }
      }
      if (rx.classList.contains("announce")) {
        if (!e.dataset.treatment) {
          removeAnnounce(rx)
        }
      }
    }
  })
}
