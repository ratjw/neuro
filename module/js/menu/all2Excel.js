
import { sqlall } from "../model/sqlall.js"
import { Alert } from "../util/util.js"
import { ISO_2_th } from "../util/date.js"
import { exportFindToExcel } from "../util/exportFindToExcel.js"
import { rowDecoration } from "../view/rowDecoration.js"
import { viewEquip } from "../view/viewEquip.js"

// All cases (exclude the deleted ones)
export function all2Excel() {
  sqlall().then(response => {
    typeof response === "object"
    ? prepareHTMLtoExcel(response, "AllTimeCases")
    : Alert("all2Excel", response)
	}).catch(error => alert(error.stack))
}

function prepareHTMLtoExcel(found, search)
{
  let alltbl = document.querySelector("#alltbl")
  let allcells = document.querySelector("#allcells")

  // delete previous table lest it accumulates
  Array.from(document.querySelectorAll("#alltbl tr")).splice(1)

  found.forEach(e => {
    let celltr = document.querySelector("#allcells tr").cloneNode(true)
    
    if (Number(e.deleted) > 0 || Number(e.waitnum) < 0) {
      return
    } else {
      filldata(celltr, e)
      document.querySelector("#alltbl tbody").append(celltr)
    }
  });

  exportFindToExcel(search)
}

function filldata(celltr, e)
{
    let cells = celltr.cells

    rowDecoration(celltr, e.opdate)

;   [ ISO_2_th(e.opdate),
      e.staffname,
      e.hn,
      e.patient,
      e.diagnosis,
      e.treatment,
      viewEquip(e.equipment),
      e.admission,
      e.final,
      e.contact
    ].forEach((item, i) => { cells[i].innerHTML = item })
}
