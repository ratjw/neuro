
import { LARGESTDATE, THAIMONTH } from "../control/const.js"

// start at 1st date of last month
const today = new Date()
export const START_DATE = objDate_2_ISOdate(new Date(today.getFullYear(), today.getMonth()-1, 1))

// Javascript Date Object to MySQL date (ISOdate 2014-05-11)
export function objDate_2_ISOdate(date) {
  if (!date) { return date }

  let mm = date.getMonth() + 1,
    dd = date.getDate();

  return [date.getFullYear(),
      (mm < 10) ? "0" + mm : "" + mm,
      (dd < 10) ? "0" + dd : "" + dd
      ].join("-")
} 

// ISOdate (2014-05-11) to Thai date (11 พค. 2557) 
export function ISOdate_2_thDate(opdate) {
  if (!opdate) { return opdate }

  // LARGESTDATE (9999-12-31)
  if (String(opdate) > "9999") { return "" }

  let date = opdate.split("-"),
    yyyy = Number(date[0]) + 543,
    mm = THAIMONTH[Number(date[1]) - 1]

  return [
    date[2],
    THAIMONTH[Number(date[1]) - 1],
    Number(date[0]) + 543
  ].join(" ")
}

// Thai date (11 พค. 2557) to ISOdate (2014-05-11)
export function thDate_2_ISOdate(opdate) {
  if (!opdate) { return "" }

  let date = opdate.split(" "),
    mm = THAIMONTH.indexOf(date[1]) + 1

  if (date.length > 3) { return "" }
  if (mm === 0) { return "" }

  return [
    Number(date[2]) - 543,
    (mm < 10 ? '0' : '') + mm,
    date[0]
  ].join("-")
} 

// Date Object or ISOdate to be added or substracted by days
// Result in ISOdate (2014-05-11)
export function nextdates(date, days) {
  if (!date) { return date }

  let next = new Date(date);
    next.setDate(next.getDate() + days);

  return objDate_2_ISOdate(next);
}

// change Thai date from table to ISO date
export function getOpdate (date) {
  // Undefined date will be taken care by thDate_2_ISOdate
  return (String(date) === "") ? LARGESTDATE : thDate_2_ISOdate(date)
}

// change date in book to show on table taking care of LARGESTDATE
export function putThdate (date) {
  if (!date) { return date }

  return (String(date) === LARGESTDATE) ? "" : ISOdate_2_thDate(date)
}

export function putNameAge(q)
{
  return q.patient + (q.dob ? ("<br>อายุ " + putAgeOpdate(q.dob, q.opdate)) : "")
}

export function putAgeOpdate(dob, date)
{
  return (!date || !dob) ? "" : getAge(dob, date)
}

// Calculate age at (toDate) (iso format) from birth date
function getAge (birth, toDate) {
  // with LARGESTDATE as today
  if (!birth) { return "" }

  birth = new Date(birth);
  let today = (toDate === LARGESTDATE) ? new Date() : new Date(toDate),

    ayear = today.getFullYear(),
    amonth = today.getMonth(),
    adate = today.getDate(),
    byear = birth.getFullYear(),
    bmonth = birth.getMonth(),
    bdate = birth.getDate(),

    days = adate - bdate,
    months = amonth - bmonth,
    years = ayear - byear;
  if (days < 0)
  {
    months -= 1
    days = new Date(byear, bmonth+1, 0).getDate() + days;
  }
  if (months < 0)
  {
    years -= 1
    months += 12
  }

  let ageyears = years ? years + Math.floor(months / 6)  + " ปี " : "",
    agemonths = months ? months + Math.floor(days / 15)  + " ด." : "",
    agedays = days ? days + " ว." : "";

  return years ? ageyears : months ? agemonths : agedays;
}

// select date by calendar
export function datepicker($datepicker)
{
  $datepicker.datepicker({
    autoSize: true,
    dateFormat: "dd M yy",
    monthNames: [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", 
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม" ],
    // use Short names to be consistent with the month converted by thDate_2_ISOdate()
    monthNamesShort: THAIMONTH,
    yearSuffix: new Date().getFullYear() +  543,
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
