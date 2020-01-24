
import { DIAGNOSIS, THAIMONTH } from "../control/const.js"
import { thDate_2_numDate, putThdate, datepicker } from "../util/date.js"
import { getTableRowsByDate } from "../util/rowsgetting.js"
import { HOLIDAY, setHOLIDAY } from "../util/updateBOOK.js"
import { holiday } from "../view/holiday.js"
import { sqlSaveHoliday, sqlDelHoliday } from "../model/sqlSaveHoliday.js"
import { Alert } from "../util/util.js"

const HOLIDAYENGTHAI = {
  "Magha": "วันมาฆบูชา",
  "Maghasub": "ชดเชยวันมาฆบูชา",
  "Ploughing": "วันพืชมงคล",
  "Ploughingsub": "ชดเชยวันพืชมงคล",
  "Vesak": "วันวิสาขบูชา",
  "Vesaksub": "ชดเชยวันวิสาขบูชา",
  "Asalha": "วันอาสาฬหบูชา",
  "Asalhasub": "ชดเชยวันอาสาฬหบูชา",
  "Vassa": "วันเข้าพรรษา",
  "Vassasub": "ชดเชยวันเข้าพรรษา",
  "special": "วันหยุดพิเศษ",
  "no": "ไม่หยุด"
}

export function inputHoliday()
{
  let  $dialogHoliday = $("#dialogHoliday"),
    $holidaytbl = $("#holidaytbl"),
    $holidateth = $("#holidateth"),
    $holidayname = $("#holidayname"),
    holidaylist = '<option style="display:none"></option>'

  fillHoliday($holidaytbl)
  $dialogHoliday.dialog({
    title: "Holiday",
    closeOnEscape: true,
    modal: true,
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
      let  $inputRow = $("#holidaytbl tr:has('input')")

      if ($inputRow.length) {
        holidayInputBack($inputRow)
      }
    }
  })

  datepicker($holidateth)
  $holidateth.datepicker('option', 'onClose', checkComplete)

  // option holidays Eng: Thai
  $.each(HOLIDAYENGTHAI, function(key, val) {
    holidaylist += `<option value="${key}">${val}</option>`
  })
  $holidayname.html(holidaylist)
  $("#buttonHoliday").hide()
  $holidayname.on('change', checkComplete)

  function checkComplete() {
    if ($holidateth.val() && $holidayname.val()) { $("#buttonHoliday").show() }
  }
}

function fillHoliday($holidaytbl)
{
  $holidaytbl.find('tr').slice(1).remove()

  $.each( HOLIDAY, function(i) {
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
    cells[1].innerHTML = HOLIDAYENGTHAI[q.dayname]
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

function delHoliday(that)
{
  let  $row = $(that).closest("tr")

  if ($row.find("input").length) {
    holidayInputBack($row)
  } else {
    let  $cell = $row.find("td"),
      vdateth = $cell[0].innerHTML,
      vdate = thDate_2_numDate(vdateth),
      vname = $cell[1].innerHTML.replace(/<button.*$/, ""),
      rows = getTableRowsByDate('maintbl', vdate),
      holidayEng = getHolidayEng(vname)

    sqlDelHoliday(vdate, holidayEng).then(response => {
      if (typeof response === "object") {
        setHOLIDAY(response)
        $(rows).each(function() {
          this.cells[DIAGNOSIS].style.backgroundImage = ""
        })
        $row.remove()
      } else {
        Alert ("delHoliday", response)
      }
    })
  }
}

function saveHoliday()
{
  let  vdateth = document.getElementById("holidateth").value,
    vdate = thDate_2_numDate(vdateth),
    vname = document.getElementById("holidayname").value,
    rows = getTableRowsByDate('maintbl', vdate)

  if (!vdate || !vname) { return }

  sqlSaveHoliday(vdate, vname).then(response => {
    if (typeof response === "object") {
      setHOLIDAY(response)
      holidayInputBack($("#holidateth").closest("tr"))
      fillHoliday($("#holidaytbl"))
      $("#buttonHoliday").hide()
      $(rows).each(function() {
        this.cells[DIAGNOSIS].style.backgroundImage = holiday(vdate)
      })
    } else {
      Alert ("saveHoliday", response)
    }
  })
}

function getHolidayEng(vname) {
  return Object.keys(HOLIDAYENGTHAI).find(key => HOLIDAYENGTHAI[key] === vname)
}

// Have to move $inputRow back and forth because datepicker is sticked to #holidateth
function holidayInputBack($inputRow)
{
  $("#holidateth").val("")
  $("#holidayname").val("")
  $('#holidayInput tbody').append($inputRow)
}
