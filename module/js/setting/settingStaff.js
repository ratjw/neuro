
import { htmlStafflist } from "../control/html.js"
import { sqlDoSaveStaff } from "../model/sqlDoStaff.js"
import { STAFF, setSTAFF } from "../util/updateBOOK.js"
import { Alert, winHeight } from "../util/util.js"
import { fillConsults } from "../view/fillConsults.js"

export const STAFFNAME = 0,
              RAMAID = 1,
              ONCALL = 2,
              STARTONCALL = 3,
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
  }

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

  setClickCells()
}

jQuery.fn.extend({
  filldataStaff : function (i, q) {

    const row = this[0]
    const cells = row.cells

    row.dataset.number = q.number
;   [ q.staffname,
      q.ramaid,
      q.oncall,
      q.startoncall,
      q.skipbegin,
      q.skipend
    ].forEach((e, i) => { cells[i].innerHTML = e })
  }
})

function setClickCells()
{
  $("#dialogStaff td").each(function() {
    if (this.cellIndex < 3) {
      inputEditable(this)
    } else {
      inputDatepicker(this)
    }
  })
}

function inputEditable(cell)
{
  cell.removeEventListener("click", activateButtons)
  cell.addEventListener("click", () => activateButtons(cell))
}

function inputDatepicker(cell)
{
  let input = document.createElement('input')

  $(cell).off('click').on('click', function() {
    input.style.width = '80px'
    input.value = cell.innerHTML
    cell.innerHTML = ''
    cell.appendChild(input)
    $(input).datepicker('option', 'onClose', function() {
      cell.innerHTML = input.value
    })
    input.focus()
    activateButtons(cell)
  })
}

function activateButtons(cell)
{
  const row = cell.closest('tr'),
    saveStaff = document.querySelector('#saveStaff'),
    cancelStaff = document.querySelector('#cancelStaff')

  saveStaff.removeEventListener("click", doSaveStaff)
  cancelStaff.removeEventListener("click", settingStaff)
  saveStaff.addEventListener('click', () => doSaveStaff(row))
  cancelStaff.addEventListener('click', settingStaff)
}

async function doSaveStaff(row)
{
  let response = await sqlDoSaveStaff(row)
  if (typeof response !== "object") {
    response && Alert("doSaveStaff", response)
  }

  setSTAFF(response ? response.STAFF : STAFF)
  htmlStafflist()
  fillConsults()
  settingStaff()
}
