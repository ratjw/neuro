
import { sqlCaseAll } from "../model/sqlCaseAll.js"
import { Alert } from "../util/util.js"
import { pagination } from "../view/pagination.js"

export function InterAll() {
  sqlCaseAll().then(response => {
    typeof response === "object"
    ? pagination($("#dialogAll"), $("#alltbl"), response, "All Saved Cases")
    : Alert("caseAll", response)
	}).catch(error => alert(error.stack))
}
