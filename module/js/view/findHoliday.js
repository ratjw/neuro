
import { getHOLIDAY } from "../util/updateBOOK.js"

// Buddhist holiday and compensation for religious day on weekend
export function findHoliday(date)
{
  const maxyear = "9999",
    dayofweek = (new Date(date)).getDay(),
    Sun = dayofweek === 0,
    Sat = dayofweek === 6,
    holiday = getHOLIDAY(),
    thisyear = new Date().getFullYear(),
    newHoliday = holiday.filter(day => day.holidate > thisyear),
    thisHoliday = newHoliday.forEach(day => {
      if (day.holidate > maxyear) {
        day.holidate = day.holidate.replace(maxyear, thisyear)
      }
    })

  return thisHoliday[date] ||  ''
}
