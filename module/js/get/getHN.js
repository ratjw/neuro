
import { createEditcell, clearEditcell } from "../control/edit.js"
import { isPACS } from "../main.js"
import { inPicArea } from "../util/util.js"
import { PACS } from "../control/const.js"

export function getHN(evt, pointing)
{
  if (pointing.innerHTML) {
    clearEditcell()
    if (isPACS) {
      if (inPicArea(evt, pointing)) {
        window.open(PACS + pointing.innerHTML)
      }
    }
  } else {
    createEditcell(pointing)
  }
}
