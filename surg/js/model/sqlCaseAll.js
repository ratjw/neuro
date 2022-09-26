
import { postData, MYSQLIPHP } from "./fetch.js"

export function sqlCaseAll() {
  let sql = `SELECT * FROM book WHERE deleted=0 ORDER BY opdate;`

  return postData(MYSQLIPHP, {sqlReturnData:sql})
}
