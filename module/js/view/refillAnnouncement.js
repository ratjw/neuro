
import { DIAGNOSIS, TREATMENT } from "../control/const.js"
import { nextAll } from "../util/util.js"
import { fillAnnounce } from "../view/fillAnnounce.js"
import { removeAnnounce } from "../view/removeAnnounce.js"

// create td banner for announcement
export function refillAnnouncement()
{
  let table = document.getElementById("maintbl")
  let count = nextAll(table.rows[0].cells[DIAGNOSIS]).length

  Array.from(table.rows).forEach(e => {
    if (e.querySelector("th")) return

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
      e.dataset.diagnosis
        ? dx.classList.contains("announce")
          ? null
          : fillAnnounce(dx, count + 1)
        : dx.classList.contains("announce")
          ? removeAnnounce(dx)
          : null
      e.dataset.treatment
        ? rx.classList.contains("announce")
          ? null
          : fillAnnounce(rx, count)
        : rx.classList.contains("announce")
          ? removeAnnounce(rx)
          : null
    }
  })
}
