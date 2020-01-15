
import { createEditcell, clearEditcell } from "../control/edit.js"

export function getHN(evt, pointing)
{
  if (/^\d{7}$/.test(pointing.innerHTML)) {
    clearEditcell()
  } else {
    createEditcell(pointing)
  }
}
