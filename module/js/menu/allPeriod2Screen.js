
import { inputPeriod } from "../util/inputPeriod.js"
import { sqlallInPeriod } from "../model/sqlallInPeriod.js"
import { Alert } from "../util/util.js"
import { pagination } from "../view/pagination.js"

export function allPeriod2Screen() {
  inputPeriod()
  $("#dialogPeriod span[title]").click(function() {
    queryPeriod($("#dateFrom").val(), $("#dateTo").val())
    $("#dialogPeriod").dialog('close')
  })
}

function queryPeriod(dateFrom, dateTo) {
  sqlallInPeriod(dateFrom, dateTo).then(response => {
    typeof response === "object"
    ? pagination($("#dialogAll"), $("#alltbl"), response, "All in Period")
    : Alert("queryPeriod", response)
	}).catch(error => alert(error.stack))
}
