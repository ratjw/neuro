
import { postData, MYSQLIPHP } from "./fetch.js"
import { sqlCaseNum } from "./sqlSaveCaseNum.js"
import { USER } from "../main.js"

export function sqlAllDeletedCases() {
  const datesub = "DATE_SUB(NOW(), INTERVAL 3 MONTH)"
  const sel = "editdatetime, b.*"
  const from = "book b LEFT JOIN bookhistory bh ON b.qn = bh.qn" 
  const where = "editdatetime>${datesub} AND b.deleted>0 AND bh.action='delete'"
  const order = "editdatetime DESC"

  return postData(MYSQLIPHP, {
    "sqlReturnData": `SELECT ${sel} FROM ${from} WHERE ${where} ORDER BY ${order};`
  })
}

export function sqlUndelete(allCases, oproom, qn, del) {
  let sql = ""

  allCases.forEach((item, i) => {
    if (item === qn) {
      sql += `UPDATE book SET deleted=${del},editor='${USER}' WHERE qn=${qn};`
    } else {
      if (oproom) {
        sql += sqlCaseNum(i + 1, item)
      }
    }
  })

  return postData(MYSQLIPHP, {
    "sqlReturnbook": sql
  });
}
