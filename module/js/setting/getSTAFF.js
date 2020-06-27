
import { STAFF } from "../setting/constSTAFF.js"
import { getLatestKey, getLatestValue } from "../util/util.js"

export function getSTAFF()
{
  const staffs = JSON.parse(JSON.stringify(STAFF))

  return staffs.map(staff => JSON.parse(staff.profile))
}

export function getStaffOncall()
{
  const staffs = getSTAFF()

  return staffs.filter(staff => (staff.oncall > 0))
}

// filter only staffs with exchange and strip to only staffname and exchange fields
export function getOncallExchange()
{
  const staffs = getSTAFF(),
    staffex = staffs.filter(staff => staff.exchange)

  return staffex.map(has => ( {[has.name]: has.exchange} ))
}

export function checkFieldExist(ramaid, field, subfield)
{
  const staffs = getSTAFF(),
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
    staff.startKey = getLatestKey(staff.start)
    staff.startDate = getLatestValue(staff.start)
  })

  return staffs.reduce((a, b) => a.startKey > b.startKey ? a : b, 0)
}
