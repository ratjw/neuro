
import { sqlSearchDB } from "../model/sqlSearchDB.js"
import { Alert } from "../util/util.js"
import { viewSearchDB } from "../view/viewSearchDB.js"
import { prepareHTMLtoExcel } from "../util/prepareHTMLtoExcel.js"
import { downloadJSONasCSV } from "../util/downloadJSONasCSV.js"

export function searchDB(destine)
{
  let hn = $('#dialogInput input[name="hn"]').val().trim(),
    name = $('#dialogInput input[name="name"]').val().trim(),
    surname = $('#dialogInput input[name="surname"]').val().trim(),
    staffname = $('#dialogInput input[name="staffname"]').val().trim(),
    others = $('#dialogInput input[name="others"]').val().trim(),
    datebegin = $('#dialogInput input[id="dateFrom"]').val().trim(),
    dateend = $('#dialogInput input[id="dateTo"]').val().trim(),
    fullname = name + (surname ? " " : "") + surname,
    search = ""

  // Close before open another dialog
  $("#dialogInput").dialog("close")

  // for dialog title
  search += hn
  search += (search && fullname ? ", " : "") + fullname
  search += (search && staffname ? ", " : "") + staffname
  search += (search && others ? ", " : "") + others
  search += (search && datebegin ? " from " : "") + datebegin
  search += (search && dateend ? " to " : "") + dateend

  if (!search) { return }

  sqlSearchDB(hn, name, surname, staffname, others, datebegin, dateend).then(response => {
    if (typeof response === "object") {
      destine == "screen"
      ? viewSearchDB(response, search)
      : destine == "excel"
        ? prepareHTMLtoExcel(response, search)
        : destine == "csv"
          ? downloadJSONasCSV(response, search)
          : null
    } else {
      Alert("Search: " + search, response)
    }
	}).catch(error => alert(error.stack))
}
