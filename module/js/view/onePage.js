
import { rowDecoration } from "./rowDecoration.js"
import { OPDATE } from "../control/const.js"
import { viewEquip } from "./viewEquip.js"
import { obj_2_ISO, th_2_ISO, ISO_2_th } from "../util/date.js"
import { winWidth, winHeight, winResizeFix } from "../util/util.js"
import { exportFindToExcel } from "../util/exportFindToExcel.js"

export function onePage($dialogAll, $alltbl, found, search)
{
  $dialogAll.dialog({
    title: "Search: " + search,
    closeOnEscape: true,
    modal: true,
    width: winWidth(95),
    height: winHeight(95),
    buttons: [
      {
        text: "deleted case",
        class: "deletedcase",
        click: function() { }
      },
      {
        text: "consulted case",
        class: "consultedcase",
        click: function() { }
      },
      {
        text: "Export to xls",
        click: function() { exportFindToExcel(search) }
      }
    ],
    close: function() {
      $(window).off("resize", resizeFind )
      $(".fixed").remove()
      $("#dialogInput").dialog("close")
      $(".marker").removeClass("marker")
    }
  })

  // delete previous table lest it accumulates
  $alltbl.find('tr').slice(1).remove()

  $.each( found, function() {  // each === this
    $('#allcells tr').clone()
      .appendTo($alltbl.find('tbody'))
        .filldataFind(this)
  });
  $alltbl.fixMe($dialogAll);

  //for resizing dialogs in landscape / portrait view
  $(window).on("resize", resizeFind )

  function resizeFind() {
    $dialogAll.dialog({
      width: winWidth(95),
      height: winHeight(95)
    })
    winResizeFix($alltbl, $dialogAll)
  }

  //scroll to todate when there many cases
  let today = new Date(),
    todate = obj_2_ISO(today),
    thishead

  $alltbl.find("tr").each(function() {
    thishead = this
    return th_2_ISO(this.cells[OPDATE].innerHTML) < todate
  })
  $dialogAll.animate({
    scrollTop: $(thishead).offset().top - $dialogAll.height()
  }, 300);
}

jQuery.fn.extend({
  filldataFind : function(q) {
    let cells = this[0].cells

    if (Number(q.deleted) > 0) {
      this.addClass("deletedcase")
    } else if (Number(q.waitnum) < 0) {
      this.addClass("consultedcase")
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
