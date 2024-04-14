
import { nextAll } from "../util/util.js"

// create td banner for announcement
export function fillAnnounce(pointing)
{
  pointing.classList.add("announce")
  if (!pointing.nextElementSibling.innerText) {
    pointing.setAttribute('colspan', nextAll(pointing).length+1)
    nextAll(pointing).forEach(e => e.style.display = "none")
  }
}
