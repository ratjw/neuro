
import { sqlStart } from "./sqlupdate.js"
import { fillmain } from "./fill.js"
import { updateBOOK } from "./updateBOOK.js"
import { Alert } from "./util.js"
import { notifyLINE } from './notifyLINE.js'

// For staff & residents with login id / password from Get_staff_detail
export function start() {
	sqlStart().then(response => {
		typeof response === "object"
		? success(response)
		: failed(response)
	}).catch(error => alert(error.stack))
}

// Success return from server
function success(response) {

  updateBOOK(response)
  fillmain()

  notifyLINE()
}

// *** to do -> offline browsing by service worker ***
function failed(response) {
  let title = "Server Error",
    error = error + "<br><br>Response from server has no data"

  Alert(title, error + "No localStorage backup")
}
