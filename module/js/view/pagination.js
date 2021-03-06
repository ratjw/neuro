
import { rowDecoration } from "./rowDecoration.js"
import { MAXDATE } from "../control/const.js"
import { viewEquip } from "./viewEquip.js"
import { obj_2_ISO, ISO_2_th, nextdates } from "../util/date.js"
import { winWidth, winHeight, winResizeFix } from "../util/util.js"

export function pagination($dialog, $maintbl, book, search)
{
  let  beginday = book[0].opdate,
    lastday = findLastDateInBOOK(book),
    firstday = getPrevMonday(),
    offset = 0

  $dialog.dialog({
    title: search,
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    width: winWidth(95),
    height: winHeight(95),
    close: function() {
      $(window).off("resize", resizeDialog )
      $(".fixed").remove()
    },
    buttons: [
      {
        text: "<<< Year",
        class: "yearbut",
        click: function () {
          showOneWeek(book, firstday, -364)
        }
      },
      {
        text: "<< Month",
        class: "monthbut",
        click: function () {
          offset = firstday.slice(-2) > 28 ? -35 : -28
          showOneWeek(book, firstday, offset)
        }
      },
      {
        text: "< Week",
        click: function () {
          showOneWeek(book, firstday, -7)
        }
      },
      {
        click: function () { return }
      },
      {
        text: "Week >",
        click: function () {
          showOneWeek(book, firstday, 7)
        }
      },
      {
        text: "Month >>",
        class: "monthbut",
        click: function () {
          offset = firstday.slice(-2) > 28 ? 35 : 28
          showOneWeek(book, firstday, offset)
        }
      },
      {
        text: "Year >>>",
        class: "yearbut",
        click: function () {
          showOneWeek(book, firstday, 364)
        }
      }
    ]
  })

  showOneWeek(book, firstday, 0)

  //for resizing dialogs in landscape / portrait view
  $(window).on("resize", resizeDialog )

  function showOneWeek(book, firstday, offset) {
    $('.fixed').remove()
    showTheWeek(book, firstday, offset)
    $maintbl.fixMe($dialog)
  }

  function showTheWeek(book, Monday, offset)
  {
    let  bookOneWeek, Sunday

    firstday = nextdates(Monday, offset)
    if (firstday < beginday) { firstday = getPrevMonday(beginday) }
    if (firstday > lastday) {
      firstday = nextdates(getPrevMonday(lastday), 7)
      bookOneWeek = getBookNoDate(book)
      showAllCases(bookOneWeek)
    } else {
      Sunday = getNextSunday(firstday)
      bookOneWeek = getBookOneWeek(book, firstday, Sunday)
      showAllCases(bookOneWeek, firstday, Sunday)
    }
  }

  function getPrevMonday(date)
  {
    let today = date
          ? new Date(date.replace(/-/g, "/"))
          : new Date();
    today.setDate(today.getDate() - today.getDay() + 1);
    return obj_2_ISO(today);
  }

  function getNextSunday(date)
  {
    let today = new Date(date);
    today.setDate(today.getDate() - today.getDay() + 7);
    return obj_2_ISO(today);
  }

  function getBookOneWeek(book, Monday, Sunday)
  {
    return $.grep(book, function(q) {
      return q.opdate >= Monday && q.opdate <= Sunday
    })
  }

  function getBookNoDate(book)
  {
    return $.grep(book, function(q) {
      return q.opdate === MAXDATE
    })
  }

  function showAllCases(bookOneWeek, Monday, Sunday)
  {
    let  Mon = Monday && ISO_2_th(Monday) || "",
      Sun = Sunday && ISO_2_th(Sunday) || ""

    $dialog.dialog({
      title: search + " : " + Mon + " - " + Sun
    })
    // delete previous table lest it accumulates
    $maintbl.find('tr').slice(1).remove()

    if (Monday) {
      let  $row, row, cells,
        date = Monday,
        nocase = true

      $.each( bookOneWeek, function() {
        while (this.opdate > date) {
          if (nocase) {
            $row = $('#allcells tr').clone().appendTo($maintbl.find('tbody'))
            row = $row[0]
            cells = row.cells
            rowDecoration(row, date)
          }
          date = nextdates(date, 1)
          nocase = true
        }
        $('#allcells tr').clone()
          .appendTo($maintbl.find('tbody'))
            .filldataAllcases(this)
        nocase = false
      })
      date = nextdates(date, 1)
      while (date <= Sunday) {
        $row = $('#allcells tr').clone().appendTo($maintbl.find('tbody'))
        row = $row[0]
        cells = row.cells
        rowDecoration(row, date)
        date = nextdates(date, 1)
      }
    } else {
      $.each( bookOneWeek, function() {
        $('#allcells tr').clone()
          .appendTo($maintbl.find('tbody'))
            .filldataAllcases(this)
      });
    }
  }

  function resizeDialog() {
    $dialog.dialog({
      width: winWidth(95),
      height: winHeight(95)
    })
    winResizeFix($maintbl, $dialog)
  }
}

jQuery.fn.extend({
  filldataAllcases : function(q) {
    let row = this[0],
      cells = row.cells,
      date = q.opdate

; [ ISO_2_th(date),
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

    rowDecoration(row, date)
  }
})

function findLastDateInBOOK(book)
{
  let q = book.find(e => e.opdate === MAXDATE)

  return book[book.indexOf(q) - 1].opdate
}
