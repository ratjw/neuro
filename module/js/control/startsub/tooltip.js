
import { setMainMessage } from "./setMainMessage.js"
import { setMenuMessage } from "./setMenuMessage.js"
import { messageConsult, messageWaitlist, messageService } from "./setMiscMessage.js"

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
  "setholyday",
  "submenu",
  "clickSetStaff",
  "clickSetGovtday",
  "usage"
]

export function tooltip()
{
  let mainth = document.querySelectorAll("#maintbl tr:has(th)")
  let usage = document.querySelector("#usage")
  let menuid = document.querySelectorAll("#cssmenu [id]")
  let menu = [...menuid].filter(e => menulist.includes(e.id))
  let waitlist = document.querySelector("#queuewrapper")
  let service = document.querySelector("#servicetbl thead")
  let consult = document.querySelectorAll(".consult")

  if (/Mobi|Android|iPhone|iPod|iPad/i.test(navigator.userAgent)) return 
;
  [...mainth].forEach(tr => {
    attachTooltip([...tr.querySelectorAll("th")])
  })

  attachTooltip([...menu, ...consult, waitlist, service])
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
      }, 8000)
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

  if (consult) return messageConsult()
  if (id === "queuewrapper") return messageWaitlist()
  if (div && div.id === "dialogService") return messageService()
  if (div && div.id === "cssmenu") return setMenuMessage(id)
  if (table && table.id === "maintbl") return setMainMessage(column)
}
