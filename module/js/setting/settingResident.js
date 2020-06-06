
import {
 ICONS, getRESIDENT, saveResident, updateResident, deleteResident
} from "../model/sqlDoResident.js"
import { winHeight } from "../util/util.js"

const ENTRYLEVEL = 2,
  CHANGELEVEL = "1 Jun",

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

  addResident()

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
        e.cells[ICONS].innerHTML === `<img src="css/pic/general/save.png">`
      )
      if (save) { saveResident(save) }
    }
  })
}

function addResident()
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
  icon.onclick = function() { saveResident(clone) }
}

jQuery.fn.extend({
  filldataResident : function (q) {

    let row = this[0]
    let cells = row.cells
    let level = calcLevel(q)

    row.dataset.ramaid = q.ramaid
    row.dataset.addLevel = q.addLevel || ""
    row.dataset.level = level
;   [ q.ramaid,
      q.residentname,
      (level <= 5 ? level : ""),
      IMAGE1 + IMAGE2
    ].forEach((e, i) => { cells[i].innerHTML = e })
  }
})

function calcLevel(resident)
{
  const todate = Date.now(),
    thisYear = new Date().getFullYear(),
    entryYear = new Date(resident.entryDate).getFullYear(),
    entryDate = Date.parse(resident.entryDate),
    entryLimit = Date.parse(new Date(`${CHANGELEVEL} ${entryYear}`)),
    thisLimit = Date.parse(new Date(`${CHANGELEVEL} ${thisYear}`))

  return thisYear
          - entryYear
          + resident.entryLevel
          + (todate < thisLimit ? -1 : 0)
          + (entryDate < entryLimit ? 1 : 0)
          + (resident.addLevel || 0)
}
