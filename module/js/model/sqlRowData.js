
import { calcWaitnum } from "../util/calcWaitnum.js"
import { USER } from "../main.js"

// GETNAME will find last previous entry of this hn in DB
export function sqlRowData(pointed, hnval, nameval)
{
  let row = pointed.closest('tr'),
    prevrow = row.previousElementSibling,
    nextrow = row.nextElementSibling,
    daterow = row.dataset.opdate,
    calcnum = row.dataset.waitnum || calcWaitnum(daterow, prevrow, nextrow),

    waitnum = `waitnum=${calcnum}`,
    opdate = `opdate=${row.dataset.opdate}`,
    staffname = `staffname=${row.dataset.staffname}`,
    hn = `hn=${hnval}`,
    name = `name=${nameval}`,
    diagnosis = `diagnosis=${row.dataset.diagnosis}`,
    treatment = `treatment=${row.dataset.treatment}`,
    contact = `contact=${row.dataset.contact}`,
    qn = `qn=${row.dataset.qn}`,
    user = `editor=${USER}`

  return `${hn}&${name}&${waitnum}&${opdate}&${staffname}&${diagnosis}&${treatment}&${contact}&${qn}&${user}`
}
