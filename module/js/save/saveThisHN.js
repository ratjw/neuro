
import { sqlGetHN } from "../model/sqlGetHNName.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert, winHeight } from "../util/util.js"
import { OLDCONTENT, reCreateEditcell } from "../control/edit.js"
import { saveHN } from '../save/saveHN.js'

export function saveThisHN(pointed, content)
{
  const wrapper = document.querySelector('#wrapper')

  pointed.innerHTML = content
  sqlGetHN(pointed, content).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
      reCreateEditcell()
    } else {
      Alert("saveThisHN", content + "<br><br>" + response)
      pointed.innerHTML = ""
      // unsuccessful entry
    }
  }).catch(error => alert(error.stack))
}
