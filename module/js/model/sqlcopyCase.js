
import { postData, MYSQLIPHP } from "./fetch.js"
import { USER } from "../main.js"
import { sqlCaseNum } from "./sqlSaveCaseNum.js"
import { sqlMover } from "./sqlMover.js"
import { MAXDATE } from "../control/const.js"
import { getLargestWaitnum, apostrophe } from "../util/util.js"
import { getBOOK } from "../util/updateBOOK.js"

export function sqlcopyCase(allNewCases, moverow, thisrow) {
  let sql = "",
    thisdate = thisrow.dataset.opdate,
    thistheatre = thisrow.dataset.theatre,
    thisroom = thisrow.dataset.oproom,
    row = moverow.cloneNode(true),
    staffname = row.dataset.staffname,
    qn = row.dataset.qn,
    index = allNewCases.indexOf(qn)

  if (thisdate === MAXDATE) {
    row.dataset.waitnum = getLargestWaitnum(getBOOK(), staffname) + 1
    row.dataset.opdate = MAXDATE
    row.dataset.theatre = ''
    row.dataset.oproom = null
    row.dataset.casenum = null
  } else {
    row.dataset.opdate = thisdate
    row.dataset.theatre = thistheatre
    if (thisroom) {
      row.dataset.oproom = thisroom
      row.dataset.casenum = +row.dataset.casenum + 1
    } else {
      row.dataset.oproom = null
      row.dataset.casenum = null
    }
  }

  sql += sqlInsert(row)

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
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
