
import { THAIMONTH, LARGESTDATE, OPDATE } from "./const.js"

String.prototype.thDate = function () 
{	//MySQL date (2014-05-11) to Thai date (11 พค. 2557) 
	var date = this.split("-")
	if ((date.length === 1) || (date[0] < "1900")) {
		return false
	}
	var yyyy = Number(date[0]) + 543;
	var mm = THAIMONTH[Number(date[1]) - 1];
	return (date[2] +' '+ mm + yyyy);
} 

String.prototype.numDate = function () 
{	//Thai date (11 พค. 2557) to MySQL date (2014-05-11)
	var date = this.split(" ")
	if ((date.length === 1) || parseInt(date[1])) {
		return ""
	}
	var thmonth = date[1].slice(0, -4);
	var mm = THAIMONTH.indexOf(thmonth) + 1
	mm = (mm < 10? '0' : '') + mm
    var yyyy = Number(date[1].slice(-4)) - 543;
    return yyyy +"-"+ mm +"-"+ date[0];
} 

// Date Object or ISOdate to be added or substracted by days
// Result in ISOdate (2014-05-11)
export function nextdates(date, days) {
  if (!date) { return date }

  let next = new Date(date);

  next.setDate(next.getDate() + days);

  return obj_2_ISO(next);
}

export function putNameAge(bookq)
{
	return bookq.patient
		+ (bookq.dob? ("<br>อายุ " + putAgeOpdate(bookq.dob, bookq.opdate)) : "")
}
 
Date.prototype.ISOdate = function () 
{	// Javascript Date Object to MySQL date (2014-05-11)
    var yyyy = this.getFullYear();
    var mm = this.getMonth()+1;
	mm = (mm < 10)? "0"+mm : ""+mm;
    var dd = this.getDate();
	dd = (dd < 10)? "0"+dd : ""+dd;
    return yyyy + "-" + mm + "-" + dd;
} 

String.prototype.nextdays = function (days)
{	// ISOdate to be added or substract by days
	var morrow = new Date(this);
	morrow.setDate(morrow.getDate()+days);
	return morrow.ISOdate();
}

export function findStartRowInBOOK(book, opdate)
{
	var q = 0
	while ((q < book.length) && (book[q].opdate < opdate)) {
		q++
	}
	return (q < book.length)? q : -1
}

String.prototype.getAge = function (toDate)
{	//Calculate age at (toDate) (iso format) from birth date
	//with LARGESTDATE as today
	if (!toDate || this <= '1900-01-01') {
		return this
	}

	var birth = new Date(this);
	if (toDate === LARGESTDATE) {
		var today = new Date()
	} else {
		var today = new Date(toDate);
	}

	if (today.getTime() - birth.getTime() < 0)
		return "wrong date"

	var ayear = today.getFullYear();
	var amonth = today.getMonth();
	var adate = today.getDate();
	var byear = birth.getFullYear();
	var bmonth = birth.getMonth();
	var bdate = birth.getDate();

	var days = adate - bdate;
	var months = amonth - bmonth;
	var years = ayear - byear;
	if (days < 0)
	{
		months -= 1
		days = new Date(byear, bmonth+1, 0).getDate() + days;
	}
	if (months < 0)
	{
		years -= 1
		months += 12
	}

	var ageyears = years? years + Math.floor(months / 6)  + " ปี " : "";
	var agemonths = months? months + Math.floor(days / 15)  + " ด." : "";
	var agedays = days? days + " ว." : "";

	return years? ageyears : months? agemonths : agedays;
}

export function putThdate(date)	//change date in book to show on table
{
	if (!date) { return date }
	if (date === LARGESTDATE) {
		return ""
	} else {
		return date.thDate()
	}
}

export function putAgeOpdate(dob, date)
{
	if (!date || !dob) {
		return ""
	} else {
		return dob.getAge(date)
	}
}

export function Ajax(url, params, callback)
{
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() 
	{
		if (http.readyState === 4 && http.status === 200) {
			callback(JSON.parse(http.responseText));
		}
		if (/404|500|503|504/.test(http.status)) {
			callback(http.statusText);
		}
	}
	http.send(params);
}

export function sameDateRoomBookQN(book, opdate, room)
{
	var sameRoom = book.filter(function(row) {
		return row.opdate === opdate && Number(row.oproom) === Number(room);
	})
	$.each(sameRoom, function(i) {
		sameRoom[i] = this.qn
	})
	return sameRoom
}

// if the row is above the screen, then scrollTop to it
// if too low, then scrollTop to it minus (scroll down) container height
export function showFind($container, row)
{
  var scrolledTop = $container.scrollTop(),
    offset = row.offsetTop,
    rowHeight = row && row.offsetHeight,
    height = $container[0].clientHeight - rowHeight,
    bottom = scrolledTop + height

  $(".marker").removeClass("marker")
  if (row) {
    $(row).addClass("marker")
    if (offset < scrolledTop) {
      $container.animate({
        scrollTop: offset
      }, 500);
    }
    else if (offset > bottom) {
      $container.animate({
        scrollTop: offset - height
      }, 500);
    }
    return true
  }
}

export function getBOOKrowByQN(book, qn) {  
  return book.find(q => Number(q.qn) === Number(qn) )
}

export function getTableRowByQN(tableID, qn)
{
  return Array.from(document.querySelectorAll(`#${tableID} tr`))
        .find(row => Number(row.dataset.qn) === Number(qn))
}

// main table (#maintbl) only
export function getTableRowsByDate(tableID, opdate)
{
  return Array.from(document.querySelectorAll(`#${tableID} tr`))
            .filter(e => e.dataset.opdate === opdate)
}

export function Alert(title, message)
{
	var $dialogAlert = $("#dialogAlert")
	$dialogAlert.css({
		"fontSize":" 14px",
		"textAlign" : "center"
	})
	$dialogAlert.html(message)
	$dialogAlert.dialog({
		title: title,
		closeOnEscape: true,
		modal: true,
		minWidth: 400,
		height: 230
	}).fadeIn();
}

export function showEquip(equipString)
{
	if (equipString) {
		return makeEquip(JSON.parse(equipString))
	} else {
		return ""
	}
}

function makeEquip(equipJSON)
{
	var equip = "",
		equipIcons = {
			Fluoroscope: "Fluoroscope",
			"Navigator_frameless": "Navigator",
			"Navigator_frame-based": "Navigator",
			Oarm: "Oarm",
			Robotics: "Robotics",
			Microscope: "Microscope",
			ICG: "Microscope",
			Endoscope: "Endoscope",
			Excell: "CUSA",
			Soring: "CUSA",
			Sonar: "CUSA",
			ultrasound: "Ultrasound",
			Doppler: "Ultrasound",
			Duplex: "Ultrasound",
			CN5: "Monitor",
			CN6: "Monitor",
			CN7: "Monitor",
			CN8: "Monitor",
			SSEP: "Monitor",
			EMG: "Monitor",
			MEP: "Monitor"
		},
		equipPics = []

	$.each(equipJSON, function(key, value) {
		if (equip) { equip += ", " }
		if (value === "checked") {
			equip += key
			if (key in equipIcons) {
				equipPics.push(equipIcons[key])
			}
		} else {
			equip += key + ":" + value
		}
	})
	// remove duplicated pics
	equipPics = equipPics.filter(function(pic, pos) {
		return equipPics.indexOf(pic) === pos;
	})

	return equip + "<br>" + equipImg(equipPics)
}

function equipImg(equipPics)
{
	var img = ""

	$.each(equipPics, function() {
		img += '<img src="css/pic/equip/' + this + '.jpg"> '
	})

	return img
}

export const nextAll = element => {
  const nextElements = []
  let nextElement = element

  while(nextElement.nextElementSibling) {
    nextElement = nextElement.nextElementSibling
    nextElements.push(nextElement)
  }

  return nextElements
}
