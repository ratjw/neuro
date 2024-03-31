
/* to do !!!!!!!!!!!!!
Search Exact Phrases      +
Exclude a word            -
Search in specific column :
Forgotten word part       *
*/

import { reposition, menustyle } from "../util/util.js"
import { clearAllEditing } from "../control/clearAllEditing.js"

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
