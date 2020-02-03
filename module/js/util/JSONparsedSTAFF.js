
import { STAFF } from "../util/updateBOOK.js"

export function JSONparsedSTAFF()
{
  const staffs = JSON.parse(JSON.stringify(STAFF))

  staffs.forEach(staff => {
    staff.startoncall = JSON.parse(staff.startoncall)
    staff.exchange = JSON.parse(staff.exchange)
    staff.skip = JSON.parse(staff.skip)
  })

  return staffs
}
