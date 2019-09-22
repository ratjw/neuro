
import { sqlcopyCase } from "../model/sqlcopyCase.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert } from "../util/util.js"
import { calcWaitnum } from "../util/calcWaitnum.js"

export function docopyCase(allNewCases, moverow, thisrow)
{
  let thisopdate = thisrow.dataset.opdate

  moverow.dataset.waitnum = calcWaitnum(thisopdate, thisrow, thisrow.nextElementSibling)

  sqlcopyCase(allNewCases, moverow, thisrow).then(response => {
    typeof response === "object"
    ? updateBOOK(response)
    : Alert ("copyCase", response)
  }).catch(error => {})
}
