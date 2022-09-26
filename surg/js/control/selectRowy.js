
import { SELECTED, MOVECASE, COPYCASE } from "../control/const.js"
import { oneRowMenu } from '../control/oneRowMenu.js'

export function selectRow(event, target)
{
  let $table = $(target).closest("table"),
    $rows = $table.find("tr"),
    $row = $(target).closest("tr"),
    $allRows = $("tr")

  if (/selected/.test($row.attr('class'))) {
    clearSelection()
  } else {
    $rows.removeClass(SELECTED)
    $row.addClass(SELECTED)
    oneRowMenu()
  }
}

export function clearSelection()
{
  let ids = ["#addrow", "#postpone", "#moveCase", "#copyCase", "#history", "#delete"]

  ids.forEach(function(each) {
    $(each).addClass("disabled")
  })

  $(`.${SELECTED}`).removeClass(SELECTED)
}
