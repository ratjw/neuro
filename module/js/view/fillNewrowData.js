
import {
  OPDATE, THEATRE, OPROOM, OPTIME, CASENUM, STAFFNAME, HN, PATIENT,
  DIAGNOSIS, TREATMENT, LAB, EQUIPMENT, CONTACT, COLUMNDATASET
} from "../control/const.js"
import { rowDecoration } from "./rowDecoration.js"
import { putNameAge } from "../util/date.js"
import { viewLab } from "./viewLab.js"
import { viewEquip } from "./viewEquip.js"

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
  else if (val === LAB) {
    cells[val].innerHTML = viewLab(bookq.lab)
  }
  else if (val === EQUIPMENT) {
    cells[val].innerHTML = viewEquip(bookq.equipment)
  }
  else if (val) {
    cells[val].innerHTML = bookq[key]
  }
}
