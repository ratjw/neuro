
import { reposition, menustyle } from "../util/util.js"
import { clearEditcell } from "../control/edit.js"
import { setSTAFF } from "../util/updateBOOK.js"
import { getStaffID, checkFieldExist } from "../util/getSTAFFparsed.js"
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

function setDB(opdate, id)
{
  const fieldExist = checkFieldExist(id, 'exchange')
  const now = Date.now()

  return fieldExist
    ? `sqlReturnStaff=UPDATE staff SET profile=JSON_SET(profile,`
      + `'$.exchange."${opdate}"',`
      + `JSON_OBJECT("timestamp","${now}","editor","${USER}")`
      + `) `
      + `WHERE id=${id};`
    : `sqlReturnStaff=UPDATE staff SET profile=JSON_SET(profile,`
      + `'$.exchange',JSON_OBJECT("${opdate}",`
      + `JSON_OBJECT("timestamp","${now}","editor","${USER}")`
      + `)) `
      + `WHERE id=${id};`
}
