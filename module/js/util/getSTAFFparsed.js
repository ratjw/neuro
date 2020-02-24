
import { getSTAFF } from "../util/updateBOOK.js"
import { getLatestKey, getLatestValue } from "../util/util.js"
import { START_DATE } from "../util/date.js"

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

export function getStaffID(staffname)
{
  let staffs = getSTAFFparsed()

  return staffs.map(staff => (staff.profile.staffname === staffname) && staff.id)[0]
}

export function getOncallExchange()
{
  let staffs = getSTAFFparsed()
  let exchange = {}

  staffs.forEach(staff => exchange[staff.profile.staffname] = staff.profile.exchange)

  // remove staff with no exchange
  Object.entries(exchange).forEach(([staff, exchng]) => {
    if (!exchng || Object.entries(exchng).length === 0) {
      delete exchange[staff]
    }
  })

  // remove out-of-date exchange
  Object.entries(exchange).forEach(([staff, exchng]) => {
    Object.entries(exchng).forEach(([key, date]) => {
      if (date < START_DATE) {
        delete exchange[staff][key]
      }
    })
  })
/*
  // remove same-date exchange with older keys within one staff
  Object.entries(exchange).forEach(([staff, exchng]) => {
    const uniqDates = [...new Set(Object.values(exchng))]

Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);

    uniqDates.forEach(uniqDate => {
      let uniqExchng = Object.entries(exchng).filter(([key, eachDate]) => {
        if (eachDate === uniqDate) {
          return acc
        } else {
          return key
        }
      })
    })
    Object.entries(exchange).forEach(([staff, exchng]) => {
      Object.entries(exchng).reduce((acc, [key, date]) => {
        if (acc > key) {
          delete exchange[staff][key]
          return acc
        } else {
          delete exchange[staff][acc]
          return key
        }
      }, 0)

  })

  // remove same-date exchange with older keys all staffs
  Object.entries(exchange).forEach(([staff, exchng]) => {
    Object.entries(exchng).reduce((acc, [key, date]) => {
      if (acc > key) {
        delete exchange[staff][key]
        return acc
      } else {
        delete exchange[staff][acc]
        return key
      }
    }, 0)
  })
*/
  return exchange
}
