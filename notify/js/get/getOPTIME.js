
import { createEditcell } from "../control/edit.js"
import { spinTime } from "../util/spinner.js"

export function getOPTIME(pointing)
{
  let  editcell = document.getElementById("editcell")
  let  spinnerinput = document.getElementById("spinnerinput")
  let  oldtime = pointing.innerHTML || "09.00"
  let  newtime = ""


  // no case
  if (!pointing.parentElement.dataset.qn) { return }

  createEditcell(pointing)
  editcell.style.width = "65px"
  editcell.innerHTML = spinnerinput.innerHTML
  spinTime($("#spin"), oldtime)
}
