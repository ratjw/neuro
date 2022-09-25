
import { postData, MYSQLIPHP } from "./fetch.js"
import { USER } from "../main.js"
import { serviceFromDate, serviceToDate } from "../service/setSERVICE.js"

const GETIPD = "php/getipd.php"

export function sqlGetServiceOneMonth() {
  return postData(MYSQLIPHP, { sqlReturnService: {serviceFromDate, serviceToDate} })
}

export function sqlGetIPD() {
  return postData(GETIPD, { serviceDate: {serviceFromDate, serviceToDate} })
}

export function sqlSaveService(column, content, qn) {
  const sql = `UPDATE book SET ${column}='${content}',editor='${USER}' WHERE qn=${qn};`

  return postData(MYSQLIPHP, { sqlReturnService: {serviceFromDate, serviceToDate, sql} })
}
