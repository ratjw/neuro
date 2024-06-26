
import { DIAGNOSIS} from "./const.js"
import { getTableRowsByDate, nextdates } from "./function.js"
import { getHOLIDAY3Y, NOTHOLIDAY, COMPENSATE  } from "./constHoliday.js"

export function fillHoliday()
{
  const tblid = "tbl",
    allHolidays = getHOLIDAY3Y(),
    onSunday = allHolidays.filter(d => (new Date(d.holidate)).getDay() === 0),
    onSaturday = allHolidays.filter(d => (new Date(d.holidate)).getDay() === 6)

  if (allHolidays.length) { fillAllHolidays(allHolidays, tblid) }
  if (onSaturday.length) { compensateSat(onSaturday, tblid) }
  if (onSunday.length) { compensateSun(onSunday, tblid) }
}

function fillAllHolidays(allHolidays, tblid)
{
  allHolidays.forEach(d => {
    const rows = getTableRowsByDate(tblid, d.holidate)
    if (rows.length) { fillHoliRows(rows, d.dayname) }
  })
}

function compensateSat(onSaturday, tblid)
{
  onSaturday.forEach(d => d.holidate = nextdates(d.holidate, 2))
  onSaturday.forEach(d => {
    const rows = getTableRowsByDate(tblid, d.holidate)
    if (rows.length) { prefillHoliRows(rows, d.dayname) }
  })
}

// if Monday is a holiday that is not NOTHOLIDAY, then go to Tueday
function compensateSun(onSunday, tblid)
{
  onSunday.forEach(d => d.holidate = nextdates(d.holidate, 1))
  onSunday.forEach(d => {
    let rows = getTableRowsByDate(tblid, d.holidate)

    if (!rows.length) { return }
    if (classHoliday(rows[0])) {
      if (rows[0].cells[DIAGNOSIS].dataset.holiday === NOTHOLIDAY) { return }
      d.holidate = nextdates(d.holidate, 1)
      rows = getTableRowsByDate(tblid, d.holidate)
      if (rows.length) { prefillHoliRows(rows, d.dayname) }
    } else {
      fillHoliRows(rows, COMPENSATE + d.dayname)
    }
  })
}

function prefillHoliRows(rows, dayname)
{
  if (!classHoliday(rows[0])) {
    fillHoliRows(rows, COMPENSATE + dayname)
  }
}

export function fillHoliRows(rows, dayname)
{
  rows.forEach(row => {
    row.cells[DIAGNOSIS].classList.add("holiday")
    row.cells[DIAGNOSIS].dataset.holiday = dayname
  })
}

function classHoliday(row)
{
  const classList = row.cells[DIAGNOSIS].classList

  return classList.length && classList.contains("holiday")
}
