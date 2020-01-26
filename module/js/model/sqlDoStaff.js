
import { STAFF } from "../util/updateBOOK.js"
import { postData, MYSQLIPHP } from "./fetch.js"
import { URIcomponent } from "../util/util.js"
import {
  STAFFNAME, RAMAID, ONCALL, STARTONCALL, SKIPBEGIN, SKIPEND
} from '../setting/settingStaff.js'

export function sqlDoSaveStaff(row)
{
  let rownum = row.rowIndex
  let cell = row.cells
  let staffname = cell[STAFFNAME].textContent
  let ramaid = cell[RAMAID].textContent
  let oncall = cell[ONCALL].textContent
  let startoncall = cell[STARTONCALL].textContent ? `'${cell[STARTONCALL].textContent}'` : null
  let skipbegin = cell[SKIPBEGIN].textContent ? `'${cell[SKIPBEGIN].textContent}'` : null
  let skipend = cell[SKIPEND].textContent ? `'${cell[SKIPEND].textContent}'` : null
  let sql

  if (add) {
    let fields = `staffname,ramaid,oncall,startoncall,skipbegin,skipend`
    let values = `'${staffname}','${ramaid}',${oncall},${startoncall},${skipbegin},${skipend}`
    sql = `sqlReturnStaff=INSERT INTO staff (${fields}) VALUES(${values});`
  } else {
    let data1 = `staffname='${staffname}',oncall=${oncall},startoncall=${startoncall}`
    let data2 = `skipbegin=${skipbegin},skipend=${skipend}`
    sql = `sqlReturnStaff=UPDATE staff SET ${data1}${data2} WHERE ramaid=${ramaid};`
  }

  if (!staffname || !ramaid || !oncall) { return "<br>Incomplete Entry" }

  return postData(MYSQLIPHP, sql)
}

export function sqlDoDeleteStaff(row)
{
  let cell = row.cells
  let number = cell[NUMBER].textContent
  let staffname = cell[STAFFNAME].textContent

  if (!number) { return "<br>No Number" }

  if (confirm(`Confirm delete?\n\n${staffname}`)) {
    let sql = `sqlReturnStaff=DELETE FROM staff WHERE number=${number};
             UPDATE staff SET number=number-1
               WHERE number>${number};`

    return postData(MYSQLIPHP, sql)
  }
}
