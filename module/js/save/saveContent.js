
import { apostrophe, trailingBR, Alert } from "../util/util.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { OLDCONTENT } from "../control/edit.js"
import { sqlSaveContentQN, sqlSaveContentNoQN } from "../model/sqlSaveContent.js"

// use only "pointed" to save data
export function saveContent(pointed, column, newcontent) {
  let qn = pointed.closest("tr").dataset.qn

  // show instantly, no re-render after save to DB
  pointed.innerHTML = newcontent

  // take care of apostrophe, and back slash
  newcontent = apostrophe(newcontent)

  // remove trailing <br>
  newcontent = trailingBR(newcontent)

  qn
  ? saveContentQN(pointed, column, newcontent)
  : saveContentNoQN(pointed, column, newcontent)
}

function saveContentQN(pointed, column, newcontent)
{
  let qn = pointed.closest('tr').dataset.qn

  sqlSaveContentQN(column, newcontent, qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
    } else {
      Alert("saveContentQN", response)
      pointed.innerHTML = OLDCONTENT
      // return to previous content
    }
  }).catch(error => alert(error.stack))
}

function saveContentNoQN(pointed, column, newcontent)
{
  sqlSaveContentNoQN(pointed, column, newcontent).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
    } else {
      Alert("saveContentNoQN", response)
      pointed.innerHTML = OLDCONTENT
      // return to previous content
    }
  }).catch(error => alert(error.stack))
}
