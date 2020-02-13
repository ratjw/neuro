
import { sameDateRoomTableQNs } from "../util/rowsgetting.js"
import { clearMouseoverTR, Alert} from "../util/util.js"
import { clearSelection } from "../control/selectRow.js"
import { sqlmoveCase } from "../model/sqlmoveCase.js"
import { sqlcopyCase } from "../model/sqlcopyCase.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { calcWaitnum } from "../util/calcWaitnum.js"

export function clickDate(moverow, cell)
{
  let moveTableID = moverow.closest('table').id,
    moveqn = moverow.dataset.qn,

    thisrow = cell.closest("tr"),
    thisTableID = thisrow.closest('table').id,
    thisqn = thisrow.dataset.qn,
    allOldCases,
    allNewCases,
    thisindex

  // click the same case
  if (thisqn === moveqn) { return }

  allOldCases = sameDateRoomTableQNs(moveTableID, moverow)
  allNewCases = sameDateRoomTableQNs(thisTableID, thisrow)

  // remove itself from old sameDateRoom
  allOldCases = allOldCases.filter(e => e !== moveqn)

  // remove itself from new if new === old
  if (allNewCases.find(e => e === moveqn)) {
    allNewCases = allOldCases
    allOldCases = []
  }

  // insert itself into new sameDateRoom after the clicked row
  thisindex = allNewCases.indexOf(thisqn)
  allNewCases.splice(thisindex + 1, 0, moveqn)

  if (/moveCase/.test(moverow.className)) {
    domoveCase(allOldCases, allNewCases, moverow, thisrow)
  } else if (/copyCase/.test(moverow.className)) {
    docopyCase(allNewCases, moverow, thisrow)
  }

  clearMouseoverTR()
  clearSelection()
}

function domoveCase(allOldCases, allNewCases, moverow, thisrow)
{
  let thisopdate = thisrow.dataset.opdate

  moverow.dataset.waitnum = calcWaitnum(thisopdate, thisrow, thisrow.nextElementSibling)

  sqlmoveCase(allOldCases, allNewCases, moverow, thisrow).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
    } else {
      Alert ("moveCase", response)
    }
	}).catch(error => alert(error.stack))
}

function docopyCase(allNewCases, moverow, thisrow)
{
  let thisopdate = thisrow.dataset.opdate

  moverow.dataset.waitnum = calcWaitnum(thisopdate, thisrow, thisrow.nextElementSibling)

  sqlcopyCase(allNewCases, moverow, thisrow).then(response => {
    typeof response === "object"
    ? updateBOOK(response)
    : Alert ("copyCase", response)
	}).catch(error => alert(error.stack))
}
