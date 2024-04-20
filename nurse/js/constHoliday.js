
export const HOLIDAY = [],
  HOLIDAY3Y = [],

  NOTHOLIDAY = "ไม่หยุด",
  COMPENSATE = "ชดเชย",
  THISYEAR = new Date().getFullYear().toString(),
  MAXYEAR = "9999"

// JSON.parse/JSON.stringify to deep clone. The [...] is one level clone
export function getHOLIDAY() { return JSON.parse(JSON.stringify(HOLIDAY)) }
export function getHOLIDAY3Y() { return JSON.parse(JSON.stringify(HOLIDAY3Y)) }

export function setHOLIDAY(holiday)
{
  HOLIDAY = JSON.parse(JSON.stringify(holiday))
  HOLIDAY3Y = allHoliday3y(holiday)
}

// movHoliday = Buddhist holidays from this year
// fixHoliday = Thai govt. holidays
// layout for 3 calendar-years to fill maintable 2 years ahead
function allHoliday3y(holiday)
{
  const nextyear = (+THISYEAR + 1).toString(),
    extyear = (+THISYEAR + 2).toString(),
    movHoliday = holiday.filter(day =>
                   (day.holidate > THISYEAR) && (day.holidate < MAXYEAR)
                 ),
    fixHoliday1 = holiday.filter(day => day.holidate > MAXYEAR),
    fixHoliday2 = JSON.parse(JSON.stringify(fixHoliday1)),
    fixHoliday3 = JSON.parse(JSON.stringify(fixHoliday1))

  fixHoliday1.forEach(d => d.holidate = d.holidate.replace(MAXYEAR, THISYEAR))
  fixHoliday2.forEach(d => d.holidate = d.holidate.replace(MAXYEAR, nextyear))
  fixHoliday3.forEach(d => d.holidate = d.holidate.replace(MAXYEAR, extyear))

  const holidays = [...movHoliday, ...fixHoliday1, ...fixHoliday2, ...fixHoliday3],
    notHol = holidays.filter(e => e.dayname === NOTHOLIDAY),
    notHoldates = notHol.map(e => e.holidate)

  return holidays.filter(e => e.dayname === NOTHOLIDAY 
                            || !notHoldates.includes(e.holidate))
}