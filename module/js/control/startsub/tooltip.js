
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

;  [...mainth].forEach(tr => {
    let eachth = tr.querySelectorAll("th")
    eachth[OPDATE].setAttribute("class","js-tooltip")
    eachth[OPDATE].setAttribute("help",`การเปลี่ยนวันผ่าตัด (Date)
   ทำได้ 2 วิธี
	1. Drag & Drop ลากข้ามตารางได้
	2. คลิกเลือกเคส ตรงช่องซ้ายสุดของเคสที่ต้องการ
          คลิก Move ตรงเมนูแถวบน
          คลิกตรงวันที่ต้องการ`)
  })

  const tooltipElements = document.querySelectorAll('.js-tooltip');
  const tooltip = document.querySelector('.custom-tooltip');
  
  tooltipElements.forEach(element => {
     element.addEventListener('mouseenter', (e) => {
        tooltip.textContent = e.target.getAttribute('help');
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

/*
Login ID       เลขประจำตัว 6 หลัก            
Password     ที่ใช้กับโรงพยาบาล

การเปลี่ยนวันผ่าตัด (Date)
   ทำได้ 2 วิธี
	1. Drag & Drop ลากข้ามตารางได้
	2. คลิกเลือกเคส ตรงช่องซ้ายสุดของเคสที่ต้องการ
          คลิก Move ตรงเมนูแถวบน
          คลิกตรงวันที่ต้องการ

การบันทึกข้อมูล
   เมื่อพิมพ์ข้อความเสร็จ ให้บันทึกโดย
	1. คลิกที่ช่องอื่น หรือคลิกที่แถบคั่นสัปดาห์
	2. กด Tab (เลื่อนไปช่องต่อไป) 
	3. กด Shift+Tab (เลื่อนไปช่องย้อนหลัง)
      4. โปรแกรมจะบันทึก ’ข้อมูลใหม่’ เอง เมื่ออยู่นิ่ง 10 วินาที

Esc ยกเลิก ไม่บันทึก (ก่อน 10 วินาที)
Enter ไม่ได้บันทึก แต่ไปขึ้นบรรทัดใหม่ในช่องเดิม

ตารางหลัก
	คอลัมน์ Date - คลิกเลือกเคส
	คอลัมน์ Rm   - คลิกเลือกห้องผ่าตัด
                            คลิกหัวลูกศร มากขึ้น-น้อยลง
                               หรือใช้ล้อหมุนเมาส์
		                    ลบห้องผ่าตัด ใช้เลข 0
	คอลัมน์ Time – คลิกเลือกเวลา
                            คลิกหัวลูกศร มากขึ้น-น้อยลง
                               หรือใช้ล้อหมุนเมาส์
		                 ลบเวลา ใช้เลข 00.00
	คอลัมน์ №     - คลิกเลือกลำดับเคส
                            คลิกหัวลูกศร มากขึ้น-น้อยลง
                               หรือใช้ล้อหมุนเมาส์
		                 ลบลำดับเคส ใช้เลข 0
	คอลัมน์ Staff
		คลิกเลือกชื่ออาจารย์เจ้าของไข้
	คอลัมน์ HN
		ใส่ได้เฉพาะเมื่อยังว่าง
	คอลัมน์ Patient
		วันเสาร์เป็นชื่ออาจารย์ Consult

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
}
