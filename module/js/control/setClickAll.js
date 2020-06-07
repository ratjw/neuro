
import { searchCases, searchDB } from "../menu/searchCases.js"
import { caseAll } from "../menu/caseAll.js"
import { allDeletedCases } from "../menu/allDeletedCases.js"
import { readme } from "../menu/readme.js"
import { addnewrow } from "../menu/addnewrow.js"
import { postponeCase } from "../menu/postponeCase.js"
import { moveCase } from "../menu/moveCopyCase.js"
import { copyCase } from "../menu/moveCopyCase.js"
import { editHistory } from "../menu/editHistory.js"
import { deleteCase } from "../menu/deleteCase.js"
import { researchResident } from '../setting/researchResident.js'
import { settingHoliday, addHoliday } from "../setting/settingHoliday.js"
import { settingResident } from '../setting/settingResident.js'
import { settingStaff } from '../setting/settingStaff.js'
import { monthpicker, hidemonthpicker } from '../service/monthpicker.js'
import { ADMIN, USER } from "../main.js"
import { getSTAFFparsed } from "../util/getSTAFFparsed.js"
import { startRESIDENT } from "../model/sqlDoResident.js"

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
    "deleteCase": deleteCase
  }

  Object.entries(clickMenu).forEach(([key, val]) => {
    document.getElementById(key).addEventListener('click', val)
  })
}

function setClickSetting()
{
  const clickSetting = {
    "clickresResearch": researchResident,
    "clickSetResident": settingResident,
    "clickSetStaff": settingStaff,
    "clickSetHoliday": settingHoliday,
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

export async function getPermission(submenu, rname)
{
  const staffid = getSTAFFparsed().map(e => e.profile.ramaid),
    residents = await startRESIDENT(),
    residentid = residents.map(e => e.ramaid),
    barname = residents.find(e => e.residentname === rname),
    barid = barname && barname.ramaid || '',
    permission = {
      disable: [ADMIN, ...staffid],
      slider: [ADMIN, ...staffid, ...residentid],
      resBar: [ADMIN, ...staffid, barid]
    }

  return permission[submenu].includes(USER)
}
