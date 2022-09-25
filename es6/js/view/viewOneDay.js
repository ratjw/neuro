
import { fillOldrowData, unfillOldrowData } from "./fillNewrowData.js"
import { rowDecoration } from "./rowDecoration.js"
import { getTableRowsByDate } from "../util/rowsgetting.js"
import { MAXDATE } from "../control/const.js"

export function viewOneDay(table, opdate, opdateBOOKrows) {
  if ((table.id === 'maintbl') && (opdate === MAXDATE)) { return }

  let opdateTblRows = getTableRowsByDate(table.id, opdate),
    bookRows = opdateBOOKrows.length,
    tblRows = opdateTblRows.length,
    row,
    clone

  if (bookRows) {
    while (tblRows > bookRows) {
      table.deleteRow(opdateTblRows[tblRows-1].rowIndex)
      opdateTblRows = getTableRowsByDate(table.id, opdate)
      tblRows = opdateTblRows.length
    }
    while (tblRows < bookRows) {
      clone = opdateTblRows[tblRows-1].cloneNode(true)
      clone.dataset.opdate = opdate
      opdateTblRows[tblRows-1].after(clone)
      opdateTblRows = getTableRowsByDate(table.id, opdate)
      tblRows = opdateTblRows.length
    }
    opdateBOOKrows.forEach((e, i) => {
      row = opdateTblRows[i]
      rowDecoration(row, e.opdate)
      fillOldrowData(row, e)
    })
  } else {
    while (tblRows > 1) {
      table.deleteRow(opdateTblRows[tblRows-1].rowIndex)
      opdateTblRows = getTableRowsByDate(table.id, opdate)
      tblRows = opdateTblRows.length
    }
    row = opdateTblRows[tblRows-1]
    if (row && row.dataset.qn) {
      unfillOldrowData(row, opdate)
    }
  }
}
