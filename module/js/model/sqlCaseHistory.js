
import { postData, MYSQLIPHP } from "./fetch.js"

export function sqlCaseHistory(hn) {
  const where `qn in (SELECT qn FROM book WHERE hn='${hn}')`
  const order = `editdatetime DESC`

  return postData(MYSQLIPHP, {
    "sqlReturnData": `SELECT * FROM bookhistory WHERE ${where} ORDER BY ${order};`
  })
}
