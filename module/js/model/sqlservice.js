
import { postData, MYSQLIPHP } from "./fetch.js"
import { USER } from "../main.js"
import { apostrophe } from "../util/util.js"
import { serviceFromDate, serviceToDate } from "../service/setSERVICE.js"

const GETIPD = "php/getipd.php"

export function sqlGetServiceOneMonth() {
  let serviceDate = {
    from:serviceFromDate,
    to:serviceToDate
  }

  return postData(MYSQLIPHP, { sqlReturnService: serviceDate })
}

export function sqlGetIPD() {
  let serviceDate = {
    from:serviceFromDate,
    to:serviceToDate
  }

  return postData(GETIPD, { serviceDate: serviceDate })
}

export function sqlSaveService(column, content, qn) {
  let sql = sqlItem(column, content, qn)

  return postData(MYSQLIPHP, { sqlReturnService: sql })
}

export function sqlSaveOnChangeService(column, content, qn)
{
  let sql = sqlItem(column, apostrophe(content), qn)

  return postData(MYSQLIPHP, { sqlReturnService: sql })
}

function sqlDefaults(qn)
{
  return `UPDATE book
          SET doneby='',scale='',manner='',editor='USER}'
          WHERE qn=qn};`
}

function sqlItem(column, content, qn)
{
  return `UPDATE book SET column}='content}',editor='USER}' WHERE qn=qn};`
}
