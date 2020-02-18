
import {
  SELECTED, LARGESTDATE, MOVECASE, COPYCASE, PASTETOP, PASTEBOTTOM
} from "../control/const.js"
import { clickDate } from "./clickDate.js"

// Mark the case
export function moveCase()
{
  let  selected = document.querySelector(`.${SELECTED}`)
  let  copyCase = document.querySelector(`.${COPYCASE}`)

  if (selected ) {
    mouseEvent(selected)
    selected.classList.replace(SELECTED, MOVECASE)
  } else if (copyCase) {
    copyCase.classList.replace(COPYCASE, MOVECASE)
  }
}

// Mark the case
export function copyCase()
{
  let  selected = document.querySelector(`.${SELECTED}`)
  let  moveCase = document.querySelector(`.${MOVECASE}`)

  if (selected ) {
    mouseEvent(selected)
    selected.classList.replace(SELECTED, COPYCASE)
  } else if (moveCase) {
    moveCase.classList.replace(MOVECASE, COPYCASE)
  }
}

// initiate mouseover and underline the row to move to
function mouseEvent(selected)
{
  let $allRows = $("#maintbl tr:has('td'), #queuetbl tr:has('td')")

  $allRows.mousemove(function() {
    if (event.clientY - $(this).offset().top < this.offsetHeight/2) {
      this.classList.remove(PASTEBOTTOM)
      this.classList.add(PASTETOP)
    } else {
      this.classList.remove(PASTETOP)
      this.classList.add(PASTEBOTTOM)
    }
  })
  $allRows.mouseout(function() {
    this.classList.remove(PASTETOP)
    this.classList.remove(PASTEBOTTOM)
  })
  $allRows.off("click").on("click", function(event) {
    clickDate(selected, this.closest("tr"))
    event.stopPropagation()
  })
}
