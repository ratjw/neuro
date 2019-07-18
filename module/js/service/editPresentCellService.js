
import {
  CASENUMSV, HNSV, NAMESV, DIAGNOSISSV, TREATMENTSV, ADMISSIONSV,
  FINALSV, ADMITSV, DISCHARGESV, PACS
} from "../control/const.js"
import { clearEditcell, createEditcell } from "../control/edit.js"
import { isPACS } from "../main.js"
import { inPicArea } from "../util/util.js"
import { editableSV } from "./setSERVICE.js"
import { showProfile } from "./showProfile.js"

// Set up editcell for keyin
// redirect click to openPACS or file upload
export function editPresentCellService(evt, pointing) {
  let cindex = pointing.cellIndex

  switch(cindex)
  {
    case CASENUMSV: break
    case HNSV: getHNSV(evt, pointing); break
    case NAMESV: clearEditcell(); break
    case DIAGNOSISSV: editableSV && createEditcell(pointing); break
    case TREATMENTSV: clearEditcell(); showProfile(pointing); break
    case ADMISSIONSV: editableSV && createEditcell(pointing); break
    case FINALSV: editableSV && createEditcell(pointing); break
    case ADMITSV: clearEditcell(); break
    case DISCHARGESV: clearEditcell(); break
  }
}

function getHNSV(evt, pointing)
{
  clearEditcell()
  if (isPACS) {
    if (inPicArea(evt, pointing)) {
      window.open(PACS + pointing.innerHTML)
    }
  }
}
