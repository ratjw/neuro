
import { getSTAFF } from "../util/updateBOOK.js"

export function getSTAFFparsed()
{
  const staffs = getSTAFF()

  staffs.forEach(e => e.profile = JSON.parse(e.profile))

  return staffs
}

export function checkKeyExist(id, field)
{
  const staffs = getSTAFFparsed()
  const staff = staffs.filter(e => e.id = id)
  const keys = staff.map(e => Object.keys(e.profile))[0]

  return keys.includes(field)
}
