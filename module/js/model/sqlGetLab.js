
import { postData, MYSQLIPHP } from "./fetch.js"
import { USER } from "../main.js"

export function sqlGetLab(qn)  {

  let sql = `sqlReturnData=SELECT editor,editdatetime  FROM bookhistory WHERE qn=${qn} AND lab <> '' ORDER BY editdatetime DESC;`

  return postData(MYSQLIPHP, {sqlReturnData:sql})
}

export function sqlSaveLab(lab, qn) {
  let sql = `UPDATE book SET lab='${lab}',editor='${USER}' WHERE qn=${qn};`

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
}

export function sqlCancelAllLab(qn)
{
  let sql = `UPDATE book SET lab=NULL,editor='${USER}' WHERE qn=${qn};`

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
}
