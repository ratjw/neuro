
import { searchCases, searchDB } from "../menu/searchCases.js"
import { caseAll } from "../menu/caseAll.js"
import { allDeletedCases } from "../menu/allDeletedCases.js"
import { readme } from "../menu/readme.js"
import { addnewrow } from "../menu/addnewrow.js"
import { postponeCase } from "../menu/postponeCase.js"
import { moveCase } from "../menu/moveCase.js"
import { copyCase } from "../menu/copyCase.js"
import { editHistory } from "../menu/editHistory.js"
import { delCase } from "../menu/delCase.js"
import { sendtoExcel } from "../menu/sendtoExcel.js"
import { sendtoLINE } from "../menu/sendtoLINE.js"
import { resEPA } from '../setting/resEPA.js'
import { resResearch } from '../setting/resResearch.js'
import { inputHoliday, addHoliday } from "../setting/inputHoliday.js"
import { settingResident } from '../setting/settingResident.js'
import { settingStaff } from '../setting/settingStaff.js'
import { monthpicker, hidemonthpicker } from '../service/monthpicker.js'
import { ADMIN, USER } from "../main.js"
import { STAFF } from "../util/updateBOOK.js"
import { RESIDENT } from "../model/sqlDoResident.js"

export function setClickAll()
{
  setClickMenu()
  setClickSetting()
  setClickService()
}

function setClickMenu()
{
  const clickMenu = {
    "clicksearchCases": searchCases,
    "clickcaseAll": caseAll,
    "clickallDeletedCases": allDeletedCases,
    "clickeditHistory": editHistory,
    "clickreadme": readme,
    "addrow": addnewrow,
    "postponecase": postponeCase,
    "moveCase": moveCase,
    "copyCase": copyCase,
    "delcase": delCase,
    "clicksendtoExcel": sendtoExcel,
    "clicksendtoLINE": sendtoLINE
  }

  Object.entries(clickMenu).forEach(([key, val]) => {
    document.getElementById(key).addEventListener('click', val)
  })
}

function setClickSetting()
{
  const clickSetting = {
    "clickresResearch": resResearch,
    "clickSetResident": settingResident,
    "clickSetStaff": settingStaff,
    "clickSetHoliday": inputHoliday,
    "addholiday": addHoliday
  },
  disable = [
    "#clickSetResident",
    "#clickSetStaff"
  ]

  Object.entries(clickSetting).forEach(([key, val]) => {
    document.getElementById(key).onclick = val
  })

  if (!getPermission('disable')){
    disable.forEach(e => document.querySelector(e).className = "disabled")
  }
}

function setClickService()
{
  const service = document.querySelector("#clickserviceReview")

  service.onclick =  monthpicker
  service.onmouseover = monthpicker
  service.onmouseout = hidemonthpicker
}

export function getPermission(submenu, rname)
{
  const staffid = STAFF.map(e => e.ramaid),
    residentid = RESIDENT.map(e => e.ramaid),
    barname = RESIDENT.find(e => e.residentname === rname),
    barid = barname && barname.ramaid || '',
    permission = {
      disable: [...ADMIN, ...staffid],
      slider: [...ADMIN, ...staffid, ...residentid],
      resBar: [...ADMIN, ...staffid, barid]
    }

  return permission[submenu].includes(USER)
}
