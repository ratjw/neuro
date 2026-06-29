
import { setMainMessage } from "./setMainMessage.js"
import { setMenuMessage } from "./setMenuMessage.js"

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
  let user = document.querySelector("#cssmenu")
  let menuid = user.querySelectorAll("[id]")
  let menu = [...menuid].filter(e => menulist.includes(e.id))
  let waiting = document.querySelector("#titlebar")
  let service = document.querySelector("#servicetbl thead")
  let consult = document.querySelectorAll(".consult")

  if (/Mobi|Android|iPhone|iPod|iPad/i.test(navigator.userAgent)) return 
;
  [...mainth].forEach(tr => {
    attachTooltip([...tr.querySelectorAll("th")])
  })

  menu.push(user, waiting, service)
  attachTooltip(menu)

  attachTooltip([...consult])
}

function attachTooltip(tooltipElements)
{
  const tooltip = document.querySelector('.custom-tooltip')
  let timeout = null
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
      timeout = setTimeout(() => {
        tooltip.textContent = getMessage(e)
        tooltip.classList.add('show')
      }, 1000)
    });

    element.addEventListener('mousemove', (e) => {
      tooltip.style.left = e.pageX + 20 + 'px';
      tooltip.style.top = e.pageY + 'px';
    });

    element.addEventListener('mouseleave', (e) => {
      tooltip.classList.remove('show')
      clearTimeout(timeout)
      setTimeout(() => {
        tooltip.classList.remove('show')
      }, 1000)
    });
  });
}
 
function getMessage(e)
{
  let table = e.target.closest("table")
  let div = e.target.closest("div")
  let column = e.target.cellIndex
  let id = e.target.id
  let consult = e.target.className === "consult"

  if (consult) return consultMessage()
  if (table && table.id === "maintbl") return setMainMessage(column)

  if (div) {
    if (div.id === "cssmenu") return setMenuMessage(id)
    if (div.id === "titlebar") return setMenuMessage(id)
    if (div.id === "oneRowMenu") return setMenuMessage(id)
    if (div.id === "dialogService") return setMenuMessage(div.id)
  }
}

function consultMessage()
{
  return (
`วิธีแลกเวรคอนซัลท์อาจารย์
 : Desktop กดปุ่มขวาเมาส์ค้างไว้ ที่
 : Mobile นิ้วกดค้าง ที่
ช่อง สัปดาห์ consult อ. (ช่อง Patient วันเสาร์) จะมีรายชื่ออาจารย์ขึ้นมา ให้เลือก ชื่อ อ. ที่มาอยู่แทน`)
}