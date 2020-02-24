
import { getSTAFF } from "../util/updateBOOK.js"
import { getLatestKey, getLatestValue } from "../util/util.js"
import { START_DATE } from "../util/date.js"

export function getSTAFFparsed()
{
  const staffs = getSTAFF()

  staffs.forEach(e => e.profile = JSON.parse(e.profile))

  return staffs
}

export function checkFieldExist(id, field, subfield)
{
  const staffs = getSTAFFparsed()
  const staff = staffs.filter(e => e.id === id)
  const existedField = staff.map(e => Object.keys(e.profile))[0]

  if (subfield) {
    const existedSubField = staff.map(e => Object.keys(e.profile[field]))[0]
    return existedSubField.includes(subfield)
  } else {
    return existedField.includes(field)
  }
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

export function getStaffID(staffname)
{
  let staffs = getSTAFFparsed()

  return staffs.map(staff => (staff.profile.staffname === staffname) && staff.id)[0]
}

export function getOncallExchange()
{
  let staffs = getSTAFFparsed()
  let exchange = {}

  // retrieve exchange field in each staff
  staffs.forEach(staff => exchange[staff.profile.staffname] = staff.profile.exchange)

  // remove staff with no exchange
  Object.entries(exchange).forEach(([staff, exchng]) => {
    if (!exchng || Object.entries(exchng).length === 0) {
      delete exchange[staff]
    }
  })

  // remove out-of-date exchange
  Object.entries(exchange).forEach(([staff, exchng]) => {
    Object.entries(exchng).forEach(([date, edit]) => {
      if (date < START_DATE) {
        delete exchange[staff][date]
      }
    })
    // remove staff with no exchange
    if (Object.entries(exchng).length === 0) {
      delete exchange[staff]
    }
  })

  return exchange
}
