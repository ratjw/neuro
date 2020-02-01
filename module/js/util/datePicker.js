
import { THAIMONTH } from "../control/const.js"

// select date by calendar
export function datePicker($datepicker)
{
  $datepicker.datepicker({
    autoSize: true,
    dateFormat: "dd M yy",
    monthNames: [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", 
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม" ],
    // use Short names to be consistent with the month converted by thDate_2_ISOdate()
    monthNamesShort: THAIMONTH,
    yearSuffix: new Date().getFullYear() + 543,
    beforeShow: function (input, inst) {
      if (inst.selectedYear) {
        // prevent using Buddhist year from <input>
        $(this).datepicker("setDate",
          new Date(inst.currentYear, inst.currentMonth, inst.currentDay))
      }
      $datepicker.one("click", function() {
        if (input.value) {
          $datepicker.val(input.value.slice(0, -4) + (inst.selectedYear + 543))
        }
      })
    },
    onChangeMonthYear: function (year, month, inst) {
      $(this).datepicker("setDate",
        new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay))
      inst.settings.yearSuffix = inst.selectedYear + 543
      $datepicker.val($datepicker.val().slice(0, -4) + (inst.selectedYear + 543))
    },
    onSelect: function (input, inst) {
      $datepicker.val(input.slice(0, -4) + (inst.selectedYear + 543))
    }
  })
}
