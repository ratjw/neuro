
import { postData, MYSQLIPHP } from "./fetch.js"
import { START_DATE } from "../util/date.js"
import { URIcomponent } from "../util/util.js"
import { USER } from "../main.js"

export function sqlStart() {
  return postData(MYSQLIPHP, {start:START_DATE});
}

export function sqldoUpdate()
{
  let sql = {sqlReturnData:"SELECT MAX(editdatetime) as timestamp from bookhistory;"}

  return postData(MYSQLIPHP, sql);
}

export function sqlSaveOnChange(column, content, qn)
{
  let sql = {
    sqlReturnbook:`UPDATE book
                    SET ${column}='${URIcomponent(content)}',editor='${USER}'
                    WHERE qn=${qn||null};`
  }

  return postData(MYSQLIPHP, sql)
}
