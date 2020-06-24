
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
import { clearSelection } from "../control/selectRow.js"
import { clickCellSV } from "./clickCellSV.js"
import { timer, resetTimerCounter } from "../control/timer.js"

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

  showDialogService($dialogService, title)
  clearTimeout(timer)

  // for resizing dialogs in landscape / portrait view
  $(window).on("resize", resizeDialogSV)
  // for fixing of service table header while scrolling
  $servicetbl.fixMe($dialogService)
  $dialogService.on("click", clickCellSV)

  setfromDate(begin)
  settoDate($.datepicker.formatDate("yy-mm-dd", end))
  getServiceOneMonth()

  $exportService.on("click", event => {
    event.preventDefault()
    exportServiceToExcel()
  })

  $reportService.on("click", event => {
    event.preventDefault()
    showReportToDept(title)
  })
}

// ".ui-dialog:visible": it is necessary NOT to close the non-visible jQuery dialogs,
// because these may not have yet been initialized (which results in an error)
function showDialogService($dialogService, title)
{
  $dialogService.dialog({
    title: title,
    closeOnEscape: true,
    closeText: "Save and Close",
    modal: true,
    hide: 200,
    width: winWidth(100),
    height: winHeight(100),
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
      resetTimerCounter()
    }
  })
}

function getServiceOneMonth()
{
  sqlGetServiceOneMonth().then(response => {
    if (typeof response === "object") {
      setSERVICE(response)
      showService()
    } else {
      Alert("getServiceOneMonth", response)
    }
  }).catch(error => alert(error.stack))
}

function resizeDialogSV()
{
  let $dialogService = $("#dialogService"),
    $servicetbl = $("#servicetbl")

  $dialogService.dialog({
    width: winWidth(100),
    height: winHeight(100)
  })
  winResizeFix($servicetbl, $dialogService)
}
