
import { BOOK } from "./updateBOOK.js"
import { fillEquipTable } from "./fillEquipTable.js"
import {
  sameDateRoomBookQN, getTableRowByQN, getTableRowsByDate, showFind
} from "./function.js"

export function fillEquipOproom(opdate, oproom, qn)
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
					fillEquipOproom(opdate.nextdays(-1), oproom)
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
