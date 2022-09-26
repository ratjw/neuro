
import { PATIENT, CELLDATASET } from '../control/const.js'
import { timer, resetTimerCounter } from "./timer.js"
import { clearEditcell } from "./edit.js"
import { clearMouseoverTR } from "../util/util.js"
import { sqlmoveCase } from "../model/sqlmoveCase.js"
import { calcWaitnum } from "../util/calcWaitnum.js"
import { sameDateRoomTableQNs } from "../util/rowsgetting.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert, isConsults, isStaffname } from "../util/util.js"
import { rowDecoration } from "../view/rowDecoration.js"
import { clearAllEditing } from "./clearAllEditing.js"
import { blankRowData, unfillOldrowData } from "../view/fillNewrowData.js"
import { refillHoliday } from "../view/fillHoliday.js"

// Sortable 2 windows connected with each other
// Trace placeholder to determine moving up or down
export function sortable () {
  let prevplace,
    thisplace,
    prevrow,
    nextrow,
    sender,
    thisdrop

  $("#maintbl tbody, #queuetbl tbody").sortable({
    items: "tr",
    connectWith: "#maintbl tbody, #queuetbl tbody",
    delay: 150,
    forceHelperSize: true,
    forcePlaceholderSize: true,
    revert: true,
    cancel: "tr:has('th')",
    start: function(e, ui){
      clearTimeout(timer)
      clearAllEditing()
      ui.placeholder.innerHeight(ui.item.outerHeight())
      prevplace = ui.placeholder.index()
      thisplace = ui.placeholder.index()
      sender = ui.item.closest('table').attr('id')
      prevrow = ui.item[0].previousElementSibling
      nextrow = ui.item[0].nextElementSibling.nextElementSibling
    },
    // Make scroll only the window that placeholder is in
    over: function(e, ui) {
      ui.item.data('sortableItem').scrollParent = ui.placeholder.closest("div");
      ui.item.data('sortableItem').overflowOffset = ui.placeholder.closest("div").offset();
    },
    // For determination of up or down
    change: function(e, ui) {
      prevplace = thisplace
      thisplace = ui.placeholder.index()
    },
    stop: function(e, ui) {
      let moveitem = ui.item[0],
        receiver = moveitem.closest('table').id,
        moveqn = moveitem.dataset.qn,
        moveopdate = moveitem.dataset.opdate,
        staffname = moveitem.dataset.staffname

      // Allow drag to Consults, or same staff name
      // That is (titlename === "Consults") is allowed
      // To another staff name is not allowed
      // Not allow to drag a blank line
      let illegal = !moveqn
            || ((sender === "maintbl")
            && (receiver === "queuetbl")
            && !isConsults()
            && !isStaffname(staffname))
            

      if (illegal) {
        stopsorting()
        return
      }

      // Find nearest row by dropping position
      let previtem = moveitem.previousElementSibling
      let nextitem = moveitem.nextElementSibling

      if (!previtem || previtem.querySelector('th')) {
        thisdrop = nextitem
      } else {
        if (!nextitem || nextitem.querySelector('th')) {
          thisdrop = previtem
        } else {
          // Determine that the user intend to drop on which row
          //ui.offset (without '()') = helper position
          let helpertop = ui.offset.top
          let helperheight = moveitem.offsetHeight
          let helpercenter = helpertop + helperheight/2

          let placeholdertop = moveitem.getBoundingClientRect().top
          let placeholderheight = ui.placeholder.height()
          let placeholdercenter = placeholdertop + placeholderheight/2
          let placeholderbottom = placeholdertop + placeholderheight

          let nearprev = Math.abs(helpercenter - placeholdertop)
          let nearplace = Math.abs(helpercenter - placeholdercenter)
          let nearnext = Math.abs(helpercenter - placeholderbottom)
          let nearest = Math.min(nearprev, nearplace, nearnext)

          if (nearest === nearprev) {
            thisdrop = previtem
          } else if (nearest === nearnext) {
            thisdrop = nextitem
          } else if (nearest === nearplace) {
            if ((prevplace === thisplace) && (sender === receiver)) {
              stopsorting()
              return
            }
            thisdrop =  (prevplace < thisplace) ? previtem : nextitem
          }
        }
      }

      let allNewCases = [],
        allOldCases = [],
        thisopdate = thisdrop.dataset.opdate,
        thisqn = thisdrop.dataset.qn

      // drop on the same case
      if (thisqn === moveqn) {
        stopsorting()
        return
      }

      // not the same as movecase in clickDate because the row was actually moved
      // clonemoveitem in case of if it's the only one row, the date is skipped
      // clonethisdrop in case of it may be removed by (!thisqn) thisdrop.remove()
      // thisdrop is replaced by moveitem, clonethisdrop is used for sqlSortable
      let clonemoveitem = moveitem.cloneNode(true),
        clonethisdrop = thisdrop.cloneNode(true),
        prevopdate = prevrow && prevrow.dataset.opdate,
        nextopdate = nextrow && nextrow.dataset.opdate,
        single = (prevopdate !== moveopdate) && (moveopdate !== nextopdate)
        // the only one case of this date

      // make moveitem look alike thisdrop for sameDateRoom function
      moveitem.dataset.waitnum = calcWaitnum(thisopdate, previtem, nextitem)
      moveitem.dataset.opdate = thisdrop.dataset.opdate
      moveitem.dataset.oproom = thisdrop.dataset.oproom
      rowDecoration(moveitem, moveitem.dataset.opdate)

      moveitem.cells[PATIENT].className = thisdrop.cells[PATIENT].className
      CELLDATASET.forEach(e =>
        moveitem.cells[PATIENT].dataset[e] = thisdrop.cells[PATIENT].dataset[e] || ''
      )
      

      allOldCases = sameDateRoomTableQNs(sender, clonemoveitem)
      allNewCases = sameDateRoomTableQNs(receiver, thisdrop)

      // In case of new is the same date room as old
      if (allOldCases.find(e => e === moveqn)) {
        allNewCases = allOldCases
        allOldCases = []
      }

      if (single) {
        let next = prevrow.nextElementSibling
        if (next) {
          while (prevrow.dataset.opdate === next.dataset.opdate) {
            prevrow = next
            if (!(next = next.nextElementSibling)) break
          }
        }
        prevrow.after(clonemoveitem)
      }
      blankRowData(clonemoveitem, moveopdate)
      unfillOldrowData(clonemoveitem, moveopdate)

      if (!thisqn) { thisdrop.remove() }

      sqlmoveCase(allOldCases, allNewCases, moveitem, clonethisdrop).then(response => {
        if (typeof response === "object") {
          updateBOOK(response)
          refillHoliday()
        } else {
          Alert("Sortable", response)
        }
      }).catch(error => alert(error.stack))

      resetTimerCounter()
      clearEditcell()
    }
  })
}

let stopsorting = function () {
	// Return to original place
	$("#tbl tbody, #queuetbl tbody").sortable( "cancel" )

  // before sorting, timer was stopped in start: function
  resetTimerCounter()

  //  after sorting, editcell was placed at row 0 column 1
  //  and display at placeholder position in entire width
  clearEditcell()
}
