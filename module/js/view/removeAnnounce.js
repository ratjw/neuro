
export function removeAnnounce(pointing)
{
  const nextSib = pointing.getAttribute('colspan') - 1
  let point = pointing

  point.classList.remove("announce")
  point.setAttribute('colspan', 1)
  for (let i=0; i<nextSib; i++) {
    point = point.nextElementSibling
    point.style.display = ""
  }
}
