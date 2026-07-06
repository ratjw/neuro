
export function messageConsult()
{
  return (
`วิธีแลกเวรคอนซัลท์อาจารย์
 : Desktop กดปุ่มขวาเมาส์ค้างไว้
 : Mobile นิ้วกดค้างไว้
จะมีรายชื่ออาจารย์ขึ้นมา ให้เลือก ชื่อ อ. ที่มาอยู่แทน`)
}

export function messageWaitlist()
{
  return `ตารางเคสเฉพาะของอาจารย์ท่านนี้

 *** ด้านท้ายตาราง มีเคสรอใน waiting list ***`
}

export function messageService(tooltip)
{
  setTimeout(() => {
    tooltip.classList.remove('show')
  }, 8000)

  return "ต้องลงเคสที่ตารางรวมก่อน ไม่สามารถลงเคสที่ตารางนี้"
}

export function messageDeleted()
{
  return "คลิกที่ช่องซ้ายสุดของเคส เพื่อ Undelete เคสนี้จะกลับไปตำแหน่งเดิม"
}

export function messageHoliday()
{
  const  title = $("#dialogHoliday").dialog("option", "title"),
    INTER = `ท้ายสุดของตาราง คลิกช่อง Date เลือกวันที่ เดือน ที่จะเป็นวันหยุดทุกปี
-> คลิกรูปแผ่นดิสก์`,
    THAI = `ถ้าวันหยุดที่กำหนดไว้ล่วงหน้าผิด คลิกช่อง Date เพื่อแก้ไขวันที่ เดือน ได้

ท้ายสุดของตาราง มีวันที่ ที่คลิกเลือกมา
-> คลิกตรงช่องข้างขวา เลือกชื่อวันหยุดทางศาสนา
-> คลิกรูปแผ่นดิสก์`

  if (title === "วันหยุดปฏิทินสากล") return INTER
  if (title === "วันหยุดปฏิทินไทย") return THAI
}
