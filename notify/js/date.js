
import { LARGESTDATE, THAIMONTH } from "../control/const.js"

const today = new Date()
export const START = ISOdate(new Date(today.getFullYear(), today.getMonth()-1, 1))

// Javascript Date Object to MySQL date (ISOdate 2014-05-11)
export function ISOdate(date) {
  if (!date) { return date }

  let mm = date.getMonth() + 1,
    dd = date.getDate();

  return [date.getFullYear(),
      (mm < 10) ? "0" + mm : "" + mm,
      (dd < 10) ? "0" + dd : "" + dd
      ].join("-")
} 

// Date Object or ISOdate to be added or substracted by days
// Result in ISOdate (2014-05-11)
export function nextdates(date, days) {
  if (!date) { return date }

  let next = new Date(date);
    next.setDate(next.getDate() + days);

  return ISOdate(next);
}
