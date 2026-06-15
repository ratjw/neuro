
import { getSTAFF } from "../util/updateBOOK.js"
import { getLatestKey, getLatestValue } from "../util/util.js"
import { DIVISION } from "../main.js"

export function getPersondivision(division = DIVISION)
{
  const persons = getSTAFF()

  return persons.filter(person => person.division === division)
                .map(person => JSON.parse(person.profile))
}

export function getSTAFFdivision()
{
  const staffs = getPersondivision()

  return staffs.filter(profile => profile.role && !profile.role.match("แพทย์ประจำบ้าน"))
}

// อาจารย์พิเศษ cannot be the main surgeon in OR
export function getStaffOR()
{
  const staffs = getPersondivision()

  return staffs.filter(staff => (staff.role.match("อาจารย์แพทย์")))
}

export function getStaffOncall()
{
  const staffs = getPersondivision()

  return staffs.filter(staff => (staff.oncall > 0))
}

// filter only staffs with exchange and strip to only staffname and exchange fields
export function getOncallExchange()
{
  const staffs = getPersondivision(),
    staffex = staffs.filter(staff => staff.exchange)

  return staffex.map(has => ( {[has.name]: has.exchange} ))
}

export function checkFieldExist(ramaid, field, subfield)
{
  const staffs = getPersondivision(),
    staff = staffs.filter(e => e.ramaid === ramaid),
    existedKeys = staff.map(e => Object.keys(e))[0],
    existedField = existedKeys.includes(field)

  if (existedField && subfield) {
    const existedSubKeys = staff.map(e => Object.keys(e[field]))[0]
    return existedSubKeys.includes(subfield)
  }

  return existedField
}

// find latest entry within each staff (maxKey) and get the date value for startDate
// then store maxKey to startKey, store date value to startDate
// return the staff of the latest key
export function getLatestStart()
{
  const staffs = getStaffOncall()

  staffs.forEach(staff => {
//    staff.startKey = getLatestKey(staff.start)
    staff.startDate = staff.start//getLatestValue(staff.start)
  })

  return staffs.reduce((a, b) => a.startDate > b.startDate ? a : b, 0)
}
