
import { isSplit } from "./util.js"
import { staffqueue } from "../view/staffqueue.js"
import { refillDatedCases } from "../view/fill.js"
import { renewEditcell } from "../control/edit.js"
import { setSTAFF } from "../setting/constSTAFF.js"
import { setHOLIDAY } from "../setting/constHoliday.js"

//--- global variables --------------
// BOOK is for main table and individual staff's cases table
// CONSULT is for Consults table (special table in queuetbl)
// STAFF is for staffs in personnel
// HOLIDAY is for Buddhist holiday entry of every year and govt. holiday
// TIMESTAMP is the last time access from this client to the server

let BOOK = [],
  CONSULT = [],
  TIMESTAMP = ""

// return the deep-cloned data, instead of the array's reference
// not = [...array] which is only one-layer cloning
export function getBOOK() { return JSON.parse(JSON.stringify(BOOK)) }
export function getCONSULT() { return JSON.parse(JSON.stringify(CONSULT)) }
export function getTIMESTAMP() { return TIMESTAMP }

// Save data got from server
// Two main data for tables (BOOK, CONSULT) and a TIMESTAMP
// QTIME = datetime of last fetching : $mysqli->query("SELECT now();")
export function updateBOOK(response) {
  if (response.BOOK) { BOOK = response.BOOK }
  if (response.CONSULT) { CONSULT = response.CONSULT }
  if (response.QTIME) { TIMESTAMP = response.QTIME }

  if (response.STAFF) { setSTAFF(response.STAFF) }
  if (response.HOLIDAY) { setHOLIDAY(response.HOLIDAY) }

  if (BOOK.length) {
    refillDatedCases(document.getElementById('maintbl'), BOOK, response.BOOK)
  }
  if (isSplit()) { staffqueue(titlename.innerHTML) }
  renewEditcell()
}
