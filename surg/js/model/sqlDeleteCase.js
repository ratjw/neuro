
import { postData, MYSQLIPHP } from "./fetch.js"
import { updateCasenum } from "./sqlSaveCaseNum.js"
import { USER } from "../main.js"

// In database, not actually delete the case but SET deleted=1
export function sqlDeleteCase(allCases, oproom, qn) {
  let sql = `UPDATE book SET deleted=1,editor='${USER}' WHERE qn=${qn};`

  if (allCases.length && oproom) {
    sql += updateCasenum(allCases)
  }

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
}
