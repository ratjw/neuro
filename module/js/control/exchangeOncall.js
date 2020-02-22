
import { reposition, menustyle } from "../util/util.js"
import { clearEditcell } from "../control/edit.js"
import { setSTAFF } from "../util/updateBOOK.js"
import { getStaffID } from "../util/getSTAFFparsed.js"
import { postData, MYSQLIPHP } from "../model/fetch.js"

export function exchangeOncall(pointing)
{
  let $staffConsult = $("#staffConsult")
  let $pointing = $(pointing)

  $staffConsult.menu({
    select: ( event, ui ) => {
      let staffname = ui.item.text()
      let id = ui.item.data('id').toString()
      let opdate = pointing.closest('tr').dataset.opdate

      changeOncall(pointing, opdate, id, staffname)
      $staffConsult.hide()
      event.stopPropagation()
    }
  })

  reposition($staffConsult, "left top", "left bottom", $pointing)
  menustyle($staffConsult, $pointing)
  clearEditcell()
}

async function changeOncall(pointing, opdate, id, staffname)
{
  let prevStaff = pointing.dataset.consult

  if (staffname === prevStaff) { return }

  let key = pointing.dataset.exkey
  let exconsult = pointing.dataset.exconsult
  let prevStaffID = getStaffID(prevStaff)
  let now = Date.now()
  let sql = 'sqlReturnStaff='

  let remove = `UPDATE staff SET profile=`
    + `JSON_REMOVE(profile,'$.exchange."${key}"') WHERE id=${prevStaffID};`
  let set = `UPDATE staff SET profile=`
    + `JSON_SET(profile,'$.exchange',JSON_OBJECT("${now}","${opdate}")) WHERE id=${id};`

  if (staffname === exconsult) {
    sql += remove
    pointing.dataset.exkey = ''
    pointing.dataset.exconsult = ''
  }

  // Had ever been exchanged before
  else if (key) {
    sql += remove + set
    pointing.dataset.exkey = key
  // Never been exchanged before
  } else {
    sql += set
    pointing.dataset.exconsult = prevStaff
  }
  pointing.dataset.consult = staffname

  let response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    setSTAFF(response.STAFF)
  } else {
    Alert("changeOncall", response)
  }
}
