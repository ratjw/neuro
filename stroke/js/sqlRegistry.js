
import { postData, MYSQLIPHP } from "./fetch.js"
//import { USER } from "./main.js"

export function sqlGetOldHN(hn) {
  return postData(MYSQLIPHP, { hn: hn });
}

export function sqlGetOldQN(qn) {
  return postData(MYSQLIPHP, { qn: qn });
}

export function sqlSaveFocusOutElement(input, qn)
{
  let inp = JSON.stringify(input),
    sql

  sql = "UPDATE registry SET registrysheet= '" +  inp + "' WHERE qn=qn;"

  return postData(MYSQLIPHP, { sqlNoReturn: sql })
}

export function sqlInsertNewRecord(input)
{
  let inp = JSON.stringify(input),
    sql

  sql = "INSERT INTO registry (registrysheet) VALUES ('" + inp + "');"

  return postData(MYSQLIPHP, { sqlNoReturn: sql })
}

export function sqlSaveRegistry(input, qn)
{
  let sql = 'UPDATE registry '
          + 'SET registrysheet=JSON_SET(registrysheet, "$.0", '
          + JSON.stringify(input)
          + ') '
          + 'WHERE qn=qn;'

  return postData(MYSQLIPHP, { sqlNoReturn: sql });
}
