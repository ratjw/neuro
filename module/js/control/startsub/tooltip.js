
import {
  OPDATE, OPROOM, OPTIME, CASENUM, STAFFNAME, HN, PATIENT, DIAGNOSIS,
  TREATMENT, EQUIPMENT, CONTACT
} from "../const.js"

const menulist = [
  "Staff",
  "clickserviceReview",
  "Search",
  "history",
  "clickaddnewrow",
  "postpone",
  "moveCase",
  "copyCase",
  "delete",
  "setholiday",
  "submenu",
  "clickSetStaff",
  "clickSetGovtday",
  "clickreadme"
]

export function tooltip()
{
  let mainth = document.querySelectorAll("#maintbl tr:has(th)")
  let cssmenu = document.querySelectorAll("#cssmenu [id]")
  let general = document.querySelector("#cssmenu")
;
  [...mainth].forEach(tr => {
    attachTooltip([...tr.querySelectorAll("th")])
  })
;
  let menu = [...cssmenu].filter(e => menulist.includes(e.id))
  menu.push(general)
  attachTooltip(menu)
}

function attachTooltip(tooltipElements)
{
  const tooltip = document.querySelector('.custom-tooltip');
  
  tooltipElements.forEach(element => {
     element.addEventListener('mouseenter', (e) => {
        tooltip.textContent = getMessage(e)
        tooltip.classList.add('show');
     });
     
     element.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 'px';
     });
     
     element.addEventListener('mouseleave', (e) => {
        tooltip.classList.remove('show');
     });
  });
}
 
function getMessage(e)
{
  let table = e.target.closest("table")
  let div = e.target.closest("div")
  let column = e.target.cellIndex
  let id = e.target.id

  if (table && table.id === "maintbl") return setMainMessage(column)
  if (div && div.id === "cssmenu") return setMenuMessage(id)
}

function setMainMessage(column)
{
  switch(column)
  {
    case OPDATE: return messageOPDATE(); break
    case OPROOM: return messageOPROOM(); break
    case OPTIME: return messageOPTIME(); break
    case CASENUM: return messageCASENUM(); break
    case STAFFNAME: return messageSTAFFNAME(); break
    case HN: return messageHN(); break
    case PATIENT: return messagePATIENT(); break
    case DIAGNOSIS: return messageDIAGNOSIS(); break
    case TREATMENT: return messageTREATMENT(); break
    case EQUIPMENT: return messageEQUIPMENT(); break
    case CONTACT: return messageCONTACT(); break
    default: null
 }
}

function messageOPDATE()
{
  return (
`คอลัมน์ Date - คลิกเลือกเคส เลือกได้ทีละเคสเท่านั้น
 
 การเปลี่ยนวันผ่าตัด ทำได้ 2 วิธี
	1. Drag & Drop ลากข้ามตารางได้
	2. คลิกเลือกเคส ตรงช่องซ้ายสุดของเคสที่ต้องการ ->
          คลิก Move ตรงเมนูแถวบน ->
          คลิกตรงวันที่ต้องการ

เมื่อคลิกเลือกเคส จะปรากฏเมนูแถวบน เป็นตัวเลือกขั้นต่อไป`)
}

function messageOPROOM()
{
  return (
`คอลัมน์ Rm - คลิกเลือกห้องผ่าตัด

เปลี่ยนเบอร์ห้อง
   - คลิกหัวลูกศร มากขึ้น-น้อยลง
   - ใช้ล้อหมุนเมาส์
ลบห้องผ่าตัด ใช้เลข 0`)
}

function messageOPTIME()
{
  return (
`คอลัมน์ Time – คลิกเลือกเวลา

เปลี่ยนเวลา
   - คลิกหัวลูกศร มากขึ้น-น้อยลง
   - ใช้ล้อหมุนเมาส์
ลบเวลา ใช้เลข 00.00`)
}

function messageCASENUM()
{
  return (
`คอลัมน์ № - คลิกเลือกลำดับเคส

เปลี่ยนลำดับเคส
   - คลิกหัวลูกศร มากขึ้น-น้อยลง
   - ใช้ล้อหมุนเมาส์
ลบลำดับเคส ใช้เลข 0`)
}

function messageSTAFFNAME()
{
  return (
"คอลัมน์ Staff - คลิกเลือกชื่ออาจารย์เจ้าของไข้")
}

function messageHN()
{
  return (
"คอลัมน์ HN - ใส่ได้เฉพาะเมื่อยังว่าง")
}

function messagePATIENT()
{
   return (
"คอลัมน์ Patient - วันเสาร์เป็นชื่ออาจารย์ Consult")
}

function messageDIAGNOSIS()
{
  return (
`ชื่อโรคทั้งหมด

ใส่ข้อความประกาศ`)
}

function messageTREATMENT()
{
  return (
`ชื่อการผ่าตัด

ใส่ข้อความประกาศ`)
}

function messageEQUIPMENT()
{
   return ("แบบฟอร์มที่เคยใส่ข้อมูลแล้ว ต้องคลิก ‘แก้ไข’ ก่อน")
}

function messageCONTACT()
{
   return (
`คอลัมน์ CONTACT - เบอร์โทร ที่อยู่ ชื่อญาติ
     Notes - ฐานะการเงิน ยาป้องกันเลือดแข็งตัว แพ้ยา`)
}

function setMenuMessage(id)
{
  switch(id)
  {
    case "Staff": return messageStaff(); break
    case "clickserviceReview": return messageServiceReview(); break
    case "Search": return messageSearch(); break
    case "history": return messageRetrace(); break
    case "clickaddnewrow": return messageAdd(); break
    case "postpone": return messagePostpone(); break
    case "moveCase": return messageMove(); break
    case "copyCase": return messageCopy(); break
    case "delete": return messageDelete(); break
    case "setholiday": return messageHoliday(); break
    case "submenu": return messagesubmenu(); break
    case "clickSetStaff": return messageStaffSetting(); break
    case "clickSetGovtday": return messageSetGovtday(); break
    case "clickreadme": return messageReadme(); break
    case "cssmenu": return messageGeneral(); break
    default: null
  }
}

function messageStaff()
{
   return (
`เป็น dropdown รายชื่ออาจารย์
         คลิกเลือกชื่ออาจารย์
	       จะมีการแบ่งครึ่งหน้าจอ
             ด้านซ้าย เป็นตารางรวม
	       ด้านขวา เป็นตารางของอาจารย์ท่านนั้น
	       ใช้เมาส์ชี้ที่เส้นแบ่งกลาง เปลี่ยนความกว้าง ซ้าย|ขวา`)
}

function messageServiceReview()
{
   return (
`ต้องการเปลี่ยนเดือน คลิกหัวลูกศร ซ้าย ขวา
	      ต้องลงเคสที่ตารางรวมก่อน ไม่สามารถลงเคสที่ตารางนี้`)
}

function messageSearch()
{
   return (
`หาเคส  ด้วย HN, ชื่อ, นามสกุล
			            Staff
			            คำใดๆ ที่ต้องการ
All Saved Cases
     ดูทุกเคสตั้งแต่เริ่มมีข้อมูล ยกเว้นเคสที่ถูกลบ
     ปรากฏทีละ 1 สัปดาห์
     คลิกด้านล่างเลื่อนดู ย้อนหน้า-ย้อนหลัง
All Deleted Cases
     เคสที่ถูกลบออกไป (แสดงเพียง 3 เดือนสุดท้าย)
		     คลิกที่ช่องซ้ายสุดของเคส เพื่อ Undelete`)
}

function messageRetrace()
{
   return ("ดูประวัติการแก้ไข")
          
}

function messageAdd()
{
   return ("เพิ่มเคสในวันเดียวกัน")
}

function messagePostpone()
{
   return ("เลื่อนวันไปไม่มีกำหนด ต้องมีชื่อ Staff ก่อน")
}

function messageMove()
{
   return ("คลิก move แล้วเลื่อนเมาส์ไป")
}

function messageCopy()
{
   return ("คลิก copy แล้วเลื่อนเมาส์ไปคลิกตรงวันที่ต้องการ")
}

function messageDelete()
{
   return ("ลบเคสที่เลือกไว้ ต้องยืนยันก่อนเสมอ")
}

function messageHoliday()
{
   return ("วันหยุดทางศาสนา วันที่ ไม่ตรงกันทุกปี ผู้ใช้ต้องกำหนดเอง")
}

function messagesubmenu()
{
   return ("อัพเดทรายชื่ออาจารย์")
}

function messageStaffSetting()
{
   return ("อัพเดทรายชื่ออาจารย์")
}

function messageSetGovtday()
{
   return ("วันหยุดปฏิทินสากล	วันที่ ตรงกันทุกปี")
}

function messageReadme()
{
   return ("วันหยุดทางศาสนา วันที่ ไม่ตรงกันทุกปี ผู้ใช้ต้องกำหนดเอง")
}

function messageGeneral()
{
  return (
`Login ID     เลขประจำตัว 6 หลัก            
Password     ที่ใช้กับโรงพยาบาล
การบันทึกข้อมูล
   เมื่อพิมพ์ข้อความเสร็จ ให้บันทึกโดย
   1. คลิกที่ช่องอื่น
   2. คลิกที่แถบคั่นสัปดาห์
   3. กด Tab (เลื่อนไปช่องต่อไป) 
   4. กด Shift+Tab (เลื่อนไปช่องย้อนหลัง)
   5. โปรแกรมจะบันทึก ’ข้อมูลใหม่’ เอง เมื่ออยู่นิ่ง 10 วินาที

Esc ยกเลิก ไม่บันทึก (ก่อน 10 วินาที)

Enter ไม่ได้บันทึก แต่ไปขึ้นบรรทัดใหม่ในช่องเดิม`)
}
