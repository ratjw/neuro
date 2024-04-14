
import { DIAGNOSIS, TREATMENT } from "../control/const.js"
import { fillAnnounce } from "../view/fillAnnounce.js"

// create td banner for announcement
export function fillAnnouncement()
{
  let table = document.getElementById("maintbl")

  Array.from(table.rows).forEach(e => {
    if (!e.dataset.hn) {
      if (e.dataset.diagnosis) {
        fillAnnounce(e.cells[DIAGNOSIS])
      }
      if (e.dataset.treatment) {
        fillAnnounce(e.cells[TREATMENT])
      }
    }
  })
}
