
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

  let key = pointing.dataset.exchangeKey
  let originConsult = pointing.dataset.originConsult
  let prevStaffID = getStaffID(prevStaff)
  let now = Date.now()
  let sql = 'sqlReturnStaff='

  let remove = `UPDATE staff SET profile=`
    + `JSON_REMOVE(profile,'$.exchange."${key}"') WHERE id=${prevStaffID};`
  let set = `UPDATE staff SET profile=`
    + `JSON_SET(profile,'$.exchange',JSON_OBJECT("${now}","${opdate}")) WHERE id=${id};`

  if (staffname === originConsult) {
    sql += remove
    pointing.dataset.exchangeKey = ''
    pointing.dataset.originConsult = ''
  }

  // Had ever been exchanged before
  else if (key) {
    sql += remove + set
    pointing.dataset.exchangeKey = key
  // Never been exchanged before
  } else {
    sql += set
    pointing.dataset.originConsult = prevStaff
  }
  pointing.dataset.consult = staffname

  let response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    setSTAFF(response.STAFF)
  } else {
    Alert("changeOncall", response)
  }
}
