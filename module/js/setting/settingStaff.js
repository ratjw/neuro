
import { htmlStafflist } from "../control/html.js"
import { sqlSaveStaff } from "../model/sqlStaff.js"
import { START, SKIPBEGIN, SKIPEND } from "../setting/constSTAFF.js"
import { getSTAFFdivision, getLatestStart } from "../setting/getStaff.js"
import { getLatestKey, Alert, winHeight } from "../util/util.js"
import { fillConsults } from "../view/fillConsults.js"
import { obj_2_ISO, th_2_ISO } from "../util/date.js"
import { setSTAFF } from "../util/updateBOOK.js"
import { DIVISION } from "../main.js"

export function settingStaff()
{
  const actionIcons = document.querySelector('#actionIcons'),
    actionTemplate = document.querySelector('#actionTemplate'),
    $dialogStaff = $("#dialogStaff"),
    $stafftbltbody = $("#stafftbl tbody"),
    $stafftbltr = $("#stafftbl tr"),
    $staffcellstr = $('#staffcells tr'),
    maxHeight = winHeight(90),
    staffs = getSTAFFdivision(DIVISION)

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

  $dialogStaff.dialog({ modal: true })
  $dialogStaff.dialog({
    title: "Neurosurgery Staff",
    closeOnEscape: true,
    show: 200,
    hide: 200,
    width: "auto",
    maxHeight: maxHeight
  })

  activateButtons($stafftbltbody)
}

jQuery.fn.extend({
  filldataStaff : function (i, q) {

    const row = this[0]
    const cells = row.cells
    const startCell = cells[START]
    const beginCell = cells[SKIPBEGIN]
    const endCell = cells[SKIPEND]

    // fill first 3 columns
;   [ q.name || "",
      q.ramaid || "",
      q.role || "",
      q.oncall === 0 ? q.oncall : (q.oncall || "")
    ].forEach((e, j) => {
      if (j < START) {
        showCell(cells[j], e)
      }
    })

    // fill the latest startDate to that name and blank others
    const start = getLatestStart()
    if (start) {
      if (q.name === start.name) {
        showCell(startCell, start.startDate, start.startKey)
      } else {
        showCell(startCell, '')
      }
      if (q.oncall) { inputDatepicker(startCell) }
    }

    // fill leave of absence (begin, end)
    const key = getLatestKey(q.skip)
    let beginDate = key ? getActiveDate(q.skip[key]["begin"]) : ''
    let endDate = key ? getActiveDate(q.skip[key]["end"]) : ''

    // if one of them is after today, show both
    if (beginDate) { endDate = q.skip[key]["end"] }
    if (endDate) { beginDate = q.skip[key]["begin"] }

    showCell(beginCell, beginDate, key)
    inputDatepicker(beginCell)

    showCell(endCell, endDate, key)
    inputDatepicker(endCell)
  }
})

function showCell(cell, val, key)
{
  cell.innerHTML = val
  cell.dataset.val = val === 0 ?  val : (val || "")
  if (key) { cell.dataset.key = key }
}

function getActiveDate(e)
{
  if (!e) { return '' }

  const today = obj_2_ISO(new Date())
  const date = obj_2_ISO(new Date(e))

  return date >= today ? e : ""
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

  $saveStaff.off("click")
  $saveStaff.on("click", () => getEditingStaff($tbody))
  $cancelStaff.off("click")
  $cancelStaff.on("click", settingStaff)
}

function getEditingStaff($tbody)
{
  $tbody.find('tr').each(function(i, row) {
    $(row).find('td').each(function(i) {
      let input = this.querySelector('input')
      let val = input ? input.value : this.textContent
      if (val !== this.dataset.val) {
          saveStaff(row)
          return false
        }
    })
  })
}

async function saveStaff(row)
{
  let response = await sqlSaveStaff(row)

  if (typeof response === "object") {
    setSTAFF(response)
    htmlStafflist()
    fillConsults()
  } else {
    alert("saveStaff\n\n" + response)
  }
  settingStaff()
}
