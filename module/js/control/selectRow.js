
import { SELECTED, MOVECASE, COPYCASE } from "../control/const.js"
import { oneRowMenu } from '../control/oneRowMenu.js'

export function selectRow(event, target)
{
  let row = target.closest("tr"),
    selected = new RegExp(SELECTED).test(row.getAttribute('class'))

  clearSelection()
  if (!selected) {
    row.classList.add(SELECTED)
    oneRowMenu()
  }
}

// All ids are the items in cssmenu
export function clearSelection()
{
  let table = document.querySelector("#maintbl"),
    menu = document.querySelector("#cssmenu"),
    ids = ["#addrow", "#postpone", "#moveCase", "#copyCase", "#history", "#delete", "#setholiday"]

  ids.forEach(each => {
    let row = menu.querySelector(`${each}`)
    if (row) {
      row.classList.add("disabled")
    }
  })

  table.querySelectorAll(`.${SELECTED}`).forEach(each => {
    each.classList.remove(SELECTED)
  })
}
