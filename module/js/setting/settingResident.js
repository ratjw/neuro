
import {
 ICONS, YEARS, getRESIDENT, saveResident, updateResident, deleteResident
} from "../model/sqlDoResident.js"
import { winHeight } from "../util/util.js"

const ENLISTSTART = "4 Jun",
      ENLISTEND = "31 May",

  IMAGE1 = `<img class="image1" src="css/pic/general/update.png">`,
  IMAGE2 = `<img class="image2" src="css/pic/general/delete.png">`

export async function settingResident()
{
  const $dialogResident = $("#dialogResident"),
    $residenttbltbody = $("#residenttbl tbody"),
    $residenttbltr = $("#residenttbl tr"),
    $residentcellstr = $('#residentcells tr'),
    maxHeight = winHeight(90)

  $residenttbltr.slice(1).remove()

  let residents = await getRESIDENT()

  if (residents.length) {
    $.each( residents, function() {
      $residentcellstr.clone()
        .appendTo($residenttbltbody)
          .filldataResident(this)
    })
    $("#dialogResident").off("click", ".image1").on("click", ".image1", function() {
      updateResident(this.closest("tr"))
    })
    $("#dialogResident").off("click", ".image2").on("click", ".image2", function() {
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
        e.cells[5].innerHTML === `<img src="css/pic/general/save.png">`
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
      getEnlistStart(),
      2,
      getEnlistEnd(),
      `<img src="css/pic/general/save.png">`
    ]

  denttbody.appendChild(clone)
  prefillData.forEach((e, i) => { cells[i].innerHTML = e })
  icon.onclick = function() { saveResident(clone) }
}

export function getEnlistStart()
{
  let year = new Date().getFullYear()

  return `${ENLISTSTART} ${year}`
}

function getEnlistEnd()
{
  let year = new Date().getFullYear()

  return `${ENLISTEND} ${year+YEARS}`
}

jQuery.fn.extend({
  filldataResident : function (q) {

    let row = this[0]
    let cells = row.cells

    row.dataset.ramaid = q.ramaid
;   [ q.ramaid,
      q.residentname,
      q.enlistStart,
      q.yearLevel,
      q.enlistEnd,
      IMAGE1 + IMAGE2
    ].forEach((e, i) => { cells[i].innerHTML = e })
  }
})
