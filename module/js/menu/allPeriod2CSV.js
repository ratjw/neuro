
import { sqlall } from "../model/sqlall.js"
import { sqlallInPeriod } from "../model/sqlallInPeriod.js"
import { Alert } from "../util/util.js"
import { downloadJSONasCSV } from "../util/downloadJSONasCSV.js"

export function allPeriod2CSV() {
  sqlall().then(response => {
    typeof response === "object"
    ? getPeriod(response, "CasesPeriod")
    : Alert("caseAll", response)
	}).catch(error => alert(error.stack))
}

function getPeriod()
{
  $("#dialogPeriod").dialog({
    title: "Date Begin End",
    closeOnEscape: true,
    modal: true
  })
  .find("span[title]").click(function() { sqlPeriod($("#dateFrom").val(), $("#dateTo").val()) })

  $("#dateFrom").datepicker({
    numberOfMonths:1,
    dateFormat:'yy-mm-dd',
    onSelect:function(selectdate) {
      var dt = new Date(selectdate);
      dt.setDate(dt.getDate()+1)
      $("#dateTo").datepicker("option","minDate",dt);
    }
  });
  $("#dateTo").datepicker({
    numberOfMonths:1,
    dateFormat:'yy-mm-dd',
    onSelect:function(selectdate){
      var dt = new Date(selectdate);
      dt.setDate(dt.getDate()-1)
      $("#dateFrom").datepicker("option","maxDate",dt);
    }
  });
}

function sqlPeriod(dateFrom, dateTo) {
  sqlallInPeriod(dateFrom, dateTo).then(response => {
    typeof response === "object"
    ? downloadJSONasCSV(response, "AllInPeriod")
    : Alert("all2CSV", response)
	}).catch(error => alert(error.stack))
}
