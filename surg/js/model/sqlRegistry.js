
import { postData, MYSQLIPHP } from "./fetch.js"
import { USER } from "../main.js"

export function sqlSaveEquip(record) {
  let sql = `UPDATE book SET equipment='${equipment}',editor='${USER}' WHERE qn=${qn};`

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
}

export function sqlCancelAllEquip(qn)
{
  let sql = `UPDATE book SET equipment=null,editor='${USER}' WHERE qn=${qn};`

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
}
