
import { DIAGNOSIS } from "../control/const.js"
import { findHoliday } from "../setting/findHoliday.js"
import { getTableRowsByDate } from "../util/rowsgetting.js"
import { getHOLIDAY3Y } from "../setting/constHoliday.js"
import { fillHoliday } from "../view/rowDecoration.js"
import { nextdates } from "../util/date.js"

const COMPENSATE = "ชดเชย"
const NOHOLIDAY = "ไม่หยุด"

export function fillExtHoliday(table)
{
  const tblid = table.id,
    allHolidays = getHOLIDAY3Y(),
    onWeekend = allHolidays.filter(d => isWeekend(d.holidate)),
    onSunday = onWeekend.filter(d => (new Date(d.holidate)).getDay() === 0),
    onSaturday = onWeekend.filter(d => (new Date(d.holidate)).getDay() === 6)

  if (onSaturday.length) { compensateSat(onSaturday, tblid) }
  if (onSunday.length) { compensateSun(onSunday, tblid) }
}

function isWeekend(date)
{
  const dayofweek = (new Date(date)).getDay()

  return dayofweek === 0 || dayofweek === 6
}

function compensateSat(onSaturday, tblid)
{
  onSaturday.forEach(d => d.holidate = nextdates(d.holidate, 2))
  onSaturday.forEach(d => {
    const rows = getTableRowsByDate(tblid, d.holidate)
    if (rows.length) { prefillHoliRows(rows, d.dayname) }
  })
}

function compensateSun(onSunday, tblid)
{
  onSunday.forEach(d => d.holidate = nextdates(d.holidate, 1))
  onSunday.forEach(d => {
    let rows = getTableRowsByDate(tblid, d.holidate),
      row0 = rows[0]

    if (!rows.length) { return }
    if (classHoliday(row0)) {
      if (row0.cells[DIAGNOSIS].dataset.holiday === NOHOLIDAY) { return }
      d.holidate = nextdates(d.holidate, 1)
      rows = getTableRowsByDate(tblid, d.holidate)
      if (rows.length) { prefillHoliRows(rows, d.dayname) }
    } else {
      fillHoliRows(rows, d.dayname)
    }
  })
}

function prefillHoliRows(rows, dayname)
{
  if (!classHoliday(rows[0])) {
    fillHoliRows(rows, dayname)
  }
}

function classHoliday(row)
{
  const classList = row.cells[DIAGNOSIS].classList

  return classList.length && classList.contains("holiday")
}

function fillHoliRows(rows, dayname)
{
  rows.forEach(row => {
    fillHoliday(row.cells[DIAGNOSIS], COMPENSATE + dayname)
  })
}
