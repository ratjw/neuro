
import { getHOLIDAY } from "./updateBOOK.js"

// Buddhist holiday and compensation for religious day on weekend
export function findHoliday(date)
{
  const maxyear = "9999",
    thisyear = (new Date().getFullYear()).toString(),
    allHoliday = fixHolidayX3(),
    yesHoliday = allHoliday.find(holi => holi.holidate === date)

  return yesHoliday ? yesHoliday.dayname :  ''
}

function fixHolidayX3()
{
  const maxyear = "9999",
    fullyear = new Date().getFullYear(),
    thisyear = fullyear.toString(),
    nextyear = (fullyear + 1).toString(),
    extyear = (fullyear + 2).toString(),
    holiday = getHOLIDAY(),
    newHoliday = holiday.filter(day =>
                   (day.holidate > thisyear) && (day.holidate < maxyear)
                 ),
    fixHoliday1 = holiday.filter(day => day.holidate > maxyear),
    fixHoliday2 = JSON.parse(JSON.stringify(fixHoliday1)),
    fixHoliday3 = JSON.parse(JSON.stringify(fixHoliday1))

  fixHoliday1.forEach(d => d.holidate = d.holidate.replace(maxyear, thisyear))
  fixHoliday2.forEach(d => d.holidate = d.holidate.replace(maxyear, nextyear))
  fixHoliday3.forEach(d => d.holidate = d.holidate.replace(maxyear, extyear))

  return [...newHoliday, ...fixHoliday1, ...fixHoliday2, ...fixHoliday3]  
}
