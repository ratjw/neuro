
import { postData } from "./fetch.js"
import { sqlRowData } from "../model/sqlRowData.js"

// GETHN, GETNAME will find last previous entry of this hn in DB by lastEntryHN
const GETHN = "php/gethn.php"
const GETNAME = "php/getname.php"

export function sqlGetHN(pointed, content)
{
  let sql = sqlRowData(pointed, content)

  return postData(GETHN, sql)
}

export function sqlGetName(pointed, patientname, signal)
{
  let sql = sqlRowData(pointed, "", patientname)

  return postData(GETNAME, sql, signal)
}
