
import { postData, MYSQLIPHP } from "./fetch.js"
import { USER } from "../main.js"
import { sqlCaseNum } from "./sqlSaveCaseNum.js"
import { sqlMover } from "./sqlMover.js"
import { MAXDATE } from "../control/const.js"
import { getLargestWaitnum, apostrophe } from "../util/util.js"
import { getBOOK } from "../util/updateBOOK.js"
import { PASTETOP, PASTEBOTTOM } from '../control/const.js'

export function sqlcopyCase(allNewCases, moverow, pasterow) {
  let sql = "",
    pastedate = pasterow.dataset.opdate,
    pastetheatre = pasterow.dataset.theatre,
    pasteroom = pasterow.dataset.oproom,
    pastecasenum = pasterow.dataset.casenum,
    pastepos = pasterow.classList.contains(PASTEBOTTOM) ? 1 : 0,
    row = moverow.cloneNode(true),
    staffname = row.dataset.staffname

  allNewCases.forEach((e, i) => {
    if (e === moveqn) {
      pasteroom
      ? sql += sqlCopier(newWaitnum, pastedate, pastetheatre, pasteroom, i + 1, moveqn)
      : sql += sqlCopier(newWaitnum, pastedate, pastetheatre, null, null, moveqn)
    } else {
      pasteroom
      ? sql += sqlCaseNum(i + 1, e)
      : sql += sqlCaseNum(null, e)
    }
  })

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
}

function sqlCopier(waitnum, opdate, theatre, oproom, casenum)
{
  if (pastedate === MAXDATE) {
    row.dataset.waitnum = getLargestWaitnum(getBOOK(), staffname) + 1
    row.dataset.opdate = MAXDATE
    row.dataset.theatre = ''
    row.dataset.oproom = null
    row.dataset.casenum = null
  } else {
    row.dataset.opdate = pastedate
    row.dataset.theatre = pastetheatre
    if (pasteroom) {
      row.dataset.oproom = pasteroom
      row.dataset.casenum = +pastecasenum + pastepos
    } else {
      row.dataset.oproom = null
      row.dataset.casenum = null
    }
  }

  return sql += sqlInsert(row)
}

function sqlInsert(row)
{
  let r = row.dataset,
    dob = r.dob,
    sql1 = dob ? `'${dob}'` : null

  return `INSERT INTO book SET
    waitnum=${r.waitnum},
    opdate='${r.opdate}',
    theatre='${apostrophe(r.theatre)}',
    oproom=${r.oproom},
    optime='${r.optime}',
    casenum=${r.casenum},
    staffname='${r.staffname}',
    hn='${r.hn}',
    patient='${apostrophe(r.patient)}',
    dob=${sql1},
    diagnosis='${apostrophe(r.diagnosis)}',
    treatment='${apostrophe(r.treatment)}',
    contact='${apostrophe(r.contact)}',
    editor='${USER}';`
}
