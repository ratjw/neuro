
import { reposition, menustyle } from "../util/util.js"
import { clearEditcell } from "../control/edit.js"

export function exchangeOncall(pointing)
{
  let $staffConsult = $("#staffConsult")
  let $pointing = $(pointing)

  $staffConsult.menu({
    select: ( event, ui ) => {
      let staffname = ui.item.text()
      let opdateth = $pointing.closest('tr').find("td")[OPDATE].innerHTML
      let opdate = getOpdate(opdateth)

      changeOncall(pointing, opdate, staffname)
      $staffConsult.hide()
      event.stopPropagation()
    }
  })

//  $staffConsult.show()
  reposition($staffConsult, "left top", "left bottom", $pointing)
  menustyle($staffConsult, $pointing)
  clearEditcell()
}

async function changeOncall(pointing, opdate, staffname)
{
  let sql = "sqlReturnStaff=INSERT INTO oncall "
      + "(dateoncall, staffname, edittime) "
      + "VALUES ('" + opdate
      + "','" + staffname
      + "',NOW());"

  let response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    pointing.innerHTML = htmlwrap(staffname)
    gv.ONCALL = response
  } else {
    Alert("changeOncall", response)
  }
}
