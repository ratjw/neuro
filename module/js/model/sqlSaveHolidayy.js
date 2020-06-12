
import { postData, MYSQLIPHP } from "./fetch.js"
import { DIAGNOSIS } from "../control/const.js"
import { th_2_ISO } from "../util/date.js"
import { getTableRowsByDate } from "../util/rowsgetting.js"
import { setHOLIDAY } from "../util/updateBOOK.js"
import { findHoliday } from "../setting/findHoliday.js"
import { Alert } from "../util/util.js"

export function saveHoliday()
{
  let  vdateth = document.getElementById("holidateth").value,
    vdate = th_2_ISO(vdateth),
    vname = document.getElementById("holidayname").value,
    rows = getTableRowsByDate('maintbl', vdate)

  if (!vdate || !vname) { return }

  sqlSaveHoliday(vdate, vname).then(response => {
    if (typeof response === "object") {
      setHOLIDAY(response)
      holidayInputBack($("#holidateth").closest("tr"))
      fillHoliday($("#holidaytbl"))
      $("#buttonHoliday").hide()
      rows.forEach(row => {
        row.cells[DIAGNOSIS].classList.add("holiday")
        row.cells[DIAGNOSIS].dataset.holiday = findHoliday(vdate)
      })
    } else {
      Alert ("saveHoliday", response)
    }
  })
}

// Have to move $inputRow back and forth because datepicker is sticked to #holidateth
function holidayInputBack($inputRow)
{
  $("#holidateth").val("")
  $("#holidayname").val("")
  $('#holidayInput tbody').append($inputRow)
}

export function updateHoliday(that)
{
  let  $row = $(that).closest("tr")

  if ($row.find("input").length) {
    holidayInputBack($row)
  } else {
    holidayDelete($row)
  }
}

export function deleteHoliday(that)
{
  let  $row = $(that).closest("tr")

  if ($row.find("input").length) {
    holidayInputBack($row)
  } else {
    holidayDelete($row)
  }
}

function holidayDelete($row)
{
  let $cell = $row.find("td"),
    vdateth = $cell[0].innerHTML,
    vdate = th_2_ISO(vdateth),
    vname = $cell[1].innerHTML,
    rows = getTableRowsByDate('maintbl', vdate)

  sqlDeleteHoliday(vdate, vname).then(response => {
    if (typeof response === "object") {
      setHOLIDAY(response)
      $row.remove()
      rows.forEach(row => {
        row.cells[DIAGNOSIS].classList.remove("holiday")
        delete row.cells[DIAGNOSIS].dataset.holiday
      })
    } else {
      Alert ("deleteHoliday", response)
    }
  })
}

function sqlSaveHoliday(vdate, vname)
{
  let sql=`sqlReturnData=INSERT INTO holiday (holidate,dayname)
              VALUES('${vdate}','${vname}');
            SELECT * FROM holiday ORDER BY holidate;`

  return postData(MYSQLIPHP, sql)
}

function sqlDeleteHoliday(vdate, holidayEng)
{
  let sql=`sqlReturnData=DELETE FROM holiday
              WHERE holidate='${vdate}' AND dayname='${holidayEng}';
            SELECT * FROM holiday ORDER BY holidate;`

  return postData(MYSQLIPHP, sql)
}
