
/* to do !!!!!!!!!!!!!
Search Exact Phrases      +
Exclude a word            -
Search in specific column  :
Forgotten words           *
*/

import { sqlSearchDB } from "../model/sqlSearchDB.js"
import { Alert, reposition, menustyle } from "../util/util.js"
import { viewSearchDB } from "../view/viewSearchDB.js"
import { clearAllEditing } from "../control/clearAllEditing.js"

export function search2Screen()
{
  let $dialogInput = $("#dialogInput"),
    $staffsearch = $('#stafflist').clone()

  clearAllEditing()
  $staffsearch.attr('id', 'staffsearch')
  $staffsearch.css('position', 'fixed')

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
    if (keycode === 13) { searchDB() }
  })
  .find("span[title]").click(function() { searchDB() })
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

export function searchDB()
{
  let hn = $('#dialogInput input[name="hn"]').val().trim(),
    name = $('#dialogInput input[name="name"]').val().trim(),
    surname = $('#dialogInput input[name="surname"]').val().trim(),
    staffname = $('#dialogInput input[name="staffname"]').val().trim(),
    others = $('#dialogInput input[name="others"]').val().trim(),
    fullname = name + (surname ? " " : "") + surname,
    search = ""

  // Close before open another dialog
  $("#dialogInput").dialog("close")

  // for dialog title
  search += hn
  search += (search && fullname ? ", " : "") + fullname
  search += (search && staffname ? ", " : "") + staffname
  search += (search && others ? ", " : "") + others

  if (!search) { return }

  sqlSearchDB(hn, name, surname, staffname, others).then(response => {
    if (typeof response === "object") {
      viewSearchDB(response, search)
    } else {
      Alert("Search: " + search, response)
    }
	}).catch(error => alert(error.stack))
}
