
import { STAFF } from "../util/updateBOOK.js"
import { postData, MYSQLIPHP } from "./fetch.js"
import { URIcomponent } from "../util/util.js"
import { NUMBER, STAFFNAME, RAMAID, ONCALL, STARTONCALL, ICONS
} from '../setting/settingStaff.js'

export function sqlDoSaveStaff(row)
{
  let rownum = row.rowIndex
  let cell = row.cells
  let staffname = cell[STAFFNAME].textContent
  let ramaid = cell[RAMAID].textContent
  let oncall = cell[ONCALL].textContent
  let startoncall = cell[STARTONCALL].textContent ? `'${cell[STARTONCALL].textContent}'` : null
  let add = encodeURIComponent('+')
  let sql = `sqlReturnStaff=UPDATE staff SET number=number${add}1
               WHERE number>${rownum-2};
             INSERT INTO staff (number,staffname,ramaid,oncall,startoncall)
               VALUES(${rownum-1},'${staffname}','${ramaid}',${oncall},${startoncall});`

  if (!staffname) { return "<br>Incomplete Entry" }

  return postData(MYSQLIPHP, sql)
}

export function sqlDoUpdateStaff(row)
{
  let cell = row.cells
  let number = cell[NUMBER].textContent
  let staffname = cell[STAFFNAME].textContent
  let ramaid = cell[RAMAID].textContent
  let oncall = cell[ONCALL].textContent === 'Yes' ? 1 : 0
  let startoncall = cell[STARTONCALL].textContent ? `'${cell[STARTONCALL].textContent}'` : null
  let data = `staffname='${staffname}',ramaid='${ramaid}',oncall=${oncall},startoncall=${startoncall}`

  if (!number || !staffname) { return "<br>Incomplete Entry" }

  if (confirm(`Confirm update?\n\n${data}`)) {
    startoncall = startoncall ? `'${startoncall}'` : null

    let sql = `sqlReturnStaff=UPDATE staff SET ${data} WHERE number=${number};`

    return postData(MYSQLIPHP, sql)
  }
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
