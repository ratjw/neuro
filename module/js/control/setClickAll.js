
import { search2Screen, searchDB } from "../menu/search2Screen.js"
import { search2Excel } from "../menu/search2Excel.js"
import { search2CSV } from "../menu/search2CSV.js"
import { searchPeriod2Screen } from "../menu/searchPeriod2Screen.js"
import { searchPeriod2Excel } from "../menu/searchPeriod2Excel.js"
import { searchPeriod2CSV } from "../menu/searchPeriod2CSV.js"
import { all2Screen } from "../menu/all2Screen.js"
import { all2Excel } from "../menu/all2Excel.js"
import { all2CSV } from "../menu/all2CSV.js"
import { allPeriod2Screen } from "../menu/allPeriod2Screen.js"
import { allPeriod2Excel } from "../menu/allPeriod2Excel.js"
import { allPeriod2CSV } from "../menu/allPeriod2CSV.js"
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
    "clicksearch2Screen": search2Screen,
    "clicksearch2Excel": search2Excel,
    "clicksearch2CSV": search2CSV,
    "clicksearchPeriod2Screen": searchPeriod2Screen,
    "clicksearchPeriod2Excel": searchPeriod2Excel,
    "clicksearchPeriod2CSV": searchPeriod2CSV,
    "clickall2Screen": all2Screen,
    "clickall2Excel": all2Excel,
    "clickall2CSV": all2CSV,
    "clickallPeriod2Screen": allPeriod2Screen,
    "clickallPeriod2Excel": allPeriod2Excel,
    "clickallPeriod2CSV": allPeriod2CSV,
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
