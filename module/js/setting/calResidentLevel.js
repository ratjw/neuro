
import { getEnlistStart } from "../setting/settingResident.js"
import { getRESIDENT, updateResidentLevel } from "../model/sqlDoResident.js"
import { obj_2_ISO } from "../util/date.js"

const MAXYEAR = 5

export async function calResidentLevel()
{
  const residents = await getRESIDENT()

  if (!residents.length) { return }

  const today = obj_2_ISO(new Date()),
    start = obj_2_ISO(new Date(getEnlistStart()))

  if (today >= start) {
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
    if (!updated(year1[1])) { calYears(residents); return }
  }
  if (year2.length) {
    if (!updated(year2[1])) { calYears(residents); return }
  }
  if (year3.length) {
    if (!updated(year3[1])) { calYears(residents); return }
  }
  if (year4.length) {
    if (!updated(year4[1])) { calYears(residents); return }
  }
  if (year5.length) {
    if (!updated(year5[1])) { calYears(residents); return }
  }
}

function updated(resident)
{
  return correctLevel(resident) === resident.yearLevel ? true : false
}

function correctLevel(resident)
{
  const startYear = (new Date(resident.enlistStart)).getFullYear(),
    thisYear = (new Date()).getFullYear()

  return thisYear - startYear + 1
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
