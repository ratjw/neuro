
import {
  CASENUMSV, HNSV, NAMESV, DIAGNOSISSV, TREATMENTSV, ADMISSIONSV,
  FINALSV, ADMITSV, DISCHARGESV
} from "../model/const.js"
import { clearEditcell, createEditcell } from "../control/edit.js"
import { isPACS } from "../util/updateBOOK.js"
import { inPicArea } from "../util/util.js"
import { editableSV } from "./setSERVICE.js"
import { PACS } from "../get/PACS.js"
import { showRecord } from "./showRecord.js"

// Set up editcell for keyin
// redirect click to openPACS or file upload
export function editPresentCellService(evt, pointing) {
  let cindex = pointing.cellIndex

  switch(cindex)
  {
    case CASENUMSV: break
    case HNSV: getHNSV(evt, pointing); break
    case NAMESV: clearEditcell(); break
    case DIAGNOSISSV:
    case ADMISSIONSV:
    case FINALSV: editableSV && createEditcell(pointing); break
    case TREATMENTSV: clearEditcell(); showRecord(pointing); break
    case ADMITSV:
    case DISCHARGESV: clearEditcell(); break
  }
}

function getHNSV(evt, pointing)
{
  clearEditcell()
  if (isPACS) {
    if (inPicArea(evt, pointing)) {
      PACS(pointing.innerHTML)
    }
  }
}
