
import { getSTAFF } from "../util/updateBOOK.js"
import { getLatestKey, getLatestValue } from "../util/util.js"

export function getSTAFFparsed()
{
  const staffs = getSTAFF()

  return staffs.map(staff => JSON.parse(staff.profile))
}

export function getStaffOncall()
{
  const staffs = getSTAFFparsed()

  return staffs.filter(staff => (staff.oncall > 0))
}

export function getOncallExchange()
{
  const staffs = getSTAFFparsed()

  // retrieve exchange field in only staffs with exchange
  staffs = staffs.filter(staff => staff.exchange)

          // strip to only staffname and exchange fields
  return staffs.map(has => ( {[has.name]: has.exchange} ))
}

export function checkFieldExist(ramaid, field, subfield)
{
  const staffs = getSTAFFparsed()
  const staff = staffs.filter(e => e.ramaid === ramaid)
  const existedKeys = staff.map(e => Object.keys(e))[0]
  const existedField = existedKeys.includes(field)

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
    staff.startKey = getLatestKey(staff.start)
    staff.startDate = getLatestValue(staff.start)
  })

  return staffs.reduce((a, b) => a.startKey > b.startKey ? a : b, 0)
}
