
export const HOLIDAYTHAI = [
  "วันมาฆบูชา",
  "วันพืชมงคล",
  "วันวิสาขบูชา",
  "วันอาสาฬหบูชา",
  "วันเข้าพรรษา",
  "วันหยุดพิเศษ",
  "ไม่หยุด"
],

THISYEAR = new Date().getFullYear().toString(),
MAXYEAR = "9999",

// columns in holidaytbl
HOLIDATE = 0,
HOLINAME = 1,
ACTION = 2,

INPUT = `<input id="holidate" class="w80"></input>`,
SELECT = `<select id="holidayname" class="w150"></select>`,
LIST = `<option style="display:none"></option>`,
SAVE = `<img src="css/pic/general/save.png">`,
DELETE = `<img class="delholiday" src="css/pic/general/delete.png">`
