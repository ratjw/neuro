
import { createEditcell } from "../control/edit.js"
import { spinTime } from "../util/spinner.js"

export function getPATIENT(pointing)
{
  let editcell = document.getElementById("editcell"),
    nameinput = document.getElementById("nameinput"),
    oldtime = pointing.innerHTML || "09.00",
    newtime = ""

  if (pointing.innerHTML) {
    clearEditcell()
  } else {
    createEditcell(pointing)
    editcell.innerHTML = nameinput.innerHTML
    editcell.contentEditable = "false"
    editcell.querySelectorAll('input').forEach(e => {
      e.style.width = "60%"
      e.style.borderWidth = "0px 0px 2px 0px"
      e.style.boxShadow = "5px 5px 10px slategray"
    })
    editcell.querySelector('input').focus()
  }
}
