
import { dialogPeriod } from "../util/dialogPeriod.js"
import { sqlallInPeriod } from "../model/sqlallInPeriod.js"
import { Alert } from "../util/util.js"
import { downloadJSONasCSV } from "../util/downloadJSONasCSV.js"

export function allPeriod2CSV() {
  dialogPeriod()
  $("#dialogPeriod span[title]").click(function() {
    queryPeriod($("#dateFrom").val(), $("#dateTo").val())
    $("#dialogPeriod").dialog('close')
  })
}

function queryPeriod(dateFrom, dateTo) {
  sqlallInPeriod(dateFrom, dateTo).then(response => {
    typeof response === "object"
    ? downloadJSONasCSV(response, "AllInPeriod")
    : Alert("queryPeriod", response)
	}).catch(error => alert(error.stack))
}
