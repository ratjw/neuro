
import { postData, MYSQLIPHP } from "./fetch.js"
//import { USER } from "./main.js"

export function sqlGetOldRecord(hn) {
  return postData(MYSQLIPHP, { record: hn });
}

export function sqlSaveRegistry(record, qn)
{
  let sql = {
    sqlNoReturn: "UPDATE registry
                      SET registrysheet=JSON_SET()
                      WHERE qn=qn;"
  }

  return postData(MYSQLIPHP, sql);
}

export function saveCurrentElement(record, qn)
{
  let sql = {
    sqlNoReturn: UPDATE registry
                   SET registrysheet=JSON_SET(registrysheet, , record)
                   WHERE qn=qn;
  }

  return postData(MYSQLIPHP, sql)
}
