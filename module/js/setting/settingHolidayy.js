
import { ISO_2_th, ISO_2_ddThaiM } from "../util/date.js"
import { winHeight } from "../util/util.js"
import { datePicker, dateMonthPicker } from "../util/datePicker.js"
import { getHOLIDAY } from "../util/updateBOOK.js"
import { saveHoliday, updateHoliday, deleteHoliday } from "../model/sqlHoliday.js"

const HOLIDAYTHAI = [
    "วันมาฆบูชา",
    "วันพืชมงคล",
    "วันวิสาขบูชา",
    "วันอาสาฬหบูชา",
    "วันเข้าพรรษา",
    "วันหยุดพิเศษ",
    "ไม่หยุด"
  ],
  IMAGE1 = `<img class="updateHoliday" src="css/pic/general/update.png">`,
  IMAGE2 = `<img class="deleteHoliday" src="css/pic/general/delete.png">`,
  IMAGE3 = `<img class="saveHoliday" src="css/pic/general/save.png">`

export function settingHoliday()
{
  let $dialogHoliday = $("#dialogHoliday"),
    $holidaytbl = $("#holidaytbl"),
    $holidateth = $("#holidateth"),
    $holidatemonth = $("#holidatemonth"),
    $holidayname = $("#holidayname"),
    holidaylist = '<option style="display:none"></option>',
    maxHeight = winHeight(90)

  fillHoliday($holidaytbl)
  $('#holidaycells tr').clone()
    .appendTo($holidaytbl.find('tbody'))
      .find("td:last").html(IMAGE3)

  dialogHoliday($dialogHoliday, "Religious Holiday")

  // option holidayThai
  HOLIDAYTHAI.forEach(holi => holidaylist += `<option value="${holi}">${holi}</option>`)
  $holidayname.html(holidaylist)
  $("img.saveHoliday").hide()
  $holidayname.on('change', checkComplete)

  function checkComplete() {
    if ($holidateth.val() && $holidayname.val()) { $("img.saveHoliday").show() }
  }
}

function fillHoliday($holidaytbl)
{
  const thisyear = new Date().getFullYear().toString(),
    maxyear = "9999",
    holiday = getHOLIDAY().filter(day =>
                (day.holidate > thisyear) && (day.holidate < maxyear)
              )

  $holidaytbl.find('tr').slice(1).remove()

  if (holiday.length) {
    $.each( holiday, function(i) {
      $('#holidaycells tr').clone()
        .appendTo($holidaytbl.find('tbody'))
          .filldataHoliday(this)
    })
    $("#holidaytbl").off("click", ".updateHoliday")
      .on("click", ".updateHoliday", function() {
      updateHoliday(this.closest("tr"))
    })
    $("#holidaytbl").off("click", ".deleteHoliday")
      .on("click", ".deleteHoliday", function() {
      deleteHoliday(this.closest("tr"))
    })
    $("#holidaytbl").off("click", ".saveHoliday")
      .on("click", ".saveHoliday", function() {
      saveHoliday(this.closest("tr"))
    })
  }

//  document.querySelectorAll(".delholiday").forEach(function(item) {
//    item.addEventListener("click", function() {
//      delHoliday(this)
//    })
//  })
}

jQuery.fn.extend({
  filldataHoliday : function(q) {
    let  cells = this[0].cells

;   [ ISO_2_th(q.holidate),
      q.dayname,
      IMAGE1 + IMAGE2
    ].forEach((e, i) => { cells[i].innerHTML = e })

    holiDatepicker(cells[0])
  }
})

// tabIndex = "-1" prevent input focus
function holiDatepicker(cell)
{
  let input = document.createElement('input')

  input.style.width = '80px'
  input.value = cell.textContent
  input.tabIndex = "-1"
  cell.innerHTML = ''
  cell.appendChild(input)

  datePicker($(input))
//  $holidateth.datepicker('option', 'onClose', checkComplete)
//  $(input).datepicker({ dateFormat: "d M yy" })
}

export function settingGovtday()
{
  let $dialogHoliday = $("#dialogHoliday"),
    $holidaytbl = $("#holidaytbl"),
    $holidateth = $("#holidateth"),
    $holidatemonth = $("#holidatemonth"),
    $holidayname = $("#holidayname")

  fillGovtday($holidaytbl)
  dialogHoliday($dialogHoliday, "Government Holiday")

  $holidateth.hide()
  $holidatemonth.show()
  dateMonthPicker($holidatemonth)
  $holidatemonth.datepicker('option', 'onClose', checkComplete)
  $holidatemonth.focus(() => $(".ui-datepicker-year").hide())

//  $holidayname.html(holidaylist)
  $("#buttonHoliday").hide()
  $holidayname.on('change', checkComplete)

  function checkComplete() {
    if ($holidatemonth.val() && $holidayname.val()) { $("#buttonHoliday").show() }
  }
}

function fillGovtday($holidaytbl)
{
  const thisyear = new Date().getFullYear().toString(),
    maxyear = "9999",
    holiday = getHOLIDAY().filter(day => day.holidate > maxyear)

  $holidaytbl.find('tr').slice(1).remove()

  $.each( holiday, function(i) {
    $('#holidaycells tr').clone()
      .appendTo($holidaytbl.find('tbody'))
        .filldataGovtday(this)
  });

  document.querySelectorAll(".delholiday").forEach(function(item) {
    item.addEventListener("click", function() {
      delHoliday(this)
    })
  })
}

jQuery.fn.extend({
  filldataGovtday : function(q) {
    let  cells = this[0].cells

    cells[0].innerHTML = ISO_2_ddThaiM(q.holidate)
    cells[1].innerHTML = q.dayname
  }
})

function dialogHoliday($dialogHoliday, title)
{
  $dialogHoliday.dialog({ modal: true })
  $dialogHoliday.dialog({
    title: title,
    closeOnEscape: true,
    show: 200,
    hide: 200,
    width: 390,
    height: 610,
    buttons: [{
      text: "Save",
      id: "buttonHoliday",
      click: function () {
        saveHoliday()
      }
    }],
    close: function() {
      let $inputRow = $("#holidaytbl tr:has('input')")

      if ($inputRow.length) {
        holidayInputBack($inputRow)
      }
    }
  })
}

function addHoliday()
{
  let  $dialogHoliday = $("#dialogHoliday"),
    $holidaytbl = $("#holidaytbl")

  // already has an <input> row
  if ($holidaytbl.find("input").length) { return }

  $holidaytbl.find("tbody")
    .append($("#holidayInput tr"))

  let  append = $holidaytbl.height(),
    height = $dialogHoliday.height()
  if (append > height) {
    $dialogHoliday.scrollTop(append - height)
  }
}
