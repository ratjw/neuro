
import { MYSQLIPHP } from "./const.js"
import { setHOLIDAY } from "./constHoliday.js"
import { Ajax } from "./function.js"

export let	BOOK = [],
  STAFF = [],
  timestamp = "",
	timer = {},
	idleCounter = 0

export function updateBOOK(result)
{
	if (result.BOOK) { BOOK = result.BOOK }
	if (result.HOLIDAY) { setHOLIDAY(result.HOLIDAY) }
	if (result.STAFF) { setSTAFF(result.STAFF) }
	if (result.QTIME) { timestamp = result.QTIME }
}

// JSON.parse/JSON.stringify to deep clone
export function getSTAFF() { return JSON.parse(JSON.stringify(STAFF)) }

export function setSTAFF(staff) { STAFF = JSON.parse(JSON.stringify(staff)) }

export function resetTimer()
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
