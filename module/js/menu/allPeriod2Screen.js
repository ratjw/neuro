
import { dialogPeriod } from "../util/dialogPeriod.js"
import { sqlallInPeriod } from "../model/sqlallInPeriod.js"
import { Alert } from "../util/util.js"
import { pagination } from "../view/pagination.js"

export function allPeriod2Screen() {
  dialogPeriod()
  $("#dialogInput").find("span[title]").one("click", function() {
    queryPeriod2Screen($("#dateFrom").val(), $("#dateTo").val())
    $("#dialogInput").dialog('close')
  })
}

function queryPeriod2Screen(dateFrom, dateTo) {
  sqlallInPeriod(dateFrom, dateTo).then(response => {
    typeof response === "object"
    ? pagination($("#dialogAll"), $("#alltbl"), response, "All in Period")
    : Alert("queryPeriod2Screen", response)
	}).catch(error => alert(error.stack))
}
