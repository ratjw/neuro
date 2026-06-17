
import {
  OPDATE, OPROOM, OPTIME, CASENUM, STAFFNAME, HN, PATIENT, DIAGNOSIS,
  TREATMENT, EQUIPMENT, CONTACT
} from "../const.js"

export function tooltip()
{
  let mainth = document.querySelectorAll("#maintbl tr:has(th)")
  let servicetreatment = document.querySelectorAll("#maintbl th")
  let retrace = document.querySelectorAll("#maintbl th")
  let add = document.querySelectorAll("#maintbl th")
  let postpone = document.querySelectorAll("#maintbl th")
  let move = document.querySelectorAll("#maintbl th")
  let copy = document.querySelectorAll("#maintbl th")
  let del = document.querySelectorAll("#maintbl th")
  let holiday = document.querySelectorAll("#maintbl th")
  let staff = document.querySelectorAll("#maintbl th")
  let interholiday = document.querySelectorAll("#maintbl th")
  let general = document.querySelectorAll("#maintbl th")
;
  [...mainth].forEach(tr => {
    attachTooltip([...tr.querySelectorAll("th")])
  })
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
        tooltip.style.top = e.pageY - 40 + 'px';
     });
     
     element.addEventListener('mouseleave', (e) => {
        tooltip.classList.remove('show');
     });
  });
}
 
function getMessage(e)
{
  let target = /*e.target.closest("table").id + */e.target.cellIndex

  return setMessage(target)
}

function setMessage(column)
{
  switch(column)
  {
    case OPDATE: return messageOPDATE(); break
    case OPROOM: return messageOPROOM();; break
    case OPTIME: return messageOPTIME();; break
    case CASENUM: return messageCASENUM();; break
    case STAFFNAME: return messageSTAFFNAME();; break
    case HN: return messageHN();; break
    case PATIENT: return messagePATIENT();; break
    case DIAGNOSIS: return messageDIAGNOSIS();; break
    case TREATMENT: return messageTREATMENT();; break
    case EQUIPMENT: return messageEQUIPMENT();; break
    case CONTACT: return messageCONTACT();; break
  }
}

function messageOPDATE()
{
  return (
`คอลัมน์ Date - คลิกเลือกเคส
 
 การเปลี่ยนวันผ่าตัด ทำได้ 2 วิธี
	1. Drag & Drop ลากข้ามตารางได้
	2. คลิกเลือกเคส ตรงช่องซ้ายสุดของเคสที่ต้องการ ->
          คลิก Move ตรงเมนูแถวบน ->
          คลิกตรงวันที่ต้องการ`)
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
`คอลัมน์ Staff - คลิกเลือกชื่ออาจารย์เจ้าของไข้`)
}

function messageHN()
{
  return (
`คอลัมน์ HN - ใส่ได้เฉพาะเมื่อยังว่าง`)
}

function messagePATIENT()
{
   return (
`คอลัมน์ Patient - วันเสาร์เป็นชื่ออาจารย์ Consult`)
}

function messageDIAGNOSIS()
{
  return (
`Login ID      เลขประจำตัว 6 หลัก            
Password     ที่ใช้กับโรงพยาบาล`)
}

function messageTREATMENT()
{
  return (
`การบันทึกข้อมูล
   เมื่อพิมพ์ข้อความเสร็จ ให้บันทึกโดย
   1. คลิกที่ช่องอื่น
   2. คลิกที่แถบคั่นสัปดาห์
   3. กด Tab (เลื่อนไปช่องต่อไป) 
   4. กด Shift+Tab (เลื่อนไปช่องย้อนหลัง)
   5. โปรแกรมจะบันทึก ’ข้อมูลใหม่’ เอง เมื่ออยู่นิ่ง 10 วินาที`)
}

function messageEQUIPMENT()
{
   return (
`Esc ยกเลิก ไม่บันทึก (ก่อน 10 วินาที)

Enter ไม่ได้บันทึก แต่ไปขึ้นบรรทัดใหม่ในช่องเดิม`)
}

function messageCONTACT()
{
   return (
`คอลัมน์ CONTACT - เบอร์โทร ที่อยู่ ชื่อญาติ
     Notes - ฐานะการเงิน ยาป้องกันเลือดแข็งตัว แพ้ยา`)
}

/*

Menu แถวบน
	Staff เป็น dropdown รายชื่ออาจารย์
         คลิกเลือกชื่ออาจารย์
	       จะมีการแบ่งครึ่งหน้าจอ
             ด้านซ้าย เป็นตารางรวม
	       ด้านขวา เป็นตารางของอาจารย์ท่านนั้น
	       ใช้เมาส์ชี้ที่เส้นแบ่งกลาง เปลี่ยนความกว้าง ซ้าย|ขวา 
	Service Review
	      ต้องการเปลี่ยนเดือน คลิกหัวลูกศร ซ้าย ขวา
	      ต้องลงเคสที่ตารางรวมก่อน ไม่สามารถลงเคสที่ตารางนี้
	Search
		หาเคส  ด้วย HN, ชื่อ, นามสกุล
			            Staff
			            คำใดๆ ที่ต้องการ
All Saved Cases
     ดูทุกเคสตั้งแต่เริ่มมีข้อมูล ยกเว้นเคสที่ถูกลบ
     ปรากฏทีละ 1 สัปดาห์
     คลิกด้านล่างเลื่อนดู ย้อนหน้า-ย้อนหลัง
All Deleted Cases
     เคสที่ถูกลบออกไป (แสดงเพียง 3 เดือนสุดท้าย)
		     คลิกที่ช่องซ้ายสุดของเคส เพื่อ Undelete
   
   เมื่อคลิกช่องซ้ายสุด เป็นการเลือกเคสเดียว
      เมนูแถวบน จะเพิ่มตัวเลือก
      Retrace    ดูประวัติการแก้ไข
	Add           เพิ่มเคสในวันเดียวกัน
	Postpone  เลื่อนวันไปไม่มีกำหนด ต้องมีชื่อ Staff ก่อน
	Move         คลิก move แล้วเลื่อนเมาส์ไป
 คลิกตรงวันที่ต้องการ
      Copy         คลิก copy แล้วเลื่อนเมาส์ไป
 คลิกตรงวันที่ต้องการ

Equipment
	แบบฟอร์มที่เคยใส่ข้อมูลแล้ว ต้องคลิก ‘แก้ไข’ ก่อน


Setting
	Staff Setting		อัพเดทรายชื่ออาจารย์
	วันหยุดปฏิทินสากล	วันหยุดนักขัตฤกษ์ วันที่ ตรงกันทุกปี
			สำหรับ	วันหยุดนักขัตฤกษ์ วันที่ ไม่ตรงกันทุกปี
ผู้ใช้ต้องกำหนดเอง
	Readme
*/
