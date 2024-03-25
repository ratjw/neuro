
import { sqlall } from "../model/sqlall.js"

import { prepareHTMLtoExcel } from "../util/prepareHTMLtoExcel.js"
import { Alert } from "../util/util.js"

// All cases (exclude the deleted ones)
export function all2Excel() {
  sqlall().then(response => {
    typeof response === "object"
    ? prepareHTMLtoExcel(response, "AllTimeCases")
    : Alert("all2Excel", response)
	}).catch(error => alert(error.stack))
}
