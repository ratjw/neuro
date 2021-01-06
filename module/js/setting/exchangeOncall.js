
import { reposition, menustyle } from "../util/util.js"
import { clearEditcell } from "../control/edit.js"
import { setSTAFF } from "../util/updateBOOK.js"
import { checkFieldExist } from "../setting/getStaff.js"
import { postData, MYSQLIPHP } from "../model/fetch.js"
import { USER } from "../main.js"

export function exchangeOncall(pointing)
{
  const $staffConsult = $("#staffConsult")
  const $cell = $(pointing)

  $staffConsult.menu({
    select: ( event, ui ) => {
      const staffname = ui.item.text()
      const ramaid = ui.item.data('ramaid').toString()
      const opdate = pointing.closest('tr').dataset.opdate

      changeOncall(pointing, opdate, ramaid, staffname)
      $staffConsult.hide()
      event.stopPropagation()
    }
  })

  reposition($staffConsult, "left top", "left bottom", $cell)
  menustyle($staffConsult, $cell)
  clearEditcell()
}

async function changeOncall(cell, opdate, ramaid, staffname)
{
  if (staffname === cell.dataset.consult) { return }

  const sql = sqlDB(opdate, ramaid),
    response = await postData(MYSQLIPHP, { sqlReturnStaff: sql })

  if (typeof response === "object") {
    setSTAFF(response)
  } else {
    alert("changeOncall", response)
  }

  if (!cell.dataset.origconsult) {
    cell.dataset.origconsult = cell.dataset.consult
  }
  else if (cell.dataset.origconsult === staffname) {
    delete cell.dataset.origconsult
  }
  cell.dataset.consult = staffname
}

function sqlDB(exchngDate, ramaid)
{
  const exchngExist = checkFieldExist(ramaid, 'exchange')
  const dateExist = checkFieldExist(ramaid, "exchange", exchngDate)
  const now = Date.now()
  const sql = `UPDATE personnel SET profile=`
  const edittime = `JSON_OBJECT("${now}","${USER}")`
  const where = `WHERE profile->"$.ramaid"="${ramaid}";`

  return exchngExist
    ? dateExist
      ? `${sql}JSON_SET(profile,'$.exchange."${exchngDate}"."${now}"',"${USER}") ${where}`
      : `${sql}JSON_SET(profile,'$.exchange."${exchngDate}"',${edittime}) ${where}`
    : `${sql}JSON_SET(profile,'$.exchange',JSON_OBJECT("${exchngDate}",${edittime})) ${where}`
}
