
import { ISO_2_ddThaiM } from "../util/date.js"
import { getHOLIDAY } from "../util/updateBOOK.js"
import { dateMonthPicker } from "../util/datePicker.js"
import { dialogHoliday, saveHoliday, onclickDelete } from "../setting/dialogHoliday.js"
import {
 MAXYEAR, HOLIDATE, HOLINAME, INPUT, ACTION, SAVE, DELETE
} from "../setting/constHoliday.js"

export function settingGovtday()
{
  fillGovtday()
  dialogHoliday("Government Holiday")
}

export function fillGovtday()
{
  const $holidaytbl = $("#holidaytbl"),
    holiday = getHOLIDAY().filter(day => day.holidate > MAXYEAR)

  $holidaytbl.find('tr').slice(1).remove()

  $.each( holiday, function(i) {
    $('#holidaycells tr').clone()
      .appendTo($holidaytbl.find('tbody'))
        .filldataGovtday(this)
  });

  moreHoliday()
  onclickDelete()
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

function moreHoliday()
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
    await saveHoliday(clone)
    fillGovtday()
  }
}
