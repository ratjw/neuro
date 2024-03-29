
import { inputPeriod } from "../util/inputPeriod.js"

export function dialogPeriod()
{
  $("#searchpart").hide()
  $("#periodpart").show()

  $("#dialogInput").dialog({
    title: "Date Begin End",
    closeOnEscape: true,
    modal: true,
    width: 'auto',
    height: 'auto'
  })

  inputPeriod()
}
