//Actually these are constants but older browsers do not support const
var GETIPD		= "php/getipd.php";
var GETNAMEHN	= "php/getnamehn.php";
var MYSQLIPHP	= "php/mysqli.php";

//tbl, queuetbl
OPDATE		= 0,
THEATRE		= 1,
OPROOM		= 2,
OPTIME		= 3,
CASENUM		= 4,
STAFFNAME	= 5,
HN			= 6,
PATIENT		= 7,
DIAGNOSIS	= 8,
TREATMENT	= 9,
EQUIPMENT	= 10,
CONTACT		= 11,
QN			= 12,

// NAMEOFDAYABBR for row color
// NAMEOFDAYFULL for 1st column color
NAMEOFDAYABBR	= ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
NAMEOFDAYFULL	= ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
THAIMONTH		= ["มค.", "กพ.", "มีค.", "เมย.", "พค.", "มิย.", "กค.", "สค.", "กย.", "ตค.", "พย.", "ธค."],
LARGESTDATE		= "9999-12-31",

//=================================================================================

	gv = {
	BOOK: [],
	CONSULT: [],
	STAFF: [],
	HOLIDAY: [],
	user: "",
	timestamp: "",
	timer: {},
	idleCounter: 0,
	isMobile: false,
	isPACS: false
},

// ["type", "width", "name", "label", "id"]
EQUIPSHEET = [
  ["spanInSpan", "70", "", "ห้อง ", "oproomequip"],
  ["spanInSpan", "70", "", "Case ", "casenumequip"],
  ["spanInSpan", "120", "", "เวลา ", "optimeequip"],
  ["spanInSpan", "", "", "วัน", "opdayequip"],
  ["spanInSpan", "150", "", "ที่ ", "opdatethequip"],
  ["spanInSpan", "150", "", "Surgeon ", "staffnameequip"],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "ชื่อ-นามสกุล", ""],
  ["span", "", "", "", "patientnameequip"],
  ["span", "20", "", "", ""],
  ["span", "", "", "อายุ&nbsp;", ""],
  ["span", "", "", "", "ageequip"],
  ["span", "20", "", "", ""],
  ["span", "", "", "HN&nbsp;", ""],
  ["span", "", "", "", "hnequip"],
  ["br", "", "", "", ""],
  // floatleft makes the subsequent text rows go downwards
  // instead of pushing previous rows upward
  ["span", "110 floatleft", "", "Diagnosis", ""],
  ["span", "540", "", "", "diagnosisequip"],
  ["br", "", "", "", ""],
  ["span", "110 floatleft", "", "Operation", ""],
  ["span", "540", "", "", "treatmentequip"],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "copay", "", ""],
  ["span", "110", "", "", ""],
  ["span", "", "", "<i><b>***</b> ผู้ป่วยและญาติสามารถ<b><u>จ่ายส่วนเกินได้ </u></b></i> ", ""],
  ["text", "110 textcenter", "", "", ""],
  ["span", "", "", " บาท <b>***</b>", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "Position", "", ""],
  ["span", "110", "", "Position", ""],
  ["radio", "170", "pose", "Supine left", ""],
  ["radio", "170", "pose", "Supine right", ""],
  ["radio", "170", "pose", "Supine", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["radio", "170", "pose", "Parkbench ขวาลง", ""],
  ["radio", "170", "pose", "Lateral ขวาลง", ""],
  ["radio", "170", "pose", "Semiprone ขวาลง", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["radio", "170", "pose", "Parkbench ซ้ายลง", ""],
  ["radio", "170", "pose", "Lateral ซ้ายลง", ""],
  ["radio", "170", "pose", "Semiprone ซ้ายลง", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["radio", "170", "pose", "Concorde", ""],
  ["radio", "170", "pose", "Prone", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "500", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "Imaging", "", ""],
  ["span", "110", "", "Imaging", ""],
  ["checkbox", "170", "", "Fluoroscope", ""],
  ["checkbox", "170", "", "Navigator frameless", ""],
  ["checkbox", "170", "", "Navigator with frame", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["checkbox", "170", "", "iMRI", ""],
  ["checkbox", "170", "", "Robotics", ""],
  ["checkbox", "170", "", "O-arm", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["checkbox", "170", "", "iCT", ""],
  ["checkbox", "", "", "Stereotactic frame-based", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "500", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "อุปกรณ์ยึดผู้ป่วย", "", ""],
  ["span", "110", "", "อุปกรณ์ยึดผู้ป่วย", ""],
  ["checkbox", "170", "", "Mayfield", ""],
  ["checkbox", "170", "", "Gel Head Ring", ""],
  ["checkbox", "170", "", "Horseshoe", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "500", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "เครื่องตัดกระดูก", "", ""],
  ["span", "110", "", "เครื่องตัดกระดูก", ""],
  ["checkbox", "170", "", "High Speed Drill", ""],
  ["checkbox", "170", "", "Sagittal Saw", ""],
  ["checkbox", "170", "", "Osteotome", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "500", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "กล้อง", "", ""],
  ["span", "110", "", "กล้อง", ""],
  ["checkbox", "170", "", "Microscope", ""],
  ["checkbox", "170", "", "ICG", ""],
  ["checkbox", "170", "", "Endoscope", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "500", "", "ระบุยี่ห้อ", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "Retractor", "", ""],
  ["span", "110", "", "Retractor", ""],
  ["checkbox", "170", "", "Leylar", ""],
  ["checkbox", "170", "", "Halo", ""],
  ["checkbox", "170", "", "Greenberg", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "500", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "CUSA", "", ""],
  ["span", "110", "", "CUSA", ""],
  ["checkbox", "170", "", "Excell", ""],
  ["checkbox", "170", "", "Soring", ""],
  ["checkbox", "170", "", "Sonar", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "500", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "U/S", ""],
  ["span", "110", "", "U/S", ""],
  ["checkbox", "170", "", "Ultrasound", ""],
  ["checkbox", "170", "", "Doppler", ""],
  ["checkbox", "170", "", "Duplex", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "500", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "Shunt", "", ""],
  ["span", "110", "", "Shunt", ""],
  ["br", "", "", "", ""],
  ["span", "10", "", "", ""],
  ["span", "30", "", "Pudenz", ""],
  ["span", "70", "", "", ""],
  ["radio", "170", "head", "หัว low", ""],
  ["radio", "170", "head", "หัว medium", ""],
  ["radio", "170", "head", "หัว high", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["radio", "170", "peritoneum", "ท้อง low", ""],
  ["radio", "170", "peritoneum", "ท้อง medium", ""],
  ["radio", "170", "peritoneum", "ท้อง high", ""],
  ["br", "", "", "", ""],
  ["span", "10", "", "", ""],
  ["span", "100", "", "Programmable", ""],
  ["radio", "170", "program", "Medtronic shunt", ""],
  ["radio", "170", "program", "Codman shunt", ""],
  ["radio", "170", "program", "proGAV shunt", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "500", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "เครื่องมือบริษัท", "", ""],
  ["span", "110", "", "เครื่องมือบริษัท", ""],
  ["span", "90", "", "เวลาส่งเครื่อง", ""],
  ["text", "200", "", "", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "500", "", "ชื่อบริษัท ชื่อเครื่องมือ", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "อุปกรณ์อื่นๆ", "", ""],
  ["span", "110", "", "อุปกรณ์อื่นๆ", ""],
  ["checkbox", "170", "", "cranioplastic Cement", ""],
  ["checkbox", "170", "", "MTEC skull", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "500", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "Monitor", "", ""],
  ["span", "110", "", "Monitor", ""],
  ["checkbox", "170", "", "CN3", ""],
  ["checkbox", "170", "", "CN5", ""],
  ["checkbox", "170", "", "CN6", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["checkbox", "170", "", "CN7", ""],
  ["checkbox", "170", "", "CN8", ""],
  ["checkbox", "170", "", "CN9", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["checkbox", "170", "", "CN10", ""],
  ["checkbox", "170", "", "CN11", ""],
  ["checkbox", "170", "", "CN12", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["checkbox", "170", "", "SSEP", ""],
  ["checkbox", "170", "", "EMG", ""],
  ["checkbox", "170", "", "MEP", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "500", "", "อื่นๆ", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "Notice", "", ""],
  ["span", "110 floatleft", "", "Notice", ""],
  ["textarea", "500", "", "เครื่องมือพิเศษอื่นๆ", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "", "", ""],
  ["span", "350", "", "", ""],
  ["span", "70", "", " Edited by ", ""],
  ["span", "", "", "", "editedby"],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""]
]
