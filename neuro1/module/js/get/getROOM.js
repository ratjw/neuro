
import { createEditcell, clearEditcell } from "../control/edit.js"
import { savePreviousCell } from "../control/clicktable.js"
import { spinNumber } from "../util/spinner.js"

export function getROOM(pointing)
{
  let  patient = pointing.parentElement.dataset.qn
  let  editcell = document.getElementById("editcell")
  let  spinnerinput = document.getElementById("spinnerinput")
  let  oldval = pointing.innerHTML

  if ( !patient ) {
    savePreviousCell()
    clearEditcell()
    return
  }

  createEditcell(pointing)
  editcell.contentEditable = "false"
  editcell.style.width = "40px"
  editcell.innerHTML = spinnerinput.innerHTML
  spinNumber($("#spin"), oldval)
}
