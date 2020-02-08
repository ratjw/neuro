
import { htmlStafflist } from "../control/html.js"
import { sqlDoSaveStaff } from "../model/sqlDoStaff.js"
import { setSTAFF } from "../util/updateBOOK.js"
import { getSTAFFparsed } from "../util/getSTAFFparsed.js"
import { getLatestValue, Alert, winHeight } from "../util/util.js"
import { fillConsults } from "../view/fillConsults.js"
import { thDate_2_ISOdate } from "../util/date.js"

export const STAFFNAME = 0,
              RAMAID = 1,
              ONCALL = 2,
              START = 3,
              SKIPBEGIN = 4,
              SKIPEND = 5

export function settingStaff()
{
  const actionIcons = document.querySelector('#actionIcons'),
    actionTemplate = document.querySelector('#actionTemplate'),
    $dialogStaff = $("#dialogStaff"),
    $stafftbltbody = $("#stafftbl tbody"),
    $stafftbltr = $("#stafftbl tr"),
    $staffcellstr = $('#staffcells tr'),
    maxHeight = winHeight(90),
    staffs = getSTAFFparsed()

  $stafftbltr.slice(2).remove()

  if (staffs.length) {
    $.each( staffs, (i, staff) => {
      $staffcellstr.clone()
        .appendTo($stafftbltbody)
          .filldataStaff(i, staff)
    })
  }
  // create a blank row for adding a staff
  $staffcellstr.clone().appendTo($stafftbltbody)
    .find('td').each(function() { this.dataset.content = '' })

  actionIcons.innerHTML = actionTemplate.innerHTML

  $dialogStaff.dialog({ height: 'auto' })
  $dialogStaff.dialog({
    title: "Neurosurgery Staff",
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    width: "auto",
    height: ($dialogStaff.height() > maxHeight) ? maxHeight : 'auto'
  })

  activateButtons($stafftbltbody)
}

jQuery.fn.extend({
  filldataStaff : function (i, q) {

    const row = this[0]
    const cells = row.cells
    const staff = q.profile

    let begincell = ''
    let begindate = ''

    row.dataset.id = q.id

;   [ staff.staffname,
      staff.ramaid,
      staff.oncall,
      getOncallDate(staff.start),
      staff.skip ? getSkipDate(staff.skip, 'begin') : "",
      staff.skip ? getSkipDate(staff.skip, 'end') : ""
    ].forEach((e, i) => {
      if (i < START) {
        cells[i].innerHTML = e
        cells[i].dataset.content = e
      }
      else if ((i === START) && (staff.oncall === 1)) {
        cells[i].innerHTML = e
        cells[i].dataset.content = e
        inputDatepicker(cells[i])
      }
      else if (i === SKIPBEGIN) {
        begincell = cells[i]
        begindate = e
      }
      else if (i === SKIPEND) {
        cells[i].innerHTML = getActiveDate(e)
        cells[i].dataset.content = getActiveDate(e)
        inputDatepicker(cells[i])
        if (cells[i].innerHTML) {
          begincell.innerHTML = begindate
          begincell.dataset.content = begindate
        } else {
          begincell.innerHTML = ''
          begincell.dataset.content = ''
        }
        inputDatepicker(begincell)
      }
    })
  }
})

function getActiveDate(e)
{
  const today = new Date()

  return Date.parse(e) > Date.parse(today) ? e : ""
}

function getOncallDate(ondate)
{
  return ondate ? getLatestValue(ondate) : ""
}

function getSkipDate(skip, at)
{
  const dates = getOncallDate(skip)

  return dates[at]
}

// tabIndex = "-1" prevent input focus
function inputDatepicker(cell)
{
  let input = document.createElement('input')

  input.style.width = '80px'
  input.value = cell.textContent
  input.tabIndex = "-1"
  cell.innerHTML = ''
  cell.appendChild(input)
  $(input).datepicker({ dateFormat: "d M yy" })
}

function activateButtons($tbody)
{
  const $saveStaff = $('#saveStaff'),
    $cancelStaff = $('#cancelStaff')

  $saveStaff.off("click").on("click", () => getEditingStaff($tbody))
  $cancelStaff.off("click").on("click", settingStaff)
}

function getEditingStaff($tbody)
{
  $tbody.find('tr').each(function(i, row) {
    $(row).find('td').each(function(i) {
      let input = this.querySelector('input')
      let content = input ? input.value : this.textContent
      if (content !== this.dataset.content) {
          doSaveStaff(row)
          return false
        }
    })
  })
}

async function doSaveStaff(row)
{
  let response = await sqlDoSaveStaff(row)

  if (typeof response === "object") {
    setSTAFF(response.STAFF)
    htmlStafflist()
    fillConsults()
    settingStaff()
  } else {
    response && Alert("doSaveStaff", response)
  }
}
