
import { postData, MYSQLIPHP } from "./fetch.js"

export function sqlgetResident()
{
  let sql = `sqlReturnResident=`

  return postData(MYSQLIPHP, sql)
}

export function sqlDoSaveResident(row)
{
  let cell = row.cells
  let ramaid = cell[0].textContent
  let residentname = cell[1].textContent
  let enrollyear = cell[2].textContent

  if (!residentname || !enrollyear) { return "<br>Incomplete Entry" }

  let sql = `sqlReturnResident=INSERT INTO resident (ramaid,residentname,enrollyear)
               VALUES('${ramaid}','${residentname}','${enrollyear}');`

  return postData(MYSQLIPHP, sql)
}

export function sqlDoUpdateResident(row)
{
  let cell = row.cells
  let ramaid = cell[0].textContent
  let residentname = cell[1].textContent
  let enrollyear = cell[2].textContent

  if (!residentname || !enrollyear) { return "<br>Incomplete Entry" }

  if (confirm("ต้องการแก้ไขข้อมูลนี้")) {
    let sql = `sqlReturnResident=UPDATE resident
               SET residentname='${residentname}',enrollyear='${enrollyear}'
               WHERE ramaid=${ramaid};`

    return postData(MYSQLIPHP, sql)
  }
}

export function sqlDoDeleteResident(row)
{
  let cell = row.cells
  let ramaid = cell[0].textContent

  if (!ramaid) { return "<br>No Number" }

  if (confirm("ต้องการลบข้อมูลนี้หรือไม่")) {
    let sql = `sqlReturnResident=DELETE FROM resident WHERE ramaid=${ramaid};`

    return postData(MYSQLIPHP, sql)
  }
}
