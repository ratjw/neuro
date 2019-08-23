
import { POINTER, clearEditcell } from "../control/edit.js"
import { savePreviousCellService } from "./savePreviousCellService.js"
import { editPresentCellService } from "./editPresentCellService.js"

export function clickCellSV(event)
{
  let target = event.target,
    inCell = target.closest("td") || target,
    onNormalCell = (inCell.nodeName === "TD" && inCell.colSpan === 1)

  // Editcell is currently on
  if (POINTER) {
    // Click on another cell
    if (inCell !== POINTER) {
      savePreviousCellService()
      if (onNormalCell) {
        editPresentCellService(event, inCell)
      } else {
        clearEditcell()
      }
    }
  } else {
    if (onNormalCell) {
      editPresentCellService(event, inCell)
    }
  }
}
