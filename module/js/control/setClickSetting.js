
import { resEPA } from '../setting/resEPA.js'
import { resResearch } from '../setting/resResearch.js'
import { inputHoliday, addHoliday, delHoliday } from "../setting/inputHoliday.js"
import { viewResident } from '../setting/viewResident.js'
import { viewStaff } from '../setting/viewStaff.js'

export function setClickSetting()
{
  let onclick = {
    "clickresEPA": resEPA,
    "clickresResearch": resResearch,
    "clickaddResident": viewResident,
    "clickaddStaff": viewStaff,
    "clicksetHoliday": inputHoliday,
    "addholiday": addHoliday
  }

  $.each(onclick, function(key, val) {
    document.getElementById(key).onclick = val
  })

  document.querySelectorAll(".delholiday").forEach(function(item) {
    item.addEventListener("click", function() {
      delHoliday(this)
    })
  })
}
