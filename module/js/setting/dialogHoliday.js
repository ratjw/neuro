
import { DIAGNOSIS, THAIMONTH } from "../control/const.js"
import { th_2_ISO, ISO_2_th, ISO_2_ddThaiM } from "../util/date.js"
import { getTableRowsByDate } from "../util/rowsgetting.js"
import { getHOLIDAY, setHOLIDAY } from "../util/updateBOOK.js"
import { findHoliday } from "../setting/findHoliday.js"
import { HOLIDATE, HOLINAME, ACTION } from "../setting/constHoliday.js"
import { sqlSaveHoliday, sqlDelHoliday } from "../model/sqlSaveHoliday.js"
import { Alert } from "../util/util.js"

export function dialogHoliday(title)
{
  const  $dialogHoliday = $("#dialogHoliday")

  $dialogHoliday.dialog({ modal: true })
  $dialogHoliday.dialog({
    title: title,
    closeOnEscape: true,
    show: 200,
    hide: 200,
    width: 370,
    height: 620
  })
}

export async function saveHoliday()
{
  const input = document.querySelector("#holidate"),
    selec = document.querySelector("#holidayname"),
    holidate = th_2_ISO(input.value),
    holiname = selec && selec.value || selec.textContent,
    rows = getTableRowsByDate('maintbl', holidate)

  if (!holidate || !holiname) { return }

  let response = await sqlSaveHoliday(holidate, holiname)
    if (typeof response === "object") {
      setHOLIDAY(response)
      rows.forEach(row => {
        row.cells[DIAGNOSIS].classList.add("holiday")
        row.cells[DIAGNOSIS].dataset.holiday = findHoliday(holidate)
      })
    } else {
      Alert ("saveHoliday", response)
    }
}

export function onclickDelete()
{
  document.querySelectorAll("#holidaytbl .delholiday").forEach(item => {
    item.addEventListener("click", () => {
      delHoliday(item.closest("tr"))
    })
  })
}

function delHoliday(row)
{
  const cells = row.querySelectorAll("td"),
    holidate = th_2_ISO(cells[HOLIDATE].textContent),
    holiname = cells[HOLINAME].textContent,
    maintblrows = getTableRowsByDate('maintbl', holidate)

  sqlDelHoliday(holidate, holiname).then(response => {
    if (typeof response === "object") {
      setHOLIDAY(response)
      row.remove()
      maintblrows.forEach(row => {
        row.cells[DIAGNOSIS].classList.remove("holiday")
        delete row.cells[DIAGNOSIS].dataset.holiday
      })
    } else {
      Alert ("delHoliday", response)
    }
  })
}
