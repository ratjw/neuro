
import { dialogPeriod } from "../util/dialogPeriod.js"
import { sqlallInPeriod } from "../model/sqlallInPeriod.js"
import { Alert } from "../util/util.js"
import { prepareHTMLtoExcel } from "../util/prepareHTMLtoExcel.js"

export function allPeriod2Excel() {
  dialogPeriod()
  $("#dialogInput").keydown(event => {
    let keycode = event.which || window.Event.keyCode
    if (keycode === 13) {
      queryPeriod2Excel($("#dateFrom").val(), $("#dateTo").val())
      $("#dialogInput").dialog('close')
    }
  })
  .find("span[title]").one("click", function() {
    queryPeriod2Excel($("#dateFrom").val(), $("#dateTo").val())
    $("#dialogInput").dialog('close')
  })
}

function queryPeriod2Excel(dateFrom, dateTo) {
  sqlallInPeriod(dateFrom, dateTo).then(response => {
    typeof response === "object"
    ? prepareHTMLtoExcel(response, `All cases from ${dateFrom} to ${dateTo}`)
    : Alert("queryPeriod2Excel", response)
	}).catch(error => alert(error.stack))
}

