
import { sqlall } from "../model/sqlall.js"
import { Alert } from "../util/util.js"
import { downloadJSONasCSV } from "../util/downloadJSONasCSV.js"

export function all2CSV() {
  sqlall().then(response => {
    typeof response === "object"
    ? downloadJSONasCSV(response, "AllSavedCases")
    : Alert("all2CSV", response)
	}).catch(error => alert(error.stack))
}
