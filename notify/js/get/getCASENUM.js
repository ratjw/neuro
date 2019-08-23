
import { OPROOM } from "../control/const.js"
import { createEditcell, clearEditcell } from "../control/edit.js"
import { savePreviousCell } from "../control/clicktable.js"
import { spinNumber } from "../util/spinner.js"

export function getCASENUM(pointing)
{
  let  row = pointing.closest("tr")
  let  oproom = row.dataset.oproom
  let  qn = row.dataset.qn
  let  editcell = document.getElementById("editcell")
  let  spinnerinput = document.getElementById("spinnerinput")
  let  oldval = pointing.innerHTML

  if ( !qn || !oproom ) {
    savePreviousCell()
    clearEditcell()
    return
  }

  createEditcell(pointing)
  editcell.style.width = "40px"
  editcell.innerHTML = spinnerinput.innerHTML
  spinNumber($("#spin"), oldval)
}
