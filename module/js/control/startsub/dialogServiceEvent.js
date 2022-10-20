
import { resetTimerCounter } from "../../control/timer.js"

export function dialogServiceEvent()
{
	document.getElementById("dialogService").addEventListener("wheel", resetTimerCounter)
	
	document.getElementById("dialogService").addEventListener("mousemove", resetTimerCounter)
}
