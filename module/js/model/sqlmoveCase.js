
import { postData, MYSQLIPHP } from "./fetch.js"
import { updateCasenum, sqlCaseNum } from "./sqlSaveCaseNum.js"
import { sqlMover } from "./sqlMover.js"

export function sqlmoveCase(allOldCases, allNewCases, moverow, pasterow)
{
  let sql = "sqlReturnbook=",
    newWaitnum = moverow.dataset.waitnum,
    moveroom = moverow.dataset.oproom,
    moveqn = moverow.dataset.qn,
    pastedate = pasterow.dataset.opdate,
    pastetheatre = pasterow.dataset.theatre || "",
    pasteroom = pasterow.dataset.oproom || null

  if (allOldCases.length && moveroom) { sql += updateCasenum(allOldCases) }

  allNewCases.forEach((e, i) => {
    if (e === moveqn) {
      pasteroom
      ? sql += sqlMover(newWaitnum, pastedate, pastetheatre, pasteroom, i + 1, moveqn)
      : sql += sqlMover(newWaitnum, pastedate, pastetheatre, null, null, moveqn)
    } else {
      pasteroom
      ? sql += sqlCaseNum(i + 1, e)
      : sql += sqlCaseNum(null, e)
    }
  })

  return postData(MYSQLIPHP, sql)
}
