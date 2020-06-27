
import { reposition, menustyle } from "../util/util.js"
import { clearEditcell } from "../control/edit.js"
import { setSTAFF } from "../setting/constSTAFF.js"
import { checkFieldExist } from "../setting/getSTAFF.js"
import { postData, MYSQLIPHP } from "../model/fetch.js"
import { USER } from "../main.js"

export function exchangeOncall(pointing)
{
  const $staffConsult = $("#staffConsult")
  const $cell = $(pointing)

  $staffConsult.menu({
    select: ( event, ui ) => {
      const staffname = ui.item.text()
      const id = ui.item.data('id').toString()
      const opdate = pointing.closest('tr').dataset.opdate

      changeOncall(pointing, opdate, id, staffname)
      $staffConsult.hide()
      event.stopPropagation()
    }
  })

  reposition($staffConsult, "left top", "left bottom", $cell)
  menustyle($staffConsult, $cell)
  clearEditcell()
}

async function changeOncall(cell, opdate, id, staffname)
{
  if (staffname === cell.dataset.consult) { return }

  const response = await postData(MYSQLIPHP, setDB(opdate, id))
  if (typeof response === "object") {
    setSTAFF(response.STAFF)
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

function setDB(exchngDate, id)
{
  const exchngExist = checkFieldExist(id, 'exchange')
  const dateExist = checkFieldExist(id, "exchange", exchngDate)
  const now = Date.now()
  const sql = `sqlReturnStaff=UPDATE staff SET profile=`
  const edittime = `JSON_OBJECT("${now}","${USER}")`
  const where = `WHERE id=${id};`

  return exchngExist
    ? dateExist
      ? `${sql}JSON_SET(profile,'$.exchange."${exchngDate}"."${now}"',"${USER}") ${where}`
      : `${sql}JSON_SET(profile,'$.exchange."${exchngDate}"',${edittime}) ${where}`
    : `${sql}JSON_SET(profile,'$.exchange',JSON_OBJECT("${exchngDate}",${edittime})) ${where}`
}
