
import { doSaveStaff, doAddStaff, doUpdateStaff, doDeleteStaff } from "../setting/doStaff.js"
import { STAFF } from "../util/updateBOOK.js"
import { winHeight } from "../util/util.js"

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

export function viewAddStaff(row)
{
  $("#staffcells tr").clone().insertAfter(row).cells[4].innerHTML = "Save"

  $("#dialogStaff").off("click", "td").on("click", "td:eq(" + 4 + ")", function() {
    doSaveStaff(this.closest("tr"))
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
