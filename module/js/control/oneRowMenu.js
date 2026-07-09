
import { MAXDATE, SELECTED } from "../control/const.js"

// disable some menu-items for the one current row
// Menu for the current row -> addrow, postpone, moveCase, copyCase, tracking, del, setholyday
// Menu for all cases -> staffqueue, service, all deleted, search, readme
export function oneRowMenu()
{
  let row = document.querySelector(`.${SELECTED}`),
    prevDate = row.previousElementSibling.dataset.opdate,
    opdate = row.dataset.opdate,
    staffname = row.dataset.staffname,
    hn = row.dataset.hn,
    patient = row.dataset.patient,
    qn = row.dataset.qn,
    notLARGE = (opdate !== MAXDATE),

    movecopy = qn && patient && hn && staffname,
    postpone = qn && patient && hn && staffname && notLARGE

  enable(qn, "#addrow")

  if (postpone) {
    $("#postponecase").html("<b>Confirm เลื่อน ไม่กำหนดวัน  </b><br>" + patient)
  }
  enable(postpone, "#postpone")

  enable(movecopy, "#moveCase")

  enable(movecopy, "#copyCase")

  enable(qn, "#history")

  let Delete = qn || prevDate === opdate
  if (Delete) {
    $("#deleteCase").html("<b>Confirm Delete </b><br>" + patient)
  }
  enable(Delete, "#delete")

  enable(notLARGE, "#setholyday")
}

function enable(able, id)
{
  if (able) {
    $(id).removeClass("disabled")
  } else {
    $(id).addClass("disabled")
  }
}
