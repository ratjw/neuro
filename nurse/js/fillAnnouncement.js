
import { DIAGNOSIS, TREATMENT } from "./const.js"
import { fillAnnounce } from "./fillAnnounce.js"
import { nextAll } from "./function.js"

// create td banner for announcement
export function fillAnnouncement()
{
  const table = document.querySelector("#tbl")
  const count = nextAll(table.rows[0].cells[DIAGNOSIS]).length

  Array.from(table.rows).forEach(e => {
    if (e.querySelector("th")) return

    if (!e.dataset.hn) {
      if (e.dataset.treatment) {
        fillAnnounce(e.cells[TREATMENT], count)
        if (e.dataset.diagnosis) {
          fillAnnounce(e.cells[DIAGNOSIS], 1)
        }
      } else {
        if (e.dataset.diagnosis) {
          fillAnnounce(e.cells[DIAGNOSIS], count + 1)
        }
      }
    }
  })
}
