
import { clickDate } from "./clickDate.js"

// Mark the case
export function moveCase()
{
  let  selected = document.querySelector(".selected")
  let  copyCase = document.querySelector(".copyCase")

  if (selected ) {
    mouseEvent(selected)
    selected.classList.replace("selected", "moveCase")
  } else if (copyCase) {
    copyCase.classList.replace("copyCase", "moveCase")
  }
}

// Mark the case
export function copyCase()
{
  let  selected = document.querySelector(".selected")
  let  moveCase = document.querySelector(".moveCase")

  if (selected ) {
    mouseEvent(selected)
    selected.classList.replace("selected", "copyCase")
  } else if (moveCase) {
    moveCase.classList.replace("moveCase", "copyCase")
  }
}

// initiate mouseover and underline the row to move to
function mouseEvent(selected)
{
  let $allRows = $("#maintbl tr:has('td'), #queuetbl tr:has('td')")

  $allRows.mouseover(function() {
    $(this).addClass("pasteDate")
  })
  $allRows.mouseout(function() {
    $(this).removeClass("pasteDate")
  })
  $allRows.off("click").on("click", function(event) {
    clickDate(selected, this.closest("tr"))
    event.stopPropagation()
  })
}
