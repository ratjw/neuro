
import { setMainMessage } from "./setMainMessage.js"
import { setMenuMessage } from "./setMenuMessage.js"
import { messageConsult, messageWaitlist, messageService,
  messageDeleted, messageHoliday } from "./setMiscMessage.js"

const menulist = [
  "Staff",
  "clickserviceReview",
  "Search",
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
  "usage",
  "SearchWords",
  "SearchWordsAll",
  "SearchWordsInterval",
  "SearchAll",
  "SearchAllAll",
  "SearchAllInterval",
  "clickallDeletedCases"
]

export function tooltip()
{
  let mainth = document.querySelectorAll("#maintbl tr:has(th)")
  let usage = document.querySelector("#usage")
  let menuid = document.querySelectorAll("#cssmenu [id]")
  let menu = [...menuid].filter(e => menulist.includes(e.id))
  let consult = document.querySelectorAll(".consult")
  let waitlist = document.querySelector("#queuewrapper")
  let service = document.querySelector("#dialogService")
  let deleted = document.querySelector("#dialogAllDeleted")
  let holiday = document.querySelector("#dialogHoliday")

  if (/Mobi|Android|iPhone|iPod|iPad/i.test(navigator.userAgent)) return
;
  [...mainth].forEach(tr => {
    attachTooltip([...tr.querySelectorAll("th")])
  })

  attachTooltip([...menu, ...consult, waitlist, service, deleted, holiday])
}

function attachTooltip(tooltipElements)
{
  const tooltip = document.querySelector('.custom-tooltip')
  let timeout = null
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        tooltip.textContent = getMessage(e, tooltip)
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
 
function getMessage(e, tooltip)
{
  let table = e.target.closest("table")
  let div = e.target.closest("div")
  let column = e.target.cellIndex
  let id = e.target.id
  let consult = e.target.className === "consult"

  if (consult) return messageConsult()
  if (id === "queuewrapper") return messageWaitlist()
  if (div && div.id === "dialogService") return messageService(tooltip)
  if (div && div.id === "dialogAllDeleted") return messageDeleted()
  if (div && div.id === "dialogHoliday") return messageHoliday()
  if (div && div.id === "cssmenu") return setMenuMessage(id)
  if (table && table.id === "maintbl") return setMainMessage(column)
}
