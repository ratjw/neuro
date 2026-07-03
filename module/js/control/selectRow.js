
import { SELECTED, MOVECASE, COPYCASE } from "../control/const.js"
import { oneRowMenu } from '../control/oneRowMenu.js'

const ONEROW = ["#addrow", "#postpone", "#moveCase", "#copyCase", "#history", 
                 "#delete", "#setholyday"]

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
  ONEROW.forEach(each => {
    let row = document.querySelector(`${each}`)
    if (row) {
      row.classList.add("disabled")
    }
  })

  document.querySelectorAll(`.${SELECTED}`).forEach(each => {
    each.classList.remove(SELECTED)
  })
}
