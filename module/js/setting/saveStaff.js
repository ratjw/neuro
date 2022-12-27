
import { sqlSaveStaff } from "../model/sqlStaff.js"
import { setSTAFF } from "../util/updateBOOK.js"
import { htmlStafflist } from "../control/html.js"
import { fillConsults } from "../view/fillConsults.js"
import { settingStaff } from "../setting/settingStaff.js"

export async function saveStaff(row)
{
  let response = await sqlSaveStaff(row)

  if (typeof response === "object") {
    setSTAFF(response)
    htmlStafflist()
    fillConsults()
  } else {
    alert("saveStaff\n\n" + response)
  }
  settingStaff()
}
