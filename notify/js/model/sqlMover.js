
import { USER } from "../main.js"
import { LARGESTDATE } from "../control/const.js"

// if no oproom, will have no casenum too
export function sqlMover(waitnum, opdate, theatre, oproom, casenum, qn)
{
  if (opdate === LARGESTDATE) {
    return `UPDATE book SET
        waitnum=${waitnum},
        opdate='${opdate}',
        theatre='',
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
        theatre='${theatre}',
        oproom=${oproom},
        casenum=${casenum},
        admit=null,
        discharge=null,
        editor='${USER}'
        WHERE qn=${qn};`
  }
}
