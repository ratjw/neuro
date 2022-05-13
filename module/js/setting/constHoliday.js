
let HOLIDAY = []
let HOLIDAY3Y = []

export const HOLIDAYTHAI = [
  "วันมาฆบูชา",
  "วันพืชมงคล",
  "วันวิสาขบูชา",
  "วันอาสาฬหบูชา",
  "วันเข้าพรรษา",
  "วันหยุดพิเศษ",
  "ไม่หยุด"
],

THISYEAR = new Date().getFullYear().toString(),
MAXYEAR = "9999",

// columns in holidaytbl
HOLIDATE = 0,
HOLINAME = 1,
ACTION = 2,

INPUT = `<input id="holidate" class="w80"></input>`,
SELECT = `<select class="w150"></select>`,
LIST = `<option style="display:none"></option>`,
SAVE = `<img src="css/pic/general/save.png">`,
DELETE = `<img class="delholiday" src="css/pic/general/delete.png">`

// JSON.parse/JSON.stringify to deep clone. The [...] is one level clone
export function getHOLIDAY() { return JSON.parse(JSON.stringify(HOLIDAY)) }
export function getHOLIDAY3Y() { return JSON.parse(JSON.stringify(HOLIDAY3Y)) }

export function setHOLIDAY(holiday)
{
  HOLIDAY = JSON.parse(JSON.stringify(holiday))
  HOLIDAY3Y = allHoliday3y(holiday)
}

// newHoliday = Buddhist holidays from this year
// fixHoliday = Thai govt. holidays
// layout for 3 calendar-years to fill maintable 2 years ahead
function allHoliday3y(holiday)
{
  const nextyear = (+THISYEAR + 1).toString(),
    extyear = (+THISYEAR + 2).toString(),
    newHoliday = holiday.filter(day =>
                   (day.holidate > THISYEAR) && (day.holidate < MAXYEAR)
                 ),
    fixHoliday1 = holiday.filter(day => day.holidate > MAXYEAR),
    fixHoliday2 = JSON.parse(JSON.stringify(fixHoliday1)),
    fixHoliday3 = JSON.parse(JSON.stringify(fixHoliday1))

  fixHoliday1.forEach(d => d.holidate = d.holidate.replace(MAXYEAR, THISYEAR))
  fixHoliday2.forEach(d => d.holidate = d.holidate.replace(MAXYEAR, nextyear))
  fixHoliday3.forEach(d => d.holidate = d.holidate.replace(MAXYEAR, extyear))

  return [...newHoliday, ...fixHoliday1, ...fixHoliday2, ...fixHoliday3]  
}
