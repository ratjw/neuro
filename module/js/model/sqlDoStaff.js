
import {
  STAFFNAME, RAMAID, ONCALL, STARTONCALL, SKIPBEGIN, SKIPEND
} from '../setting/settingStaff.js'
import { STAFF } from "../util/updateBOOK.js"
import { postData, MYSQLIPHP } from "./fetch.js"
import { URIcomponent } from "../util/util.js"

export function sqlDoSaveStaff(row)
{
  const number = row.dataset.number
  const cell = row.cells
  const staffname = cell[STAFFNAME].textContent
  const ramaid = cell[RAMAID].textContent
  const oncall = cell[ONCALL].textContent
  const startoncall = getDateContent(cell[STARTONCALL])
  const skipbegin = getDateContent(cell[SKIPBEGIN])
  const skipend = getDateContent(cell[SKIPEND])
  let sql

  if (number) {
    const data1 = `staffname='${staffname}',oncall=${oncall},startoncall=${startoncall},`
    const data2 = `skipbegin=${skipbegin},skipend=${skipend}`
    sql = `sqlReturnStaff=UPDATE staff SET ${data1}${data2} WHERE ramaid=${ramaid};`
  } else {
    const fields = `staffname,ramaid,oncall,startoncall,skipbegin,skipend`
    const values = `'${staffname}','${ramaid}',${oncall},${startoncall},${skipbegin},${skipend}`
    sql = `sqlReturnStaff=INSERT INTO staff (${fields}) VALUES(${values});`
  }

  if (!staffname || !ramaid || !oncall) { return "<br>Incomplete Entry" }

  return postData(MYSQLIPHP, sql)
}

function getDateContent(cell)
{
  let date = cell.querySelector('input').value,
    now = Date.now(),
    data = {[now]: date}

  return date ? `'${JSON.stringify(data)}'` : null
}
