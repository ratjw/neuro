
//--- constants ---------------------

export const
//maintbl, queuetbl
OPDATE    = 0,
OPROOM    = 1,
OPTIME    = 2,
CASENUM   = 3,
STAFFNAME = 4,
HN        = 5,
PATIENT   = 6,
DIAGNOSIS = 7,
TREATMENT = 8,
EQUIPMENT = 9,
CONTACT   = 10,

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
  oproom: OPROOM,
  optime: OPTIME,
  casenum: CASENUM,
  staffname: STAFFNAME,
  hn: HN,
  patient: PATIENT,
  dob: null,
  diagnosis: DIAGNOSIS,
  treatment: TREATMENT,
  equipment: EQUIPMENT,
  contact: CONTACT,
  qn: null
},

NAMEOFDAYTHAI = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"],
THAIMONTH   = ["มค.", "กพ.", "มีค.", "เมย.", "พค.", "มิย.", "กค.", "สค.", "กย.", "ตค.", "พย.", "ธค."],
LARGESTDATE = "9999-12-31"
