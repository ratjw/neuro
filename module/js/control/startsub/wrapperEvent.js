
import { clicktable } from "../../control/clicktable.js"
import { resetTimerCounter } from "../../control/timer.js"

// target.closest("td") = click on <div> inside <td>
export function wrapperEvent()
{
  document.getElementById("wrapper").addEventListener("wheel", () => {
    resetTimerCounter()
    removeMarker()
  })
  
  document.getElementById("wrapper").addEventListener("mousemove", resetTimerCounter)

  document.getElementById("wrapper").addEventListener("click", event => {
    let target = event.target

    resetTimerCounter()
    removeMarker()

    if (target.closest('#cssmenu')) { return }
    if (target.closest("td")) { target = target.closest("td") }

    clicktable(event, target)

    event.stopPropagation()
  })
}

function removeMarker()
{
  $(".marker").removeClass("marker")
}
