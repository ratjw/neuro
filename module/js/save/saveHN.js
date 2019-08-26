
import { saveCaseHN } from "./saveCaseHN.js"
import { saveThisHN } from "./saveThisHN.js"
import { ISOdate } from "../util/date.js"
import { BOOK } from "../util/updateBOOK.js"

export function saveHN(pointed, content) {
  // waiting list after today
  let todate = ISOdate(new Date())
  let waiting = BOOK.find(q => (q.opdate > todate) && (q.hn === content))

  if (waiting) {
    // already having case in waiting list
    saveCaseHN(pointed, waiting)
  } else {
    // new case or may have been in the book before
    saveThisHN(pointed, content)
  }
}
