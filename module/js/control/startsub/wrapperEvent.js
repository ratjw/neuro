
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
    showColumn2(target)

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

function showColumn2(target)
{
  // (|| target) if click other than th and td
  const inCell = target.closest("th") || target.closest("td") || target

  if (inCell.cellIndex === THEATRE) {
    let maintbl = document.querySelector("#maintbl")
    if (maintbl.querySelectorAll("th")[THEATRE].offsetWidth < 10) {
      maintbl.classList.add("showColumn2")
    } else if (inCell.nodeName === "TH") {
      maintbl.classList.remove("showColumn2")
    }
  }
}
