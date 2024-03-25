
import { sqlall } from "../model/sqlall.js"
import { Alert } from "../util/util.js"
import { pagination } from "../view/pagination.js"

// All cases (exclude the deleted ones)
// Make paginated dialog box containing alltbl
export function all2Screen() {
  sqlall().then(response => {
    typeof response === "object"
    ? pagination($("#dialogAll"), $("#alltbl"), response, "All Saved Cases")
    : Alert("all2Screen", response)
	}).catch(error => alert(error.stack))
}
