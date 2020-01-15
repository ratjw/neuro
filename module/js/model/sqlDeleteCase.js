
import { updateCasenum } from "./sqlSaveCaseNum.js"
import { USER } from "../main.js"
import { sqlReturnbook } from "./sqlReturnbook.js"
import { BEGINDATE, ENDDATE } from "../control/start.js"
import { postData, MYSQLIPHP } from "./fetch.js"

// In database, not actually delete the case but SET deleted=1
export function sqlDeleteCase(allCases, oproom, qn, del) {
  let sql = `UPDATE book SET deleted=${del},editor='${USER}' WHERE qn=${qn};`

  if (allCases.length && oproom) {
    sql += updateCasenum(allCases)
  }

  return postData(MYSQLIPHP, {
    "sqlReturnbook": sql,
    "begindate": BEGINDATE,
    "enddate": ENDDATE
  })

//  return await sqlReturnbook(sql)
}
