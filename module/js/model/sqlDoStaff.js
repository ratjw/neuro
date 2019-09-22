
import { STAFF } from "../util/updateBOOK.js"
import { postData, MYSQLIPHP } from "./fetch.js"
import { URIcomponent } from "../util/util.js"

export function sqlDoSaveStaff(row)
{
  let rownum = row.rowIndex
  let cell = row.cells
  let staffname = cell[1].textContent
  let oncall = cell[2].textContent || 1
  let startoncall = cell[3].textContent ? `'${cell[3].textContent}'` : null

  if (!staffname) { return "<br>Incomplete Entry" }

  let sql = `sqlReturnStaff=UPDATE staff SET number=number${encodeURIComponent('+')}1)}
               WHERE number>${rownum-1};
             INSERT INTO staff (number,staffname,oncall,startoncall)
               VALUES(${rownum},'${staffname}',${oncall},${startoncall});`

  return postData(MYSQLIPHP, sql)
}

export function sqlDoUpdateStaff(row)
{
  let cell = row.cells
  let number = cell[0].textContent
  let staffname = cell[1].textContent
  let oncall = cell[2].textContent
  let startoncall = cell[3].textContent

  if (!number || !staffname || !oncall) { return "<br>Incomplete Entry" }

  if (confirm("ต้องการแก้ไขข้อมูลนี้")) {
    startoncall = startoncall ? `'${startoncall}'` : null

    let sql = `sqlReturnStaff=UPDATE staff SET staffname='${staffname}',
               oncall=${oncall},startoncall=${startoncall} WHERE number=${number};`

    return postData(MYSQLIPHP, sql)
  }
}

export function sqlDoDeleteStaff(row)
{
  let rownum = row.rowIndex
  let cell = row.cells
  let number = cell[0].textContent

  if (!number) { return "<br>No Number" }

  if (confirm("ต้องการลบข้อมูลนี้หรือไม่")) {
    let sql = `sqlReturnStaff=DELETE FROM staff WHERE number=${number};
             UPDATE staff SET number=${URIcomponent('number-1')}
               WHERE number>${rownum};`

    return postData(MYSQLIPHP, sql)
  }
}
