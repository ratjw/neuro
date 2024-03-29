
import { postData, MYSQLIPHP } from "./fetch.js"
import { updateCasenum, sqlCaseNum } from "./sqlSaveCaseNum.js"
import { sqlMover } from "./sqlMover.js"

export function sqlmoveCase(allOldCases, allNewCases, moverow, pasterow)
{
  let sql = "",
    newWaitnum = moverow.dataset.waitnum,
    moveroom = moverow.dataset.oproom,
    moveqn = moverow.dataset.qn,
    pastedate = pasterow.dataset.opdate,
    pasteroom = pasterow.dataset.oproom || null

  if (allOldCases.length && moveroom) { sql += updateCasenum(allOldCases) }

  allNewCases.forEach((e, i) => {
    if (e === moveqn) {
      pasteroom
      ? sql += sqlMover(newWaitnum, pastedate, pasteroom, i + 1, moveqn)
      : sql += sqlMover(newWaitnum, pastedate, null, null, moveqn)
    } else {
      pasteroom
      ? sql += sqlCaseNum(i + 1, e)
      : sql += sqlCaseNum(null, e)
    }
  })

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
}
