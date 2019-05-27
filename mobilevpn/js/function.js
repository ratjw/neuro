// fixed header of tables, not scroll out of sight
;(function($)
{
  $.fn.fixMe = function($container) {
    var $this = $(this),
      $t_fixed,
      pad = $container.css("paddingLeft")
    init();
    $container.off("scroll").on("scroll", scrollFixed);

    function init() {
      $t_fixed = $this.clone();
      $t_fixed.removeAttr("id")
      $t_fixed.find("tbody").remove().end()
          .addClass("fixed").insertBefore($this);
      $container.scrollTop(0)
      resizeFixed($t_fixed, $this);
      reposition($t_fixed, "left top", "left+" + pad + " top", $container)
      $t_fixed.hide()
    }

    function scrollFixed() {
      var offset = $(this).scrollTop(),
      tableTop = $this[0].offsetTop,
      tableBottom = tableTop + $this.height() - $this.find("thead").height();
      if(offset < tableTop || offset > tableBottom) {
        $t_fixed.hide();
      }
      else if (offset >= tableTop && offset <= tableBottom && $t_fixed.is(":hidden")) {
        $t_fixed.show();
      }
    }
  };
})(jQuery);

function resizeFixed($fix, $this)
{
  $fix.find("th").each(function(index) {
    var wide = $this.find("th").eq(index).width()

    $(this).css("width", wide + "px")
  });
}

function winResizeFix($this, $container)
{
  var $fix = $container.find(".fixed"),
    hide = $fix.css("display") === "none",
    pad = $container.css("paddingLeft")

  resizeFixed($fix, $this)
  reposition($fix, "left top", "left+" + pad + " top", $container)
  hide && $fix.hide()
}

String.prototype.thDate = function () 
{  //MySQL date (2014-05-11) to Thai date (11 พค. 2557) 
  var date = this.split("-")
  if ((date.length === 1) || (date[0] < "1900")) {
    return false
  }

  return [
    date[2],
    THAIMONTH[Number(date[1]) - 1],
    Number(date[0]) + 543
  ].join(" ")
} 

String.prototype.numDate = function () 
{  //Thai date (11 พค. 2557) to MySQL date (2014-05-11)
  var date = this.split(" ")
  if ((date.length === 1) || parseInt(date[1])) {
    return ""
  }
  var mm = THAIMONTH.indexOf(date[1]) + 1

    return [
    Number(date[2]) - 543,
    (mm < 10 ? '0' : '') + mm,
    date[0]
  ].join("-")
} 
 
Date.prototype.ISOdate = function () 
{  // Javascript Date Object to MySQL date (2014-05-11)
    var yyyy = this.getFullYear();
    var mm = this.getMonth()+1;
  mm = (mm < 10)? "0"+mm : ""+mm;
    var dd = this.getDate();
  dd = (dd < 10)? "0"+dd : ""+dd;
    return yyyy + "-" + mm + "-" + dd;
} 

String.prototype.nextdays = function (days)
{  // ISOdate to be added or substract by days
  var morrow = new Date(this);
  morrow.setDate(morrow.getDate()+days);
  return morrow.ISOdate();
}

String.prototype.getAge = function (toDate)
{  //Calculate age at (toDate) (iso format) from birth date
  //with LARGESTDATE as today
  if (!toDate || this <= '1900-01-01') {
    return this
  }

  var birth = new Date(this);
  var today = (toDate === LARGESTDATE) ? new Date() : new Date(toDate);

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

//get 1st date of last month
function getStart()
{
  var start = new Date()

  return new Date(start.getFullYear(), start.getMonth()-1, 1).ISOdate()
}

//change Thai date from table to ISO date
function getOpdate(date)
{
  if ((date === undefined) || (parseInt(date) === NaN)) {
    return ""
  }
  if (date === "") {
    return LARGESTDATE
  }
  return date.numDate()
}

//change date in book to show on table
function putThdate(date)
{
  if (!date) { return date }
  if (date === LARGESTDATE) {
    return ""
  } else {
    return date.thDate()
  }
}

function putAgeOpdate(dob, date)
{
  if (!date || !dob) {
    return ""
  } else {
    return dob.getAge(date)
  }
}

function Ajax(url, params, callback)
{
  var http = new XMLHttpRequest();
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function() 
  {
    if (http.readyState === 4 && http.status === 200) {
      try {
        callback(JSON.parse(http.responseText));
      } catch (e) {
        callback(http.responseText);
      }
    }
    if (/404|500|503|504/.test(http.status)) {
      callback(http.statusText);
    }
  }
  http.send(params);
}

function contentEncode()
{
  if (/\W/.test(content)) {
    content = URIcomponent(content)
  }
}

// take care of white space, double qoute, single qoute, and back slash
// necessary when post in http, not when export to excel
function URIcomponent(content)
{
  if (/\W/.test(content)) {
    content = content.replace(/\s+$/,'')
    content = content.replace(/\"/g, "&#34;")  // double quotes
    content = content.replace(/\'/g, "&#39;")  // single quotes
//    content = content.replace(/%/g, "&#37;")  // per cent, mysql: like "%...%"
    content = content.replace(/\\/g, "\\\\")
    content = encodeURIComponent(content)
  }
  return content
}

function menustyle($me, $target)
{
  if ($me.position().top > $target.position().top) {
    var shadow = '10px 20px 30px slategray'
  } else {
    var shadow = '10px -20px 30px slategray'
  }

  $me.css({
    boxShadow: shadow
  })
}

function getMaxQN(book)
{
  var qn = Math.max.apply(Math, $.map(book, function(row, i) {
      return row.qn
    }))
  return String(qn)
}

function getBOOKrowByQN(book, qn)
{  
  var bookq
  $.each(book, function() {
    bookq = this
    return (this.qn !== qn);
  })
  if (bookq.qn !== qn) {
    return null
  }
  return bookq
}

function getTableRowByQN(tableID, qn)
{
  return $("#" + tableID + " tr:has(td)").filter(function() {
    return this.cells[QN].innerHTML === qn
  })[0]
}

function getWaitingBOOKrowByHN(hn)
{  
  var  todate = new Date().ISOdate()

  return $.grep(gv.BOOK, function(bookq) {
    return bookq.opdate > todate && bookq.hn === hn
  })
}

function getWaitingTableRowByHN(hn)
{
  var  todate = new Date().ISOdate()

  return $("#tbl tr:has(td)").filter(function() {
    return this.cells[OPDATE].innerHTML.numDate() > todate
      && this.cells[HN].innerHTML === hn
  })
}

// main table (#tbl) only
function getTableRowsByDate(opdateth)
{
  if (!opdateth) { return [] }
  return $("#tbl tr").filter(function() {
    return this.cells[OPDATE].innerHTML === opdateth;
  })
}

function getBOOKrowsByDate(book, opdate)
{
  return book.filter(function(row) {
    return (row.opdate === opdate);
  })
}

function findStartRowInBOOK(book, opdate)
{
  var q = 0
  while ((q < book.length) && (book[q].opdate < opdate)) {
    q++
  }
  return (q < book.length)? q : -1
}

function findLastDateInBOOK(book)
{
  var q = 0
  while ((q < book.length) && (book[q].opdate < LARGESTDATE)) {
    q++
  }
  return book[q-1].opdate
}

// main table (#tbl) only
function sameDateRoomTableQN(opdateth, room, theatre)
{
  var sameRoom = $('#tbl tr').filter(function() {
    return this.cells[OPDATE].innerHTML === opdateth
      && this.cells[THEATRE].innerHTML === theatre
      && this.cells[OPROOM].innerHTML === room
  })
  $.each(sameRoom, function(i) {
    sameRoom[i] = this.cells[QN].innerHTML
  })
  return $.makeArray(sameRoom).filter(function(e) { return e })
}

function sameDateRoomBookQN(book, opdate, room)
{
  if (!room) { return [] }

  var sameRoom = book.filter(function(row) {
    return row.opdate === opdate && Number(row.oproom) === Number(room);
  })
  $.each(sameRoom, function(i) {
    sameRoom[i] = this.qn
  })
  return sameRoom
}

function updateCasenum(allCases)
{
	var sql = ""
	for (var i=0; i<allCases.length; i++) {
		sql += sqlCaseNum(i + 1, allCases[i])
	}
	return sql
}

function sqlCaseNum(casenum, qn)
{	
	return "UPDATE book SET "
		+  "casenum=" + casenum
		+  ",editor='" + gv.user
		+  "' WHERE qn="+ qn + ";";
}

function sqlMover(waitnum, opdate, oproom, casenum, qn)
{
	return "UPDATE book SET "
		+  "waitnum=" + waitnum
		+  ", opdate='" + opdate
		+  "',oproom=" + oproom
		+  ",casenum=" + casenum
		+  ",editor='" + gv.user
		+  "' WHERE qn="+ qn + ";";
}

// for main table (#tbl) only
function createThisdateTableRow(opdate, opdateth)
{
  if (opdate === LARGESTDATE) { return null }
  var rows = getTableRowsByDate(opdate.nextdays(-1).thDate()),
    $row = $(rows[rows.length-1]),
    $thisrow = $row && $row.clone().insertAfter($row)

  $thisrow && $thisrow.find("td").eq(OPDATE).html(opdateth)

  return $thisrow
}

function isSplited()
{  
  return $("#queuewrapper").css("display") === "block"
}

function isStaffname(staffname)
{  
  return $('#titlename').html() === staffname
}

function isConsults()
{  
  return $('#titlename').html() === "Consults"
}

function ConsultsTbl(tableID)
{  
  var queuetbl = tableID === "queuetbl"
  var consult = $("#titlename").html() === "Consults"

  return queuetbl && consult
}

function returnFalse()
{
  return false
}

// waitnum is for ordering where there is no oproom, casenum
function calcWaitnum(thisOpdate, $prevrow, $nextrow)
{
  var prevWaitNum = Number($prevrow.prop("title")),
    nextWaitNum = Number($nextrow.prop("title")),

    $prevRowCell = $prevrow.children("td"),
    $nextRowCell = $nextrow.children("td"),
    prevOpdate = $prevRowCell.eq(OPDATE).html(),
    nextOpdate = $nextRowCell.eq(OPDATE).html(),
    tableID = $prevrow.closest("table").attr("id")
    defaultWaitnum = (ConsultsTbl(tableID))? -1 : 1
  //Consults cases have negative waitnum

  if (prevOpdate !== thisOpdate && thisOpdate !== nextOpdate) {
    return defaultWaitnum
  }
  else if (prevOpdate === thisOpdate && thisOpdate !== nextOpdate) {
    return prevWaitNum + defaultWaitnum
  }
  else if (prevOpdate !== thisOpdate && thisOpdate === nextOpdate) {
    return nextWaitNum? (nextWaitNum / 2) : defaultWaitnum
  }
  else if (prevOpdate === thisOpdate && thisOpdate === nextOpdate) {
    return nextWaitNum? ((prevWaitNum + nextWaitNum) / 2) : (prevWaitNum + defaultWaitnum)
  }  // nextWaitNum is undefined in case of new blank row
}

function decimalToTime(dec)
{
  if (dec === 0) { return "" }

  var  integer = Math.floor(dec),
    decimal = dec - integer

  return [
    (integer < 10) ? "0" + integer : "" + integer,
    decimal ? String(decimal * 60) : "00"
  ].join(".")
}

function strtoTime(value)
{
  var  time = value.split("."),
    hour = time[0],
    min = time[1] || "0",
    val = Number(value)

  if (isNaN(val) || val < 0 || val > 24) {
    Alert("เวลาผ่าตัด", "<br>รูปแบบเวลา ไม่ถูกต้อง<br><br>ใช้<br><br>ตั้งแต่ 00.00 - 08.30 - 09.00 ถึง 24.00")
    return false
  }
  else if (val === 0) {
    return ""
  }
  else {
    min = min.substr(0, 2)
    return [
      (Number(hour) < 10) ? "0" + hour : "" + hour,
      (Number(min) < 10) ? min + "0" : "" + min
    ].join(".")
  }
}

function getNextDayOfWeek(date, dayOfWeek)
{
  var resultDate = new Date(date.getTime());

  resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);

  return resultDate;
}

function inPicArea(evt, pointing) {
  var $pointing = $(pointing),
    x = evt.pageX,
    y = evt.pageY,
    square = picArea(pointing),
    top = square.top,
    right = square.right,
    bottom = square.bottom,
    left = square.left,
    inX = (left < x) && (x < right),
    inY = (top < y) && (y < bottom)

  return inX && inY
}

function picArea(pointing) {
  var $pointing = $(pointing),
    right = $pointing.offset().left + $pointing.width(),
    bottom = $pointing.offset().top + $pointing.height(),
    left = right - 25,
    top = bottom - 25

  return {
    top: top,
    bottom: bottom,
    left: left,
    right: right
  }
}

function dataforEachCell(cells, data)
{
  data.forEach(function(item, i) {
    cells[i].innerHTML = item
  })
}

function rowDecoration(row, date)
{
  var  cells = row.cells

  row.className = dayName(NAMEOFDAYFULL, date) || "nodate"
  cells[OPDATE].innerHTML = putThdate(date)
  cells[OPDATE].className = dayName(NAMEOFDAYABBR, date)
  cells[DIAGNOSIS].style.backgroundImage = holiday(date)
}

function showEquip(equipString)
{
  if (equipString) {
    return makeEquip(JSON.parse(equipString))
  }
  return ""
}

function makeEquip(equipJSON)
{
  var equipPics = [],
    img = '',
    EQUIPICONS = {
      Fluoroscope: "Fluoroscope",
      "Navigator frameless": "Navigator",
      "Navigator with frame": "Navigator",
      "O-arm": "Oarm",
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
      CN9: "Monitor",
      CN10: "Monitor",
      CN11: "Monitor",
      CN12: "Monitor",
      SSEP: "Monitor",
      EMG: "Monitor",
      MEP: "Monitor"
    },
    EQUIPICONSHOWN = [
      "Fluoroscope",
      "Navigator",
      "Microscope",
      "CUSA",
      "Endoscope",
      "Monitor"
    ]

  $.each(equipJSON, function(key, value) {
    if (typeof value === 'string') {
      if (value in EQUIPICONS) {
        equipPics.push(EQUIPICONS[value])
      } 
    } else {
      $.each(value, function() {
        if ($.inArray(this, EQUIPICONS) !== -1) {
          equipPics.push(EQUIPICONS[this])
        } 
      })
    }
  })
  // remove duplicated pics
  equipPics = equipPics.filter(function(pic, pos) {
    return equipPics.indexOf(pic) === pos;
  })

  // display 6 pics: pale the not-checked ones
  $.each(EQUIPICONSHOWN, function(i, item) {
    if ($.inArray(item, equipPics) !== -1) {
      img += '<img src="css/pic/equip/' + item + '.jpg"> '
      equipPics = equipPics.filter(function(e) { e !== item })
    } else {
      img += '<img class="imgpale" src="css/pic/equip/' + item + '.jpg"> '
    }
  })

  return img + equipImg(equipPics)
}

function equipImg(equipPics)
{
  var img = ""

  $.each(equipPics, function() {
    img += '<img src="css/pic/equip/' + this + '.jpg"> '
  })

  return img
}

function findPrevcell(editable, pointing) 
{
  var $prevcell = $(pointing)
  var column = $prevcell.index()

  if ((column = editable[($.inArray(column, editable) - 1)]))
  {
    $prevcell = $prevcell.parent().children("td").eq(column)
  }
  else
  {
    do {
      if ($prevcell.parent().index() > 1)
      {  //go to prev row last editable
        $prevcell = $prevcell.parent().prev("tr")
                    .children().eq(editable[editable.length-1])
      }
      else
      {  //#tbl tr:1 td:1
        return false
      }
    }
    while (($prevcell.get(0).nodeName === "TH")
      || (!$prevcell.is(':visible')))
        //invisible due to colspan in servicetbl
  }

  return $prevcell.get(0)
}

function findNextcell(editable, pointing) 
{
  var $nextcell = $(pointing)
  var column = $nextcell.index()

  if ((column = editable[($.inArray(column, editable) + 1)]))
  {
    $nextcell = $nextcell.parent().children("td").eq(column)
  }
  else
  {
    do {
      $nextcell = $nextcell.parent().next("tr")
                    .children().eq(editable[0])
      if (!($nextcell.length)) {
        return false
      }
    }
    //invisible due to colspan in servicetbl
    while ((!$nextcell.is(':visible'))
      || ($nextcell.get(0).nodeName === "TH"))  //TH row
  }

  return $nextcell.get(0)
}

function findNextRow(editable, pointing) 
{
  var $nextcell = $(pointing)

  //go to next row first editable
  do {
    $nextcell = $nextcell.parent().next("tr").children().eq(editable[0])
    if (!($nextcell.length)) {
      return false  
    }
  }
  while ((!$nextcell.is(':visible'))  //invisible due to colspan
    || ($nextcell.get(0).nodeName === "TH"))  //TH row

  return $nextcell.get(0)
}
