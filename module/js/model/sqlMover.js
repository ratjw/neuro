
import { USER } from "../main.js"
import { MAXDATE } from "../control/const.js"

// if no oproom, will have no casenum too
export function sqlMover(waitnum, opdate, oproom, casenum, qn)
{
  if (opdate === MAXDATE) {
    return `UPDATE book SET
        waitnum=${waitnum},
        opdate='${opdate}',
        oproom=null,
        optime='',
        casenum=null,
        admit=null,
        discharge=null,
        editor='${USER}'
        WHERE qn=${qn};`
  } else {
    return `UPDATE book SET
        waitnum=${waitnum},
        opdate='${opdate}',
        oproom=${oproom},
        casenum=${casenum},
        admit=null,
        discharge=null,
        editor='${USER}'
        WHERE qn=${qn};`
  }
}
