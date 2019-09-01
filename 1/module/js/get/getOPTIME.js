
import { createEditcell } from "../control/edit.js"
import { spinTime } from "../util/spinner.js"

export function getOPTIME(pointing)
{
  let editcell = document.getElementById("editcell"),
    spinnerinput = document.getElementById("spinnerinput"),
    oldtime = pointing.innerHTML || "09.00",
    newtime = ""

  // no case
  if (!pointing.parentElement.dataset.qn) { return }

  createEditcell(pointing)
  editcell.contentEditable = "false"
  editcell.style.width = "65px"
  editcell.innerHTML = spinnerinput.innerHTML
  spinTime($("#spin"), oldtime)
}
