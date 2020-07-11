
import { postData, MYSQLIPHP } from "./fetch.js"
import { USER } from "../main.js"
import { URIcomponent } from "../util/util.js"
import { serviceFromDate, serviceToDate } from "../service/setSERVICE.js"

const GETIPD = "php/getipd.php"

export function sqlSaveOnChangeService(column, content, qn)
{
  let sql = sqlColumn(column, URIcomponent(content), qn)
      + sqlOneMonth()

  return postData(MYSQLIPHP, sql)
}

export function sqlGetServiceOneMonth() {
  let sql = "sqlReturnData=" + sqlOneMonth()

  return postData(MYSQLIPHP, sql)
}

export function sqlGetIPD() {
  let sql = `from=${serviceFromDate}&to=${serviceToDate}&sql=${sqlOneMonth()}`

  return postData(GETIPD, sql)
}

export function sqlSaveService(column, content, qn) {
  let sql = `sqlReturnService=${sqlItem(column, content, qn)}${sqlOneMonth()}`

  return postData(MYSQLIPHP, sql);
}

function sqlOneMonth()
{
  return `SELECT * FROM book b left join personnel p
            ON b.staffname=p.profile->"$.name"
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
