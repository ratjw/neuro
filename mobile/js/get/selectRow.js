
import { LARGESTDATE } from "../model/const.js"
import { getOpdate } from "../util/date.js"

// disable some menu-items for the one current row
// Menu for the current row -> addrow, postpone, moveCase, copyCase, tracking, del
// Menu for all cases -> staffqueue, service, all deleted, search, readme

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

function oneRowMenu()
{
  let row = document.querySelector(".selected"),
    prevDate = row.previousElementSibling.dataset.opdate,
    opdate = row.dataset.opdate,
    staffname = row.dataset.staffname,
    patient = row.dataset.patient,
    qn = row.dataset.qn,
    notLARGE = (opdate !== LARGESTDATE)

  enable(qn, "#addrow")

  let postpone = qn && staffname && notLARGE
  if (postpone) {
    $("#postponecase").html("<b>Confirm เลื่อน ไม่กำหนดวัน  </b><br>" + patient)
  }
  enable(postpone, "#postpone")

  enable(qn, "#moveCase")

  enable(qn, "#copyCase")

  enable(qn, "#history")

  let Delete = qn || prevDate === opdate
  if (Delete) {
    $("#delcase").html("<b>Confirm Delete </b><br>" + patient)
  }
  enable(Delete, "#delete")

  enable(true, "#EXCEL")

  enable(true, "#LINE")
}

function enable(able, id)
{
  if (able) {
    $(id).removeClass("disabled")
  } else {
    $(id).addClass("disabled")
  }
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
