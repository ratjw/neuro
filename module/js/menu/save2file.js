
import { sqlCaseAll } from "../model/sqlCaseAll.js"
import { Alert } from "../util/util.js"
import { pagination } from "../view/pagination.js"

export function caseAll2Excel() {
  sqlCaseAll().then(response => {
    typeof response === "object"
    ? pagination($("#dialogAll"), $("#alltbl"), response, "All Saved Cases")
    : Alert("caseAll", response)
	}).catch(error => alert(error.stack))
}

export function caseAll2CSV() {
  sqlCaseAll().then(response => {
    typeof response === "object"
    ? pagination($("#dialogAll"), $("#alltbl"), response, "All Saved Cases")
    : Alert("caseAll", response)
	}).catch(error => alert(error.stack))
}

export function cases2Excel() {
  sqlCaseAll().then(response => {
    typeof response === "object"
    ? pagination($("#dialogAll"), $("#alltbl"), response, "All Saved Cases")
    : Alert("caseAll", response)
	}).catch(error => alert(error.stack))
}

export function cases2CSV() {
  sqlCaseAll().then(response => {
    typeof response === "object"
    ? pagination($("#dialogAll"), $("#alltbl"), response, "All Saved Cases")
    : Alert("caseAll", response)
	}).catch(error => alert(error.stack))
}