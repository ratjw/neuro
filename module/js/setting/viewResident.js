
import {
  RESIDENT, getResident, doSaveResident, doAddResident, doUpdateResident, doDeleteResident
} from "../setting/doResident.js"
import { winHeight } from "../util/util.js"

const IMAGE1 = `<img class="image1" src="css/pic/general/add.png">`,
  IMAGE2 = `<img class="image2" src="css/pic/general/update.png">`,
  IMAGE3 = `<img class="image3" src="css/pic/general/delete.png">`,
  IMAGEALL = `${IMAGE1}${IMAGE2}${IMAGE3}`

export async function viewResident()
{
  const IMAGE = {
    image1: doAddResident,
    image2: doUpdateResident,
    image3: doDeleteResident
  }

  const $dialogResident = $("#dialogResident"),
    $residenttbltbody = $("#residenttbl tbody"),
    $residenttbltr = $("#residenttbl tr"),
    $residentcellstr = $('#residentcells tr'),
    maxHeight = winHeight(90)

  $residenttbltr.slice(1).remove()

  if (!RESIDENT.length) { await getResident() }

  if (!RESIDENT.length) {
    let clone = $residentcellstr.clone(),
      clone0 = clone[0],
      cells = clone0.cells,
      save = clone.find("td").eq(3)
    clone.appendTo($residenttbltbody)
    cells[0].innerHTML = ""
    cells[1].innerHTML = ""
    cells[2].innerHTML = ""
    cells[3].innerHTML = "Save"
    save.one("click", function() {
      doSaveResident(clone0, 1)
    })
  } else {
    $.each( RESIDENT, (i, item) => {
      $residentcellstr.clone()
        .appendTo($residenttbltbody)
          .filldataResident(i, item)
    })
    $("#dialogResident").off("click", "img").on("click", "img", function() {
      IMAGE[this.className].call(this, this.closest("tr"))
    })
  }

  $dialogResident.dialog({ height: 'auto' })
  $dialogResident.dialog({
    title: "Neurosurgery Resident",
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    width: "auto",
    height: ($dialogResident.height() > maxHeight) ? maxHeight : 'auto'
  })
}

export function viewAddResident(row)
{
  $("#residentcells tr").clone().insertAfter(row).cells[3].innerHTML = "Save"

  $("#dialogResident").off("click", "td").on("click", "td:eq(" + 3 + ")", function() {
    doSaveResident(this.closest("tr"))
  })
}

jQuery.fn.extend({
  filldataResident : function (i, q) {

    let row = this[0]
    let cells = row.cells

    cells[0].innerHTML = q.ramaid
    cells[1].innerHTML = q.residentname
    cells[2].innerHTML = q.enrollyear
    cells[3].innerHTML = IMAGEALL
  }
})
