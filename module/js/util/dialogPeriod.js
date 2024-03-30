
import { clearAllEditing } from "../control/clearAllEditing.js"
import { inputPeriod } from "../util/inputPeriod.js"

export function dialogPeriod()
{
  $("#searchpart").hide()
  $("#periodpart").show()

  clearAllEditing()

  $("#dialogInput").dialog({
    title: "Date Begin End",
    closeOnEscape: true,
    modal: true,
    width: 'auto',
    height: 'auto'
  })

  inputPeriod()
}
