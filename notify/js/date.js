
import { LARGESTDATE, THAIMONTH } from "./const.js"

const today = new Date()
export const START = obj_2_ISO(new Date(today.getFullYear(), today.getMonth()-1, 1))

// Javascript Date Object to MySQL date (obj_2_ISO 2014-05-11)
export function obj_2_ISO(date) {
  if (!date) { return date }

  let mm = date.getMonth() + 1,
    dd = date.getDate();

  return [date.getFullYear(),
      (mm < 10) ? "0" + mm : "" + mm,
      (dd < 10) ? "0" + dd : "" + dd
      ].join("-")
} 

// obj_2_ISO (2014-05-11) to Thai date (11 พค. 2557) 
export function ISO_2_th(opdate) {
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

// Thai date (11 พค. 2557) to obj_2_ISO (2014-05-11)
export function th_2_ISO(opdate) {
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

// Date Object or obj_2_ISO to be added or substracted by days
// Result in obj_2_ISO (2014-05-11)
export function nextdates(date, days) {
  if (!date) { return date }

  let next = new Date(date);

  next.setDate(next.getDate() + days);

  return obj_2_ISO(next);
}

// change date in book to show on table taking care of LARGESTDATE
export function putThdate (date) {
  if (!date) { return date }

  return (String(date) === LARGESTDATE) ? "" : th_2_ISO(date)
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
