
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
    refillHoliday()
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

function delHoliday(holirow)
{
  const holidate = holirow.dataset.holidate,
    dayname = holirow.dataset.dayname

  sqlDelHoliday(holidate, dayname).then(response => {
    if (typeof response === "object") {
      setHOLIDAY(response)
      holirow.remove()
      refillHoliday()
    } else {
      Alert ("delHoliday", response)
    }
  })
}
