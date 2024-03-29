
import { sqlall } from "../model/sqlall.js"
import { Alert } from "../util/util.js"
import { pagination } from "../view/pagination.js"

export function search2CSV() {
  sqlall().then(response => {
    typeof response === "object"
    ? pagination($("#dialogAll"), $("#alltbl"), response, "All Saved Cases")
    : Alert("caseAll", response)
	}).catch(error => alert(error.stack))
}
