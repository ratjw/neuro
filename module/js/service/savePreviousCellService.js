import {
  CASENUMSV, HNSV, NAMESV, DIAGNOSISSV, TREATMENTSV, ADMISSIONSV,
  FINALSV, ADMITSV, DISCHARGESV
} from "../model/const.js"
import { POINTER, OLDCONTENT, getNewcontent } from "../control/edit.js"
import { sqlSaveService } from "../model/sqlservice.js"
import { getBOOKrowByQN } from "../util/rowsgetting.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { URIcomponent, Alert } from "../util/util.js"
import { thDate } from "../util/date.js"
import { reViewService } from "./showService.js"
import { coloring } from "./coloring.js"
import { setSERVICE, SERVICE } from "./setSERVICE.js"
import { viewProfile } from './viewProfile.js'
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
    case ADMISSIONSV:
      saveContentService(POINTER, "admission", newcontent)
      break
    case FINALSV:
      saveContentService(POINTER, "final", newcontent)
      break
    case TREATMENTSV:
    case ADMITSV:
    case DISCHARGESV:
      break
  }
}

//column matches column name in MYSQL
export function saveContentService(pointed, column, content)
{
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

  sqlSaveService(column, newcontent, qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)

      // other user may add a row
      let oldlen = SERVICE.length
      setSERVICE(response.SERVICE)
      let newlen = SERVICE.length
      if (oldlen !== newlen) {
        reViewService()
      } else if (pointed.cellIndex === TREATMENTSV) {
        let serviceq = getBOOKrowByQN(SERVICE, qn),
          opdateth = thDate(serviceq.opdate),
          treatment = serviceq.treatment
        pointed.innerHTML = viewProfile(serviceq.profile, opdateth, treatment)
        row.dataset.treatment = serviceq.treatment
        row.dataset.profile = serviceq.profile
        coloring(row)
      }
    } else {
      Alert("saveService", response)
      pointed.innerHTML = OLDCONTENT
      // return to previous content
    }
  }).catch(error => {})
}
