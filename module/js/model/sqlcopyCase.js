
import { postData, MYSQLIPHP } from "./fetch.js"
import { USER } from "../main.js"
import { sqlCaseNum } from "./sqlSaveCaseNum.js"
import { sqlMover } from "./sqlMover.js"
import { MAXDATE } from "../control/const.js"
import { getLargestWaitnum, apostrophe } from "../util/util.js"
import { getBOOK } from "../util/updateBOOK.js"
import { PASTETOP, PASTEBOTTOM } from '../control/const.js'
import { calcWaitnum } from "../util/calcWaitnum.js"

export function sqlcopyCase(allNewCases, moverow, pasterow) {
  let moveqn = moverow.dataset.qn,
    pasteroom = pasterow.dataset.oproom,
    sql = sqlCopyPaster(moverow, pasterow)

  allNewCases.forEach((e, i) => {
    if (e !== moveqn) {
      pasteroom
      ? sql += sqlCaseNum(i + 1, e)
      : sql += sqlCaseNum(null, e)
    }
  })

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
}

function sqlCopyPaster(moverow, pasterow)
{
  let origin = moverow.dataset,
    dob = origin.dob ? `'${origin.dob}'` : null,
    pastedate = pasterow.dataset.opdate,
    pastetheatre = pasterow.dataset.theatre,
    pasteroom = pasterow.dataset.oproom,
    pastecasenum = pasterow.dataset.casenum,
    pastepos = pasterow.classList.contains(PASTEBOTTOM) ? 1 : 0,
    paster = {}

  if (pastedate === MAXDATE) {
    paster.waitnum = getLargestWaitnum(getBOOK(), origin.staffname) + 1
    paster.opdate = MAXDATE
    paster.theatre = ''
    paster.oproom = null
    paster.casenum = null
  } else {
    paster.waitnum = pastepos
      ? calcWaitnum(pastedate, pasterow, pasterow.nextElementSibling)
      : calcWaitnum(pastedate, pasterow.previousElementSibling, pasterow)
    paster.opdate = pastedate
    paster.theatre = pastetheatre
    if (pasteroom) {
      paster.oproom = pasteroom
      paster.casenum = +pastecasenum + pastepos
    } else {
      paster.oproom = null
      paster.casenum = null
    }
  }

  return `INSERT INTO book SET
    waitnum=${paster.waitnum},
    opdate='${paster.opdate}',
    theatre='${apostrophe(paster.theatre)}',
    oproom=${paster.oproom},
    optime='${origin.optime}',
    casenum=${paster.casenum},
    staffname='${origin.staffname}',
    hn='${origin.hn}',
    patient='${apostrophe(origin.patient)}',
    dob=${dob},
    diagnosis='${apostrophe(origin.diagnosis)}',
    treatment='${apostrophe(origin.treatment)}',
    contact='${apostrophe(origin.contact)}',
    editor='${USER}';`
}
