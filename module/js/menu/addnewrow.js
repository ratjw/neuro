
import { HN } from "../control/const.js"
import { clearSelection } from "../control/selectRow.js"
import { createEditcell } from "../control/edit.js"
import { blankRowData } from "../view/fillNewrowData.js"

export function addnewrow() {
  let row = document.querySelector(".selected"),
    tableID = row.closest('table').id,
    clone = row.cloneNode(true),
    cells = clone.querySelectorAll("td")

  Array.from(clone.querySelectorAll("td:not(:first-child)")).forEach(e => e.innerHTML = "")
  row.classList.remove("selected")
  row.after(clone)
  clearSelection()
  createEditcell(cells[HN])
  blankRowData(clone, row.dataset.opdate)
}
