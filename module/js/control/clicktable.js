import {
  OPDATE, THEATRE, OPROOM, OPTIME, CASENUM, STAFFNAME, HN, PATIENT, DIAGNOSIS,
  TREATMENT, LAB, EQUIPMENT, CONTACT
} from "../control/const.js"
import {
  POINTER, OLDCONTENT, getNewcontent, createEditcell, clearEditcell
} from "./edit.js"
import { clearMouseoverTR } from "../util/util.js"
import { clearAllEditing } from "./clearAllEditing.js"

import { saveTheatre } from "../save/saveTheatre.js"
import { saveOpRoom } from "../save/saveOpRoom.js"
import { saveOpTime } from "../save/saveOpTime.js"
import { saveContent } from "../save/saveContent.js"
import { saveCaseNum } from "../save/saveCaseNum.js"
import { saveHN } from "../save/saveHN.js"
import { savePATIENT } from "../save/savePATIENT.js"

import { selectRow, clearSelection } from "../control/selectRow.js"
import { getTHEATRE } from "../get/getTHEATRE.js"
import { getROOM } from "../get/getROOM.js"
import { getOPTIME } from "../get/getOPTIME.js"
import { getCASENUM } from "../get/getCASENUM.js"
import { getSTAFFNAME } from "../get/getSTAFFNAME.js"
import { getHN } from "../get/getHN.js"
import { getPATIENT } from "../get/getPATIENT.js"
import { getLAB } from "../get/getLAB.js"
import { getEQUIP } from "../get/getEQUIP.js"

// Click on main or staff table
// POINTER is the previous editing cell
export function clicktable(evt, target) {
  if (POINTER) {
    savePreviousCell()
  }
  if ((target.nodeName === "TD") && (!POINTER || POINTER.cellIndex > PATIENT)) {
    editPresentCell(evt, target)
  } else {
    clearAllEditing()
  }
}

export function savePreviousCell() {
  let column = POINTER && POINTER.cellIndex
  let newcontent = getNewcontent()

  if (!POINTER || (OLDCONTENT === newcontent)) { return }

  switch(column)
  {
    case OPDATE: break
    case THEATRE: saveTheatre(POINTER, newcontent); break
    case OPROOM: saveOpRoom(POINTER, newcontent); break
    case OPTIME: saveOpTime(POINTER, newcontent); break
    case CASENUM: saveCaseNum(POINTER, newcontent); break
    case STAFFNAME: break
    case HN: saveHN(POINTER, newcontent); break
    case PATIENT: savePATIENT(POINTER); break
    case DIAGNOSIS: saveContent(POINTER, "diagnosis", newcontent); break
    case TREATMENT: saveContent(POINTER, "treatment", newcontent); break
    case CONTACT: saveContent(POINTER, "contact", newcontent); break
  }
}

// Set up editcell for keyin or menu/spinner selection
export function editPresentCell(evt, pointing) {
  let column = pointing && pointing.cellIndex

  if (column === OPDATE) {
    clearEditcell()
    clearMouseoverTR()
  } else {
    clearSelection()
  }

  switch(column)
  {
    case OPDATE: selectRow(evt, pointing); break
    case THEATRE: createEditcell(pointing); break
    case OPROOM: getROOM(pointing); break
    case OPTIME: getOPTIME(pointing); break
    case CASENUM: getCASENUM(pointing); break
    case STAFFNAME: getSTAFFNAME(pointing); break
    case HN: getHN(evt, pointing); break
    case PATIENT: getPATIENT(pointing); break
    case DIAGNOSIS: createEditcell(pointing); break
    case TREATMENT: createEditcell(pointing); break
    case LAB: getLAB(pointing); break
    case EQUIPMENT: getEQUIP(pointing); break
    case CONTACT: createEditcell(pointing); break
  }
}
