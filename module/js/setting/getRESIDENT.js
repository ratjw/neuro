
import { getRESIDENT, MAXYEAR, eduYear } from '../setting/constResident.js'

export function presentRESIDENT()
{
  return getRESIDENT().filter(e => eduYear - e.yearOne + 1 - e.addLevel <= MAXYEAR)
}
