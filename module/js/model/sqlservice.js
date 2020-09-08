
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
  let sql = `sqlReturnService=${sqlItem(column, content, qn)}${sqlOneMonth()}`

  return postData(MYSQLIPHP, sql);
}

export function sqlGetUpdateService()
{
  let sql = "sqlReturnService=" + sqlOneMonth()

  return postData(MYSQLIPHP, sql);
}

function sqlOneMonth()
{
  return `SELECT * FROM book b left join personnel p
            ON JSON_CONTAINS(p.profile,JSON_QUOTE(b.staffname),"$.name")
          WHERE opdate BETWEEN '${serviceFromDate}' AND '${serviceToDate}'
            AND deleted=0
            AND waitnum<>0
            AND hn
          ORDER BY p.id,opdate,oproom,casenum,waitnum;`
}

function sqlColumn(column, content, qn)
{
  return "sqlReturnService=" + sqlItem(column, content, qn)
}

function sqlDefaults(qn)
{
  return `UPDATE book
          SET doneby='',scale='',manner='',editor='${USER}'
          WHERE qn=${qn};`
}

function sqlItem(column, content, qn)
{
  return `UPDATE book SET ${column}='${content}',editor='${USER}' WHERE qn=${qn};`
}
