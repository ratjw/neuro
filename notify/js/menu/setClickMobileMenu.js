
import { searchCases, searchDB } from "./searchCases.js"
import { caseAll } from "./caseAll.js"
import { allDeletedCases } from "./allDeletedCases.js"
import { readme } from "./readme.js"
import { addnewrow } from "./addnewrow.js"
import { postponeCase } from "./postponeCase.js"
import { moveCase } from "./moveCase.js"
import { copyCase } from "./copyCase.js"
import { editHistory } from "./editHistory.js"
import { delCase } from "./delCase.js"
import { sendtoExcel } from "./sendtoExcel.js"
import { sendtoLINE } from "./sendtoLINE.js"

let clickevent = {
  "clicksearchCases": searchCases,
  "clickcaseAll": caseAll,
  "clickallDeletedCases": allDeletedCases,
  "clickeditHistory": editHistory,
//  "clickreadme": readme,
//  "addrow": addnewrow,
//  "postponecase": postponeCase,
  "moveCase": moveCase,
//  "copyCase": copyCase,
//  "delcase": delCase,
  "clicksendtoExcel": sendtoExcel,
  "clicksendtoLINE": sendtoLINE
}

export function setClickMenu()
{
  Object.entries(clickevent).forEach(([key, val]) => {
    document.getElementById(key).addEventListener('click', val)
  })
}
