
import { THAIMONTH, THAIMONTHFULL } from "../control/const.js"

// select date by calendar
export function datePicker($datepicker)
{
  $datepicker.datepicker({
    autoSize: true,
    dateFormat: "dd M yy",
    // display full names on calendar title
    monthNames: THAIMONTHFULL,
    // Input/Output short names
    // to be consistent with the month converted by th_2_ISO()
    monthNamesShort: THAIMONTH,
    beforeShow: function (input, inst) {
      // prevent using Buddhist year from <input>
      if (inst.selectedYear) {
        $(this).datepicker("setDate", new Date(inst.currentYear, inst.currentMonth, inst.currentDay))
      }
      // show Buddhist year when click on <input>
      // use .one("click") not to affect on setDate
      $datepicker.one("click", function() {
        if (input.value) {
          $datepicker.val(input.value.slice(0, -4) + (inst.selectedYear + 543))
        }
      })
    },
    onSelect: function (input, inst) {
      $datepicker.val(input.slice(0, -4) + (inst.selectedYear + 543))
    }
  })
}
