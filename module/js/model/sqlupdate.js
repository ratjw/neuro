
import { postData, MYSQLIPHP } from "./fetch.js"
import { URIcomponent } from "../util/util.js"
import { USER } from "../main.js"
import { sqlReturnbook } from "./sqlReturnbook.js"
import { BEGINDATE, ENDDATE } from "../control/start.js"

export function sqlStart(begindate, enddate) {
  return postData(MYSQLIPHP, {
    "begindate": BEGINDATE,
    "enddate": ENDDATE
  });
}

export function sqldoUpdate()
{
  return postData(MYSQLIPHP, {
    "sqlReturnData": "SELECT MAX(editdatetime) as timestamp from bookhistory;"
  });
}

export function sqlSaveOnChange(column, content, qn)
{
  const set = `${column}='${URIcomponent(content)}',editor='${USER}'`
  const where = `qn=${qn};`

  return sqlReturnbook(sql)
}
