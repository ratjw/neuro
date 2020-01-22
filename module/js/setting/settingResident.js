
import {
  RESIDENT, getResident, saveResident, addResident, updateResident, deleteResident
} from "../model/sqlDoResident.js"
import { winHeight } from "../util/util.js"

export const RAMAID = 0,
  RNAME = 1,
  ENYEAR = 2,
  ICONS = 3

const IMAGE1 = `<img class="image1" src="css/pic/general/add.png">`,
  IMAGE2 = `<img class="image2" src="css/pic/general/update.png">`,
  IMAGE3 = `<img class="image3" src="css/pic/general/delete.png">`,
  IMAGEALL = `${IMAGE1}${IMAGE2}${IMAGE3}`

export async function settingResident()
{
  const IMAGES = {
    image1: addResident,
    image2: updateResident,
    image3: deleteResident
  }

  const $dialogResident = $("#dialogResident"),
    $residenttbltbody = $("#residenttbl tbody"),
    $residenttbltr = $("#residenttbl tr"),
    $residentcellstr = $('#residentcells tr'),
    maxHeight = winHeight(90)

  $residenttbltr.slice(1).remove()

  if (!RESIDENT.length) { await getResident() }

  if (!RESIDENT.length) {
    let $clone = $residentcellstr.clone(),
      clone = $clone[0],
      cells = clone.cells,
      $icon = $clone.find("td").eq(ICONS)
    $clone.appendTo($residenttbltbody)
;   ["", "", "", "Save"].forEach((e, i) => { clone.cells[i].innerHTML = e })
    $icon.one("click", function() {
      saveResident(clone)
    })
  } else {
    $.each( RESIDENT, (i, item) => {
      $residentcellstr.clone()
        .appendTo($residenttbltbody)
          .filldataResident(i, item)
    })
    $("#dialogResident").off("click", "img").on("click", "img", function() {
      IMAGES[this.className].call(this, this.closest("tr"))
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
  .off('keydown').on('keydown', event => {
    let keycode = event.which || window.Event.keyCode
    if (keycode === 13) {
      let save = [...document.querySelectorAll("#residenttbl tr")].find(e => 
        e.cells[3].innerHTML === "Save"
      )
      if (save) { saveResident(save) }
    }
  })
}

jQuery.fn.extend({
  filldataResident : function (i, q) {

    let row = this[0]
    let cells = row.cells

    row.dataset.ramaid = q.ramaid
;   [ q.ramaid,
      q.residentname,
      q.enrollyear,
      IMAGEALL
    ].forEach((e, i) => { cells[i].innerHTML = e })
  }
})
