
import { isSplit } from "./util.js"
import { staffqueue } from "../view/staffqueue.js"
import { refillDatedCases } from "../view/fill.js"
import { renewEditcell } from "../control/edit.js"

//--- global variables --------------
// BOOK is for main table and individual staff's cases table
// CONSULT is for Consults table (special table in queuetbl)
// PERSONNEL is for staffs, residents, and other paramedics
// HOLIDAY is for Buddhist holiday entry of every year and govt. holiday
// TIMESTAMP is the last time access from this client to the server

let BOOK = [],
  CONSULT = [],
  PERSONNEL = [],
  HOLIDAY = [],
  TIMESTAMP = ""

// return the deep-cloned data, instead of the array's reference
// not = [...array] which is only one-layer cloning
export function getBOOK() { return JSON.parse(JSON.stringify(BOOK)) }
export function getCONSULT() { return JSON.parse(JSON.stringify(CONSULT)) }
export function getPERSONNEL() { return JSON.parse(JSON.stringify(PERSONNEL)) }
export function getHOLIDAY() { return JSON.parse(JSON.stringify(HOLIDAY)) }
export function getTIMESTAMP() { return TIMESTAMP }

// for other modules that get data from server
export function setPERSONNEL(personnel) { PERSONNEL = personnel }
export function setHOLIDAY(holiday) { HOLIDAY = holiday }

let table = document.getElementById('maintbl')

// Save data got from server
// Two main data for tables (BOOK, CONSULT) and a TIMESTAMP
// QTIME = datetime of last fetching : $mysqli->query("SELECT now();")
export function updateBOOK(response) {
  if (BOOK.length) { refillDatedCases(table, BOOK, response.BOOK) }
  if (response.BOOK) { BOOK = response.BOOK }
  if (response.CONSULT) { CONSULT = response.CONSULT }
  if (response.PERSONNEL) { PERSONNEL = response.PERSONNEL }
  if (response.HOLIDAY) { HOLIDAY = response.HOLIDAY }
  if (response.QTIME) { TIMESTAMP = response.QTIME }

  if (isSplit()) { staffqueue(titlename.innerHTML) }
  renewEditcell()
}
