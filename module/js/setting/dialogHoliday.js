
import { DIAGNOSIS } from "../control/const.js"
import { getTableRowsByDate } from "../util/rowsgetting.js"
import { setHOLIDAY } from "../setting/constHoliday.js"
import { sqlSaveHoliday, sqlDelHoliday } from "../model/sqlSaveHoliday.js"
import { Alert, winHeight } from "../util/util.js"
import { fillHoliday, refillHoliday } from "../view/fillHoliday.js"

export function dialogHoliday(title)
{
  const  $dialogHoliday = $("#dialogHoliday"),
    maxHeight = winHeight(98)

  $dialogHoliday.dialog({ modal: true })
  $dialogHoliday.dialog({ height: 'auto' })
  $dialogHoliday.dialog({
    title: title,
    closeOnEscape: true,
    show: 200,
    hide: 200,
    width: 'auto',
    height: ($dialogHoliday.height() > maxHeight) ? maxHeight : 'auto'
  })
}

export async function saveHoliday(holidate, holiname)
{
  if (!holidate || !holiname) { return }

  let response = await sqlSaveHoliday(holidate, holiname)
  if (typeof response === "object") {
    setHOLIDAY(response)
//      const rows = getTableRowsByDate('maintbl', holidate)
    refillHoliday(/*rows, holiname*/)
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

  const mainTable = document.querySelector("#maintbl")
  fillHoliday(mainTable)
}

function delHoliday(holirow)
{
  const holidate = holirow.dataset.holidate,
    dayname = holirow.dataset.dayname,
    maintblrows = getTableRowsByDate('maintbl', holidate)

  sqlDelHoliday(holidate, dayname).then(response => {
    if (typeof response === "object") {
      setHOLIDAY(response)
      holirow.remove()
//      maintblrows.forEach(row => {
//        row.cells[DIAGNOSIS].classList.remove("holiday")
//        delete row.cells[DIAGNOSIS].dataset.holiday
//      })
      refillHoliday(/*rows, holiname*/)
    } else {
      Alert ("delHoliday", response)
    }
  })
}
