
import { postData } from "./fetch.js"
import { sqlRowData } from "../model/sqlRowData.js"

const GETHN = "php/gethn.php"

// GETHN will find last previous entry of this hn in DB
export function sqlGetHN(pointed, content, signal)
{
  let sql = sqlRowData(pointed, content, "")

  return postData(GETHN, sql, signal)
}
