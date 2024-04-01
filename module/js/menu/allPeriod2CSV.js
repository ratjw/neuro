
import { dialogPeriod } from "../util/dialogPeriod.js"
import { sqlallInPeriod } from "../model/sqlallInPeriod.js"
import { Alert } from "../util/util.js"
import { downloadJSONasCSV } from "../util/downloadJSONasCSV.js"

export function allPeriod2CSV() {
  dialogPeriod()
  $("#dialogInput").keydown(event => {
    let keycode = event.which || window.Event.keyCode
    if (keycode === 13) {
      queryPeriod2CSV($("#dateFrom").val(), $("#dateTo").val())
      $("#dialogInput").dialog('close')
    }
  })
  .find("span[title]").one("click", function() {
    queryPeriod2CSV($("#dateFrom").val(), $("#dateTo").val())
    $("#dialogInput").dialog('close')
  })
}

function queryPeriod2CSV(dateFrom, dateTo) {
  sqlallInPeriod(dateFrom, dateTo).then(response => {
    typeof response === "object"
    ? downloadJSONasCSV(response, `All cases from ${dateFrom} to ${dateTo}`)
    : Alert("queryPeriod2CSV", response)
	}).catch(error => alert(error.stack))
}
