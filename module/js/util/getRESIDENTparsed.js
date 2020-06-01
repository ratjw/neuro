
import { getPERSONNEL } from "../util/updateBOOK.js"
import { getLatestKey, getLatestValue } from "../util/util.js"

export function getRESIDENTparsed()
{
  const persons = getPERSONNEL()

  persons.forEach(e => e.profile = JSON.parse(e.profile))

  return persons.filter(person => person.profile.position === "resident")
}
