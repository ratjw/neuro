
import {
  OPDATE, OPROOM, OPTIME, CASENUM, STAFFNAME, HN, PATIENT, DIAGNOSIS,
  TREATMENT, EQUIPMENT, CONTACT
} from "../const.js"

export function setMainMessage(column)
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
