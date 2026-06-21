
import {
  OPDATE, OPROOM, OPTIME, CASENUM, STAFFNAME, HN, PATIENT, DIAGNOSIS,
  TREATMENT, EQUIPMENT, CONTACT
} from "../const.js"

const menulist = [
  "Staff",
  "clickserviceReview",
  "Search",
  "oneRowMenu",
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
  let user = document.querySelector("#cssmenu")
  let service = document.querySelector("#servicetbl thead")
  let menu = [...cssmenu].filter(e => menulist.includes(e.id))
;
  [...mainth].forEach(tr => {
    attachTooltip([...tr.querySelectorAll("th")])
  })

  menu.push(user, service)
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

  if (table) {
    if (table.id === "maintbl") return setMainMessage(column)
    else if (table.id === "servicetbl") return setMenuMessage(table.id)
  }

  if (div && div.id === "cssmenu") return setMenuMessage(id)
  if (div && div.id === "oneRowMenu") return setMenuMessage(id)
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
`เลือกเคส เลือกได้ทีละเคสเท่านั้น
 
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
`เลือกห้องผ่าตัด

เปลี่ยนเบอร์ห้อง
   - คลิกหัวลูกศร มากขึ้น-น้อยลง
   - ใช้ล้อหมุนเมาส์
ลบห้องผ่าตัด ใช้เลข 0`)
}

function messageOPTIME()
{
  return (
`เลือกเวลา

เปลี่ยนเวลา
   - คลิกหัวลูกศร มากขึ้น-น้อยลง
   - ใช้ล้อหมุนเมาส์
ลบเวลา ใช้เลข 00.00`)
}

function messageCASENUM()
{
  return (
`เลือกลำดับเคส

เปลี่ยนลำดับเคส
   - คลิกหัวลูกศร มากขึ้น-น้อยลง
   - ใช้ล้อหมุนเมาส์
ลบลำดับเคส ใช้เลข 0`)
}

function messageSTAFFNAME()
{
  return (
"เลือกชื่ออาจารย์เจ้าของไข้")
}

function messageHN()
{
  return (
"ใส่ได้เฉพาะเมื่อยังว่าง")
}

function messagePATIENT()
{
   return (
`วันเสาร์เป็นชื่ออาจารย์ Consult
ต้องการแลกเวร
   Right mouse click
   เลือกชื่ออาจารย์ที่มาอยู่แทน`)
}

function messageDIAGNOSIS()
{
  return (
`ชื่อโรคทั้งหมด

เป็นช่องที่ใช้ใส่ข้อความประกาศได้`)
}

function messageTREATMENT()
{
  return (
`ชื่อการผ่าตัด

เป็นช่องที่ใช้ใส่ข้อความประกาศได้`)
}

function messageEQUIPMENT()
{
   return ("แบบฟอร์มที่เคยใส่ข้อมูลแล้ว ต้องคลิก ‘แก้ไข’ ก่อน")
}

function messageCONTACT()
{
   return (
`เบอร์โทรติดต่อ ที่อยู่ปัจจุบัน ชื่อญาติผู้ติดตาม

Notes - ฐานะการเงิน ยาป้องกันเลือดแข็งตัว แพ้ยา`)
}

function setMenuMessage(id)
{
  switch(id)
  {
    case "Staff": return messageStaff(); break
    case "clickserviceReview": return messageServiceReview(); break
    case "oneRowMenu": return messageoneRowMenu(); break
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
    case "cssmenu": return messageUser(); break
    case "servicetbl": return messageService(); break
    default: null
  }
}

function messageStaff()
{
   return (
`เป็น dropdown รายชื่ออาจารย์

คลิกเลือกชื่ออาจารย์ จะมีการแบ่งครึ่งหน้าจอ โดย
   ด้านซ้าย เป็นตารางรวม
   ด้านขวา เป็นตารางของอาจารย์ท่านนั้น

ใช้เมาส์ชี้ที่เส้นแบ่งกลาง เปลี่ยนความกว้าง ซ้าย|ขวา`)
}

function messageServiceReview()
{
   return ("ต้องการเปลี่ยนเดือน คลิกหัวลูกศร ซ้าย ขวา")
}

function messageSearch()
{
   return (
`หาเคส  ด้วย HN, ชื่อ, นามสกุล, ชื่อ Staff, หรือ คำใดๆ ก็ได้

Search All Saved Cases
   ดูทุกเคสตั้งแต่เริ่มมีข้อมูล ยกเว้นเคสที่ถูกลบ
   ปรากฏทีละ 1 สัปดาห์
   คลิกด้านล่างเลื่อนดู ย้อนหน้า-ย้อนหลัง

Show Deleted Cases
   แสดงเคสที่ถูกลบออกไปแล้ว เพียง 3 เดือนสุดท้าย
   คลิกที่ช่องซ้ายสุดของเคส เพื่อ Undelete`)
}

function messageoneRowMenu()
{
   return ("จะใช้เมนูสีจาง ต้องเลือกเคสในตารางก่อน")
}

function messageRetrace()
{
   return ("ดูประวัติการแก้ไข เฉพาะของเคสที่เลือกไว้")
}

function messageAdd()
{
   return (
`เพิ่มเคสในวันเดียวกัน

จะเพิ่มเป็นเคสถัดไป
ถ้าต้องการให้เป็นเคสก่อนหน้า สามารถ move ไปทีหลังได้`)
}

function messagePostpone()
{
   return (
`เลื่อนวันไปไม่มีกำหนด

ต้องมีชื่อ Staff ก่อน จึงจะเลื่อนเป็น waiting list ได้`)
}

function messageMove()
{
   return (
`เลือกเคสที่จะเลื่อน
คลิก move
แล้วเลื่อนเมาส์ไป
คลิกตรงวันที่ต้องการ`)
}

function messageCopy()
{
   return (
`เลือกเคสที่จะเลื่อน
คลิก copy
แล้วเลื่อนเมาส์ไป
คลิกตรงวันที่ต้องการ`)
}

function messageDelete()
{
   return ("ลบเคสที่เลือกไว้ ต้องยืนยันก่อนเสมอ")
}

function messageHoliday()
{
   return (
`เลือกเคสที่จะกำหนดให้เป็นวันหยุด
คลิก holiday
เลือกชื่อวันที่กำหนด

วันหยุดทางศาสนา
วันที่ตามปฏิทินสากล จะไม่ตรงกันทุกปี
ผู้ใช้ต้องกำหนดวันที่ในแต่ละปีเอง`)
}

function messagesubmenu()
{
   return (
`อัพเดทรายชื่ออาจารย์
แก้ไขสถานะงาน
แก้ไขลำดับเวร consult ประจำสัปดาห์
แก้ไขวันสัปดาห์เริ่มต้น ถ้าโปรแกรมคำนวณผิด`)
}

function messageStaffSetting()
{
   return ("อัพเดทรายชื่ออาจารย์ เป็นสิทธิระดับอาจารย์เท่านั้น")
}

function messageSetGovtday()
{
   return (
`กำหนดวันหยุดปฏิทินสากล

วันที่ ตรงกันทุกปี ตามปฏิทินสากล`)
}

function messageReadme()
{
   return ("Help Document that is shown at mouse tip")
}

function messageUser()
{
  return (
`การบันทึกข้อมูล
   เมื่อพิมพ์ข้อความเสร็จ ให้บันทึกโดย
   1. คลิกที่ช่องอื่น
   2. คลิกที่แถบคั่นสัปดาห์
   3. กด Tab (เลื่อนไปช่องต่อไป) 
   4. กด Shift+Tab (เลื่อนไปช่องย้อนหลัง)
   5. โปรแกรมจะบันทึกให้เอง เมื่ออยู่นิ่ง 10 วินาที

Esc ยกเลิก ไม่บันทึก (ก่อน 10 วินาที)

Enter ไม่ได้บันทึก แต่ไปขึ้นบรรทัดใหม่ในช่องเดิม`)
}

function messageService()
{
  return "ต้องลงเคสที่ตารางรวมก่อน ไม่สามารถลงเคสที่ตารางนี้"
}