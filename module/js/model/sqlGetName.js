
import { postData } from "./fetch.js"
import { sqlRowData } from "../model/sqlRowData.js"

const GETNAME = "php/getname.php"

// GETNAME will find last previous entry of this hn in DB
export function sqlGetName(pointed, content, signal)
{
  let sql = sqlRowData(pointed, "", content)

  return postData(GETNAME, sql, signal)
}
