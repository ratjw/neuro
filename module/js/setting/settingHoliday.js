
import { SELECTED } from "../control/const.js"
import { ISO_2_th, th_2_ISO } from "../util/date.js"
import { datePicker } from "../util/datePicker.js"
import { dialogHoliday, saveHoliday, onclickDelete } from "../setting/dialogHoliday.js"
import {
  THISYEAR, MAXYEAR, HOLIDAYTHAI, HOLIDATE, HOLINAME, SELECT,
  ACTION, SAVE, LIST, DELETE, getHOLIDAY
} from "../setting/constHoliday.js"

export function settingHoliday()
{
  dialogHoliday("วันหยุดเฉพาะปีนี้")
  fillHolyDay()
  newHoliday()
}

function fillHolyDay()
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

function newHoliday()
{
  let holidaytbody = document.querySelector("#holidaytbl tbody"),
    holidayrows = document.querySelector("#holidaycells tr"),
    clone = holidayrows.cloneNode(true),
    cells = clone.cells,
    holidaylist = LIST,
    selected = document.querySelector(`.${SELECTED}`),
    date = selected.dataset.opdate,
    clickDay, preholiname

  if (selected.querySelector(".holiday")) {
    let rows = Array.from(holidaytbody.children)
    clickDay = rows.find(row => row.dataset.holidate === date)
    clickDay.classList.add("deletedcase")
    preholiname = clickDay.dataset.dayname
  } else {
    cells[HOLIDATE].innerHTML = ISO_2_th(date)
    clickDay = holidaytbody.appendChild(clone)
  }

  clickDay.cells[HOLINAME].innerHTML = SELECT
  const holiname = clickDay.querySelector("select")
  HOLIDAYTHAI.forEach(holi => holidaylist += `<option value="${holi}">${holi}</option>`)
  holiname.innerHTML = holidaylist
  holiname.value = preholiname
  holiname.onchange = () => {
    if (holiname.value) {
      clickDay.cells[ACTION].innerHTML = SAVE
    }
  }

  clickDay.cells[ACTION].onclick = async () => {
    await saveHoliday(date, holiname.value)
    $("#dialogHoliday").dialog("close")
  }
}
