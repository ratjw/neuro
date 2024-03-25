
import { inputPeriod } from "../util/inputPeriod.js"
import { sqlallInPeriod } from "../model/sqlallInPeriod.js"
import { Alert } from "../util/util.js"
import { prepareHTMLtoExcel } from "../util/prepareHTMLtoExcel.js"

export function allPeriod2Excel() {
  inputPeriod()
  $("#dialogPeriod span[title]").click(function() {
    queryPeriod($("#dateFrom").val(), $("#dateTo").val())
    $("#dialogPeriod").dialog('close')
  })
}

function queryPeriod(dateFrom, dateTo) {
  sqlallInPeriod(dateFrom, dateTo).then(response => {
    typeof response === "object"
    ? prepareHTMLtoExcel(response, "AllInPeriod")
    : Alert("queryPeriod", response)
	}).catch(error => alert(error.stack))
}

