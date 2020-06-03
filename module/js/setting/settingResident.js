
import {
  ICONS, YEARS, getRESIDENT, fillResidentTbl, addResident, updateResident, deleteResident
} from "../model/sqlDoResident.js"
import { winHeight } from "../util/util.js"

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

  let residents = await getRESIDENT()

  if (!residents.length) {
    fillResidentTbl()
  } else {
    $.each( residents, function() {
      $residentcellstr.clone()
        .appendTo($residenttbltbody)
          .filldataResident(this)
    })
    $("#dialogResident").off("click", "img").on("click", "img", function() {
      IMAGES[this.className].call(this, this.closest("tr"))
    })
  }

  $dialogResident.dialog({ modal: true })
  $dialogResident.dialog({ height: 'auto' })
  $dialogResident.dialog({
    title: "Neurosurgery Resident",
    closeOnEscape: true,
    show: 200,
    hide: 200,
    width: "auto",
    height: ($dialogResident.height() > maxHeight) ? maxHeight : 'auto'
  })
  .off('keydown').on('keydown', event => {
    let keycode = event.which || window.Event.keyCode
    if (keycode === 13) {
      let save = [...document.querySelectorAll("#residenttbl tr")].find(e => 
        e.cells[5].innerHTML === "Save"
      )
      if (save) { saveResident(save) }
    }
  })
}

jQuery.fn.extend({
  filldataResident : function (q) {

    let row = this[0]
    let cells = row.cells

    row.dataset.ramaid = q.ramaid
;   [ q.ramaid,
      q.residentname,
      q.enlistStart,
      q.enlistEnd,
      IMAGEALL
    ].forEach((e, i) => { cells[i].innerHTML = e })
  }
})
