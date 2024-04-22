
import { Ajax } from "./function.js"
import { MYSQLIPHP } from "./const.js"
import { htmlEquipment } from "./htmlEquipment.js"
import { updateBOOK, resetTimer } from "./updateBOOK.js"
import { fillupstart } from "./fill.js"
import { fillHoliday } from "./fillHoliday.js"
import { fillAnnouncement } from "./fillAnnouncement.js"
import { fillEquipOproom } from "./fillEquipOproom.js"
import { fillConsults } from "./fillConsults.js"

// from login.js
export const ADMIN = "000000"
export const USER = sessionStorage.getItem("userid")
export const DIVISION = 'ประสาทศัลยศาสตร์'

	Ajax(MYSQLIPHP, "start=start", loading);

	$("#tblcontainer").show()
  htmlEquipment()
	resetTimer()

function loading(response)
{
  if (typeof response === "object") {
    updateBOOK(response)
    fillupstart()
    fillHoliday()
    fillAnnouncement()
    fillConsults()

    $("#tblcontainer").on("click", function (event) {
      event.stopPropagation()
      var target = event.target
      if (target.nodeName !== "TD") { return }
      var row = target.closest('tr')
      var opdate = row.dataset.opdate
      var oproom = row.dataset.oproom
      var qn = row.dataset.qn

      if (target.nodeName === "TD") {
        fillEquipOproom(opdate, oproom, qn)
      }
    })

    $(document).contextmenu( function (event) {
      event.preventDefault();
    })

    $(document).keydown(function(event) {
      event.preventDefault();
    })
  } else {console.log(response)
    alert ("Error in loading " + response)
  }
}
