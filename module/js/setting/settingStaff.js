
import { htmlStafflist } from "../control/html.js"
import { sqlDoSaveStaff } from "../model/sqlDoStaff.js"
import { setSTAFF } from "../util/updateBOOK.js"
import { getSTAFFparsed, getLatestStart } from "../util/getSTAFFparsed.js"
import { getLatestKey, Alert, winHeight } from "../util/util.js"
import { fillConsults } from "../view/fillConsults.js"
import { obj_2_ISO, th_2_ISO } from "../util/date.js"

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
    .find('td').each(function() { this.dataset.val = '' })

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
    const qprofile = q.profile
    const startCell = cells[START]
    const beginCell = cells[SKIPBEGIN]
    const endCell = cells[SKIPEND]

    row.dataset.id = q.id

;   [ qprofile.staffname,
      qprofile.ramaid,
      qprofile.oncall
    ].forEach((e, i) => {
      if (i < START) {
        showCell(cells[i], e)
      }
    })

    const start = getLatestStart()
    if (qprofile.staffname === start.profile.staffname) {
      showCell(startCell, start.startDate, start.startKey)
    } else {
      showCell(startCell, '')
    }
    if (qprofile.oncall) { inputDatepicker(startCell) }

    const key = getLatestKey(qprofile.skip)
    const endDate = key ? getActiveDate(qprofile.skip[key]["end"]) : ''
    const beginDate = endDate ? qprofile.skip[key]["begin"] : ''

    showCell(beginCell, beginDate, key)
    inputDatepicker(beginCell)

    showCell(endCell, endDate, key)
    inputDatepicker(endCell)
  }
})

function showCell(cell, val, key)
{
  cell.innerHTML = val
  cell.dataset.val = val
  if (key) { cell.dataset.key = key }
}

function getActiveDate(e)
{
  if (!e) { return '' }

  const today = obj_2_ISO(new Date())
  const date = obj_2_ISO(new Date(e))

  return date > today ? e : ""
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
      let val = input ? input.value : this.textContent
      if (val !== this.dataset.val) {
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
  } else {
    alert("doSaveStaff\n\n" + response)
  }
  settingStaff()
}
