
import { htmlStafflist } from "../control/html.js"
import { sqlDoSaveStaff, sqlDoDeleteStaff } from "../model/sqlDoStaff.js"
import { STAFF, setSTAFF } from "../util/updateBOOK.js"
import { Alert, winHeight } from "../util/util.js"
import { datepicker } from "../util/date.js"
import { fillConsults } from "../view/fillConsults.js"

export const STAFFNAME = 0,
              RAMAID = 1,
              ONCALL = 2,
              STARTONCALL = 3,
              SKIPBEGIN = 4,
              SKIPEND = 5

export function settingStaff()
{
  const 
    $dialogStaff = $("#dialogStaff"),
    $stafftbltbody = $("#stafftbl tbody"),
    $stafftbltr = $("#stafftbl tr"),
    $staffcellstr = $('#staffcells tr'),
    maxHeight = winHeight(90)

  $stafftbltr.slice(2).remove()

  if (!STAFF.length) {
    doAddStaff($stafftbltr[1])
  } else {
    $.each( STAFF, (i, item) => {
      $staffcellstr.clone()
        .appendTo($stafftbltbody)
          .filldataStaff(i, item)
    })

    $staffcellstr.clone().appendTo($stafftbltbody)
    setClickCells()
  }

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
}

jQuery.fn.extend({
  filldataStaff : function (i, q) {

    let row = this[0]
    let cells = row.cells

;   [ q.staffname,
      q.ramaid,
      q.oncall,
      q.startoncall,
      q.startoncall,
      q.startoncall
    ].forEach((e, i) => { cells[i].innerHTML = e })
  }
})

function setClickCells($cells)
{
  $("#dialogStaff td").each(function() {
    $(this).off("click").on("click", function() {
      if (this.cellIndex < 3) {
        this.contentEditable = 'true'
        this.focus()
      } else {
        inputDatepicker(this)
      }
      activateButtons(this)
    })
  })
}

function inputDatepicker(cell)
{
  let input = document.createElement('input')

  input.style.width = '80px'
  cell.innerHTML = ''
  cell.appendChild(input)
  datepicker($(input))
  $(input).datepicker('option', 'onClose', function() {
    cell.innerHTML = input.value
  })
  input.focus()
}

function activateButtons(cell)
{
  const row = cell.closest('td'),
    saveStaff = document.querySelector('#saveStaff'),
    cancelStaff = document.querySelector('#cancelStaff')

  saveStaff.addEventListener('click', doSaveStaff)
  cancelStaff.addEventListener('click', settingStaff)
}

function doAddStaff(row)
{
  let stafftr = document.querySelector("#staffcells tr")
  let clone = stafftr.cloneNode(true)
  let staffname = clone.cells[STAFFNAME]
  let ramaid = clone.cells[RAMAID]
  let oncall = clone.cells[ONCALL]
  let icons = clone.cells[ICONS]

  [staffname, ramaid, oncall].forEach(e => e.contentEditable = 'true')
  icons.innerHTML = IMAGE2
  row.after(clone)
  $("icons img").off("click", "img").on("click", "img", function() {
    IMAGE[this.id].call(this, this.closest("tr"))
  })
  staffname.focus()
}

async function doStaffFunction(row, sqlDo, message)
{
  let response = await sqlDo(row)
  if (typeof response !== "object") {
    response && Alert(message, response)
  }
  showStaff(response)
}

async function doSaveStaff(row)
{
  let response = await sqlDoSaveStaff(row)
  if (typeof response !== "object") {
    response && Alert("doSaveStaff", response)
  }
  showStaff(response)
}

async function doUpdateStaff(row)
{
  let response = await sqlDoUpdateStaff(row)
  if (typeof response !== "object") {
    response && Alert("doUpdateStaff", response)
  }
  showStaff(response)
}

async function doDeleteStaff(row)
{
  let response = await sqlDoDeleteStaff(row)
  if (typeof response !== "object") {
    response && Alert("doDeleteStaff", response)
  }
  showStaff(response)
}

function showStaff(response)
{
  setSTAFF(response ? response.STAFF : STAFF)
  htmlStafflist()
  fillConsults()
  settingStaff()
}
