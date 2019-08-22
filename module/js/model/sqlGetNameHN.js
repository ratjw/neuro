
import { postData } from "./fetch.js"
import { calcWaitnum } from "../util/calcWaitnum.js"
import { USER } from "../main.js"

const GETNAMEHN = "php/getnamehn.php"

// GETNAMEHN will find last previous entry of this hn in DB
export function sqlGetNameHN(pointed, content, signal)
{
  let row = pointed.closest('tr'),
    opdate = row.dataset.opdate,
    staffname = row.dataset.staffname,
    diagnosis = row.dataset.diagnosis,
    treatment = row.dataset.treatment,
    contact = row.dataset.contact,
    qn = row.dataset.qn,
    prevrow = row.previousElementSibling,
    nextrow = row.nextElementSibling,
    waitnum = row.dataset.waitnum || calcWaitnum(opdate, prevrow, nextrow),
    hn = `hn=${content}`,
    user = `editor=${USER}`

    waitnum = `waitnum=${waitnum}`
    opdate = `opdate=${row.dataset.opdate}`
    staffname = `staffname=${row.dataset.staffname}`
    diagnosis = `diagnosis=${row.dataset.diagnosis}`
    treatment = `treatment=${row.dataset.treatment}`
    contact = `contact=${row.dataset.contact}`
    qn = `qn=${row.dataset.qn}`

  let sql = `${hn}&${waitnum}&${opdate}&${staffname}&${diagnosis}&${treatment}&${contact}&${qn}&${user}`

  return postData(GETNAMEHN, sql, signal)
}
