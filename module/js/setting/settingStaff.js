
import { htmlStafflist } from "../control/html.js"
import { sqlDoSaveStaff, sqlDoUpdateStaff, sqlDoDeleteStaff } from "../model/sqlDoStaff.js"
import { STAFF, setSTAFF } from "../util/updateBOOK.js"
import { Alert, winHeight } from "../util/util.js"
import { fillConsults } from "../view/fillConsults.js"

export const NUMBER = 0,
              STAFFNAME = 1,
              RAMAID = 2,
              ONCALL = 3,
              STARTONCALL = 4,
              ICONS = 5

const IMAGE1 = `<img class="image1" src="css/pic/general/add.png">`,
  IMAGE2 = `<img class="image2" src="css/pic/general/update.png">`,
  IMAGE3 = `<img class="image3" src="css/pic/general/delete.png">`,
  IMAGEALL = `${IMAGE1}${IMAGE2}${IMAGE3}`

export function settingStaff()
{
  const IMAGE = {
    image1: doAddStaff,
    image2: doUpdateStaff,
    image3: doDeleteStaff
  }

  const $dialogStaff = $("#dialogStaff"),
    $stafftbltbody = $("#stafftbl tbody"),
    $stafftbltr = $("#stafftbl tr"),
    $staffcellstr = $('#staffcells tr'),
    maxHeight = winHeight(90)

  $stafftbltr.slice(1).remove()

  if (!STAFF.length) {
    let $clone = $staffcellstr.clone(),
      clone = $clone[0],
      cells = clone.cells,
      $save = $clone.find("td").eq(ICONS)
    $clone.appendTo($stafftbltbody)
;   ["", "", "", "", "", "Save"].forEach((e, i) => { clone.cells[i].innerHTML = e })
    $save.one("click", function() {
      doSaveStaff(clone)
    })
  } else {
    $.each( STAFF, (i, item) => {
      $staffcellstr.clone()
        .appendTo($stafftbltbody)
          .filldataStaff(i, item)
    })
    $("#dialogStaff").off("click", "img").on("click", "img", function() {
      IMAGE[this.className].call(this, this.closest("tr"))
    })
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
  .off('keydown').on('keydown', event => {
    let keycode = event.which || window.Event.keyCode
    if (keycode === 13) {
      $("#stafftbl tr").each(function() {
        if (this.cells[ICONS].innerHTML === "Save") { doSaveStaff(this) }
      })
    }
  })
}

jQuery.fn.extend({
  filldataStaff : function (i, q) {

    let row = this[0]
    let cells = row.cells

;   [ q.number,
      q.staffname,
      q.ramaid,
      q.oncall,
      q.startoncall,
      q.startoncall,
      q.startoncall,
      IMAGEALL
    ].forEach((e, i) => { cells[i].innerHTML = e })
  }
})

function doAddStaff(row)
{
  let stafftr = document.querySelector("#staffcells tr")
  let clone = stafftr.cloneNode(true)
  let staffname = clone.cells[STAFFNAME]
  let icons = clone.cells[ICONS]

  icons.innerHTML = "Save"
  row.after(clone)
  icons.addEventListener("click", function() {
    doSaveStaff(clone)
  })
  staffname.focus()
}

async function doSaveStaff(row)
{
  let response = await sqlDoSaveStaff(row)
  if (typeof response === "object") {
    showStaff(response)
  } else {
    response && Alert("doSaveStaff", response)
  }
}

async function doUpdateStaff(row)
{
  let response = await sqlDoUpdateStaff(row)
  if (typeof response === "object") {
    showStaff(response)
  } else {
    response && Alert("doUpdateStaff", response)
  }
}

async function doDeleteStaff(row)
{
  let response = await sqlDoDeleteStaff(row)
  if (typeof response === "object") {
    showStaff(response)
  } else {
    response && Alert("doDeleteStaff", response)
  }
}

function showStaff(response)
{
  setSTAFF(response.STAFF)
  htmlStafflist()
  fillConsults()
  settingStaff()
}
