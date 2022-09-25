
import { postData, MYSQLIPHP } from "./fetch.js"
//import { USER } from "./main.js"

export function sqlGetOldHN(hn) {
  return postData(MYSQLIPHP, { hn: hn });
}

export function sqlGetOldQN(qn) {
  return postData(MYSQLIPHP, { qn: qn });
}

export function sqlSaveRegistry(record, qn)
{
  let sql = {
    sqlNoReturn: `UPDATE registry
                      SET registrysheet=JSON_SET(registrysheet, "$.0", record)
                      WHERE qn=qn;`
  }

  return postData(MYSQLIPHP, sql);
}

export function sqlSaveCurrentElement(record, qn)
{
  let sql = {
    sqlNoReturn: `UPDATE registry
                   SET registrysheet=record
                   WHERE qn=qn;`
  }

  return postData(MYSQLIPHP, sql)
}
