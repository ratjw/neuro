
import { postData, MYSQLIPHP } from "./fetch.js"

export function sqlallInPeriod(dateFrom, dateTo) {
  let sql = `SELECT * FROM book
              WHERE deleted=0 AND hn>"0000000"
                    AND opdate BETWEEN "${dateFrom}" AND "${dateTo}"
              ORDER BY opdate;`

  return postData(MYSQLIPHP, {sqlReturnData:sql})
}
