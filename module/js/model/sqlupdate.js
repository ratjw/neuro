
import { postData, MYSQLIPHP } from "./fetch.js"
import { URIcomponent } from "../util/util.js"
import { USER } from "../main.js"

export function sqlStart(begindate, enddate) {
  return postData(MYSQLIPHP, {
    "begindate": begindate,
    "enddate": enddate
  });
}

export function sqldoUpdate()
{
  return postData(MYSQLIPHP, {
    "sqlReturnData": "SELECT MAX(editdatetime) as timestamp from bookhistory;"
  });
}

export function sqlGetUpdate()
{
  return postData(MYSQLIPHP, {
    "nosqlReturnbook": ""
  });
}

export function sqlSaveOnChange(column, content, qn)
{
  const set = `${column}='${URIcomponent(content)}',editor='${USER}'`
  const where = `qn=${qn};`

  return postData(MYSQLIPHP, {
    "sqlReturnbook": `UPDATE book SET ${set} WHERE ${where};`
  })
}
