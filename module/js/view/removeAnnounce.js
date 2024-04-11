
import { nextAll } from "../util/util.js"

// create td banner for announcement
export function removeAnnounce(pointing)
{
  pointing.classList.remove("announce")
  pointing.setAttribute('colspan', 1)
  nextAll(pointing).forEach(e => e.style.display = "")
}
