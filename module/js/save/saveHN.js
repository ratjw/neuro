
import { saveCaseHN } from "./saveCaseHN.js"
import { saveNameHN } from "./saveNameHN.js"
import { ISOdate } from "../util/date.js"
import { BOOK } from "../util/updateBOOK.js"

export function saveHN(pointed, content) {
  if (!/^\d{7}$/.test(content)) {
    pointed.innerHTML = ""
    return false
  }

  // waiting list after today
  let todate = ISOdate(new Date())
  let waiting = BOOK.find(q => (q.opdate > todate) && (q.hn === content))

  if (waiting) {
    // already having case in waiting list
    saveCaseHN(pointed, waiting)
  } else {
    // have been in the book before
    saveNameHN(pointed, content)
  }
}
