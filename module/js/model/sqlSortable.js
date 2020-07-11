
import { postData, MYSQLIPHP } from "./fetch.js"
import { updateCasenum, sqlCaseNum } from "./sqlSaveCaseNum.js"
import { sqlMover } from "./sqlMover.js"

export function sqlSortable(allOldCases, allNewCases, moverow, pasterow)
{
  let sql = "",
    newWaitnum = moverow.dataset.waitnum,
    moveroom = moverow.dataset.oproom,
    moveqn = moverow.dataset.qn,
    pasteOpdate = pasterow.dataset.opdate,
    pastetheatre = pasterow.dataset.theatre || "",
    pasteroom = pasterow.dataset.oproom || null

  if (allOldCases.length && moveroom) { sql += updateCasenum(allOldCases) }

  allNewCases.forEach((e, i) => {
    sql += (e === moveqn)
      ? pasteroom
        ? sqlMover(newWaitnum, pasteOpdate, pastetheatre, pasteroom, i + 1, moveqn)
        : sqlMover(newWaitnum, pasteOpdate, pastetheatre, null, null, moveqn)
      : pasteroom
        ? sqlCaseNum(i + 1, e)
        : sqlCaseNum(null, e)
  })

  return postData(MYSQLIPHP, {sqlReturnbook:sql});
}
