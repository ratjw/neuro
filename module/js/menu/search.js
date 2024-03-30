
/* to do !!!!!!!!!!!!!
Search Exact Phrases      +
Exclude a word            -
Search in specific column :
Forgotten word part       *
*/

import { sqlSearchDB } from "../model/sqlSearchDB.js"
import { Alert, reposition, menustyle } from "../util/util.js"
import { clearAllEditing } from "../control/clearAllEditing.js"
import { viewSearchDB } from "../view/viewSearchDB.js"
import { prepareHTMLtoExcel } from "../util/prepareHTMLtoExcel.js"
import { downloadJSONasCSV } from "../util/downloadJSONasCSV.js"
import { inputPeriod } from "../util/inputPeriod.js"

export function search(destine)
{
  let $dialogInput = $("#dialogInput"),
    $staffsearch = $('#stafflist').clone()

  clearAllEditing()
  $staffsearch.attr('id', 'staffsearch')
  $staffsearch.css('position', 'fixed')
  
  inputPeriod()

  $dialogInput.dialog({
    title: "Search",
    closeOnEscape: true,
    modal: true,
    width: 'auto',
    height: 'auto',
    close: function() {
      $staffsearch.hide()
    }
  })

  $dialogInput.off("click").on("click", (event) => {
    let target = event.target

    if ($staffsearch.is(":visible")) {
      $staffsearch.hide();
    }
    if (target.name === 'staffname') {
      getSaffName(target, $staffsearch)
    }
  })
  .keydown(event => {
    let keycode = event.which || window.Event.keyCode
    if (keycode === 13) { searchDB(destine) }
  })
  .find("span[title]").one("click", function() { searchDB(destine) })
}

function getSaffName(pointing, $staffsearch)
{
  let $pointing = $(pointing)

  $staffsearch.appendTo($pointing.closest('div')).show()
  $staffsearch.menu({
    select: function( event, ui ) {
      pointing.value = ui.item.text()
      $staffsearch.hide()
      event.stopPropagation()
    }
  })

  reposition($staffsearch, "left top", "left bottom", $pointing)
  menustyle($staffsearch, $pointing)
}

function searchDB(destine)
{
  let hn = $('#dialogInput input[name="hn"]').val().trim(),
    name = $('#dialogInput input[name="name"]').val().trim(),
    surname = $('#dialogInput input[name="surname"]').val().trim(),
    staffname = $('#dialogInput input[name="staffname"]').val().trim(),
    others = $('#dialogInput input[name="others"]').val().trim(),
    datebegin = $('#dialogInput input[name="datebegin"]').val().trim(),
    dateend = $('#dialogInput input[name="dateend"]').val().trim(),
    fullname = name + (surname ? " " : "") + surname,
    search = ""

  // Close before open another dialog
  $("#dialogInput").dialog("close")

  // for dialog title
  search += hn
  search += (search && fullname ? ", " : "") + fullname
  search += (search && staffname ? ", " : "") + staffname
  search += (search && others ? ", " : "") + others
  search += (search && datebegin ? ", " : "") + datebegin
  search += (search && dateend ? ", " : "") + dateend

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
