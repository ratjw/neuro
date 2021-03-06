
import { ISO_2_ddThaiM, ddThaiM_2_ISO } from "../util/date.js"
import { dateMonthPicker } from "../util/datePicker.js"
import { dialogHoliday, saveHoliday, onclickDelete } from "../setting/dialogHoliday.js"
import {
  MAXYEAR, HOLIDATE, HOLINAME, INPUT, ACTION, SAVE, DELETE, getHOLIDAY
} from "../setting/constHoliday.js"
import { getPermission } from '../control/setClickAll.js'

export function settingGovtday()
{
  fillGovtday()
  dialogHoliday("วันหยุดทุกปี")
}

export async function fillGovtday()
{
  const $holidaytbl = $("#holidaytbl"),
    holiday = getHOLIDAY().filter(day => day.holidate > MAXYEAR)

  $holidaytbl.find('tr').slice(1).remove()

  $.each( holiday, function(i) {
    $('#holidaycells tr').clone()
      .appendTo($holidaytbl.find('tbody'))
        .filldataGovtday(this)
  });

  if (await getPermission('disable')) {
    newGovtday()
    onclickDelete()
  } else {
    $holidaytbl.after("<br> * Staff and Admin can edit this table")
  }
}

jQuery.fn.extend({
  filldataGovtday : function(q) {
    let row = this[0]
    let cells = row.cells

    row.dataset.holidate = q.holidate
    row.dataset.dayname = q.dayname
;   [ ISO_2_ddThaiM(q.holidate),
      q.dayname,
      DELETE
    ].forEach((e, i) => cells[i].innerHTML = e)
  }
})

function newGovtday()
{
  let holidaytbody = document.querySelector("#holidaytbl tbody"),
    holidaycells = document.querySelector("#holidaycells tr"),
    clone = holidaycells.cloneNode(true),
    cells = clone.cells,
    holidayname = cells[HOLINAME],
    checkComplete = () => {
      if (holidate.value && holidayname.textContent) {
        cells[ACTION].innerHTML = SAVE
      }
    }

  holidaytbody.appendChild(clone)

  cells[HOLIDATE].innerHTML = INPUT
  const holidate = document.querySelector("#holidate"),
    $holidate = $(holidate)
  holidate.tabIndex = "-1"
  dateMonthPicker($holidate)
  $holidate.focus(() => $(".ui-datepicker-year").hide())
  $holidate.datepicker('option', 'onClose', checkComplete)

  holidayname.contentEditable = true
  holidayname.oninput = checkComplete
  cells[ACTION].onclick = async () => {
    await saveHoliday(ddThaiM_2_ISO(holidate.value), holidayname.textContent)
    fillGovtday()
  }
}
