
import { postData, MYSQLIPHP } from "./fetch.js"

export function sqlCaseHistory(hn, qn) {
  const sql = `SELECT * FROM bookhistory `
             +    `WHERE qn `
             + (hn ? `in (SELECT qn FROM book WHERE hn='${hn}') ` : `=${qn} `)
             +   `ORDER BY editdatetime DESC;`

  return postData(MYSQLIPHP, {sqlReturnData:sql})
}
