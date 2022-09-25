
import {
  CASENUMSV, HNSV, NAMESV, DIAGNOSISSV, TREATMENTSV, ADMISSIONSV,
  FINALSV, ADMITSV, DISCHARGESV
} from "../control/const.js"
import { clearEditcell, createEditcell } from "../control/edit.js"
import { editableSV } from "./setSERVICE.js"
import { showProfile } from "./showProfile.js"

// Set up editcell for keyin
export function editPresentCellService(evt, pointing) {
  let cindex = pointing.cellIndex

  switch(cindex)
  {
    case CASENUMSV: break
    case HNSV: clearEditcell(); break
    case NAMESV: clearEditcell(); break
    case DIAGNOSISSV: editableSV && createEditcell(pointing); break
    case TREATMENTSV: clearEditcell(); showProfile(pointing); break
    case ADMISSIONSV: editableSV && createEditcell(pointing); break
    case FINALSV: editableSV && createEditcell(pointing); break
    case ADMITSV: clearEditcell(); break
    case DISCHARGESV: clearEditcell(); break
  }
}
