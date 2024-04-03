
import { postData, MYSQLIPHP } from "./fetch.js"

export function sqlallInPeriod(dateFrom, dateTo) {
  let period = dateFrom && dateTo
                ? 'AND opdate BETWEEN "dateFrom" AND "dateTo"'
                : ''
  let sql = `SELECT * FROM book
              WHERE deleted=0 AND hn>"0000000" ${period}
              ORDER BY opdate;`

  return postData(MYSQLIPHP, {sqlReturnData:sql})
}
