
import { THEATRE } from "../control/const.js"
import { clicktable } from "../control/clicktable.js"
import { clearAllEditing } from "../control/clearAllEditing.js"
import { editcellEvent, clearEditcell, renewEditcell } from "../control/edit.js"
import { resetTimer, resetTimerCounter } from "../control/timer.js"
import { setClickAll } from "../control/setClickAll.js"
import { sqlStart } from "../model/sqlupdate.js"
import { sortable } from "../control/sort.js"
import { clearSelection } from "../control/selectRow.js"
import { fillmain } from "../view/fill.js"
import { fillConsults } from "../view/fillConsults.js"
import { START_DATE, obj_2_ISO } from "../util/date.js"
import { getTIMESTAMP, updateBOOK } from "../util/updateBOOK.js"
import { Alert } from "../util/util.js"
import { htmlStafflist, htmlLab, htmlEquipment } from "../control/html.js"
import { scrolltoToday } from "../view/scrolltoThisCase.js"
import { sqlGetServiceOneMonth } from "../model/sqlservice.js"
import { setSERVICE } from "../service/setSERVICE.js"
import { reViewService } from "../service/showService.js"
import { isMobile } from "../main.js"
import { exchangeOncall } from "../control/exchangeOncall.js"

// For staff & residents with login id / password from Get_staff_detail
export function start() {
	sqlStart().then(response => {
		typeof response === "object"
		? success(response)
		: failed(response)
	}).catch(error => alert(error.stack))

	document.oncontextmenu = contextmenu
}

// Success return from server
function success(response) {

  // call sortable before render, otherwise it renders very slowly
//  isMobile ? scaleViewport() : 
  sortable()
  updateBOOK(response)
  fillmain()
  scrolltoToday('maintbl')
  fillConsults()
  clearSelection()

  // setting up html
  htmlLab()
  htmlEquipment()
  htmlStafflist()

  // make the document editable
  editcellEvent()
  dialogServiceEvent()
  wrapperEvent()
  documentEvent()
  setClickAll()
  overrideJqueryUI()
  resetTimer()
//  serverSentEvent()
}

// *** to do -> offline browsing by service worker ***
function failed(response) {
  let title = "Server Error",
    error = "<br><br>Response from server has no data"

  Alert(title, error)
}

function contextmenu(event)
{
  let target = event.target
  let oncall = /consult/.test(target.className)

  if (oncall) {
    exchangeOncall(target)
  }
  return false
}

function dialogServiceEvent()
{
	document.getElementById("dialogService").addEventListener("wheel", resetTimerCounter)
	
	document.getElementById("dialogService").addEventListener("mousemove", resetTimerCounter)
}

function wrapperEvent()
{
  document.getElementById("wrapper").addEventListener("wheel", () => {
    resetTimerCounter()
    removeMarker()
  })
  
  document.getElementById("wrapper").addEventListener("mousemove", resetTimerCounter)

  document.getElementById("wrapper").addEventListener("click", event => {
    const target = event.target

    resetTimerCounter()
    removeMarker()
    clearList(target)
    showColumn2(target)

    if (target.closest('#cssmenu')) { return }

    clicktable(event, target)

    event.stopPropagation()
  })
}

function removeMarker()
{
  $(".marker").removeClass("marker")
}

function clearList(target)
{
  const stafflist = document.querySelector('#stafflist')
  const staffConsult = document.querySelector('#staffConsult')
  
  if (stafflist.style.visibility === 'visible') {
    if (!target.closest('#stafflist')) {
      stafflist.style.display = 'none'
      clearEditcell()
    }
  }
  
  if (staffConsult.style.visibility === 'visible') {
    if (!target.closest('#staffConsult')) {
      staffConsult.style.display = 'none'
    }
  }
}

function showColumn2(target)
{
  const inCell = target.closest("th") || target.closest("td")

  if (inCell.cellIndex === THEATRE) {
    let maintbl = document.querySelector("#maintbl")
    if (maintbl.querySelectorAll("th")[THEATRE].offsetWidth < 10) {
      maintbl.classList.add("showColumn2")
    } else if (inCell.nodeName === "TH") {
      maintbl.classList.remove("showColumn2")
    }
  }
}

function documentEvent()
{
  // Prevent the Backspace key from navigating back.
  // Esc to cancel everything
  $(document).keydown(event => {
    let keycode = event.which || window.event.keyCode,
      backspace = keycode === 8,
      esc = keycode === 27

    if (backspace) {
      if (doPrevent(event)) {
        event.preventDefault()
        return false
      }
    }
    else if (esc) {
      clearAllEditing()
    }
    resetTimerCounter()
  });

  window.addEventListener('resize', () => {
    $("#mainqueueWrapper").css("height", window.innerHeight - $("#cssmenu").height())
    $("#queuetblContainer").css({
      "height": $("#mainqueueWrapper").height() - $("#titlebar").height()
    })
  })
}

// prevent browser go back in history
function doPrevent(evt)
{
  let doPrevent = true
  let types = ["text", "password", "file", "number", "date", "time"]
  let d = $(evt.srcElement || evt.target)
  let disabled = d.prop("readonly") || d.prop("disabled")
  if (!disabled) {
    if (d[0].isContentEditable) {
      doPrevent = false
    } else if (d.is("input")) {
      let type = d.attr("type") || "text"
      if (type) {
        type = type.toLowerCase()
      }
      if (types.indexOf(type) > -1) {
        doPrevent = false
      }
    } else if (d.is("textarea")) {
      doPrevent = false
    }
  }
  return doPrevent
}

// allow the dialog title to contain HTML
function overrideJqueryUI()
{
  $.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
    _title: function(title) {
        if (!this.options.title ) {
            title.html("&#160;");
        } else {
            title.html(this.options.title);
        }
    }
  }))
}

function serverSentEvent()
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
          } else {
            Alert ("getUpdateService", response)
          }
        })
      } else {
        updateBOOK(data)
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

function scaleViewport()
{
  var siteWidth = 1280
  var scale = screen.width / siteWidth

  document.querySelector('meta[name="viewport"]')
    .setAttribute('content', 'width=' + siteWidth + ', initial-scale=' + scale)
}
