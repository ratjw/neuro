
import { nextAll } from "../util/util.js"

// create td banner for announcement
export function fillAnnounce(pointing)
{
  if (!pointing.closest("tr").dataset.hn) {
    pointing.classList.add("announce")
    pointing.setAttribute('colspan', nextAll(pointing).length+1)
    nextAll(pointing).forEach(e => e.style.display = "none")
  }
}
