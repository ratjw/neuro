
import { getTIMESTAMP, updateBOOK } from "../../util/updateBOOK.js"
import { Alert } from "../../util/util.js"
import { scrolltoToday } from "../../view/scrolltoThisCase.js"
import { sqlGetServiceOneMonth } from "../../model/sqlservice.js"
import { setSERVICE } from "../../service/setSERVICE.js"
import { reViewService } from "../../service/showService.js"
import { refillHoliday } from "../../view/fillHoliday.js"

export function serverSentEvent()
{
  let evtSource = new EventSource('../../php/sse.php')

  evtSource.onopen = function() {
    console.log("Connection to server opened.")
		console.log(evtSource.readyState)
		console.log(evtSource.url)
  }

  evtSource.onmessage = function(e) {
    const data = JSON.parse(e.data)
    const timestamp = getTIMESTAMP()
    if (data.QTIME > timestamp) {
      if (dialogServiceShowing()) {
        sqlGetServiceOneMonth().then(response => {
          if (typeof response === "object") {
            setSERVICE(response)
            reViewService()
            renewEditcell()
            updateBOOK(data)
            refillHoliday()
          } else {
            Alert ("getUpdateService", response)
          }
        })
      } else {
        updateBOOK(data)
        refillHoliday()
        renewEditcell()
      }
    }
  }

  evtSource.onerror = function() {
    console.log("EventSource failed.")
  }
}

function dialogServiceShowing()
{
  let $dialogService = $("#dialogService")

  return $dialogService.hasClass('ui-dialog-content') && $dialogService.dialog('isOpen')
}
