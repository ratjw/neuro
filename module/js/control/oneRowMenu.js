
import { LARGESTDATE, SELECTED } from "../control/const.js"

// disable some menu-items for the one current row
// Menu for the current row -> addrow, postpone, moveCase, copyCase, tracking, del
// Menu for all cases -> staffqueue, service, all deleted, search, readme
export function oneRowMenu()
{
  let row = document.querySelector(`.${SELECTED}`),
    prevDate = row.previousElementSibling.dataset.opdate,
    opdate = row.dataset.opdate,
    staffname = row.dataset.staffname,
    patient = row.dataset.patient,
    qn = row.dataset.qn,
    notLARGE = (opdate !== LARGESTDATE)

  enable(qn, "#addrow")

  let postpone = qn && staffname && notLARGE
  if (postpone) {
    $("#postponecase").html("<b>Confirm เลื่อน ไม่กำหนดวัน  </b><br>" + patient)
  }
  enable(postpone, "#postpone")

  enable(qn, "#moveCase")

  enable(qn, "#copyCase")

  enable(qn, "#history")

  let Delete = qn || prevDate === opdate
  if (Delete) {
    $("#deleteCase").html("<b>Confirm Delete </b><br>" + patient)
  }
  enable(Delete, "#delete")

  enable(true, "#EXCEL")

  enable(true, "#LINE")
}

function enable(able, id)
{
  if (able) {
    $(id).removeClass("disabled")
  } else {
    $(id).addClass("disabled")
  }
}
