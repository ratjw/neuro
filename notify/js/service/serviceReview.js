
import { sqlGetServiceOneMonth } from "../model/sqlservice.js"
import { showService } from "./showService.js"
import { setSERVICE, setfromDate, settoDate } from "./setSERVICE.js"
import { showReportToDept } from "./showReportToDept.js"
import { exportServiceToExcel } from "../util/excel.js"
import { Alert } from "../util/util.js"
import { fillmain } from "../view/fill.js"
import { staffqueue } from "../view/staffqueue.js"
import { fillConsults } from "../view/fillConsults.js"
import { POINTER, clearEditcell } from "../control/edit.js"
import { isSplit,  winWidth, winHeight, winResizeFix } from "../util/util.js"
import { savePreviousCellService } from "./savePreviousCellService.js"
import { clearSelection } from "../get/selectRow.js"
import { clickCellSV } from "./clickCellSV.js"

// Includes all serviced cases, attended or consulted
// PHP Getipd retrieves admit/discharge dates
// new Date(yyyy, mm+1, 0) is
// the day before 1st date of next month = last date of this month
export function serviceReview(begin) {
  let $dialogService = $("#dialogService"),
    $servicetbl = $("#servicetbl"),
    date = new Date(begin),
    end = new Date(date.getFullYear(), date.getMonth()+1, 0),
    $monthpicker = $("#monthpicker"),
    $exportService = $("#exportService"),
    $reportService = $("#reportService"),
    inputval = $monthpicker.val(),
    titledate = inputval.slice(0, -4) + (Number(inputval.slice(-4)) + 543),
    title = "Service Neurosurgery เดือน " + titledate

  let resizeDialogSV = () => {
    $dialogService.dialog({
      width: winWidth(95),
      height: winHeight(95)
    })
    winResizeFix($servicetbl, $dialogService)
  }

  // close: it is necessary NOT to close the non-visible jQuery dialogs,
  // because these may not have yet been initialized (which results in an error)
  $dialogService.dialog({
    title: title,
    closeOnEscape: true,
    closeText: "Save and Close",
    modal: true,
    hide: 200,
    width: winWidth(95),
    height: winHeight(95),
    close: function() {
      if (isSplit()) { staffqueue(titlename.innerHTML) }
      fillmain()
      fillConsults()
      $(".ui-dialog:visible").find(".ui-dialog-content").dialog("close")
      $(".fixed").remove()
      $(window).off("resize", resizeDialogSV)
      $dialogService.off("click", clickCellSV)
      if (POINTER) {
        savePreviousCellService()
      }
      clearEditcell()
      clearSelection()
    }
  })

  // for resizing dialogs in landscape / portrait view
  $(window).on("resize", resizeDialogSV)
  // for fixing of service table header while scrolling
  $servicetbl.fixMe($dialogService)
  $dialogService.on("click", clickCellSV)

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