
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
EQUIPMENT = 10,
CONTACT   = 11,

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

NAMEOFDAYTHAI = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"],
THAIMONTH   = ["มค.", "กพ.", "มีค.", "เมย.", "พค.", "มิย.", "กค.", "สค.", "กย.", "ตค.", "พย.", "ธค."],
LARGESTDATE = "9999-12-31",

COMPLICATION = {
  admitted: "Readmission",
  operated: "Reoperation",
  infection: "Infection",
  morbid: "Morbidity",
  dead: "Dead"
},

// ["type", "width", "name", "label", "id"]
EQUIPSHEET = [
  ["spanInSpan", "70", "", "ห้อง ", "oproomequip"],
  ["spanInSpan", "70", "", "Case ", "casenumequip"],
  ["spanInSpan", "100", "", "เวลา ", "optimeequip"],
  ["spanInSpan", "", "", "วัน", "opdayequip"],
  ["spanInSpan", "120", "", "ที่ ", "opdatethequip"],
  ["spanInSpan", "", "", "Surgeon ", "staffnameequip"],
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
  ["span", "", "", "", "diagnosisequip"],
  ["br", "", "", "", ""],
  ["span", "110 floatleft", "", "Operation", ""],
  ["span", "", "", "", "treatmentequip"],
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
  ["radio", "150", "pose", "Supine left", ""],
  ["radio", "150", "pose", "Supine right", ""],
  ["radio", "", "pose", "Supine", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["radio", "150", "pose", "Parkbench ขวาลง", ""],
  ["radio", "150", "pose", "Lateral ขวาลง", ""],
  ["radio", "", "pose", "Semiprone ขวาลง", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["radio", "150", "pose", "Parkbench ซ้ายลง", ""],
  ["radio", "150", "pose", "Lateral ซ้ายลง", ""],
  ["radio", "", "pose", "Semiprone ซ้ายลง", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["radio", "150", "pose", "Concorde", ""],
  ["radio", "150", "pose", "Prone", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "400", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "Imaging", "", ""],
  ["span", "110", "", "Imaging", ""],
  ["checkbox", "150", "", "Fluoroscope", ""],
  ["checkbox", "130", "", "O-arm", ""],
  ["checkbox", "", "", "Navigator frameless", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["checkbox", "150", "", "Robotics", ""],
  ["checkbox", "130", "", "iCT", ""],
  ["checkbox", "", "", "Navigator with frame", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["checkbox", "150", "", "iMRI", ""],
  ["checkbox", "", "", "Stereotactic frame-based", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "400", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "อุปกรณ์ยึดผู้ป่วย", "", ""],
  ["span", "110", "", "อุปกรณ์ยึดผู้ป่วย", ""],
  ["checkbox", "150", "", "Mayfield", ""],
  ["checkbox", "150", "", "Gel Head Ring", ""],
  ["checkbox", "", "", "Horseshoe", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "400", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "เครื่องตัดกระดูก", "", ""],
  ["span", "110", "", "เครื่องตัดกระดูก", ""],
  ["checkbox", "150", "", "High Speed Drill", ""],
  ["checkbox", "150", "", "Sagittal Saw", ""],
  ["checkbox", "", "", "Osteotome", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "400", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "กล้อง", "", ""],
  ["span", "110", "", "กล้อง", ""],
  ["checkbox", "150", "", "Microscope", ""],
  ["checkbox", "150", "", "ICG", ""],
  ["checkbox", "", "", "Endoscope", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "400", "", "ระบุยี่ห้อ", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "Retractor", "", ""],
  ["span", "110", "", "Retractor", ""],
  ["checkbox", "150", "", "Leylar", ""],
  ["checkbox", "150", "", "Halo", ""],
  ["checkbox", "", "", "Greenberg", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "400", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "CUSA", "", ""],
  ["span", "110", "", "CUSA", ""],
  ["checkbox", "150", "", "Excell", ""],
  ["checkbox", "150", "", "Soring", ""],
  ["checkbox", "", "", "Sonar", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "400", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "U/S", ""],
  ["span", "110", "", "U/S", ""],
  ["checkbox", "150", "", "Ultrasound", ""],
  ["checkbox", "150", "", "Doppler", ""],
  ["checkbox", "", "", "Duplex", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "400", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "Shunt", "", ""],
  ["span", "110", "", "Shunt", ""],
  ["br", "", "", "", ""],
  ["span", "10", "", "", ""],
  ["span", "30", "", "Pudenz", ""],
  ["span", "70", "", "", ""],
  ["radio", "150", "head", "หัว low", ""],
  ["radio", "150", "head", "หัว medium", ""],
  ["radio", "", "head", "หัว high", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["radio", "150", "peritoneum", "ท้อง low", ""],
  ["radio", "150", "peritoneum", "ท้อง medium", ""],
  ["radio", "", "peritoneum", "ท้อง high", ""],
  ["br", "", "", "", ""],
  ["span", "10", "", "", ""],
  ["span", "100", "", "Programmable", ""],
  ["radio", "150", "program", "Medtronic shunt", ""],
  ["radio", "150", "program", "Codman shunt", ""],
  ["radio", "", "program", "proGAV shunt", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "400", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "เครื่องมือบริษัท", "", ""],
  ["span", "110", "", "เครื่องมือบริษัท", ""],
  ["span", "90", "", "เวลาส่งเครื่อง", ""],
  ["text", "200", "", "", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "400", "", "ชื่อบริษัท ชื่อเครื่องมือ", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "อุปกรณ์อื่นๆ", "", ""],
  ["span", "110", "", "อุปกรณ์อื่นๆ", ""],
  ["checkbox", "150", "", "MTEC skull", ""],
  ["checkbox", "", "", "cranioplastic Cement", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "400", "", "", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "Monitor", "", ""],
  ["span", "110", "", "Monitor", ""],
  ["checkbox", "150", "", "CN3", ""],
  ["checkbox", "150", "", "CN5", ""],
  ["checkbox", "", "", "CN6", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["checkbox", "150", "", "CN7", ""],
  ["checkbox", "150", "", "CN8", ""],
  ["checkbox", "", "", "CN9", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["checkbox", "150", "", "CN10", ""],
  ["checkbox", "150", "", "CN11", ""],
  ["checkbox", "", "", "CN12", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["checkbox", "150", "", "SSEP", ""],
  ["checkbox", "150", "", "EMG", ""],
  ["checkbox", "", "", "MEP", ""],
  ["br", "", "", "", ""],
  ["span", "110", "", "", ""],
  ["text", "400", "", "อื่นๆ", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "Notice", "", ""],
  ["span", "110 floatleft", "", "Notice", ""],
  ["textarea", "400", "", "เครื่องมือพิเศษอื่นๆ", ""],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""],
  ["br", "", "", "", ""],
  ["divbegin", "", "", "", ""],
  ["span", "250", "", "", ""],
  ["span", "70", "", " Edited by ", ""],
  ["span", "", "", "", "editedby"],
  ["divend", "", "", "", ""],
  ["br", "", "", "", ""]
],

RECORDDATA = {
  'admitted': '',     // "", "0" "1", "2", ...
  'radiosurgery': '', // "", "no", "Radiosurgery"
  'endovascular': '', // "", "no", "Endovascular"
  'infection': '',    // "", "Infection"             UDO (User-Defined Only)
  'morbid': '',       // "", "Morbidity"             UDO
  'dead': '',         // "", "Dead"                  UDO
  'operated': [{
    'op': '',         // "", "0" "1", "2", ...
    'doneby': '',     // "", "Staff", "Resident"     UDO
    'manner': '',     // "", "Elective", "Emergency" UDO
    'scale': '',      // "", "Major", "Minor"        UDO
    'disease': ''     // "", "Brain Tumor", "Brain Vascular" ...
  }]
},

// [type, width, name, label, min, max]
RECORDSHEET = [
  ["number", "30", "admitted", "Admission", "0", "9"],
  ["hr", "outer", "", ""],
  ["button", "", "addOperation", "+"],
  ["divbegin", "", "operated", "Operation"],
  ["divend", "", "", ""],
  ["hr", "outer", "", ""],
  ["button", "", "addRadiosurgery", "+"],
  ["divbegin", "", "radiosurg", "Radiosurgery"],
  ["divend", "", "", ""],
  ["hr", "outer", "", ""],
  ["button", "", "addEndovascular", "+"],
  ["divbegin", "", "endovasc", "Endovascular"],
  ["divend", "", "", ""],
  ["br", "", "", ""],
  ["hr", "outer", "", ""],
  ["checkbox", "100", "infection", "Infection"],
  ["checkbox", "100", "morbid", "Morbidity"],
  ["checkbox", "100", "dead", "Dead"]
],
OPERATION = [
  ["hr", "inner", "", ""],
  ["button", "", "delproc", "-"],
  ["text", "100 opdatepicker", "opdate", "opdatepicker"],
  ["br", "", "", ""],
  ["br", "", "", ""],
  ["br", "", "", ""],
  ["div", "textarea", "procedure", ""],
  ["br", "", "", ""],
  ["radio", "100", "doneby", "Staff"],
  ["radio", "100", "doneby", "Fellow"],
  ["radio", "100", "doneby", "Resident"],
  ["br", "", "", ""],
  ["radio", "100", "manner", "Elective"],
  ["radio", "100", "manner", "Emergency"],
  ["br", "", "", ""],
  ["radio", "100", "scale", "Major"],
  ["radio", "100", "scale", "Minor"],
  ["br", "", "", ""],
  ["radio", "100", "disease", "Brain Tumor"],
  ["radio", "100", "disease", "Trauma"],
  ["radio", "100", "disease", "Spine"],
  ["br", "", "", ""],
  ["radio", "100", "disease", "Brain Vascular"],
  ["radio", "100", "disease", "CSF related"],
  ["radio", "100", "disease", "etc"]
],
RADIOSURG = [
  ["hr", "inner", "", ""],
  ["button", "", "delproc", "-"],
  ["br", "", "", ""],
  ["br", "", "", ""],
  ["div", "textarea", "procedure", ""],
  ["br", "", "", ""],
  ["radio", "100", "doneby", "Staff Neuro"],
  ["radio", "100", "doneby", "Staff Radio"],
  ["span", "120", "", ""]
],
ENDOVASC = [
  ["hr", "inner", "", "", ""],
  ["button", "30 ", "delproc", "-"],
  ["br", "", "", ""],
  ["br", "", "", ""],
  ["div", "textarea", "procedure", ""],
  ["br", "", "", ""],
  ["radio", "100", "doneby", "Staff Neuro"],
  ["radio", "100", "doneby", "Fellow Neuro"],
  ["radio", "100", "doneby", "Staff Radio"],
  ["br", "", "", ""],
  ["radio", "100", "manner", "Elective"],
  ["radio", "100", "manner", "Emergency"]
],

//=============================================================================
// Keyword constants to guess the disease using disease and treatment

BRAINDX = [
  /\bbrain\b/i, /basal ganglion/i, /basal.*gg/i, /bgg/i,
  /cavernous/i, /cerebell/i, /cranio/i,
  /\bCNS\b/i, /convexity/i, /\bCPA?\b/i, /cliv[aou]/i,
  /facial/i, /front/i, /fal[cx]/i, /\bF\-?P\b/i, /jugular/i,
  /pariet/i, /planum/i, /pitui/i, /pineal/i, /petro/i, 
  /occipit/i, /sella/i, /sphenoid/i, /sagittal/i, /\bSSS\b/i,
  /tempor/i, /tentori/i, /thalam/i, /tonsil/i,
  /transnasal/i, /transsphenoid/i, /transtent/i, /transventric/i, 
  /tuberculum/i, /vestibul/i
],
BRAINTUMORDX = [
  /^((?!cavernoma|hematoma|osteo|zyg).)*oma/i, /\bCA\b/i, /CPA/i,
  /crani[oe]/i, /Cushing/i, /cyst\b/i,
  /DNET/i, /GBM/i, /lesion/i, /mass/i, /metas/i, /\bNFP?A\b/i,
  /\bPA\b/i, /pituitary apoplexy/i, /tumou?r/i
],
BRAINVASCULARDX = [
  /aneurysm/i, /AVM/i, /AVF/i,
  /basal ganglion|\bbg|cerebellar hemorrhage/i,
  /cavernoma/i, /emboli/i, /ha?ematoma/i, /ha?emorrh/i, /HT?ICH/i,
  /\bICH\b/i, /infarct/i, /ischemi/i, /(\bICA\b|MCA|VBA).*stenosis/i,
  /\bM1\b|\bM2\b|MCA/i, /moya moya/i, /\bSAH\b/i, /stroke/i,
],
CSFDX = [
  /\bHCP\b/i, /hydrocephalus/i, /\bNPH\b/i,
  /(\bVP|\bLP|periton|subgaleal).*shunt/i,
  /shunt obstruct/i, /shunt malfunction/i
],
TRAUMADX = [
  /accident/i, /assault/i, /concussion/i, /contusion/i, /\bEDH\b/i,
  /fall/i, /Fx|fracture/i, /injury/i, /lacerat/i,
  /\bSDH\b/i, /subdural ha?ematoma/i, /trauma/i
],
SPINEDX = [
  /cervical/i, /cord/i, /\bCSM\b/i, /^((?!mri|mri|MRI?).)*[CTLS] ?[\d]/,
  /degenerat/i, /dislocat/i,
  /HNP/i, /lamin[eo]/i, /listhesis/i, /lumb[ao]/i,/lesion/i,
  /mass/i, /metas/i,  /myel/i,
  /odontoid/i,
  /sacr[ao]/i, /scoliosis/i, /spin[aeo]/i, /spondylo/i,
  /thora/i
],
ETCDX = [
  /abscess/i, /chiari/i, /convulsi/i, /\bCTS\b/i, /cubital/i,
  /dysplasia/i, /epilepsy/i, /hemifacial/i,
  /\bMTS\b/i, /ocele/i, /parkinson/i,
  /skull defect/i, /sclerosis/i, /seizure/i, /sural/i,
  /\bTG?N\b/i, /trigemin/i, /tunnel/i
],

BRAINTUMORDXNO = [
  /aneurysm/i, /AVM/i, /AVF/i,
  /basal ganglion|\bbg|cerebellar hemorrhage/i,
  /cavernoma/i, /emboli/i, /ha?ematoma/i, /HT?ICH/i,
  /\bICH\b/i, /infarct/i, /ischemi/i, /(ICA|MCA|VBA).*stenosis/i,
  /M1|M2|MCA occlusion/i, /moya moya/i, /\bSAH\b/i, /stroke/i,

  /\bHCP\b/i, /hydrocephalus/i, /\bNPH\b/i,
  /(\bVP|\bLP|periton|subgaleal).*shunt/i,
  /shunt obstruct/i, /shunt malfunction/i,

  /assault/i, /\bEDH\b/i, /contusion/i, /injury/i,
  /Fx|fracture/i, /lacerat/i,
  /\bC?SDH\b/i, /trauma/i,

  /cervical/i, /cord/i,
  /\bCSM\b/i, /^((?!mri|mri|MRI?).)*[CTLS] ?[\d]/,
  /dislocat/i, /neck/i,
  /HNP/i, /lamin[eo]/i, /listhesis/i, /lumb[ao]/i, /myel/i,
  /odontoid/i,
  /sacr[ao]/i, /scoliosis/i, /spin[aeo]/i, /spondylo/i,
  /thora/i,

  /abscess/i, /chiari/i, /\bCTS\b/i, /cubital/i,
  /dysplasia/i, /hemifacial/i,
  /\bMTS\b/i, /ocele/i, /parkinson/i,
  /skull defect/i, /sclerosis/i, /sural/i,
  /tunnel/i
],
BRAINVASCULARDXNO = [
  /^((?!cavernoma|hematoma|osteo|zyg).)*oma/i,
  /\bCA\b/i, /CPA/i, /Cushing/i, /cyst\b/i,
  /DNET/i, /GBM/i, /mass/i, /metas/i, /\bNFP?A\b/i,
  /pituitary apoplexy/i, /tumou?r/i,

  /\bHCP\b/i, /hydrocephalus/i, /\bNPH\b/i,
  /(\bVP|\bLP|periton|subgaleal).*shunt/i,
  /shunt obstruct/i, /shunt malfunction/i,

  /assault/i, /\bEDH\b/i, /contusion/i, /injury/i,
  /Fx|fracture/i, /lacerat/i,
  /\bC?SDH\b/i, /subdural ha?ematoma/i, /trauma/i,

  /cervical/i, /cord/i,
  /\bCSM\b/i, /^((?!mri|mri|MRI?).)*[CTLS] ?[\d]/,
  /degenerat/i, /dislocat/i,
  /HNP/i, /lamin[eo]/i, /listhesis/i, /lumb[ao]/i, /myel/i,
  /odontoid/i,
  /sacr[ao]/i, /scoliosis/i, /spin[aeo]/i, /spondylo/i,
  /thora/i,

  /abscess/i, /chiari/i, /convulsi/i, /\bCTS\b/i, /cubital/i,
  /dysplasia/i, /epilepsy/i, /hemifacial/i,
  /\bMTS\b/i, /ocele/i, /parkinson/i,
  /skull defect/i, /sclerosis/i, /seizure/i, /sural/i,
  /\bTG?N\b/i, /trigemin/i, /tunnel/i
],
CSFDXNO = [
  /cavernoma/i, /emboli/i, /ha?emorrh/i, /HT?ICH/i,
  /\bICH\b/i, /infarct/i, /ischemi/i, /(ICA|MCA|VBA).*stenosis/i,
  /M1|M2|MCA occlusion/i, /moya moya/i, /\bSAH\b/i, /stroke/i,

  /assault/i, /\bEDH\b/i, /contusion/i, /injury/i,
  /Fx|fracture/i, /lacerat/i, /trauma/i,

  /cord/i, /\bCSM\b/i,
  /degenerat/i, /dislocat/i,
  /HNP/i, /listhesis/i,
  /odontoid/i,
  /sacr[ao]/i, /scoliosis/i, /spin[aeo]/i, /spondylo/i,

  /abscess/i, /\bCTS\b/i, /cubital/i,
  /dysplasia/i, /hemifacial/i,
  /\bMTS\b/i,
  /sclerosis/i, /sural/i,
  /\bTG?N\b/i, /tunnel/i
],
TRAUMADXNO = [
  /^((?!cavernoma|hematoma|osteoma|zygoma).)*oma/i, /\bCA\b/i,
  /CPA/i, /Cushing/i, /cyst\b/i,
  /DNET/i, /GBM/i, /mass/i, /metas/i, /\bNFP?A\b/i,
  /\bPA\b/i, /pituitary apoplexy/i, /tumou?r/i,

  /^((?!pseudo?).)*aneurysm/i, /AVM/i, /AVF/i,
  /basal ganglion|\bbg|cerebellar hemorrhage/i,
  /cavernoma/i, /emboli/i, /ha?emorrh/i, /HT?ICH/i,
  /\bICH\b/i, /infarct/i, /ischemi/i, /(ICA|MCA|VBA).*stenosis/i,
  /M1|M2|MCA occlusion/i, /moya moya/i, /\bSAH\b/i, /stroke/i,

  /\bHCP\b/i, /hydrocephalus/i, /\bNPH\b/i,
  /(\bVP|\bLP|periton|subgaleal).*shunt/i,
  /shunt obstruct/i, /shunt malfunction/i,

  /\bCSM\b/i,
  /degenerat/i, /dislocat/i,
  /HNP/i, /myel/i,
  /odontoid/i, /scoliosis/i,

  /abscess/i, /chiari/i, /\bCTS\b/i, /cubital/i,
  /dysplasia/i, /hemifacial/i,
  /\bMTS\b/i, /ocele/i, /sural/i,
  /\bTG?N\b/i, /trigemin/i, /tunnel/i
],
SPINEDXNO = [
  /CPA/i, /crani[oe]/i, /Cushing/i,
  /GBM/i, /\bNFP?A\b/i,
  /\bPA\b/i, /pituitary apoplexy/i,

  /basal ganglion|\bbg|cerebellar hemorrhage/i, /HT?ICH/i,
  /\bICH\b/i, /infarct/i, /ischemi/i, /(ICA|MCA|VBA).*stenosis/i,
  /M1|M2|MCA occlusion/i, /moya moya/i, /\bSAH\b/i, /stroke/i,

  /\bHCP\b/i, /hydrocephalus/i, /\bNPH\b/i,
  /(\bVP|\bLP|periton|subgaleal).*shunt/i,
  /shunt obstruct/i, /shunt malfunction/i,

  /\bCTS\b/i, /cubital/i,
  /hemifacial/i,
  /\bMTS\b/i, /sural/i,
  /\bTG?N\b/i, /trigemin/i
],
ETCDXNO = [
  /DNET/i, /GBM/i, /mass/i, /metas/i, /\bNFP?A\b/i,
  /\bPA\b/i, /pituitary apoplexy/i, /tumou?r/i,

  /\bHCP\b/i, /hydrocephalus/i, /\bNPH\b/i,
  /(\bVP|\bLP|periton|subgaleal).*shunt/i,
  /shunt obstruct/i, /shunt malfunction/i,

  /assault/i, /\bEDH\b/i, /contusion/i, /injury/i,

  /HNP/i, /lamin[eo]/i, /listhesis/i, /lumb[ao]/i, /myel/i,
  /odontoid/i,
  /sacr[ao]/i, /scoliosis/i, /spin[aeo]/i, /spondylo/i,
  /thora/i
],

BRAINTUMORRX = [
  /approa/i, /biopsy/i, /\bbx\b/i,
  /crani[oe]c?tomy/i, /\bETS\b/i,
  /trans.*remov/i, /TSP/i, /TSS/i, /transnasal/i,
  /transsphenoid/i, /transventric/i, /tumou?r/i
],
BRAINVASCULARRX = [
  /anast/i, /bypass/i, /(clot|hematoma).*(remov|irrigat|evacuat)/i,
  /clamp/i, /clip/i, /crani[oe]c?tomy/i,
  /EDAS/i, /EDAMS/i, /excision.*AVM|AVM.*excision/i,
  /occlu/i, /thromb.*ectomy/i
],
CSFRX = [
  /ETV/i, /EVD/i, /lumbar drain/i, /OMMAYA/i,
  /Pudenz/i, /pressure.*valve/i, /Programmable/i,
  /(\bV\-?P|\bL\-?P|periton|subgaleal).*shunt/i,
],
TRAUMARX = [
  /debridement/i, /(clot|hematoma).*(remov|irrigat|evacuat)/i,
  /trauma/i
],
SPINERX = [
  /ACDF/i, /ALIF/i, /biopsy/i, /\bbx\b/i,
  /cervical/i, /^((?!mri|MRI?).)*[CTLS][\d]/,
  /corpectomy/i, /decompress/i, /Discectomy/i,
  /\bESI\b/i, /fixation/i, /foraminotomy/i, /\bfusion/i, /kyphoplasty/i,
  /lamin[eo]/i, /MIDLIF/i, /OLIF/i, 
  /PDS/i, /PLF/i, /PLIF/i, /remov/i, /sacr[ao]/i, /screw/i, /SNRB/i,
  /thora/i, /TLIF/i, /transoral/i, /transforam/i, /tumou?r/i,
  /vertebr/i, /untether/i
],
SPINEOP = [
  /ACDF/i, /ALIF/i, /biopsy/i, /\bbx\b/i, /block/i,
  /corpectomy/i, /decompress/i, /Discectomy/i, /disc.*fx/i, /ectomy/,
  /\bESI\b/i, /fixation/i, /foraminotomy/i, /\bfusion/i, /kyphoplasty/i,
  /lamin[eo]/i, /MIDLIF/i, /OLIF/i, 
  /PDS/i, /PLF/i, /PLIF/i, /remov/i, /sacr[ao]/i, /screw/i, /SNRB/i,
  /TLIF/i, /transoral/i, /transforam/i,
  /vertebr(oplasty|ectomy)\b/i, /untether/i
],
ETCRX = [
  /anast/i, /aspirat/i, /advance/i,
  /biop/i, /block/i, /burr/i, /\bbx\b/i, /balloon/i, /cranioplasty/i,
  /battery/i, /DBS/i, /grid/i, /MVD/i,
  /decom/i, /DBS/i, /drain/i, /disconnect/i,
  /ECOG/i, /ectom/i, /endoscop/i, /\bESI\b/i, /excis/i,
  /grid/i, /insert/i,
  /lesion/i, /lysis/i, /lesionectomy/i, /lobectomy/i,
  /neurot/i, /Navigator/i,
  /occlu/i, /operat/i, /ostom/i, /plast/i, 
  /rhizotomy/i,
  /recons/i, /redo/i, /remov/i, /repa/i, /revis/i, /\bRF/i, /robot/i,
  /scope/i, /stim/i, /suture/i,
  /tracheos/i, /VNS/i
],

BRAINTUMORRXNO = [
  /(clot|hematoma).*(remov|irrigat|evacuat)/i,
  /clip/i, /EDAS/i, /EDAMS/i, /excision.*AVM|AVM.*excision/i,

  /ETV/i,

  /trauma/i,
  
  /ACDF/i, /ALIF/i,
  /cervical/i, /corpectomy/i, /discectomy/i, /disc.*fx/i,
  /\bfusion/i, /kyphoplasty/i,
  /lamin[eo]/i, /lumbar/i, /MIDLIF/i, /OLIF/i, 
  /PDS/i, /PLF/i, /PLIF/i, /sacr[ao]/i, /screw/i, /SNRB/i,
  /thora/i, /TLIF/i,
  /vertebr(oplasty|ectomy)\b/i, /untether/i,

  /battery/i, /DBS/i, /decompressive.*craniectomy/i,
  /grid/i, /irrigate/i, /lesionectomy/i, /MVD/i,
  /untether/i, /VNS/i
],
BRAINVASCULARRXNO = [
  /biopsy/i, /\bbx\b/i, /tumou?r/i,
  /TSP/i, /TSS/i, /transnasal/i, /transsphenoid/i, /transventric/i,

  /ETV/i, /OMMAYA/i,

  /trauma/i,

  /ACDF/i, /ALIF/i,
  /corpectomy/i, /discectomy/i, /disc.*fx/i,
  /\bfusion/i, /kyphoplasty/i,
  /lamin[eo]/i, /MIDLIF/i, /OLIF/i, 
  /PDS/i, /PLF/i, /PLIF/i, /sacr[ao]/i, /screw/i, /SNRB/i,
  /thora/i, /TLIF/i,
  /vertebr(oplasty|ectomy)\b/i, /untether/i,

  /battery/i, /DBS/i,
  /grid/i, /irrigate/i, /MVD/i,
  /untether/i, /VNS/i
],
CSFRXNO = [
  /biopsy/i, /\bbx\b/i, /tumou?r.*remov/i,
  /TSP/i, /TSS/i, /transnasal/i, /transsphenoid/i, /transventric/i,

  /(clot|hematoma).*(remov|irrigat|evacuat)/i,
  /clip/i, /EDAS/i, /EDAMS/i, /excision.*AVM|AVM.*excision/i,

  /trauma/i,

  /ACDF/i, /ALIF/i, /MIDLIF/i, /OLIF/i, 
  /PLF/i, /PLIF/i, /SNRB/i, /TLIF/i,

  /battery/i, /DBS/i, /decompressive.*craniectomy/i, 
  /grid/i, /irrigate/i, /lobectomy/i, /MVD/i,
  /untether/i, /VNS/i
],
TRAUMARXNO = [
  /biopsy/i, /\bbx\b/i, /tumou?r/i,
  /TSP/i, /TSS/i, /transnasal/i, /transsphenoid/i, /transventric/i,

  /EDAS/i, /EDAMS/i, /excision.*AVM|AVM.*excision/i,

  /ETV/i, /OMMAYA/i,
  /(\bVP|\bLP|periton|subgaleal).*shunt/i,

  /ACDF/i, /ALIF/i,
  /lumbar drain/i, /MIDLIF/i, /OLIF/i, 
  /PLF/i, /PLIF/i, /SNRB/i,
  /TLIF/i,

  /battery/i, /DBS/i, /grid/i, /MVD/i,
  /untether/i, /VNS/i
],
SPINERXNO = [
  /crani[oe]/i, /\bETS\b/i,
  /TSP/i, /TSS/i, /transnasal/i, /transsphenoid/i, /transventric/i,

  /EDAS/i, /EDAMS/i,

  /ETV/i, /EVD/i, /OMMAYA/i,
  /(\bVP|\bLP|periton|subgaleal).*shunt/i,
  /lumbar drain/i,

  /battery/i, /DBS/i, /decompressive.*craniectomy/i, 
  /grid/i, /MVD/i, /cranioplasty/i,
  /VNS/i
],
ETCRXNO = [
  /tumou?r.*(biopsy|\bbx\b|remov)/i, /craniot.*tumou?r|clot remov/i,
  /TSP/i, /TSS/i, /transnasal/i, /transsphenoid/i, /transventric/i,

  /clip/i, /EDAS/i, /EDAMS/i, /excision.*AVM|AVM.*excision/i,

  /trauma/i,

  /ETV/i, /OMMAYA/i,
  /(\bVP|\bLP|periton|subgaleal).*shunt/i,

  /ACDF/i, /ALIF/i, /^((?!mri|mri|mri|MRI?).)*[CTLS][\d]/,
  /lamin[eo]/i, /lumbar drain/i, /MIDLIF/i, /OLIF/i, 
  /PLF/i, /PLIF/i, /sacr[ao]/i, /SNRB/i,
  /thora/i, /TLIF/i
],

NOOPERATION = [
  /adjust.*pressure/i, /advice.*surg[ery|ical]/i,
  /conservative/i, /observe/i, /\boff OR/, /standby/i
],
RADIOSURGERY = [
  /conformal radiotherapy/i, /CRT/i, /Cyber ?Knife/i,
  /Gamma knife/i, /GKS/i, /Linac/i,
  /radiosurgery/i, /\bRS\b/i,
  /\bSRS\b/i, /\bSRT\b/i, /stereotactic radiotherapy/i,
  /Tomotherapy/i
],
ENDOVASCULAR = [
  /\bcoil/i, /emboli[zs]/i, /\bendovasc/i, /\bintervention/i,
  /\bstent/i, /\btransart/i, /\btransvenous/i
],

KEYWORDS = {
  "Brain Tumor": [BRAINTUMORRX, BRAINTUMORRXNO, BRAINTUMORDX, BRAINTUMORDXNO],
  "Brain Vascular": [
    BRAINVASCULARRX, BRAINVASCULARRXNO, BRAINVASCULARDX, BRAINVASCULARDXNO
  ],
  "Trauma": [TRAUMARX, TRAUMARXNO, TRAUMADX, TRAUMADXNO],
  "Spine": [SPINERX, SPINERXNO, SPINEDX, SPINEDXNO.concat(BRAINDX)],
  "CSF related": [CSFRX, CSFRXNO, CSFDX, CSFDXNO],
  "etc": [ETCRX, ETCRXNO, ETCDX, ETCDXNO]
}
