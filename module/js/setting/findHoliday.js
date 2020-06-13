
import { getHOLIDAY3Y } from "../setting/constHoliday.js"

export function findHoliday(date)
{
  let allHolidays = getHOLIDAY3Y()

  const yesHoliday = allHolidays.find(holi => holi.holidate === date)

  return yesHoliday ? yesHoliday.dayname :  ''
}
