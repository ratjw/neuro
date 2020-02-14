
import { sameDateRoomTableQNs } from "../util/rowsgetting.js"
import { clearMouseoverTR, Alert} from "../util/util.js"
import { clearSelection } from "../control/selectRow.js"
import { sqlmoveCase } from "../model/sqlmoveCase.js"
import { sqlcopyCase } from "../model/sqlcopyCase.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { calcWaitnum } from "../util/calcWaitnum.js"

export function clickDate(moverow, pasterow)
{
  let moveTableID = moverow.closest('table').id,
    moveqn = moverow.dataset.qn,

    pasteTableID = pasterow.closest('table').id,
    pasteqn = pasterow.dataset.qn,
    allOldCases,
    allNewCases,
    pasteindex

  // click the same case
  if (pasteqn === moveqn) { return }

  allOldCases = sameDateRoomTableQNs(moveTableID, moverow)
  allNewCases = sameDateRoomTableQNs(pasteTableID, pasterow)

  // remove itself from old sameDateRoom
  allOldCases = allOldCases.filter(e => e !== moveqn)

  // remove itself from new if new === old
  if (allNewCases.find(e => e === moveqn)) {
    allNewCases = allOldCases
    allOldCases = []
  }

  // insert itself into new sameDateRoom after the clicked row
  pasteindex = allNewCases.indexOf(pasteqn)
  allNewCases.splice(pasteindex + 1, 0, moveqn)

  if (/moveCase/.test(moverow.className)) {
    domoveCase(allOldCases, allNewCases, moverow, pasterow)
  } else if (/copyCase/.test(moverow.className)) {
    docopyCase(allNewCases, moverow, pasterow)
  }

  clearMouseoverTR()
  clearSelection()
}

function domoveCase(allOldCases, allNewCases, moverow, pasterow)
{
  let pasteopdate = pasterow.dataset.opdate

  moverow.dataset.waitnum = calcWaitnum(pasteopdate, pasterow, pasterow.nextElementSibling)

  sqlmoveCase(allOldCases, allNewCases, moverow, pasterow).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
    } else {
      Alert ("moveCase", response)
    }
	}).catch(error => alert(error.stack))
}

function docopyCase(allNewCases, moverow, pasterow)
{
  let pasteopdate = pasterow.dataset.opdate

  moverow.dataset.waitnum = calcWaitnum(pasteopdate, pasterow, pasterow.nextElementSibling)

  sqlcopyCase(allNewCases, moverow, pasterow).then(response => {
    typeof response === "object"
    ? updateBOOK(response)
    : Alert ("copyCase", response)
	}).catch(error => alert(error.stack))
}
