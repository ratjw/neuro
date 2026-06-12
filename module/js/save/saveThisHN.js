
import { sqlGetHN } from "../model/sqlGetHNName.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert } from "../util/util.js"
import { reCreateEditcell } from "../control/edit.js"

export function saveThisHN(pointed, hn)
{
  const wrapper = document.querySelector('#wrapper')

  pointed.innerHTML = hn
  sqlGetHN(pointed, hn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
      reCreateEditcell()
    } else {
      Alert("saveThisHN", hn + "<br><br>" + response)
      pointed.innerHTML = ""
      // unsuccessful entry
    }
  }).catch(error => alert(error.stack))
}
