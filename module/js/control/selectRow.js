
import { SELECTED, MOVECASE, COPYCASE } from "../control/const.js"
import { oneRowMenu } from '../control/oneRowMenu.js'

export function selectRow(event, target)
{
  let row = target.closest("tr"),
    selected = /selected/.test(row.getAttribute('class'))

  clearSelection()
  if (!selected) {
    row.classList.add(SELECTED)
    oneRowMenu()
  }
}

export function clearSelection()
{
  let table = document.querySelector("#maintbl"),
    ids = ["#addrow", "#postpone", "#moveCase", "#copyCase", "#history", "#delete"]

  ids.forEach(each => {
    let row = table.querySelector(`${each}`)
    if (row) {
      row.classList.add("disabled")
    }
  })

  table.querySelectorAll(`.${SELECTED}`).forEach(each => {
    each.classList.remove(SELECTED)
  })
}
