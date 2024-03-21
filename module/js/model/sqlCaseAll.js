
import { postData, MYSQLIPHP } from "./fetch.js"

export function sqlCaseAll() {
  let sql = `SELECT * FROM book WHERE deleted=0 AND hn>"0000000" ORDER BY opdate;`

  return postData(MYSQLIPHP, {sqlReturnData:sql})
}
