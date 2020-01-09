
import { LARGESTDATE } from "./const.js"
import { START, ISOdate, nextdates } from "./date.js"
import { BOOK } from "./updateBOOK.js"
import { rowDecoration } from "./rowDecoration.js"
import { blankRowData, fillNewrowData } from "./fillNewrowData.js"

// Render Main table
// Consults and dialogAll tables use this too
// START 1st date of last month
// until date is the last row of the table, not of the book
export function fillmain()
{
  let table = document.getElementById("maintbl"),

    x = BOOK.findIndex(e => e.opdate >= LARGESTDATE),
    book = x < 0 ? BOOK : BOOK.slice(0, x),

    today = new Date(),
    nextyear = today.getFullYear() + 1,
    month = today.getMonth(),
    todate = today.getDate(),
    until = ISOdate((new Date(nextyear, month, todate))),

    date = fillDatedCases(table, book)

  fillBlankDates(table, date, until)
}

export function fillDatedCases(table, book)
{
  let tbody = table.querySelector("tbody"),
    rows = table.rows,
    head = table.rows[0],

    q = book.findIndex(e => e.opdate >= START),
    blen = book.length,

    date = START,
    madedate,
    qdate,
    clone

  // No case
  if (!blen) { book.push({"opdate" : START}) }

  // delete previous table lest it accumulates
  if (rows.length > 1) {
    Array.from(table.querySelectorAll('tr')).slice(1).forEach(e => e.remove())
  }

  // from START to end of waiting list with opdate
  for (q; q < blen; q++) {
    qdate = book[q].opdate
    if (qdate < LARGESTDATE) {

      // step over each day that is not in QBOOK
      while (date < qdate) {
        // make a blank row for each day which is not in book
        if (date !== madedate) {
          makenextrow(table, date)
          madedate = date
        }
        date = nextdates(date, 1)
        // make table head row before every Monday
        if ((new Date(date).getDay())%7 === 1) {
          clone = head.cloneNode(true)
          tbody.appendChild(clone)
        }
      }
    }

    makenextrow(table, qdate)
    fillNewrowData(rows[table.rows.length-1], book[q])
    madedate = date
  }

  return date
}

let groupBy = function(items, key) {
  return items.reduce((result, item) => {
    (result[item[key]] = result[item[key]] || []).push(item)
    return result
  }, {})
}

let objectDiff = function(o1, o2) {
  return Object.keys(o2).reduce((diff, key) => {
    if (JSON.stringify({key: o1[key]}) === JSON.stringify({key: o2[key]}))
      return diff
    return {
      ...diff,
      [key]: o2[key]
    }
  }, {})
}

export function fillBlankDates(table, date, until)
{
  let tbody = table.querySelector("tbody"),
    head = table.rows[0]

  // from end of waiting list with opdate to 2 years
  while (date < until) {
    date = nextdates(date, 1)
    if (((new Date(date)).getDay())%7 === 1) {
      let clone = head.cloneNode(true)
      tbody.appendChild(clone)
    }
    makenextrow(table, date)
  }
}

// create and decorate new row
export function makenextrow(table, date) {
  let tbody = table.querySelector("tbody"),
    tblcells = document.getElementById("tblcells"),
    row = tblcells.rows[0].cloneNode(true)

  row = tbody.appendChild(row)
  rowDecoration(row, date)
  blankRowData(row, date)
}
