
import { ISO_2_th, th_2_ISO } from "../util/date.js"
import { getHOLIDAY } from "../util/updateBOOK.js"
import { datePicker } from "../util/datePicker.js"
import { dialogHoliday, saveHoliday, onclickDelete } from "../setting/dialogHoliday.js"
import {
 THISYEAR, MAXYEAR, HOLIDAYTHAI, HOLIDATE, HOLINAME, INPUT, SELECT, ACTION, SAVE, LIST, DELETE
} from "../setting/constHoliday.js"

export function settingHoliday()
{
  fillHoliday()
  dialogHoliday("Religious Holiday")
}

export function fillHoliday()
{
  const $holidaytbl = $("#holidaytbl"),
    holiday = getHOLIDAY().filter(day =>
                (day.holidate > THISYEAR) && (day.holidate < MAXYEAR)
              )

  $holidaytbl.find('tr').slice(1).remove()

  $.each( holiday, function(i) {
    $('#holidaycells tr').clone()
      .appendTo($holidaytbl.find('tbody'))
        .filldataHoliday(this)
  });

  moreHoliday()
  onclickDelete()
}

jQuery.fn.extend({
  filldataHoliday : function(q) {
    let row = this[0]
    let cells = row.cells

    row.dataset.holidate = q.holidate
    row.dataset.dayname = q.dayname
;   [ ISO_2_th(q.holidate),
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
    holidaylist = LIST,
    checkComplete = () => {
      if (holidate.value && holiname.value) {
        cells[ACTION].innerHTML = SAVE
      }
    }

  holidaytbody.appendChild(clone)

  cells[HOLIDATE].innerHTML = INPUT
  const holidate = document.querySelector("#holidate"),
    $holidate = $(holidate)
  holidate.tabIndex = "-1"
  datePicker($holidate)
  $holidate.datepicker('option', 'onClose', checkComplete)

  cells[HOLINAME].innerHTML = SELECT
  const holiname = document.querySelector("#holidayname")
  HOLIDAYTHAI.forEach(holi => holidaylist += `<option value="${holi}">${holi}</option>`)
  holiname.innerHTML = holidaylist
  holiname.onchange = checkComplete

  cells[ACTION].onclick = async () => {
    await saveHoliday(th_2_ISO(holidate.value), holiname.value)
    fillHoliday()
  }
}
