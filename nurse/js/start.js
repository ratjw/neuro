
import { MYSQLIPHP, OPDATE, OPROOM, STAFFNAME, EQUIPSHEET } from "./const.js"
import { setHOLIDAY } from "./constHoliday.js"
import { fillEquipTable } from "./fillEquipTable.js"
import { fillupstart } from "./fill.js"
import { fillHoliday } from "./fillHoliday.js"
import { fillAnnouncement } from "./fillAnnouncement.js"
import {
  Ajax, sameDateRoomBookQN, getTableRowByQN, getTableRowsByDate, showFind
} from "./function.js"

export let BOOK = []

let	timestamp = "",
	timer = {},
	idleCounter = 0

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

    $("#tblcontainer").on("click", function (event) {
      event.stopPropagation()
      var target = event.target
      if (target.nodeName !== "TD") { return }
      var row = target.closest('tr')
      var opdate = row.dataset.opdate
      var oproom = row.dataset.oproom
      var qn = row.dataset.qn

      if (target.nodeName === "TD") {
        fillForRoom(opdate, oproom, qn)
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

function fillForRoom(opdate, oproom, qn)
{
	var	book = BOOK
	var	sameRoomQN = sameDateRoomBookQN(book, opdate, oproom)
	var	slen = sameRoomQN.length
	var	row = {}
	var q = 0
	var	blank = {
			casenum: "",
			diagnosis: "",
			equipment: "",
			hn: "",
			opdate: opdate,
			oproom: oproom,
			optime: "",
			patient: "",
			staffname: "",
			treatment: ""
		}
	var	showCase = function() {
			if (qn) {
				q = sameRoomQN.indexOf(qn)
			} else {
				qn = sameRoomQN[q]
			}
			if (qn) {
				row = getTableRowByQN("tbl", qn)
			} else {
				row = getTableRowsByDate("tbl", opdate)[0]
			}
			fillEquipTable(book, $(row), sameRoomQN[q], blank)
			showButtons()
			showFind($("#tblcontainer"), row)
		}

	showCase()

	function showButtons() {
		$('#dialogEquip').dialog("option", "buttons", [
			{
				text: "<< Previous Date",
				width: "140",
				class: "silver floatleft",
				click: function () {
					fillForRoom(opdate.nextdays(-1), oproom)
				}
			},
			{
				text: "< Previous Case",
				width: "140",
				class: "floatleft",
				click: function () {
					if (q > 0) {
						q = q - 1
						qn = 0
						showCase()
					}
				}
			},
			{
				text: "Next Case >",
				width: "120",
				click: function () {
					if (q < slen-1) {
						q = q + 1
						qn = 0
						showCase()
					}
				}
			},
			{
				text: "Next Date >>",
				width: "120",
				class: "silver",
				click: function () {
					fillForRoom(opdate.nextdays(+1), oproom)
				}
			}
		])
	}
}

function updateBOOK(result)
{
	if (result.BOOK) { BOOK = result.BOOK }
	if (result.HOLIDAY) { setHOLIDAY(result.HOLIDAY) }
	if (result.QTIME) { timestamp = result.QTIME }
}

function resetTimer()
{
	// timer is just an id, not the clock
	// poke server every 1000 sec.
  // clearTimeout(timer)
	timer = setInterval( updating, 10000)
	idleCounter = 0
}

function updating()
{
	var sql = "sqlReturnData=SELECT MAX(editdatetime) as timestamp from bookhistory;"

	Ajax(MYSQLIPHP, sql, updatingback);

	function updatingback(response)
	{
		// timestamp is this client last edit
		// timestamp is from server bookhistory last editdatetime
		if (typeof response === "object") {
			if (timestamp < response[0].timestamp) {
				getUpdate()
			}
		}
		// idle not more than 1000 min.
		idleCounter += 1
		if (idleCounter > 6000) {
			history.back()
		}
	}
}

// There is some changes in database from other users
function getUpdate()
{
	Ajax(MYSQLIPHP, "nosqlReturnbook=''", callbackGetUpdate);

	function callbackGetUpdate(response)
	{
		if (typeof response === "object") {
			updateBOOK(response)
		} else {
			Alert ("getUpdate", response)
		}
	}
}

function htmlEquipment()
{
  let equip = "",
    type = "",
    width = "",
    name = "",
    label = "",
    id = ""

  EQUIPSHEET.forEach(item => {
    type = item[0]
    width = item[1]
    name = item[2]
    label = item[3]
    id = item[4]

    if (type === "divbegin") {
      equip += `<div title="${name}">`
    } else if (type === "divend") {
      equip += `</div>`
    } else if (type === "span") {
      equip += `<span class="w${width}" id="${id}">${label}</span>`
    } else if (type === "spanInSpan") {
      equip += `<span class="w${width}">${label}<span id="${id}"></span></span>`
    } else if (type === "br") {
      equip += `<br>`
    } else if (type === "radio" || type === "checkbox") {
      equip += `<span class="w${width}">
                 <label>
                   <input type="${type}" name="${name}" value="${label}">
                   <span>${label}</span></label>
                </span>`
    } else if (type === "text") {
      equip += `<input type="${type}" class="w${width}" placeholder="${label}">`
    } else if (type === "textarea") {
      equip += `<textarea class="w${width} placeholder="${label}"></textarea>`
    }
  })

  document.getElementById("dialogEquip").innerHTML = equip
}
