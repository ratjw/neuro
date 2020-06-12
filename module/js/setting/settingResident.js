
import { ICONS, eduMonth, eduDate, eduYear } from "../setting/constResident.js"
import { getRESIDENT } from "../setting/getRESIDENT.js"
import { newResident, updateResident, deleteResident } from "../model/sqlResident.js"
import { winHeight } from "../util/util.js"

const ENTRYLEVEL = 2,
  IMAGE1 = `<img class="updateResident" src="css/pic/general/update.png">`,
  IMAGE2 = `<img class="deleteResident" src="css/pic/general/delete.png">`

export function settingResident()
{
  const $dialogResident = $("#dialogResident"),
    $residenttbltbody = $("#residenttbl tbody"),
    $residenttbltr = $("#residenttbl tr"),
    $residentcellstr = $('#residentcells tr'),
    maxHeight = winHeight(90)

  $residenttbltr.slice(1).remove()

  let residents = getRESIDENT()

  if (residents.length) {
    $.each( residents, function() {
      $residentcellstr.clone()
        .appendTo($residenttbltbody)
          .filldataResident(this)
    })
    $("#dialogResident").off("click", ".updateResident")
      .on("click", ".updateResident", function() {
      updateResident(this.closest("tr"))
    })
    $("#dialogResident").off("click", ".deleteResident")
      .on("click", ".deleteResident", function() {
      deleteResident(this.closest("tr"))
    })
  }

  moreResident()

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
      event.preventDefault()
      let selObj = window.getSelection(),
        row = selObj.focusNode.parentNode.closest('tr'),
        update = row.cells[ICONS].innerHTML.includes(IMAGE1),
        save = row.cells[ICONS].innerHTML.includes(IMAGE2)

      if (update) { updateResident(row) }
      else if (save) { newResident(row) }
    }
  })
}

function moreResident()
{
  let denttbody = document.querySelector("#residenttbl tbody"),
    residentcells = document.querySelector("#residentcells tr"),
    clone = residentcells.cloneNode(true),
    cells = clone.cells,
    icon = cells[ICONS],
    prefillData = [
      "",
      "",
      ENTRYLEVEL,
      `<img src="css/pic/general/save.png">`
    ]

  denttbody.appendChild(clone)
  prefillData.forEach((e, i) => { cells[i].innerHTML = e })
  icon.onclick = function() { newResident(clone) }
}

jQuery.fn.extend({
  filldataResident : function (q) {

    let row = this[0]
    let cells = row.cells
    let level = eduYear - q.yearOne + 1 - q.addLevel

    row.dataset.ramaid = q.ramaid
    row.dataset.addLevel = q.addLevel
    row.dataset.level = level
;   [ q.ramaid,
      q.name,
      level < 6 ? level : "",
      IMAGE1 + IMAGE2
    ].forEach((e, i) => { cells[i].innerHTML = e })
  }
})
