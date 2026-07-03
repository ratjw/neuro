
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
`คอลัมน์เลือกเคส เลือกได้ทีละเคสเท่านั้น
 
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
`คอลัมน์เลือกห้องผ่าตัด

เปลี่ยนเบอร์ห้อง
   - คลิกหัวลูกศร มากขึ้น-น้อยลง
   - ใช้ล้อหมุนเมาส์
ลบห้องผ่าตัด ใช้เลข 0`)
}

function messageOPTIME()
{
  return (
`คอลัมน์เลือกเวลา

เปลี่ยนเวลา
   - คลิกหัวลูกศร มากขึ้น-น้อยลง
   - ใช้ล้อหมุนเมาส์
ลบเวลา ใช้เลข 00.00`)
}

function messageCASENUM()
{
  return (
`คอลัมน์เลือกลำดับเคส

เปลี่ยนลำดับเคส
   - คลิกหัวลูกศร มากขึ้น-น้อยลง
   - ใช้ล้อหมุนเมาส์
ลบลำดับเคส ใช้เลข 0`)
}

function messageSTAFFNAME()
{
  return ("คอลัมน์เลือกชื่ออาจารย์เจ้าของไข้")
}

function messageHN()
{
  return (
`คอลัมน์หาผู้ป่วยด้วย HN

ใส่ได้เฉพาะเมื่อยังว่าง`)
}

function messagePATIENT()
{
   return (
`คอลัมน์หาผู้ป่วยด้วยชื่อ และ/หรือ นามสกุล 

วันเสาร์เป็นชื่ออาจารย์ Consult
ต้องการแลกเวร
   Right mouse click
   เลือกชื่ออาจารย์ที่มาอยู่แทน`)
}

function messageDIAGNOSIS()
{
  return (
`คอลัมน์ชื่อโรคทั้งหมด

เป็นช่องที่ใช้ใส่ข้อความประกาศได้ เมื่อไม่มี HN`)
}

function messageTREATMENT()
{
  return (
`คอลัมน์ชื่อการผ่าตัด

เป็นช่องที่ใช้ใส่ข้อความประกาศได้ เมื่อไม่มี HN`)
}

function messageEQUIPMENT()
{
   return (`คอลัมน์กรอกแบบฟอร์มเตรื่องมือแพทย์ที่จะใช้

แบบฟอร์มที่เคยใส่ข้อมูลแล้ว ต้องคลิก ‘แก้ไข’ ก่อน`)
}

function messageCONTACT()
{
   return (
`คอลัมน์จดบันทึก

Contact ติดต่อผู้ป่วย เบอร์โทร ที่อยู่ปัจจุบัน ชื่อญาติผู้ติดตาม

Notes - ฐานะการเงิน ยาป้องกันเลือดแข็งตัว แพ้ยา`)
}
