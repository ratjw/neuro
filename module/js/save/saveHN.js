
import { saveCaseHN } from "./saveCaseHN.js"
import { saveThisHN } from "./saveThisHN.js"
import { obj_2_ISO } from "../util/date.js"
import { getBOOK } from "../util/updateBOOK.js"

export function saveHN(pointed, content) {
  // waiting list after today
  const todate = obj_2_ISO(new Date())
  const book = getBOOK()
  const waiting = book.find(q => (q.opdate > todate) && (q.hn === content))

  if (waiting) {
    // already having case in waiting list
    saveCaseHN(pointed, waiting)
  } else {
    // new case or may have been in the book before
    saveThisHN(pointed, content)
  }
}
