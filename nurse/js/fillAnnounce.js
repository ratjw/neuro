
// create td banner for announcement
export function fillAnnounce(pointing, count)
{
  pointing.classList.add("announce")
  pointing.setAttribute('colspan', count)
  for (let i=0; i<count-1; i++) {
    pointing = pointing.nextElementSibling
    pointing.style.display = "none"
  }
}
