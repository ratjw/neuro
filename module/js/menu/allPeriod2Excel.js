
import { dialogPeriod } from "../util/dialogPeriod.js"
import { sqlallInPeriod } from "../model/sqlallInPeriod.js"
import { Alert } from "../util/util.js"
import { prepareHTMLtoExcel } from "../util/prepareHTMLtoExcel.js"

export function allPeriod2Excel() {
  dialogPeriod()
  $("#dialogInput span[title]").one("click", function() {
    queryPeriod($("#dateFrom").val(), $("#dateTo").val())
    $("#dialogInput").dialog('close')
  })
}

function queryPeriod(dateFrom, dateTo) {
  sqlallInPeriod(dateFrom, dateTo).then(response => {
    typeof response === "object"
    ? prepareHTMLtoExcel(response, `AllInPeriod, ${dateFrom}, ${dateTo}`)
    : Alert("queryPeriod", response)
	}).catch(error => alert(error.stack))
}

