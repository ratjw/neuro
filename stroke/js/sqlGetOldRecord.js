
import { postData, MYSQLIPHP } from "./fetch.js"
//import { USER } from "./main.js"

export function sqlGetOldRecord(hn) {
  return postData(MYSQLIPHP, { record: hn });
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
                    SET ${column}='${apostrophe(content)}',editor='${USER}'
                    WHERE qn=${qn||null};`
  }

  return postData(MYSQLIPHP, sql)
}
