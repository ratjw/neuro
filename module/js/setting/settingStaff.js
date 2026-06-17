
import { PATIENT } from "../control/const.js"
import { RAMAID, ROLE, ONCALL, START, SKIPBEGIN, SKIPEND } from "../setting/constSTAFF.js"
import { getSTAFFdivision, getLatestStart, getStaffOR } from "../setting/getStaff.js"
import { getLatestKey, winHeight } from "../util/util.js"
import { obj_2_ISO, th_2_ISO } from "../util/date.js"
import { saveStaff } from "../setting/saveStaff.js"

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
    staffs = getStaffOR()//getSTAFFdivision()

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
    this.innerHTML = ""
    this.appendChild(roletemp)
    let role = this.querySelector("select")
    role.value = this.dataset.val
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
      // show "0"
    ].forEach((e, j) => {
      if (j < START) {
        showCell(cells[j], e)
      }
    })

    // fill the latest startDate to that name and blank others
    const start = getLatestStart()
    if (start) {
      if (q.name === start.name) {
        showCell(startCell, start.startDate/*, start.startKey*/)
      } else {
        showCell(startCell, '')
      }
      if (q.oncall === 1) { inputDatepicker(startCell) }
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
                  // if blank, then not "0"
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
  checkStartOncall($tbody)
  saveStaffTable($tbody)
}

function checkStartOncall($tbody)
{
  let tr = $tbody[0].querySelectorAll("tr")
  let oldOncall = [...tr].filter(r => r.querySelectorAll("td")[ONCALL].dataset.val)
  let newOncall = [...tr].filter(r => r.querySelectorAll("td")[ONCALL].textContent)

  if (oldOncall.length === newOncall.length) return

  const table = document.getElementById('maintbl')
  const today = new Date().toISOString().split('T')[0],
    trSat = table.querySelectorAll("tr.Saturday"),
    saturdayRows = [...trSat].filter(e => e.dataset.opdate < today)
  const startStaff = getLatestStart(),
      oncallStaff = startStaff.name,
      oncalldate = startStaff.start
  const lastprior = [...saturdayRows].reverse().find(e => 
      e.querySelectorAll("td")[PATIENT].dataset.consult === oncallStaff
    ),
    lastpriordate = lastprior.dataset.opdate

  if (oncalldate < lastpriordate) {
    const startStaffTR = [...tr].find(
      e => e.querySelectorAll("td")[ONCALL].innerHTML === "1"
    )

    startStaffTR.cells[START].innerHTML = lastpriordate
  }
}

function saveStaffTable($tbody)
{
  $tbody.find('tr').each(function(i, row) {
    let save = false
    $(row).find('td').each(function(j, cell) {
      let selected = cell.querySelector("select")
      let input = cell.querySelector('input')
      if (selected) {
        cell.textContent = selected.value
      } else if (input && input.value) {
        cell.textContent = input.value
      }
      if (cell.textContent !== cell.dataset.val) {
        save = true
      }
    })
    // save only the changed rows, one row at a time
    if (save) saveStaff(row)
  })
}
