
import { htmlStafflist } from "../control/html.js"
import { sqlDoSaveStaff, sqlDoUpdateStaff, sqlDoDeleteStaff } from "../model/sqlDoStaff.js"
import { STAFF, setSTAFF } from "../util/updateBOOK.js"
import { Alert, winHeight } from "../util/util.js"
import { fillConsults } from "../view/fillConsults.js"

const IMAGE1 = `<img class="image1" src="css/pic/general/add.png">`,
  IMAGE2 = `<img class="image2" src="css/pic/general/update.png">`,
  IMAGE3 = `<img class="image3" src="css/pic/general/delete.png">`,
  IMAGEALL = `${IMAGE1}${IMAGE2}${IMAGE3}`

export function viewStaff()
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
    let clone = $staffcellstr.clone(),
      clone0 = clone[0],
      cells = clone0.cells,
      save = clone.find("td").eq(3)
    clone.appendTo($stafftbltbody)
    cells[0].innerHTML = ""
    cells[1].innerHTML = ""
    cells[2].innerHTML = ""
    cells[3].innerHTML = "Save"
    save.one("click", function() {
      doSaveStaff(clone0, 1)
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
}

jQuery.fn.extend({
  filldataStaff : function (i, q) {

    let row = this[0]
    let cells = row.cells

    cells[0].innerHTML = q.number
    cells[1].innerHTML = q.staffname
    cells[2].innerHTML = q.oncall
    cells[3].innerHTML = q.startoncall
    cells[4].innerHTML = IMAGEALL
  }
})

function doAddStaff(row)
{
  let stafftr = document.querySelector("#staffcells tr")
  let clone = stafftr.cloneNode(true)
  let save = clone.cells[4]

  save.innerHTML = "Save"
  row.after(clone)
  save.addEventListener("click", function() {
    doSaveStaff(clone, 1)
  })
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
  viewStaff()
}
