
import { isSplit } from "./util.js"
import { staffqueue } from "../view/staffqueue.js"
import { fillmain, refillDatedCases } from "../view/fill.js"
import { renewEditcell } from "../control/edit.js"

//--- global variables --------------
// BOOK is for main table and individual staff's cases table
// CONSULT is for Consults table (special table in queuetbl)
// HOLIDAY is for Buddhist holiday entry of every year
// TIMESTAMP is the last time access from this client to the server

export let BOOK = [],
  CONSULT = [],
  STAFF = [],
  HOLIDAY = [],
  TIMESTAMP = ""

export function setSTAFF(staff) { STAFF = staff }
export function setHOLIDAY(holiday) { HOLIDAY = holiday }

let table = document.getElementById('maintbl')

// Save data got from server
// Two main data for tables (BOOK, CONSULT) and a TIMESTAMP
// QTIME = datetime of last fetching : $mysqli->query("SELECT now();")
export function updateBOOK(response) {
  if (BOOK.length) { refillDatedCases(table, BOOK, response.BOOK) }
  if (response.BOOK) { BOOK = response.BOOK }
  if (response.CONSULT) { CONSULT = response.CONSULT }
  if (response.STAFF) { STAFF = response.STAFF }
  if (response.HOLIDAY) { HOLIDAY = response.HOLIDAY }
  if (response.QTIME) { TIMESTAMP = response.QTIME }

  if (isSplit()) { staffqueue(titlename.innerHTML) }
  renewEditcell()

  STAFF.forEach(staff => {
    staff.startoncall = JSON.parse(staff.startoncall)
    staff.skipbegin = JSON.parse(staff.skipbegin)
    staff.skipend = JSON.parse(staff.skipend)
  })
}
