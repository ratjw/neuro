
import { SELECTED } from "../control/const.js"
import { sqlDeleteCase } from "../model/sqlDeleteCase.js"
import { sameDateRoomTableQNs } from "../util/rowsgetting.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert } from "../util/util.js"
import { clearSelection } from "../control/selectRow.js"

// not actually delete the case but set deleted = 1
// Remove the row if more than one case on that date, or on staff table
// Just blank the row if there is only one case
export function deleteCase() {
  let row = document.querySelector(`.${SELECTED}`),
    tableID = row.closest('table').id,
    qn = row.dataset.qn,
    oproom = row.dataset.oproom,
    allCases = []

  if (!qn) {
    row.remove()
    clearSelection()
    return
  }

  if (oproom) {
    allCases = sameDateRoomTableQNs(tableID, row)
  }

  clearSelection()

  sqlDeleteCase(allCases, oproom, qn).then(response => {
    typeof response === "object"
    ? updateBOOK(response)
    : Alert ("deleteCase", response)
  }).catch(error => alert(error.stack))
}
