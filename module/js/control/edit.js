
import { savePreviousCell, editPresentCell } from "../control/clicktable.js"
import { PATIENT, DIAGNOSIS, TREATMENT, CONTACT, DIAGNOSISSV, ADMISSIONSV, FINALSV
} from "../control/const.js"
import { resetTimer, resetTimerCounter } from "../control/timer.js"
import { getTableRowByQN } from "../util/rowsgetting.js"
import { reposition } from "../util/util.js"
import { savePreviousCellService } from "../service/savePreviousCellService.js"
import { editPresentCellService } from "../service/editPresentCellService.js"
import { clearAllEditing } from "../control/clearAllEditing.js"

const EDITABLESV = [DIAGNOSISSV, ADMISSIONSV, FINALSV]
const EDITABLETBL = [DIAGNOSIS, TREATMENT, CONTACT]

// the current position
export let POINTER = null

// the content before keyin
export let OLDCONTENT = ""

// get current content in the editing cell
// newcontent is the content currently in editcell
// and must be fetched from editcell itself every time when wanted
export function getNewcontent() {
  let editcell = document.getElementById("editcell")
  let spin = document.querySelectorAll("#spin")

  // Don't know why there are 2 spins???
  if (spin.length === 1) {
    return spin[0].value
  } else if (spin.length > 1) {
    return spin[1].value
  }

  return getHtmlText(editcell.innerHTML)
}

// Initialize $editcell
// Attach events to editcell all the time
export function editcellEvent()
{
  let $editcell = $("#editcell")

  $editcell.off("click").on("click", (event) => {
    resetTimer();
    event.stopPropagation()
  }).keydown(event => {
    let keycode = event.which

    keyin(event, keycode, POINTER)
    resetTimerCounter()
  // resize editcell along with underlying td
  }).keyup(event => {

    // not resize opdate & roomtime cells
    if (POINTER.cellIndex < 2) {
      return
    }

    let keycode = event.which || window.Event.keyCode

    // not resize after non-char was pressed
    if (keycode === 27)  { clearAllEditing() }
    if (keycode < 32)  { return }
  })
}

// Key on main or service table
let keyin = function (evt, keycode) {
  let tableID = $(POINTER).closest('table').attr('id'),
    servicetbl = tableID === "servicetbl",
    editable = servicetbl ? EDITABLESV : EDITABLETBL,
    Shift = evt.shiftKey,
    Ctrl = evt.ctrlKey

  switch(keycode)
  {
    case 27:
      clearAllEditing()
      evt.preventDefault()
      return
    case 13:
      if (servicetbl || (POINTER.cellIndex > PATIENT)) { return }
      savePreviousCell()
      clearAllEditing()
      return
    case 9:
      if (servicetbl) {
        serviceTable9(evt, editable, Shift)
      } else {
        if (POINTER.cellIndex === PATIENT) { return }
        mainTable9(evt, editable, Shift)
      }
      evt.preventDefault()
      return
  }
}

let mainTable9 = function (evt, editable, Shift) {
  savePreviousCell()
  if (!POINTER || POINTER.cellIndex > PATIENT) {
    let thiscell = Shift
                    ? findPrevcell(editable, POINTER)
                    : POINTER.closest("tr").dataset.hn
                      ? findNextcell(editable, POINTER)
                      : editPresentCell(evt, POINTER)
                      // avoid cursor jump

    thiscell
      ? editPresentCell(evt, thiscell)
      : clearEditcell()
  } else {
    clearEditcell()
  }
}

let serviceTable9 = function (evt, editable, Shift) {
  savePreviousCellService()
  let thiscell = Shift
                  ? findPrevcell(editable, POINTER)
                  : findNextcell(editable, POINTER)
  thiscell
    ? editPresentCellService(evt, thiscell)
    : clearEditcell()
}

let findPrevcell = function (editable, pointing) {
  let $prevcell = $(pointing),
    column = $prevcell.index(),
    prevcell = function () {
      // go to prev row last editable
      // null : the first row of main table tr.index() = 1
      // Service Table cell may invisible due to colspan
      do {
        $prevcell = $prevcell.parent().index() > 1
                    ? $prevcell.parent().prev().children().eq(editable[editable.length-1])
                    : null
      }
      while ($prevcell && $prevcell.get(0).nodeName === "TH"
              || $prevcell && !$prevcell.is(':visible'))

      return $prevcell && $prevcell[0]
    }
  
  column = editable[($.inArray(column, editable) - 1)]
  return column
          ? $prevcell.parent().find("td")[column]
          : prevcell()
}

let findNextcell = function (editable, pointing) {
  let $nextcell = $(pointing),
    column = $nextcell.index()

  column = editable[($.inArray(column, editable) + 1)]

  return column
          ? $nextcell.parent().find("td")[column]
          : findNextRow(editable, pointing)
}

let findNextRow = function (editable, pointing) {
  let $nextcell = $(pointing)

  // go to next row first editable
  // $nextcell.length = 0 when reach end of table
  // Service Table cell may invisible due to colspan
  do {
    $nextcell = $nextcell.parent().next().children().eq(editable[0])
  }
  while ($nextcell.length && ((!$nextcell.is(':visible'))
          || ($nextcell.get(0).nodeName === "TH")))

  return $nextcell.length && $nextcell[0]
}

let findThisCellNextRow = function (editable, pointing) {
  let $nextcell = $(pointing),
      thiscell = editable.find(e => e === pointing.cellIndex)

  // go to next row corresponding editable
  // $nextcell.length = 0 when reach end of table
  // Service Table cell may invisible due to colspan
  do {
    $nextcell = $nextcell.parent().next().children().eq(thiscell)
  }
  while ($nextcell.length && ((!$nextcell.is(':visible'))
          || ($nextcell.get(0).nodeName === "TH")))

  return $nextcell.length && $nextcell[0]
}

export function createEditcell(pointing)
{
  // jQuery height and width are content dimension which is more useful
  let $pointing = $(pointing)
  let height = $pointing.height()
  let width = $pointing.width()
  let context = pointing.innerHTML
  let editcell = document.querySelector("#editcell")

  editcell.contentEditable = "true"
  editcell.innerHTML = context
  showEditcell(pointing, height, width)
  editcellSaveData(pointing, context)
}

// re-render editcell for keyin cell only
export function reCreateEditcell()
{
  if (POINTER.cellIndex > PATIENT) {
    createEditcell(POINTER)
  }
}

// Update editing location and content
// after update from other user while idling
export function editcellSaveData(pointing, content) {
  POINTER = pointing
  OLDCONTENT = content
}

let showEditcell = function (pointing, height, width) {
  let editcell = document.querySelector("#editcell"),
    css = getComputedStyle(pointing),
    container,
    leftCont,
    leftEdit,
    rightEdit

  editcell.style.minHeight = height + "px"
  editcell.style.width = width + "px"
  editcell.style.fontSize = css.fontSize
  pointing.closest('div').appendChild(editcell)
  reposition($(editcell), "left center", "left center", pointing)
  container = editcell.parentElement.closest('div')
  leftCont = container.offsetLeft
  leftEdit = editcell.offsetLeft - leftCont - container.scrollLeft
  rightEdit = leftEdit + editcell.offsetWidth
  if (leftEdit < 0) {
    container.scrollLeft += leftEdit
  } else if (rightEdit > container.clientWidth) {
    container.scrollLeft = rightEdit
  }
  editcell.focus()
}

// after DOM refresh by fillmain, POINTER remains in its row but its parent is null
// must get qn to find current row position
export function renewEditcell()
{
  if (!POINTER) { return }

  let whereisEditcell = editcellLocation()
  let id = (whereisEditcell === "maintblContainer")
             ? "maintbl"
             : (whereisEditcell === "queuetblContainer")
               ? "queuetbl"
               : (whereisEditcell === "dialogService")
                 ? "servicetbl"
                 : ""
  let qn = POINTER.closest("tr").dataset.qn
  if (!id || !qn) { return }
  let row = getTableRowByQN(id, qn)
  let cindex = POINTER.cellIndex
  let pointing = row.cells[cindex]

  createEditcell(pointing)
}

export function editcellLocation()
{
  return $("#editcell").parent("div").attr("id")
}

export function clearEditcell() {
  let editcell = document.getElementById("editcell"),
    spinner = document.querySelector('.ui-spinner')

  POINTER = ""
  OLDCONTENT = ""
  editcell.innerHTML = ""
  editcell.style.display = "none"
  spinner && spinner.remove()
}

// TRIM spaces at begin, end
// remove html tags except <br> <div> </div>
// TRIM non-blank spaces at begin, end
export function getHtmlText(innerhtml)
{
  let HTMLBRDIV = /(<(?!br|div|\/div).*?>)/gi,
       HTMLNBSP = /(?:^(?:&nbsp;)+)|(?:(?:&nbsp;)+$)/g

  return innerhtml.trim().replace(HTMLBRDIV, '').replace(HTMLNBSP, '')
}
