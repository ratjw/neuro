
import { inputPeriod } from "../util/inputPeriod.js"
import { sqlallInPeriod } from "../model/sqlallInPeriod.js"
import { Alert } from "../util/util.js"
import { downloadJSONasCSV } from "../util/downloadJSONasCSV.js"

export function allPeriod2CSV() {
  inputPeriod()
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
