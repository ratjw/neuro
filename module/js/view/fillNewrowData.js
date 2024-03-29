
import {
  OPDATE, OPROOM, OPTIME, CASENUM, STAFFNAME, HN, PATIENT,
  DIAGNOSIS, TREATMENT, EQUIPMENT, CONTACT, COLUMNDATASET, CELLDATASET
} from "../control/const.js"
import { rowDecoration } from "./rowDecoration.js"
import { putNameAge } from "../util/date.js"
import { viewEquip } from "./viewEquip.js"

// make null to "", if not, the dataset will change it to "null"
export function fillNewrowData(row, bookq)
{
  setRowData(row, bookq)

  Object.entries(bookq).forEach(([key, val]) => bookq[key] = (val || ''))

  Object.entries(COLUMNDATASET).forEach(([key, val]) => {
    fillRow(row, bookq, key, val)
  })
}

export function setRowData(row, bookq)
{
  let rowdata = row.dataset

  Object.entries(bookq).forEach(([key, val]) => bookq[key] = (val || ''))

  Object.keys(COLUMNDATASET).forEach(k => rowdata[k] = bookq[k])

  rowdata.opdate = bookq.opdate
}

export function blankRowData(row, opdate)
{
  let rowdata = row.dataset

  Object.keys(COLUMNDATASET).forEach(k => rowdata[k] = "")

  rowdata.opdate = opdate

//  CELLDATASET.forEach(data => delete row.cells[PATIENT].dataset[data])
}

export function fillOldrowData(row, bookq)
{
  let rowdata = row.dataset

  Object.entries(bookq).forEach(([key, val]) => bookq[key] = (val || ''))

  Object.entries(COLUMNDATASET).forEach(([key, val]) => {
    if (rowdata[key] !== bookq[key]) {
      rowdata[key] = bookq[key]
      fillRow(row, bookq, key, val)
    }
  })
}

export function unfillOldrowData(row, opdate)
{
  let cells = row.cells

  Array.from(cells).filter(e => e.cellIndex !== OPDATE).forEach(e => e.innerHTML = "")
  rowDecoration(row, opdate)
  blankRowData(row, opdate)
}

function fillRow(row, bookq, key, val)
{
  let cells = row.cells

  if (val === PATIENT) {
    cells[val].innerHTML = putNameAge(bookq)
  }
  else if (val === EQUIPMENT) {
    cells[val].innerHTML = viewEquip(bookq.equipment)
  }
  else if (val) {
    cells[val].innerHTML = bookq[key]
  }
}
