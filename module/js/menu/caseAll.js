
import { sqlCaseAll } from "../model/sqlCaseAll.js"
import { Alert } from "../util/util.js"
import { pagination } from "../view/pagination.js"

// All cases (exclude the deleted ones)
// Make paginated dialog box containing alltbl
export function caseAll() {
  sqlCaseAll().then(response => {
    typeof response === "object"
    ? pagination($("#dialogAll"), $("#alltbl"), response, "All Saved Cases")
    : Alert("caseAll", response)
  }).catch(error => {})
}
