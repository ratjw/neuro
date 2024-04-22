
import { DIVISION } from "./start.js"
import { getSTAFF } from "./updateBOOK.js"

export function getStaffOncall()
{
  const staffs = getSTAFFdivision()

  return staffs.filter(staff => (staff.oncall > 0))
}

// find latest entry within each staff (maxKey) and get the date value for startDate
// then store maxKey to startKey, store date value to startDate
// return the staff of the latest key
export function getLatestStart()
{
  const staffs = getStaffOncall()

  staffs.forEach(staff => {
    staff.startKey = getLatestKey(staff.start)
    staff.startDate = getLatestValue(staff.start)
  })

  return staffs.reduce((a, b) => a.startKey > b.startKey ? a : b, 0)
}

export function getSTAFFdivision(division = DIVISION)
{
  const staffs = getSTAFF()

  return staffs.filter(staff => staff.division === division)
                .map(staff => JSON.parse(staff.profile))
}

// อาจารย์พิเศษ cannot be the main surgeon in OR
export function getStaffOR()
{
  const staffs = getSTAFFdivision()

  return staffs.filter(staff => (staff.role != "อาจารย์พิเศษ"))
}

// filter only staffs with exchange and strip to only staffname and exchange fields
export function getOncallExchange()
{
  const staffs = getSTAFFdivision(),
    staffex = staffs.filter(staff => staff.exchange)

  return staffex.map(has => ( {[has.name]: has.exchange} ))
}

export function checkFieldExist(ramaid, field, subfield)
{
  const staffs = getSTAFFdivision(),
    staff = staffs.filter(e => e.ramaid === ramaid),
    existedKeys = staff.map(e => Object.keys(e))[0],
    existedField = existedKeys.includes(field)

  if (existedField && subfield) {
    const existedSubKeys = staff.map(e => Object.keys(e[field]))[0]
    return existedSubKeys.includes(subfield)
  }

  return existedField
}

export function getLatestKey(obj)
{
  if (!obj || !Object.entries(obj).length) { return '' }

  return Math.max(...Object.keys(obj)) || ''
}

export function getLatestValue(obj)
{
  if (!obj || !Object.entries(obj).length) { return '' }

  return obj[Math.max(...Object.keys(obj))] || ''
}
