
import { getSTAFF } from "../util/updateBOOK.js"
import { getLatestKey, getLatestValue } from "../util/util.js"

export function getSTAFFparsed()
{
  const staffs = getSTAFF()

  staffs.forEach(e => e.profile = JSON.parse(e.profile))

  return staffs
}

export function checkFieldExist(id, field)
{
  const staffs = getSTAFFparsed()
  const staff = staffs.filter(e => e.id === id)
  const keys = staff.map(e => Object.keys(e.profile))[0]

  return keys.includes(field)
}

export function getStaffOncall()
{
  let staffs = getSTAFFparsed()

  return staffs.filter(staff => (staff.profile.oncall > 0))
}

// find latest entry within each staff (maxKey) and get the date value for startDate
// then store maxKey to startKey, store date value to startDate
// return the staff of the latest key
export function getLatestStart()
{
  let staffs = getStaffOncall()

  staffs.forEach(staff => {
    staff.startKey = getLatestKey(staff.profile.start)
    staff.startDate = getLatestValue(staff.profile.start)
  })

  return staffs.reduce((a, b) => a.startKey > b.startKey ? a : b, 0)
}
