
import { EDUYEAR, MAXYEAR } from "../setting/constResident.js"
import { getRESIDENT } from "../util/updateBOOK.js"

export function getRESIDENTdivision(division)
{
  const residents = getRESIDENT()

  return residents.filter(resident => resident.division === division)
                .map(resident => JSON.parse(resident.profile))
}

export function presentRESIDENT(division)
{
  return getRESIDENTdivision(division)
            .filter(e => EDUYEAR - e.yearOne + 1 - e.addLevel <= MAXYEAR)
}
