
import { rowDecoration } from "./rowDecoration.js"
import { MAXDATE } from "../control/const.js"
import { viewEquip } from "./viewEquip.js"
import { obj_2_ISO, ISO_2_th, nextdates } from "../util/date.js"
import { winWidth, winHeight, winResizeFix } from "../util/util.js"

export function pagination($dialog, $showtbl, found, search)
{
  let week = 7,
    month = 28,
    year = 364,
    previous = -1,
    firstday

  $dialog.dialog({
    title: search,
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    width: winWidth(100),
    height: winHeight(100),
    close: function() {
      $(window).off("resize", resizeDialog )
      $(".fixed").remove()
    },
    buttons: [
      {
        text: "<<< Year",
        class: "yearbut",
        click: function () {
          showOneWeek(found, previous * year)
        }
      },
      {
        text: "<< Month",
        class: "monthbut",
        click: function () {
          showOneWeek(found, previous * month)
        }
      },
      {
        text: "< Week",
        click: function () {
          showOneWeek(found, previous * week)
        }
      },
      {
        click: function () { return }
      },
      {
        text: "Week >",
        click: function () {
          showOneWeek(found, week)
        }
      },
      {
        text: "Month >>",
        class: "monthbut",
        click: function () {
          showOneWeek(found, month)
        }
      },
      {
        text: "Year >>>",
        class: "yearbut",
        click: function () {
          showOneWeek(found, year)
        }
      }
    ]
  })

  showOneWeek(found, 0)

  //for resizing dialogs in landscape / portrait view
  $(window).on("resize", resizeDialog )

  function showOneWeek(found, offset) {
    $('.fixed').remove()
    showTheWeek(found, offset)
    $showtbl.fixMe($dialog)
  }

  function showTheWeek(found, offset)
  {
    let opdates = found.map(e => e.opdate),
      lastday = opdates.reduce((a, b) => a > b ? a : b),
      beginday = found[0].opdate,
      firstdayYear = new Date(firstday).getFullYear(),
      MAXDATEyear = new Date(MAXDATE).getFullYear(),
      Monday

    if ((firstdayYear === MAXDATEyear) && (offset < 0)) {
      opdates = opdates.filter(e => e !== MAXDATE)
      lastday = opdates.reduce((a, b) => a > b ? a : b)
      Monday = getPrevMonday(lastday)
    } else {
      Monday = offset ? nextdates(firstday, offset) : getPrevMonday()
    }

    if ((Monday < beginday) || (Monday > lastday)) return

  //    Monday = nextdates(getPrevMonday(lastday), 7)
  //    bookOneWeek = getBookNoDate(found)
  //    showAllCases(bookOneWeek)
    
    const bookOneWeek = getBookOneWeek(found, Monday, offset),
      date = bookOneWeek[0].opdate,
      newMonday = getPrevMonday(date)

    showAllCases(bookOneWeek, newMonday)
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

  function getBookOneWeek(found, Monday, offset)
  {
    const Sunday = getNextSunday(Monday),
      data = getBookThisWeek(found, Monday, Sunday)

    return data.length ? data : getNotEmptyWeek(found, Monday, Sunday, offset)
  }

  function getBookThisWeek(found, Monday, Sunday)
  {
    return found.filter(e => (e.opdate >= Monday) && (e.opdate <= Sunday))
  }

  function getNotEmptyWeek(found, Monday, Sunday, offset)
  {
    const opdate = findNotEmptyWeek(found, Monday, Sunday, offset)

    if (opdate === MAXDATE) {
      return getBookNoDate(found)
    }

    const newMonday = getPrevMonday(opdate),
    newSunday = getNextSunday(newMonday)

    return getBookThisWeek(found, newMonday, newSunday)
  }

  // slice() before reverse() to prevent array mutation
  function findNotEmptyWeek(found, Monday, Sunday, offset)
  {
    return offset < 0
            ? found.slice().reverse().find(e => e.opdate < Monday).opdate
            : found.find(e => e.opdate > Sunday).opdate
  }

  function getBookNoDate(found)
  {
    return found.filter(e => e.opdate === MAXDATE)
  }

  function showAllCases(bookOneWeek, Monday)
  {
    let Sunday = getNextSunday(Monday),
      Mon = Monday && ISO_2_th(Monday) || "",
      Sun = Sunday && ISO_2_th(Sunday) || ""

    firstday = Monday

    $dialog.dialog({
      title: search + " : " + Mon + " - " + Sun
    })
    // delete previous table lest it accumulates
    $showtbl.find('tr').slice(1).remove()

    if (Monday) {
      let  $row, row,
        date = Monday,
        nocase = true

      $.each( bookOneWeek, function() {
        while (this.opdate > date) {
          if (nocase) {
            $row = $('#allcells tr').clone().appendTo($showtbl.find('tbody'))
            rowDecoration($row[0], date)
          }
          date = nextdates(date, 1)
          nocase = true
        }
        $('#allcells tr').clone()
          .appendTo($showtbl.find('tbody'))
            .filldataAllcases(this)
        nocase = false
      })
      date = nextdates(date, 1)
      while (date <= Sunday) {
        $row = $('#allcells tr').clone().appendTo($showtbl.find('tbody'))
        rowDecoration($row[0], date)
        date = nextdates(date, 1)
      }
    } else {// MAXDATE
      $.each( bookOneWeek, function() {
        $('#allcells tr').clone()
          .appendTo($showtbl.find('tbody'))
            .filldataAllcases(this)
      });
    }
  }

  function resizeDialog() {
    $dialog.dialog({
      width: winWidth(100),
      height: winHeight(100)
    })
    winResizeFix($showtbl, $dialog)
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
