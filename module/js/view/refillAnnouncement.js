
import { DIAGNOSIS, TREATMENT } from "../control/const.js"
import { nextAll } from "../util/util.js"
import { fillAnnounce } from "../view/fillAnnounce.js"
import { removeAnnounce } from "../view/removeAnnounce.js"

// create td banner for announcement
export function refillAnnouncement()
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
      e.dataset.diagnosis ? fillAnnounce(dx)
                            : removeAnnounce(dx)
      e.dataset.treatment ? fillAnnounce(rx)
                            : removeAnnounce(rx)
    }
  })
}
