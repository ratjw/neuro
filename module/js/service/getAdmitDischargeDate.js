
import { ADMISSIONSV, ADMITSV, DISCHARGESV } from "../control/const.js"
import { sqlGetIPD } from "../model/sqlservice.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { setSERVICE, SERVICE } from "./setSERVICE.js"
import { ISO_2_th } from "../util/date.js"

export function getAdmitDischargeDate() {

  sqlGetIPD().then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
      setSERVICE(response.SERVICE)
      fillAdmitDischargeDate()
    }
  }).catch(error => alert(error.stack))
}

let fillAdmitDischargeDate = function () {
  let i = 0,
    staffname = "",
    $rows = $("#servicetbl tr")

  $.each( SERVICE, function() {
    if (this.staffname !== staffname) {
      staffname = this.staffname
      i++
    }
    i++
    let $thisRow = $rows.eq(i),
      $cells = $thisRow.children("td")

    if (this.admit && this.admit !== $cells.eq(ADMITSV).html()) {
      $cells.eq(ADMITSV).html(ISO_2_th(this.admit))
    }
    if (this.discharge && this.discharge !== $cells.eq(DISCHARGESV).html()) {
      $cells.eq(DISCHARGESV).html(ISO_2_th(this.discharge))
    }
  });
}
