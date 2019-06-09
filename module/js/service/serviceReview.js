
import { winWidth, winHeight } from "../util/util.js"
import { sqlGetServiceOneMonth } from "../model/sqlservice.js"
import { showService } from "./showService.js"
import { setSERVICE, setfromDate, settoDate } from "./setSERVICE.js"
import { showReportToDept } from "./showReportToDept.js"
import { exportServiceToExcel } from "../util/excel.js"
import { Alert } from "../util/util.js"

// Includes all serviced cases, attended or consulted
// PHP Getipd retrieves admit/discharge dates
// new Date(yyyy, mm+1, 0) is
// the day before 1st date of next month = last date of this month
export function serviceReview(begin) {
  let  $dialogService = $("#dialogService"),
    date = new Date(begin),
    end = new Date(date.getFullYear(), date.getMonth()+1, 0),
    $monthpicker = $("#monthpicker"),
    $exportService = $("#exportService"),
    $reportService = $("#reportService"),
    inputval = $monthpicker.val(),
    titledate = inputval.slice(0, -4) + (Number(inputval.slice(-4)) + 543),
    title = "Service Neurosurgery เดือน " + titledate
  
  $dialogService.dialog({
    title: title,
    closeOnEscape: true,
    closeText: "Save and Close",
    modal: true,
    width: winWidth(95),
    height: winHeight(95)
  })

  setfromDate(begin)
  settoDate($.datepicker.formatDate("yy-mm-dd", end))

  sqlGetServiceOneMonth().then(response => {
    if (typeof response === "object") {
      setSERVICE(response)
      showService()
    } else {
      Alert("getServiceOneMonth", response)
    }
  }).catch(error => {})

  $exportService.on("click", event => {
    event.preventDefault()
    exportServiceToExcel()
  })

  $reportService.on("click", event => {
    event.preventDefault()
    showReportToDept(title)
  })
}
