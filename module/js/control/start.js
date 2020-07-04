
import { THEATRE } from "../control/const.js"
import { clicktable } from "../control/clicktable.js"
import { clearAllEditing } from "../control/clearAllEditing.js"
import { editcellEvent, clearEditcell, renewEditcell } from "../control/edit.js"
import { resetTimer, resetTimerCounter } from "../control/timer.js"
import { setClickAll } from "../control/setClickAll.js"
import { sqlStart } from "../model/sqlupdate.js"
import { sortable } from "../control/sort.js"
import { clearSelection } from "../control/selectRow.js"
import { fillmain } from "../view/fill.js"
import { fillConsults } from "../view/fillConsults.js"
import { getTIMESTAMP, updateBOOK } from "../util/updateBOOK.js"
import { Alert } from "../util/util.js"
import { htmlStafflist, htmlLab, htmlEquipment } from "../control/html.js"
import { scrolltoToday } from "../view/scrolltoThisCase.js"
import { sqlGetServiceOneMonth } from "../model/sqlservice.js"
import { setSERVICE } from "../service/setSERVICE.js"
import { reViewService } from "../service/showService.js"
import { isMobile } from "../main.js"
import { exchangeOncall } from "../setting/exchangeOncall.js"
import { refillHoliday } from "../view/fillHoliday.js"
import { dialogServiceEvent } from "./startsub/dialogServiceEvent.js"
import { wrapperEvent } from "./startsub/wrapperEvent.js"
import { documentEvent } from "./startsub/documentEvent.js"
import { overrideJqueryUI } from "./startsub/overrideJqueryUI.js"
import { contextmenu } from "./startsub/contextmenu.js"

// For staff & residents with login id / password from Get_staff_detail
export function start() {
	sqlStart().then(response => {
		typeof response === "object"
		? success(response)
		: failed(response)
	})
  .catch(error => alert(error + "\n\n" + error.stack))

	document.oncontextmenu = contextmenu
}

// Success return from server
function success(response) {

  // call sortable before render, otherwise it renders very slowly
//  isMobile ? scaleViewport() : 
  sortable()
  updateBOOK(response)
  fillmain()
  scrolltoToday('maintbl')
  fillConsults()
  clearSelection()

  // setting up html
  htmlLab()
  htmlEquipment()
  htmlStafflist()

  // make the document editable
  editcellEvent()
  dialogServiceEvent()
  wrapperEvent()
  documentEvent()
  setClickAll()
  overrideJqueryUI()
  resetTimer()
//  serverSentEvent()
}

// *** to do -> offline browsing by service worker ***
function failed(response) {
  Alert("Server Error", response)
}
