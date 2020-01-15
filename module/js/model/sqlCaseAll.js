
import { postData, MYSQLIPHP } from "./fetch.js"

export function sqlCaseAll() {
  return postData(MYSQLIPHP, {
    "sqlReturnData": `SELECT * FROM book WHERE deleted=0 ORDER BY opdate;`
  })
}
