
import { sqlCaseAll } from "../model/sqlCaseAll.js"
import { Alert } from "../util/util.js"
import { rowDecoration } from "../view/rowDecoration.js"
import { ISO_2_th } from "../util/date.js"
import { viewEquip } from "../view/viewEquip.js"

// All cases (exclude the deleted ones)
export function caseAll2Excel() {
  sqlCaseAll().then(response => {
    typeof response === "object"
    ? prepareHTMLtoExcel(response, "All Time Saved Cases")
    : Alert("caseAll2Excel", response)
	}).catch(error => alert(error.stack))
}

function prepareHTMLtoExcel(found, search)
{
  let alltbl = document.querySelector("#alltbl")
  let allcells = document.querySelector("#allcells")

  // delete previous table lest it accumulates
  alltbl.find('tr').slice(1).remove()

  $.each( found, function() {  // each === this
    $('#allcells tr').clone()
      .appendTo($alltbl.find('tbody'))
        .filldataFind(this)
  });
}

jQuery.fn.extend({
  filldataFind : function(q) {
    let cells = this[0].cells

    if (Number(q.deleted) > 0) {
      return
    } else if (Number(q.waitnum) < 0) {
      return
    } else {
      rowDecoration(this[0], q.opdate)
    }

;   [ ISO_2_th(q.opdate),
      q.staffname,
      q.hn,
      q.patient,
      q.diagnosis,
      q.treatment,
      viewEquip(q.equipment),
      q.admission,
      q.final,
      q.contact
    ].forEach((item, i) => { cells[i].innerHTML = item })
  }
})
