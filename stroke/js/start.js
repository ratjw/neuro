
import { sqlStart } from "../model/sqlStart.js"
import { updateBOOK } from "./updateBOOK.js"

// For staff & residents with login id / password from Get_staff_detail
export function start() {
//	register()
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
