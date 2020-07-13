
import {
  CASENUMSV, HNSV, NAMESV, DIAGNOSISSV, TREATMENTSV, ADMISSIONSV,
  FINALSV, ADMITSV, DISCHARGESV
} from "../control/const.js"
import { coloring } from "./coloring.js"
import { getAdmitDischargeDate } from "./getAdmitDischargeDate.js"
import { SERVICE, seteditableSV, serviceFromDate } from "./setSERVICE.js"
import { viewProfile } from "./viewProfile.js"
import { START_DATE, ISO_2_th, putNameAge } from "../util/date.js"

export function showService() {
  let $servicetbl = $("#servicetbl"),
    $servicecells = $("#servicecells"),
    clen = $servicecells.find('tr td').length,
    staffname = "",
    scase = 0,
    classname = ""

  //delete previous servicetbl lest it accumulates
  $servicetbl.find("tr").slice(1).remove()
  $servicetbl.show()
  seteditableSV(serviceFromDate >= START_DATE)

  $.each( SERVICE, function() {
    if (this.staffname !== staffname) {
      staffname = this.staffname
      scase = 0
      $servicecells.find("tr").clone()
        .appendTo($servicetbl.find("tbody"))
          .children("td").eq(CASENUMSV)
            .prop("colSpan", clen)
              .addClass("serviceStaff")
                .html(staffname)
                  .siblings().hide()
    }
    scase++
    $servicecells.find("tr").clone()
      .appendTo($servicetbl.find("tbody"))
        .filldataService(this, scase)
  })

  if (/surgery\.rama/.test(location.hostname)) {
    getAdmitDischargeDate()
  }
}

// Use existing DOM table to refresh when editing
export function reViewService() {
  let $servicetbl = $("#servicetbl"),
    $rows = $servicetbl.find("tr"),
    $servicecells = $("#servicecells"),
    rlen = $rows.length,
    clen = $rows.find('td').length,
    staffname = "",
    i = 0, scase = 0

  $.each( SERVICE, function() {
    if (this.staffname !== staffname) {
      staffname = this.staffname
      scase = 0
      i++
      let  $staff = $rows.eq(i).children("td").eq(CASENUMSV)
      if ($staff.prop("colSpan") === 1) {
        $staff.prop("colSpan", clen)
          .addClass("serviceStaff")
            .siblings().hide()
      }
      $staff.html(staffname)
    }
    i++
    scase++
    if (i === rlen) {
      $("#servicecells").find("tr").clone()
        .appendTo($("#servicetbl").find("tbody"))
      rlen++
    }
    let  $row = $rows.eq(i)
    let  $cells = $row.children("td")
    if ($cells.eq(CASENUMSV).prop("colSpan") > 1) {
      $cells.eq(CASENUMSV).prop("colSpan", 1)
        .nextUntil($cells.eq(DISCHARGESV)).show()
    }
    $row.filldataService(this, scase)
  })

  if (i < (rlen - 1)) {
    $rows.slice(i+1).remove()
  }
  $servicetbl.fixMe($("#dialogService"))
}

jQuery.fn.extend({
  filldataService : function(q, scase) {
    let  row = this[0],
      cells = row.cells,
      opdateth = ISO_2_th(q.opdate)

    cells[CASENUMSV].innerHTML = scase
    cells[HNSV].innerHTML = q.hn
    cells[NAMESV].innerHTML = putNameAge(q)
    cells[DIAGNOSISSV].innerHTML = q.diagnosis
    cells[TREATMENTSV].innerHTML = viewProfile(q.profile, opdateth, q.treatment)
    cells[ADMISSIONSV].innerHTML = q.admission
    cells[FINALSV].innerHTML = q.final
    cells[ADMITSV].innerHTML = ISO_2_th(q.admit)
    cells[DISCHARGESV].innerHTML = ISO_2_th(q.discharge)

    row.dataset.opdate = q.opdate
    row.dataset.hn = q.hn
    row.dataset.patient = q.patient
    row.dataset.treatment = q.treatment
    row.dataset.admit = q.admit || ''
    row.dataset.profile = q.profile
    row.dataset.qn = q.qn

    coloring(row)
  }
})
