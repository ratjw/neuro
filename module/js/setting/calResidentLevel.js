
import { MAXYEAR, getRESIDENT, updateResidentLevel } from "../model/sqlDoResident.js"
import { obj_2_ISO } from "../util/date.js"

const ENLISTSTART = "1 Jun"

export async function calResidentLevel()
{
  const residents = await getRESIDENT()

  if (!residents.length) { return }

  const today = new Date(),
    fullYear = today.getFullYear(),
    todate = obj_2_ISO(new Date()),
    start = obj_2_ISO(new Date(`${ENLISTSTART} ${fullYear}`))

  if (todate >= start) {
    if (firstAccess(residents)) { calYears(residents) }
  }
}

function firstAccess(residents)
{
  const present = residents.filter(dent => dent.yearLevel),
    year1 = present.filter(dent => dent.yearLevel === 1),
    year2 = present.filter(dent => dent.yearLevel === 2),
    year3 = present.filter(dent => dent.yearLevel === 3),
    year4 = present.filter(dent => dent.yearLevel === 4),
    year5 = present.filter(dent => dent.yearLevel === 5)

  if (year1.length) {
    if (!updated(year1[0])) { calYears(residents); return }
  }
  if (year2.length) {
    if (!updated(year2[0])) { calYears(residents); return }
  }
  if (year3.length) {
    if (!updated(year3[0])) { calYears(residents); return }
  }
  if (year4.length) {
    if (!updated(year4[0])) { calYears(residents); return }
  }
  if (year5.length) {
    if (!updated(year5[0])) { calYears(residents); return }
  }
}

function updated(resident)
{
  return correctLevel(resident) === resident.yearLevel ? true : false
}

function correctLevel(resident)
{
  return new Date().getFullYear()
          - resident.enlistStart
          + resident.startLevel
          + (resident.addLevel || 0)
}

function calYears(residents)
{
  const present = residents.filter(dent => dent.yearLevel)

  present.forEach(dent => {
    const level = dent.yearLevel + 1
    dent.yearLevel = level <= MAXYEAR ? level : null
  })
  updateResidentLevel(present)
}
