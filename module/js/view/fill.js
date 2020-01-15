
import { LARGESTDATE } from "../control/const.js"
import { ISOdate, nextdates } from "../util/date.js"
import { BOOK } from "../util/updateBOOK.js"
import { rowDecoration } from "./rowDecoration.js"
import { hoverPicArea } from "../util/util.js"
import { blankRowData } from "../view/fillNewrowData.js"
import { viewOneDay } from "./viewOneDay.js"
import { fillNewrowData } from "./fillNewrowData.js"
import { BEGINDATE, ENDDATE } from "../control/start.js"

// Render Main table
// Consults and dialogAll tables use this too
// start at 1st date of last month
// end at two years (the last row of the table, not of the book)
export function fillmain()
{
  let table = document.getElementById("maintbl"),

    x = BOOK.findIndex(e => e.opdate >= LARGESTDATE),
    book = x < 0 ? BOOK : BOOK.slice(0, x),

    date = fillDatedCases(table, book)

  fillBlankDates(table, date)
  hoverPicArea()
}

export function fillDatedCases(table, book)
{
  let tbody = table.querySelector("tbody"),
    rows = table.rows,
    head = table.rows[0],

    blen,
    date = BEGINDATE,
    madedate,
    qdate,
    clone,

    q = book.findIndex(e => e.opdate >= BEGINDATE)

  // No case
  if (q < 0) {
    book.push({"opdate" : BEGINDATE})
    q = 0
  }

  blen = book.length

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

export function refillDatedCases(table, oldbook, newbook)
{
  let oldgroup = groupBy(oldbook, 'opdate'),
    newgroup = groupBy(newbook, 'opdate'),
    oldDiff = objectDiff(newgroup, oldgroup),
    newDiff = objectDiff(oldgroup, newgroup),
    allDiff

  Object.keys(oldDiff).forEach(key => oldDiff[key] = [])
  allDiff = Object.assign({}, oldDiff, newDiff)
  Object.entries(allDiff).forEach(([opdate, rows]) => {
    viewOneDay(table, opdate, rows)
  })
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

export function fillBlankDates(table, date)
{
  let tbody = table.querySelector("tbody"),
    head = table.rows[0]

  // from end of waiting list with opdate to 2 years
  while (date < ENDDATE) {
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
