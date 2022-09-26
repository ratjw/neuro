
import { HN, SELECTED } from "../control/const.js"
import { clearSelection } from "../control/selectRow.js"
import { createEditcell } from "../control/edit.js"
import { blankRowData } from "../view/fillNewrowData.js"

export function addnewrow() {
  let row = document.querySelector(`.${SELECTED}`),
    tableID = row.closest('table').id,
    clone = row.cloneNode(true),
    cells = clone.querySelectorAll("td")

  clone.querySelectorAll("td:not(:first-child)").forEach(e => e.innerHTML = "")
  row.classList.remove(SELECTED)
  row.after(clone)
  clearSelection()
  createEditcell(cells[HN])
  blankRowData(clone, row.dataset.opdate)
}
