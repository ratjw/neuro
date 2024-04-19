
//--- constants ---------------------

export const
//maintbl, queuetbl
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
LAB       = 10,
EQUIPMENT = 11,
CONTACT   = 12,

//servicetbl
CASENUMSV   = 0,
HNSV        = 1,
NAMESV      = 2,
DIAGNOSISSV = 3,
TREATMENTSV = 4,
ADMISSIONSV = 5,
FINALSV     = 6,
ADMITSV     = 7,
DISCHARGESV = 8,

COLUMN = {
  waitnum: null,
  theatre: THEATRE,
  oproom: OPROOM,
  optime: OPTIME,
  casenum: CASENUM,
  staffname: STAFFNAME,
  hn: HN,
  patient: PATIENT,
  dob: null,
  diagnosis: DIAGNOSIS,
  treatment: TREATMENT,
  lab: LAB,
  equipment: EQUIPMENT,
  contact: CONTACT,
  qn: null
},

NAMEOFDAYTHAI = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"],
THAIMONTH   = ["มค.", "กพ.", "มีค.", "เมย.", "พค.", "มิย.", "กค.", "สค.", "กย.", "ตค.", "พย.", "ธค."],
LARGESTDATE = "9999-12-31"
