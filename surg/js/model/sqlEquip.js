
import { postData, MYSQLIPHP } from "./fetch.js"
import { USER } from "../main.js"

export function sqlGetEditedBy(qn)  {

  let sql = `SELECT editor,editdatetime
							FROM bookhistory
							WHERE qn=${qn} AND equipment <> ''
							ORDER BY editdatetime DESC;`

  return postData(MYSQLIPHP, {sqlReturnData:sql})
}

export function sqlSaveEquip(equipment, qn) {
  let sql = `UPDATE book SET equipment='${equipment}',editor='${USER}' WHERE qn=${qn};`

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
}

export function sqlCancelAllEquip(qn)
{
  let sql = `UPDATE book SET equipment=null,editor='${USER}' WHERE qn=${qn};`

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
}
