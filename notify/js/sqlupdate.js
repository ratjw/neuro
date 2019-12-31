
import { postData, MYSQLIPHP } from "./fetch.js"

export function sqlStart() {
  return postData(MYSQLIPHP, "start=''");
}

export function sqldoUpdate()
{
  let sql = "sqlReturnData=SELECT MAX(editdatetime) as timestamp from bookhistory;"

  return postData(MYSQLIPHP, sql);
}
