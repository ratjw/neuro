
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
              NOBEGIN = 5,
              NOEND = 6,
              ICONS = 7

const IMAGE1 = `<img id="image1" src="css/pic/general/add.png">`,
  IMAGE2 = `<img id="image2" src="css/pic/general/save.png">`,
  IMAGE3 = `<img id="image3" src="css/pic/general/update.png">`,
  IMAGE4 = `<img id="image4" src="css/pic/general/delete.png">`,
  IMAGE5 = `<img id="image5" src="css/pic/general/cancel.png">`

const IMAGE = {
  image1: doAddStaff,
  image2: doSaveStaff,
  image3: doUpdateStaff,
  image4: doDeleteStaff,
  image5: settingStaff
}

export function settingStaff()
{
  const $actionIcons = $("#actionIcons"),
    note = [
      `${IMAGE1} Add`,
      `${IMAGE2} Save`,
      `${IMAGE3} Update`,
      `${IMAGE4} Delete`,
      `${IMAGE5} Cancel`
    ],

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
    $("#dialogStaff").one("click", "img", function() {
      IMAGE[this.id].call(this, this.closest("tr"))
    })
    let $cells = $("#dialogStaff td").filter(function() {
      return this.cellIndex && this.cellIndex < 7
    })
    $cells.one("click", function() {
      this.closest('tr').cells[ICONS].innerHTML = `${IMAGE3}${IMAGE5}`
      $(this).one("click", "img", function() {
        IMAGE[this.id].call(this, this.closest("tr"))
      })
    })
    $cells.each(function() {
      if (this.cellIndex < 3) {
        this.contentEditable = 'true'
        $(this).one(function() { this.focus() })
      }
    })
    $cells.each(function() {
      if (this.cellIndex > 2) {
        this.innerHTML = inputDatepicker(this)
      }
    })
  }
  $actionIcons.find('span').each(function(i) {
    this.innerHTML = note[i]
  })

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

;   [ q.number,
      q.staffname,
      q.ramaid,
      q.oncall ? 'Yes' : 'No',
      q.startoncall,
      q.startoncall,
      q.startoncall,
      `${IMAGE1}${IMAGE4}`
    ].forEach((e, i) => { cells[i].innerHTML = e })
  }
})

function doAddStaff(row)
{
  let stafftr = document.querySelector("#staffcells tr")
  let clone = stafftr.cloneNode(true)
  let staffname = clone.cells[STAFFNAME]
  let ramaid = clone.cells[RAMAID]
  let icons = clone.cells[ICONS]

  staffname.contentEditable = 'true'
  ramaid.contentEditable = 'true'
  icons.innerHTML = `${IMAGE2}${IMAGE5}`
  row.after(clone)
  $("icons img").one("click", "img", function() {
    IMAGE[this.id].call(this, this.closest("tr"))
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
