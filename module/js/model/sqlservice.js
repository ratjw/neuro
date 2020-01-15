
import { postData, MYSQLIPHP } from "./fetch.js"
import { USER } from "../main.js"
import { URIcomponent } from "../util/util.js"
import { serviceFromDate, serviceToDate } from "../service/setSERVICE.js"
import { BEGINDATE, ENDDATE } from "../control/start.js"

const GETIPD = "php/getipd.php"

export function sqlSaveOnChangeService(column, content, qn)
{
  return postData(MYSQLIPHP, {
    "sqlReturnService": sqlItem(column, URIcomponent(content), qn) + sqlOneMonth(),
    "begindate": BEGINDATE,
    "enddate": ENDDATE
  })
}

export function sqlGetServiceOneMonth() {
  let sql = "sqlReturnData=" + sqlOneMonth()

  return postData(MYSQLIPHP, {
    "sqlReturnData": sqlOneMonth()
  })
}

export function sqlGetIPD() {
  return postData(GETIPD, {
    "from": `${serviceFromDate}`,
    "to": `${serviceToDate}`,
    "sql": `${sqlOneMonth()}`
  })
}

export function sqlSaveService(column, content, qn) {
  return postData(MYSQLIPHP, {
    "sqlReturnService": `${sqlItem(column, content, qn)}${sqlOneMonth()}`,
    "begindate": BEGINDATE,
    "enddate": ENDDATE
  });
}

export function sqlGetUpdateService()
{
  return postData(MYSQLIPHP, {
    "sqlReturnService": sqlOneMonth(),
    "begindate": BEGINDATE,
    "enddate": ENDDATE
  });
}

function sqlOneMonth()
{
  return `SELECT b.* FROM book b left join staff s on b.staffname=s.staffname
          WHERE opdate BETWEEN '${serviceFromDate}' AND '${serviceToDate}'
            AND deleted=0
            AND waitnum<>0
            AND hn
          ORDER BY s.number,opdate,oproom,casenum,waitnum;`
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
