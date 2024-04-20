
import {
  OPDATE, OPROOM, OPTIME, CASENUM, STAFFNAME, HN, PATIENT,
  DIAGNOSIS, TREATMENT, EQUIPMENT, CONTACT, COLUMN
} from "./const.js"
import { putNameAge } from "./function.js"
import { viewEquip } from "./viewEquip.js"

export function fillNewrowData(row, q)
{
  setRowData(row, q)

  Object.entries(q).forEach(([key, val]) => q[key] = (val || ''))

  Object.entries(COLUMN).forEach(([key, val]) => {
    fillRow(row, q, key, val)
  })
}

export function setRowData(row, q)
{
  let rowdata = row.dataset

  Object.entries(q).forEach(([key, val]) => q[key] = (val || ''))

  Object.keys(COLUMN).forEach(k => rowdata[k] = q[k])

  rowdata.opdate = q.opdate
}

function fillRow(row, q, key, val)
{
  let cells = row.cells

  if (val === PATIENT) {
    cells[val].innerHTML = putNameAge(q)
  }
  else if (val === EQUIPMENT) {
    cells[val].innerHTML = viewEquip(q.equipment)
  }
  else if (val) {
    cells[val].innerHTML = q[key]
  }
}

export function blankRowData(row, opdate)
{
  let rowdata = row.dataset

  Object.keys(COLUMN).forEach(k => rowdata[k] = "")

  rowdata.opdate = opdate
}
