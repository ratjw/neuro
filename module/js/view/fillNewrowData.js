
import {
  OPDATE, THEATRE, OPROOM, OPTIME, CASENUM, STAFFNAME, HN, PATIENT,
  DIAGNOSIS, TREATMENT, LAB, EQUIPMENT, CONTACT, COLUMN
} from "../control/const.js"
import { isPACS } from "../main.js"
import { rowDecoration } from "./rowDecoration.js"
import { putNameAge } from "../util/date.js"
import { viewLab } from "./viewLab.js"
import { viewEquip } from "./viewEquip.js"

export function fillNewrowData(row, q)
{
  setRowData(row, q)
  if (q.hn && isPACS) { cells[HN].className = "pacs" }

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

export function blankRowData(row, opdate)
{
  let rowdata = row.dataset

  Object.keys(COLUMN).forEach(k => rowdata[k] = "")

  rowdata.opdate = opdate
}

export function fillOldrowData(row, q)
{
  let rowdata = row.dataset

  Object.entries(q).forEach(([key, val]) => q[key] = (val || ''))

  Object.entries(COLUMN).forEach(([key, val]) => {
    if (rowdata[key] !== q[key]) {
      rowdata[key] = q[key]
      fillRow(row, q, key, val)
    }
  })
}

export function unfillOldrowData(row, opdate)
{
  let cells = row.cells

  Array.from(cells).filter(e => e.cellIndex !== OPDATE).forEach(e => e.innerHTML = "")
  cells[HN].classList.remove("pacs")
  rowDecoration(row, opdate)
  blankRowData(row, opdate)
}

function fillRow(row, q, key, val)
{
  let cells = row.cells

  if (val === PATIENT) {
    cells[val].innerHTML = putNameAge(q)
  }
  else if (val === LAB) {
    cells[val].innerHTML = viewLab(q.lab)
  }
  else if (val === EQUIPMENT) {
    cells[val].innerHTML = viewEquip(q.equipment)
  }
  else if (val) {
    cells[val].innerHTML = q[key]
  }
}
