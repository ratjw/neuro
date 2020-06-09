
import { postData, MYSQLIPHP } from "./fetch.js"
import { USER } from "../main.js"

export function sqlGetLab(qn)  {

  let sql = `sqlReturnData=SELECT editor,editdatetime  FROM bookhistory WHERE qn=${qn} AND lab <> '' ORDER BY editdatetime DESC;`

  return postData(MYSQLIPHP, sql)
}

export function sqlSaveLab(lab, qn) {
  let sql = `sqlReturnbook=UPDATE book SET lab='${lab}',editor='${USER}' WHERE qn=${qn};`

  return postData(MYSQLIPHP, sql);
}

export function sqlCancelAllLab(qn)
{
  let sql = `sqlReturnbook=UPDATE book SET lab=NULL,editor='${USER}' WHERE qn=${qn};`

  return postData(MYSQLIPHP, sql)
}
