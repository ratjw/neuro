
import { RAMAID, ROLE, ONCALL, START, SKIPBEGIN, SKIPEND } from "../setting/constSTAFF.js"
import { getSTAFFdivision, getLatestStart } from "../setting/getStaff.js"
import { saveStaff } from "../setting/saveStaff.js"
import { getLatestKey, winHeight } from "../util/util.js"
import { obj_2_ISO, th_2_ISO } from "../util/date.js"

export function settingStaff()
{
  const actionIcons = document.querySelector('#actionIcons'),
    actionTemplate = document.querySelector('#actionTemplate'),
    roletemplate = document.querySelector("#roletemplate"),
    $dialogStaff = $("#dialogStaff"),
    $stafftbltbody = $("#stafftbl tbody"),
    $stafftbltr = $("#stafftbl tr"),
    $staffcellstr = $('#staffcells tr'),
    maxHeight = winHeight(90),
    staffs = getSTAFFdivision()

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

  $dialogStaff.find(`td:nth-child(${ROLE+1})`).each(function() {
    let roletemp = roletemplate.content.cloneNode(true)
    let val = this.innerHTML
    this.innerHTML = ""
    this.appendChild(roletemp)
    let role = this.querySelector("select")
    role.value = val
  })

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
