
import { getPERSONNEL } from "../util/updateBOOK.js"
import { getLatestKey, getLatestValue } from "../util/util.js"

export function getPARAMEDICSparsed()
{
  const persons = getPERSONNEL()

  persons.forEach(e => JSON.parse(e))

  return persons.filter(person => person.role === "paramedics")
}
