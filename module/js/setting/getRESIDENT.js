
import { MAXYEAR, eduYear } from '../setting/constResident.js'
import { RESIDENT, sqlResident } from "../model/sqlResident.js"

export async function startRESIDENT()
{
  await sqlResident()

  return getRESIDENT()
}

export function getRESIDENT()
{
  const residents = JSON.parse(JSON.stringify(RESIDENT))

  return residents.map(resident => JSON.parse(resident.profile))
}

export function presentRESIDENT()
{
  return getRESIDENT().filter(e => eduYear - e.yearOne + 1 - e.addLevel <= MAXYEAR)
}
