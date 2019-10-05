
import { oneRowMenu } from '../control/oneRowMenu.js'

export function selectRow(event, target)
{
  let $table = $(target).closest("table"),
    $rows = $table.find("tr"),
    $row = $(target).closest("tr"),
    $allRows = $("tr")

  if (event.ctrlKey) {
    if (!/selected/.test($row.attr('class'))) {
      $rows.removeClass("beginselected")
      $row.addClass("selected beginselected")
    }
  } else if (event.shiftKey) {
    $rows.not(".beginselected").removeClass("selected")
    shiftSelect($row)
  } else {
    if (/selected/.test($row.attr('class'))) {
      $row.removeClass("selected beginselected")
    } else {
      $rows.removeClass("beginselected")
      $row.addClass("selected beginselected")
    }
  }

  let selects = $table.find('.selected').length
  if (selects === 0) {
    disableExcelLINE()
  }
  if (selects === 1) {
    oneRowMenu()
  } else {
    disableOneRowMenu()
  }
}

function shiftSelect($row)
{
  let $beginselected = $(".beginselected").closest("tr"),
      beginIndex = $beginselected.index(),
      targetIndex = $row.index(),
      $select = {}

  if (targetIndex > beginIndex) {
    $select = $row.prevUntil('.beginselected')
  } else if (targetIndex < beginIndex) {
    $select = $row.nextUntil('.beginselected')
  } else {
    return
  }
  $select.addClass("selected")
  $row.addClass("selected")
}

export function clearSelection()
{
  $('.selected').removeClass('selected');
  $('.beginselected').removeClass('beginselected');
  disableOneRowMenu()
  disableExcelLINE()
}

function disableOneRowMenu()
{
  let ids = ["#addrow", "#postpone", "#moveCase", "#copyCase", "#history", "#delete"]

  ids.forEach(function(each) {
    $(each).addClass("disabled")
  })
}

function disableExcelLINE()
{
  $("#EXCEL").addClass("disabled")
  $("#LINE").addClass("disabled")
}
