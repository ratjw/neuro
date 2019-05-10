
import { sqlGetNameHN } from "../model/sqlsavehn.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert } from "../util/util.js"
import { reCreateEditcell } from "../control/edit.js"

export function saveNameHN(pointed, content)
{
  sqlGetNameHN(pointed, content).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
      reCreateEditcell()
    } else {
      Alert("saveNameHN", response)
      pointed.innerHTML = ""
      // unsuccessful entry
    }
  }).catch(error => { })
}
