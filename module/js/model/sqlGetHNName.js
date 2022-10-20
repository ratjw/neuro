
import { postData } from "./fetch.js"
import { calcWaitnum } from "../util/calcWaitnum.js"
import { USER } from "../main.js"

// GETHN, GETNAME will find last previous entry of this hn in DB by lastEntryHN
const GETHN = "php/gethn.php"
const GETNAME = "php/getname.php"

export function sqlGetHN(pointed, content)
{
  let sql = sqlRowData(pointed, content)

  return postData(GETHN, sql)
}

export function sqlGetName(pointed, patientname, signal)
{
  let sql = sqlRowData(pointed, "", patientname)

  return postData(GETNAME, sql, signal)
}

// GETNAME will find last previous entry of this hn in DB
function sqlRowData(pointed, hnval, patientnameval)
{
  let row = pointed.closest('tr'),
    prevrow = row.previousElementSibling,
    nextrow = row.nextElementSibling,
    daterow = row.dataset.opdate

  return {
    waitnum: row.dataset.waitnum || calcWaitnum(daterow, prevrow, nextrow),
    opdate: daterow,
    staffname: row.dataset.staffname,
    hn: hnval ? hnval : '',
    patientname: patientnameval ? patientnameval : '',
    diagnosis: row.dataset.diagnosis,
    treatment: row.dataset.treatment,
    contact: row.dataset.contact,
    qn: row.dataset.qn,
    user: USER
  }
}
