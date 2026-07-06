
export function setMenuMessage(id)
{
  switch(id)
  {
    case "Staff": return messageStaff(); break
    case "clickserviceReview": return messageServiceReview(); break
    case "Search": return messageSearch(); break
    case "oneRowMenu": return messageoneRowMenu(); break
    case "history": return messageRetrace(); break
    case "clickaddnewrow": return messageAdd(); break
    case "postpone": return messagePostpone(); break
    case "moveCase": return messageMove(); break
    case "copyCase": return messageCopy(); break
    case "delete": return messageDelete(); break
    case "setholyday": return messageHolyday(); break
    case "submenu": return messagesubmenu(); break
    case "clickSetStaff": return messageStaffSetting(); break
    case "clickSetGovtday": return messageSetGovtday(); break
    case "usage": return messageUser(); break
    case "SearchWords": return messageSearchWords(); break
    case "SearchWordsAll": return messageSearchWordsAll(); break
    case "SearchWordsInterval": return messageSearchWordsInterval(); break
    case "SearchAll": return messageSearchAll(); break
    case "SearchAllAll": return messageSearchAllAll(); break
    case "SearchAllInterval": return messageSearchAllInterval(); break
    case "clickallDeletedCases": return messageAllDeletedCases(); break
    default: null
  }
}

function messageStaff()
{
   return (
`เมื่อคลิกเลือกชื่ออาจารย์ จะมีการแบ่งครึ่งหน้าจอ โดย
   ด้านซ้าย เป็นตารางรวม
   ด้านขวา เป็นตารางของอาจารย์ท่านนั้น

ใช้เมาส์ชี้ที่เส้นแบ่งกลาง กดปุ่มซ้ายค้างไว้ เปลี่ยนความกว้าง ซ้าย|ขวา ระหว่างตาราง`)
}

function messageServiceReview()
{
   return ("ต้องการเปลี่ยนเดือน คลิกหัวลูกศร ซ้าย ขวา")
}

function messageSearch()
{
   return (
`หาเคส  ด้วย HN, ชื่อ, นามสกุล, ชื่อ Staff, หรือ คำใดๆ ก็ได้
กำหนดช่วงเวลาได้`)
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

function messageHolyday()
{
   return (
`วันที่ตามปฏิทินสากล จะไม่ตรงกันทุกปี
ผู้ใช้ต้องกำหนดวันที่ในแต่ละปีเอง

ถ้าวันที่ ที่กำหนดไว้ล่วงหน้าในตารางผิด คลิกตรงช่อง Date แก้ไขได้`)
}

function messagesubmenu()
{
   return ("อัพเดทรายชื่ออาจารย์ เป็นสิทธิระดับอาจารย์เท่านั้น")
}

function messageStaffSetting()
{
   return (
`อัพเดทรายชื่ออาจารย์ เจ้าหน้าที่
แก้ไขสถานะงานของอาจารย์ เจ้าหน้าที่
แก้ไขลำดับเวร consult ประจำสัปดาห์
แก้ไขวันเริ่มต้นสัปดาห์ consult ถ้าโปรแกรมคำนวณผิด`)
}

function messageSetGovtday()
{
   return (
`กำหนดวันหยุดปฏิทินสากล

วันที่ ตรงกันทุกปี ตามปฏิทินสากล`)
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

คลิกที่ช่อง HN หรือ PATIENT ที่มีข้อมูลอยู่แล้ว จะไม่มีผลข้างเคียงปรากฏ

Esc ยกเลิก ไม่บันทึก (ก่อน 10 วินาที)

Enter ไม่ได้บันทึก แต่ไปขึ้นบรรทัดใหม่ในช่องเดิม`)
}

function messageSearchWords()
{
  return (
`หาเคส  ด้วย HN, ชื่อ, นามสกุล, ชื่อ Staff, หรือ คำใดๆ ก็ได้`)
}

function messageSearchWordsAll()
{
  return (
`หาจากเคสทั้งหมดตั้งแต่เริ่มมีข้อมูล
   (พ.ศ.2561 ค.ศ.2018)`)
}

function messageSearchWordsInterval()
{
  return (
`หาจากเคสในช่วงเวลาเฉพาะ
วัน "ตั้งแต่:" และวัน "จนถึง:"`)
}

function messageSearchAll()
{
  return (
`ดูทุกเคสตั้งแต่เริ่มมีข้อมูล ยกเว้นเคสที่ถูกลบ
ปรากฏทีละ 1 สัปดาห์
คลิกด้านล่างเลื่อนดู ย้อนหน้า-ย้อนหลัง`)
}

function messageSearchAllAll()
{
  return (
`หาจากเคสทั้งหมดตั้งแต่เริ่มมีข้อมูล
   (พ.ศ.2561 ค.ศ.2018)`)
}

function messageSearchAllInterval()
{
  return (
`หาจากเคสในช่วงเวลาเฉพาะ
วัน "ตั้งแต่:" และวัน "จนถึง:"`)
}

function messageAllDeletedCases()
{
  return "ให้ Undelete เคสได้"
}
