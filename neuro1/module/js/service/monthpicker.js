
import { winWidth, winHeight } from "../util/util.js"
import { serviceReview } from "./serviceReview.js"

export function setClickService()
{
  let service = document.querySelector("#clickserviceReview")

  service.onclick =  monthpicker
  service.onmouseover = monthpicker
  service.onmouseout = hidemonthpicker
}

function monthpicker() {
  let $monthpicker = $("#monthpicker"),
    $monthstart = $("#monthstart"),
    selectedYear = new Date().getFullYear(),
    BuddhistYear = Number(selectedYear) + 543;

  $monthpicker.show()
  $monthpicker.datepicker({
    altField: $monthstart,
    altFormat: "yy-mm-dd",
    autoSize: true,
    dateFormat: "MM yy",
    monthNames: [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", 
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม" ],
    yearSuffix: new Date().getFullYear() +  543,
    onChangeMonthYear: function (year, month, inst) {
      $(this).datepicker("setDate", new Date(inst.selectedYear, inst.selectedMonth, 1))
      inst.settings.yearSuffix = inst.selectedYear + 543
    },
    beforeShow: function (input, obj) {
      $(".ui-datepicker-calendar").hide()
    }
  }).datepicker("setDate", new Date(new Date().getFullYear(), new Date().getMonth(), 1))

  $monthpicker.off("click").on("click", ".ui-datepicker-title", function() {
    serviceReview($monthstart.val())
  })
}

function hidemonthpicker()
{
  let picker = document.querySelector('#monthpicker')

  picker.onmouseover = function() { picker.style.display = 'block' }
  picker.onmouseout = function() { picker.style.display = 'none' }
  picker.style.display = 'none'
}
