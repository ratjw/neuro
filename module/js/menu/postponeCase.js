
import { SELECTED } from "../control/const.js"
import { MAXDATE } from "../control/const.js"
import { sqlPostponeCase } from "../model/sqlPostponeCase.js"
import { sameDateRoomTableQNs } from "../util/rowsgetting.js"
import { getBOOK, updateBOOK } from "../util/updateBOOK.js"
import { Alert, getLargestWaitnum, isSplit } from "../util/util.js"
import { clearSelection } from "../control/selectRow.js"
import { locateFound } from "../view/scrolltoThisCase.js"

// Undefined date booking has opdate set to MAXDATE
// but was shown blank date on screen
export function postponeCase()
{
  let row = document.querySelector(`.${SELECTED}`),
    tableID = row.closest('table').id,
    opdate = row.dataset.opdate,
    oproom = row.dataset.oproom,
    staffname = row.dataset.staffname,
    qn = row.dataset.qn,
    oldwaitnum = row.dataset.waitnum,
    allCases = []

  if (oproom) {
    allCases = sameDateRoomTableQNs(tableID, row)
  }

  row.dataset.waitnum = getLargestWaitnum(getBOOK(), staffname) + 1
  doPostponeCase(MAXDATE)
  clearSelection()

  function doPostponeCase(thisdate) {
    sqlPostponeCase(allCases, row, thisdate).then(response => {
      let hasData = function () {
        updateBOOK(response)
        refillHoliday()
        if (isSplit()) {
          locateFound('queuetblContainer', 'queuetbl', qn)
        }
      }

      typeof response === "object"
      ? hasData()
      : Alert ("postponeCase", response)
    }).catch(error => alert(error.stack))
  }
}
