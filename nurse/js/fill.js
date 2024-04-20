
import { NAMEOFDAYABBR, NAMEOFDAYFULL, LARGESTDATE, 
 OPDATE, OPROOM, OPTIME, CASENUM, STAFFNAME, HN, PATIENT,
 DIAGNOSIS, TREATMENT, EQUIPMENT, CONTACT
} from "./const.js"
import { BOOK } from "./start.js"
import { showEquip, findStartRowInBOOK, putNameAge } from "./function.js"
import { fillNewrowData, blankRowData } from "./fillNewrowData.js"

export function fillupstart()
{	//Display all cases in each day of 5 weeks
	// Find the 1st of last month
	// fill until 2 year from now
	var	table = document.getElementById("tbl"),
		start = new Date(new Date().getFullYear(), new Date().getMonth()-1, 1).ISOdate(),
		until = new Date(new Date().setDate(new Date().getDate() + 100)).ISOdate(),
		todate = new Date().ISOdate(),
		todateth = todate.thDate(),
		book = BOOK

	if (book.length === 0) { book.push({"opdate" : todate}) }
	
	fillall(book, table, start, until)

	//scroll to today
	var thishead = $("#tbl tr:contains(" + todateth + ")").eq(0)
	$('#tblcontainer').animate({
		scrollTop: thishead.offset().top
	}, 300);
}

function fillall(book, table, start, until)
{
	var tbody = table.getElementsByTagName("tbody")[0]
	var rows = table.rows
	var head = table.rows[0]
	var date = start
	var madedate
	var q = findStartRowInBOOK(book, start)
	var k = findStartRowInBOOK(book, LARGESTDATE)

	// get rid of cases with unspecified opdate
	// Consult cases and new start have no LARGESTDATE, so k = -1
	if (k >= 0) {
		book = book.slice(0, k)
	}

	//i for rows in table (with head as the first row)
	var i = 0
	var blen = book.length
	for (q; q < blen; q++)
	{	
		//step over each day that is not in QBOOK
		while (date < book[q].opdate)
		{
			if (date !== madedate)
			{
				//make a blank row for each day which is not in book
				makenextrow(table, date)	//insertRow
				i++
				
				madedate = date
			}
			date = date.nextdays(1)
			if (date > until) {
				return
			}

			//make table head row before every Monday
			if ((new Date(date).getDay())%7 === 1)
			{
				var clone = head.cloneNode(true)
				tbody.appendChild(clone)
 				i++
			}
		}
		makenextrow(table, date)
		i++
		fillNewrowData(rows[i], book[q])
		madedate = date
	}

	while (date < until)
	{
		date = date.nextdays(1)

		//make table head row before every Monday
		if (((new Date(date)).getDay())%7 === 1)
		{
			var clone = head.cloneNode(true)
			tbody.appendChild(clone)
		}
		//make a blank row
		makenextrow(table, date)	//insertRow
	}
}

//create and decorate new row
function makenextrow(table, date)
{
	var tbody = table.getElementsByTagName("tbody")[0]
	var tblcells = document.getElementById("tblcells")
	var row = tblcells.rows[0].cloneNode(true)
	var rowi = tbody.appendChild(row)

	rowi.cells[OPDATE].innerHTML = date.thDate()
	rowi.cells[OPDATE].className = dayName(NAMEOFDAYABBR, date)
//	rowi.cells[DIAGNOSIS].style.backgroundImage = holiday(date)
	rowi.className = dayName(NAMEOFDAYFULL, date)
  blankRowData(rowi, date)
}

function dayName(DAYNAME, date)
{
	return DAYNAME[(new Date(date)).getDay()]
}
