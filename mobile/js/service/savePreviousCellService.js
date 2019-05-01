import {
  CASENUMSV, HNSV, NAMESV, DIAGNOSISSV, TREATMENTSV, ADMISSIONSV,
  FINALSV, PROFILESV, ADMITSV, OPDATESV, DISCHARGESV
} from "../model/const.js"
import { POINTER, OLDCONTENT, getNewcontent } from "../control/edit.js"
import { sqlSaveService } from "../model/sqlservice.js"
import { getBOOKrowByQN } from "../util/rowsgetting.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { URIcomponent, Alert } from "../util/util.js"
import { reViewService } from "./showService.js"
import { coloring } from "./coloring.js"
import { setSERVICE, SERVICE } from "./setSERVICE.js"
import { viewRecord } from './viewRecord.js'
export function savePreviousCellService() {
  let newcontent = getNewcontent()

  if (!POINTER || (OLDCONTENT === newcontent)) {
    return
  }

  switch(POINTER.cellIndex)
  {
    case CASENUMSV:
    case HNSV:
    case NAMESV:
      break
    case DIAGNOSISSV:
      saveContentService(POINTER, "diagnosis", newcontent)
      break
    case TREATMENTSV:
      saveContentService(POINTER, "treatment", newcontent)
      break
    case ADMISSIONSV:
      saveContentService(POINTER, "admission", newcontent)
      break
    case FINALSV:
      saveContentService(POINTER, "final", newcontent)
      break
    case PROFILESV:
    case ADMITSV:
    case OPDATESV:
    case DISCHARGESV:
      break
  }
}

//column matches column name in MYSQL
let saveContentService = function (pointed, column, content) {

  // Not refillService because it may make next cell back to old value
  // when fast entry, due to slow return from Ajax of previous input
  pointed.innerHTML = content || ''

  // take care of white space, double qoute, single qoute, and back slash
  content = URIcomponent(content)

  saveService(pointed, column, content)
}

export function saveService(pointed, column, newcontent) {
  let row = pointed.closest("tr"),
    qn = row.dataset.qn

  sqlSaveService(pointed, column, newcontent, qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)

      // other user may add a row
      let oldlen = SERVICE.length
      setSERVICE(response.SERVICE)
      let newlen = SERVICE.length
      if (oldlen !== newlen) {
        reViewService()
      } else if (pointed.cellIndex === PROFILESV) {
        pointed.innerHTML = viewRecord(newcontent)
        row.dataset.profile = newcontent
        coloring(row)
      }
    } else {
      Alert("saveService", response)
      pointed.innerHTML = OLDCONTENT
      // return to previous content
    }
  }).catch(error => {})
}
