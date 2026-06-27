
export function setMenuMessage(id)
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
    case "titlebar": return messageWaiting(); break
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
   1. คลิกที่ช่องอื่น (คลิกที่ช่อง HN หรือ PATIENT ที่มีข้อมูลอยู่แล้ว จะไม่มีผลข้างเคียงปรากฏ)
   2. คลิกที่แถบคั่นสัปดาห์
   3. กด Tab (เลื่อนไปช่องต่อไป) 
   4. กด Shift+Tab (เลื่อนไปช่องย้อนหลัง)
   5. โปรแกรมจะบันทึกให้เอง เมื่ออยู่นิ่ง 10 วินาที

Esc ยกเลิก ไม่บันทึก (ก่อน 10 วินาที)

Enter ไม่ได้บันทึก แต่ไปขึ้นบรรทัดใหม่ในช่องเดิม`)
}

function messageWaiting()
{
  return `ตารางเคสเฉพาะของอาจารย์ท่านนี้

 *** ด้านท้ายตาราง มีเคสรอใน waiting list ***`
}
function messageService()
{
  return "ต้องลงเคสที่ตารางรวมก่อน ไม่สามารถลงเคสที่ตารางนี้"
}