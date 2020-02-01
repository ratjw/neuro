
import { STAFF } from "../util/updateBOOK.js"

export function JSONparsedSTAFF()
{
  const staffs = JSON.parse(JSON.stringify(STAFF))

  staffs.forEach(staff => {
    staff.startoncall = JSON.parse(staff.startoncall)
    staff.skipbegin = JSON.parse(staff.skipbegin)
    staff.skipend = JSON.parse(staff.skipend)
  })

  return staffs
}
