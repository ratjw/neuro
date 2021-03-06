
import { postData, MYSQLIPHP } from "./fetch.js"
import { USER } from "../main.js"
import { calcWaitnum } from "../util/calcWaitnum.js"
import { apostrophe, getTitlename } from "../util/util.js"

export function sqlMoveCaseHN(pointed, waiting, wanting)
{
  let  sql = `UPDATE book SET deleted=1,editor='${USER}' WHERE qn=${waiting.qn};`
            + sqlCaseHN(pointed, waiting, wanting)

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
}

export function sqlCopyCaseHN(pointed, waiting, wanting)
{
  let  sql = sqlCaseHN(pointed, waiting, wanting)

  return postData(MYSQLIPHP, {sqlReturnbook:sql})
}

function sqlCaseHN(pointed, waiting, wanting)
{
  let tableID = pointed.closest('table').id,
    qn = pointed.closest('tr').dataset.qn

  if (qn) {
    return sqlUpdateHN(tableID, qn, waiting, wanting)
  } else {
    return sqlInsertHN(tableID, pointed, waiting, wanting)
  }
}

function sqlUpdateHN(tableID, qn, waiting, wanting)
{
  let hn = waiting.hn,
    patient = waiting.patient,
    dob = waiting.dob,
    staffname = getTitlename(tableID)

  return `UPDATE book
    SET hn='${hn}',
      patient='${patient}',
      dob='${dob}',
      staffname='${wanting.staffname || staffname}',
      diagnosis='${apostrophe(wanting.diagnosis)}',
      treatment='${apostrophe(wanting.treatment)}',
      contact='${apostrophe(wanting.contact)}',
      editor='${USER}'
    WHERE qn=${qn};`
}

function sqlInsertHN(tableID, pointed, waiting, wanting)
{
  let row = pointed.closest("tr"),
    opdate = row.dataset.opdate,

    hn = waiting.hn,
    patient = waiting.patient,
    dob = waiting.dob,
    staffname = getTitlename(tableID),

    // new row, calculate waitnum
    // store waitnum in row waitnum
    waitnum = calcWaitnum(opdate, row.previousElementSibling, row.nextElementSibling)

  return dob 
  ? `INSERT INTO book
    (waitnum,opdate,hn,patient,dob,staffname,diagnosis,treatment,contact,editor)
    VALUES (${waitnum},'${opdate}','${hn}','${patient}','${dob}',
    '${wanting.staffname || staffname}','${apostrophe(wanting.diagnosis)}',
    '${apostrophe(wanting.treatment)}','${apostrophe(wanting.contact)}',
    '${USER}');`
  : `INSERT INTO book
    (waitnum,opdate,hn,patient,dob,staffname,diagnosis,treatment,contact,editor)
    VALUES (${waitnum},'${opdate}','${hn}','${patient}',null,
    '${wanting.staffname || staffname}','${apostrophe(wanting.diagnosis)}',
    '${apostrophe(wanting.treatment)}','${apostrophe(wanting.contact)}',
    '${USER}');`
}
