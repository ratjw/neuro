
import { THEATRE } from "../control/const.js"
import { addStaff } from "./addStaff.js"
import { clicktable } from "./clicktable.js"
import { clearAllEditing } from "./clearAllEditing.js"
import { editcellEvent, clearEditcell, renewEditcell } from "./edit.js"
import { timer, resetTimer, resetTimerCounter } from "./timer.js"
import { setClickMenu } from "../menu/setClickDesktopMenu.js"
import { setClickSetting } from "./setClickSetting.js"
import { setClickService } from "../service/monthpicker.js"
import { sqlStart } from "../model/sqlupdate.js"
import { sortable } from "./sort.js"
import { clearSelection } from "../get/selectRow.js"
import { fillmain } from "../view/fill.js"
import { fillConsults } from "../view/fillConsults.js"
import { START, ISOdate, thDate } from "../util/date.js"
import { BOOK, TIMESTAMP, updateBOOK } from "../util/updateBOOK.js"
import { Alert } from "../util/util.js"
import { htmlStafflist, htmlLab, htmlEquipment } from "./html.js"
import { scrolltoToday } from "../view/scrolltoThisCase.js"
import { sqlGetServiceOneMonth } from "../model/sqlservice.js"
import { setSERVICE } from "../service/setSERVICE.js"
import { reViewService } from "../service/showService.js"
import { notifyLINE } from '../menu/notifyLINE.js'
import { USER } from "../main.js"

// For staff & residents with login id / password from Get_staff_detail
export function userDesktop() {
	sqlStart().then(response => {
		typeof response === "object"
		? success(response)
		: failed(response)
	}).catch(error => {})

	document.oncontextmenu = () => false
}

// Success return from server
function success(response) {

  // call sortable before render, otherwise it renders very slowly
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
  setClickMenu()
  setClickSetting()
  setClickService()
  overrideJqueryUI()
  resetTimer()
  serverNotify()
//  serverSentEvent()
//  scaleViewport()
}

// *** to do -> offline browsing by service worker ***
function failed(response) {
  let title = "Server Error",
    error = error + "<br><br>Response from server has no data"

  Alert(title, error + "No localStorage backup")
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
    $(".marker").removeClass("marker")
  })
  
  document.getElementById("wrapper").addEventListener("mousemove", resetTimerCounter)

  document.getElementById("wrapper").addEventListener("click", event => {
    let target = event.target,
      inCell = target.closest("th") || target.closest("td") || target,
      stafflist = document.querySelector('#stafflist')

    resetTimerCounter()
    $(".marker").removeClass("marker")

    if (target.closest('#cssmenu')) { return }

    if (stafflist.style.visibility === 'visible') {
      if (!target.closest('#stafflist')) {
        stafflist.style.display = 'none'
        clearEditcell()
      }
    }

    if (inCell.cellIndex === THEATRE) {
      let maintbl = document.querySelector("#maintbl")
      if (maintbl.querySelectorAll("th")[THEATRE].offsetWidth < 10) {
        maintbl.classList.add("showColumn2")
      } else if (inCell.nodeName === "TH") {
        maintbl.classList.remove("showColumn2")
      }
    }

    clicktable(event, inCell)

    event.stopPropagation()
  })
}

function documentEvent()
{
  // Prevent the Backspace key from navigating back.
  // Esc to cancel everything
  $(document).keydown(event => {
    let keycode = event.which || window.event.keyCode,
      ctrl = event.ctrlKey,
      shift = event.shiftKey,
      home = keycode === 36,
      backspace = keycode === 8,
      esc = keycode === 27,
      y = keycode === 89,
      z = keycode === 90

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
    $("#mainwrapper").css("height", window.innerHeight - $("#cssmenu").height())
    $("#queuecontainer").css({
      "height": $("#mainwrapper").height() - $("#titlebar").height()
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
      let type = d.attr("type")
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
  let evtSource = new EventSource('./php/sse.php')

  evtSource.onopen = function() {
    console.log("Connection to server opened.")
		console.log(evtSource.readyState)
		console.log(evtSource.url)
  }

  evtSource.onmessage = function(e) {
    let data = JSON.parse(e.data)
    if (data.QTIME > TIMESTAMP) {
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

function serverNotify()
{
  let neuro = /localhost.neuro/.test(location.href)
  let hostip = sessionStorage.getItem("hostip") === "10.6.22.116"
  let getHour = new Date().getHours() === 18
  if (neuro && hostip && getHour) {
    clearTimeout(timer)
    notifyLINE()
  }
}
