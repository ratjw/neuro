
import { rowDecoration } from "./rowDecoration.js"
import { OPDATE } from "../control/const.js"
import { viewEquip } from "./viewEquip.js"
import { objDate_2_ISOdate, thDate_2_ISOdate, putThdate } from "../util/date.js"
import { winWidth, winHeight, winResizeFix } from "../util/util.js"
import { exportFindToExcel } from "../util/excel.js"

export function onePage($dialogFind, $findtbl, found, search)
{
  $dialogFind.dialog({
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
  $findtbl.find('tr').slice(1).remove()

  $.each( found, function() {  // each === this
    $('#findcells tr').clone()
      .appendTo($findtbl.find('tbody'))
        .filldataFind(this)
  });
  $findtbl.fixMe($dialogFind);

  //for resizing dialogs in landscape / portrait view
  $(window).on("resize", resizeFind )

  function resizeFind() {
    $dialogFind.dialog({
      width: winWidth(95),
      height: winHeight(95)
    })
    winResizeFix($findtbl, $dialogFind)
  }

  //scroll to todate when there many cases
  let today = new Date(),
    todate = objDate_2_ISOdate(today),
    thishead

  $findtbl.find("tr").each(function() {
    thishead = this
    return thDate_2_ISOdate(this.cells[OPDATE].innerHTML) < todate
  })
  $dialogFind.animate({
    scrollTop: $(thishead).offset().top - $dialogFind.height()
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

;   [ putThdate(q.opdate),
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
