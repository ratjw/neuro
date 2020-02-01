
import { serviceReview } from "./serviceReview.js"

export function monthpicker() {
  let $monthpicker = $("#monthpicker"),
    $monthstart = $("#monthstart"),
    selectedYear = new Date().getFullYear()

  $monthpicker.show()
  $monthpicker.datepicker({
    altField: $monthstart,
    altFormat: "yy-mm-dd",
    autoSize: true,
    dateFormat: "MM yy",
    monthNames: [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", 
                  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม" ],
    onChangeMonthYear: function (year, month, inst) {
      $(this).datepicker("setDate", new Date(inst.selectedYear, inst.selectedMonth, 1))
      inst.drawYear = inst.drawYear + 543
    }
  }).datepicker("setDate", new Date(new Date().getFullYear(), new Date().getMonth(), 1))

  $monthpicker.off("click").on("click", ".ui-datepicker-title", function() {
    serviceReview($monthstart.val())
  })
  $('.ui-datepicker-prev').click()
}

export function hidemonthpicker()
{
  let picker = document.querySelector('#monthpicker')

  picker.onmouseover = function() { picker.style.display = 'block' }
  picker.onmouseout = function() { picker.style.display = 'none' }
  picker.style.display = 'none'
}
