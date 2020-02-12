
import { OPDATE } from "../control/const.js"
import { getOpdate } from "../util/date.js"
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
      let opdateth = $pointing.closest('tr').find("td")[OPDATE].innerHTML
      let opdate = getOpdate(opdateth)

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
  let key = pointing.dataset.exchangeKey
  let originConsult = pointing.dataset.originConsult
  let prevStaff = pointing.dataset.consult
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

  // Had been exchanged
  else if (key) {
    sql += remove + set
    pointing.dataset.exchangeKey = key
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
