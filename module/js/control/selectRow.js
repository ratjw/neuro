
import { oneRowMenu } from '../control/oneRowMenu.js'

export function selectRow(event, target)
{
  let $table = $(target).closest("table"),
    $rows = $table.find("tr"),
    $row = $(target).closest("tr"),
    $allRows = $("tr")

  if (/selected/.test($row.attr('class'))) {
    $row.removeClass("selected")
    disableOneRowMenu()
  } else {
    $rows.removeClass("selected")
    $row.addClass("selected")
    oneRowMenu()
  }
}

export function clearSelection()
{
  $('.selected').removeClass('selected');
  disableOneRowMenu()
}

function disableOneRowMenu()
{
  let ids = ["#addrow", "#postpone", "#moveCase", "#copyCase", "#history", "#delete"]

  ids.forEach(function(each) {
    $(each).addClass("disabled")
  })
}
