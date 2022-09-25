
import { sqlAllDeletedCases, sqlUndelete } from "../model/sqlAllDeletedCases.js"
import { getBOOK, getCONSULT, updateBOOK } from "../util/updateBOOK.js"
import { Alert, reposition } from "../util/util.js"
import { viewAllDeletedCases } from "../view/viewAllDeletedCases.js"
import { scrolltoThisCase } from "../view/scrolltoThisCase.js"
import { refillHoliday } from "../view/fillHoliday.js"

export function allDeletedCases()
{
  sqlAllDeletedCases().then(response => {
    if (typeof response === "object") {
      viewAllDeletedCases(response)
    } else {
      Alert("allDeletedCases", response)
    }
	}).catch(error => alert(error.stack))
}

export function toUndelete(thisdate) 
{
  reposition($("#undelete"), "left center", "left center", thisdate)

  // #undelete, #undel are not in the table, just showing, recieving the click and go
  $("#undel").off().on("click", function() {
    let row = thisdate.closest("tr"),
      waitnum = row.dataset.waitnum,
      opdate = row.dataset.opdate,
      oproom = row.dataset.oproom,
      casenum = row.dataset.casenum,
      staffname = row.dataset.staffname,
      qn = row.dataset.qn,

      book = (waitnum < 0)? getCONSULT() : getBOOK(),
      allCases = sameDateRoomBookQNs(book, opdate, oproom)

    allCases.splice(casenum, 0, qn)

    sqlUndelete(allCases, oproom, qn, 0).then(response => {
      if (typeof response === "object") {
        updateBOOK(response)
        refillHoliday()
        scrolltoThisCase(qn)
      } else {
        Alert("toUndelete", response)
      }
    }).catch(error => alert(error.stack))

    $('#dialogAllDeleted').dialog("close")
  })
}

function sameDateRoomBookQNs(book, opdate, oproom)
{
  if (!oproom) { return [] }

  return book.filter(q => {
    return q.opdate === opdate && Number(q.oproom) === Number(oproom);
  }).map(e => e.qn)
}
