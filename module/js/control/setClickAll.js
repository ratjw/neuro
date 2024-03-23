
import { searchCases, searchDB } from "../menu/searchCases.js"
import { caseAll } from "../menu/caseAll.js"
import { caseAll2Excel } from "../menu/caseAll2Excel.js"
import { caseAll2CSV, cases2Excel, cases2CSV, InterTime,
  InterTime2Excel, InterTime2CSV, InterAll, InterAll2Excel, InterAll2CSV
} from "../menu/cases2File.js"
import { allDeletedCases } from "../menu/allDeletedCases.js"
import { readme } from "../menu/readme.js"
import { addnewrow } from "../menu/addnewrow.js"
import { postponeCase } from "../menu/postponeCase.js"
import { moveCase } from "../menu/moveCopyCase.js"
import { copyCase } from "../menu/moveCopyCase.js"
import { editHistory } from "../menu/editHistory.js"
import { deleteCase } from "../menu/deleteCase.js"
import { researchResident } from '../setting/researchResident.js'
import { settingHoliday } from "../setting/settingHoliday.js"
import { settingGovtday } from "../setting/settingGovtday.js"
import { settingResident } from '../setting/settingResident.js'
import { settingStaff } from '../setting/settingStaff.js'
import { monthpicker, hidemonthpicker } from '../service/monthpicker.js'
import { ADMIN, USER } from "../main.js"
import { getSTAFFdivision } from "../setting/getStaff.js"
import { getRESIDENTdivision } from "../setting/getResident.js"
import { DIVISION } from "../main.js"

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
    "clickcases2Excel": cases2Excel,
    "clickcases2CSV": cases2CSV,
    "clickInterTime": InterTime,
    "clickInterTime2Excel": InterTime2Excel,
    "clickInterTime2CSV": InterTime2CSV,
    "clickAll": caseAll,
    "clickAll2Excel": caseAll2Excel,
    "clickAll2CSV": caseAll2CSV,
    "clickInterAll": InterAll,
    "clickInterAll2Excel": InterAll2Excel,
    "clickInterAll2CSV": InterAll2CSV,
    "clickallDeletedCases": allDeletedCases,
    "clickeditHistory": editHistory,
    "clickreadme": readme,
    "addrow": addnewrow,
    "postponecase": postponeCase,
    "moveCase": moveCase,
    "copyCase": copyCase,
    "deleteCase": deleteCase,
    "setholiday": settingHoliday
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
    "clickSetGovtday": settingGovtday
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
  const staffs = getSTAFFdivision(DIVISION),
    staffid = staffs.map(e => e.ramaid),
    residents = getRESIDENTdivision(DIVISION),
    residentid = residents.map(e => e.ramaid),
    barname = residents.find(e => e.name === rname),
    barid = barname && barname.ramaid || '',
    permission = {
      disable: [ADMIN, ...staffid],
      slider: [ADMIN, ...staffid, ...residentid],
      resBar: [ADMIN, ...staffid, barid]
    }

  return permission[submenu].includes(USER)
}
