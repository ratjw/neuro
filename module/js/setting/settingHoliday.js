
import { DIAGNOSIS, THAIMONTH } from "../control/const.js"
import { th_2_ISO, putThdate } from "../util/date.js"
import { datePicker } from "../util/datePicker.js"
import { getTableRowsByDate } from "../util/rowsgetting.js"
import { getHOLIDAY, setHOLIDAY } from "../util/updateBOOK.js"
import { findHoliday } from "../view/findHoliday.js"
import { sqlSaveHoliday, sqlDelHoliday } from "../model/sqlSaveHoliday.js"
import { Alert } from "../util/util.js"

const HOLIDAYTHAI = [
  "วันมาฆบูชา",
  "วันพืชมงคล",
  "วันวิสาขบูชา",
  "วันอาสาฬหบูชา",
  "วันเข้าพรรษา",
  "วันหยุดพิเศษ",
  "ไม่หยุด"
]

export function settingHoliday()
{
  let $dialogHoliday = $("#dialogHoliday"),
    $holidaytbl = $("#holidaytbl"),
    $holidateth = $("#holidateth"),
    $holidayname = $("#holidayname"),
    holidaylist = '<option style="display:none"></option>'

  fillHoliday($holidaytbl)
  $dialogHoliday.dialog({ modal: true })
  $dialogHoliday.dialog({
    title: "Holiday",
    closeOnEscape: true,
    show: 200,
    hide: 200,
    width: 350,
    height: 600,
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

  datePicker($holidateth)
  $holidateth.datepicker('option', 'onClose', checkComplete)

  // option holidayThai
  HOLIDAYTHAI.forEach(holi => holidaylist += `<option value="${holi}">${holi}</option>`)
  $holidayname.html(holidaylist)
  $("#buttonHoliday").hide()
  $holidayname.on('change', checkComplete)

  function checkComplete() {
    if ($holidateth.val() && $holidayname.val()) { $("#buttonHoliday").show() }
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

  $.each( holiday, function(i) {
    $('#holidaycells tr').clone()
      .appendTo($holidaytbl.find('tbody'))
        .filldataHoliday(this)
  });

  document.querySelectorAll(".delholiday").forEach(function(item) {
    item.addEventListener("click", function() {
      delHoliday(this)
    })
  })
}

jQuery.fn.extend({
  filldataHoliday : function(q) {
    let  cells = this[0].cells

    cells[0].innerHTML = putThdate(q.holidate)
    cells[1].innerHTML = q.dayname
  }
})

export function addHoliday()
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

function saveHoliday()
{
  let  vdateth = document.getElementById("holidateth").value,
    vdate = th_2_ISO(vdateth),
    vname = document.getElementById("holidayname").value,
    rows = getTableRowsByDate('maintbl', vdate)

  if (!vdate || !vname) { return }

  sqlSaveHoliday(vdate, vname).then(response => {
    if (typeof response === "object") {
      setHOLIDAY(response)
      holidayInputBack($("#holidateth").closest("tr"))
      fillHoliday($("#holidaytbl"))
      $("#buttonHoliday").hide()
      rows.forEach(row => {
        row.cells[DIAGNOSIS].classList.add("holiday")
        row.cells[DIAGNOSIS].dataset.holiday = findHoliday(vdate)
      })
    } else {
      Alert ("saveHoliday", response)
    }
  })
}

// Have to move $inputRow back and forth because datepicker is sticked to #holidateth
function holidayInputBack($inputRow)
{
  $("#holidateth").val("")
  $("#holidayname").val("")
  $('#holidayInput tbody').append($inputRow)
}

function delHoliday(that)
{
  let  $row = $(that).closest("tr")

  if ($row.find("input").length) {
    holidayInputBack($row)
  } else {
    holidayDelete($row)
  }
}

function holidayDelete($row)
{
  let $cell = $row.find("td"),
    vdateth = $cell[0].innerHTML,
    vdate = th_2_ISO(vdateth),
    vname = $cell[1].innerHTML,
    rows = getTableRowsByDate('maintbl', vdate)

  sqlDelHoliday(vdate, vname).then(response => {
    if (typeof response === "object") {
      setHOLIDAY(response)
      $row.remove()
      rows.forEach(row => {
        row.cells[DIAGNOSIS].classList.remove("holiday")
        delete row.cells[DIAGNOSIS].dataset.holiday
      })
    } else {
      Alert ("delHoliday", response)
    }
  })
}
