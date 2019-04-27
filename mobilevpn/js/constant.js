// global variables
var gv = {
  BOOK: [],
  CONSULT: [],
  SERVICE: [],
  SERVE: [],
  STAFF: [],
  ONCALL: [],
  HOLIDAY: [],
  user: "",
  timestamp: "",
  uploadWindow: null,
  timer: {},
  idleCounter: 0,
  isMobile: false,
  isPACS: true,
  editableSV: true
},

//Actually these are constants but older browsers do not support const
GETUSERID  = "php/getuserid.php",
GETIPD     = "php/getipd.php",
GETNAMEHN  = "php/getnamehn.php",
MYSQLIPHP  = "php/mysqli.php",
SEARCH     = "php/search.php",
LINEBOT    = "line/lineBot.php",
LINENOTIFY = "line/lineNotify.php",

//tbl, queuetbl
OPDATE    = 0,
THEATRE   = 1,
OPROOM    = 2,
OPTIME    = 3,
CASENUM   = 4,
STAFFNAME = 5,
HN        = 6,
PATIENT   = 7,
DIAGNOSIS = 8,
TREATMENT = 9,
EQUIPMENT = 10,
CONTACT   = 11,
QN        = 12,

//servicetbl
CASENUMSV   = 0,
HNSV        = 1,
NAMESV      = 2,
DIAGNOSISSV = 3,
TREATMENTSV = 4,
ADMISSIONSV = 5,
FINALSV     = 6,
PROFILESV   = 7,
ADMITSV     = 8,
OPDATESV    = 9,
DISCHARGESV = 10,
QNSV        = 11,

// NAMEOFDAYABBR for row color
// NAMEOFDAYFULL for 1st column color
NAMEOFDAYABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
NAMEOFDAYFULL = ["Sunday", "Monday", "Tuesday", "Wednesday",
                 "Thursday", "Friday", "Saturday"],
THAIMONTH     = ["มค.", "กพ.", "มีค.", "เมย.", "พค.", "มิย.", "กค.", "สค.", "กย.", "ตค.", "พย.", "ธค."],
LARGESTDATE   = "9999-12-31",

HOLIDAYENGTHAI = {
  "Magha": "วันมาฆบูชา",
  "Maghasub": "ชดเชยวันมาฆบูชา",
  "Ploughing": "วันพืชมงคล",
  "Ploughingsub": "ชดเชยวันพืชมงคล",
  "Vesak": "วันวิสาขบูชา",
  "Vesaksub": "ชดเชยวันวิสาขบูชา",
  "Asalha": "วันอาสาฬหบูชา",
  "Asalhasub": "ชดเชยวันอาสาฬหบูชา",
  "Vassa": "วันเข้าพรรษา",
  "Vassasub": "ชดเชยวันเข้าพรรษา"
}
