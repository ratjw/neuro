
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
  let cssmenu = document.querySelectorAll("#cssmenu [id]")
  let user = document.querySelector("#cssmenu")
  let waiting = document.querySelector("#titlebar")
  let service = document.querySelector("#servicetbl thead")
  let menu = [...cssmenu].filter(e => menulist.includes(e.id))
;
  [...mainth].forEach(tr => {
    attachTooltip([...tr.querySelectorAll("th")])
  })

  menu.push(user, waiting, service)
  attachTooltip(menu)
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
    });
  });

  document.getElementById("wrapper").addEventListener("mousemove", 
    tooltip.classList.remove('show')
  )
}
 
function getMessage(e)
{
  let table = e.target.closest("table")
  let div = e.target.closest("div")
  let column = e.target.cellIndex
  let id = e.target.id

  if (table) {
    if (table.id === "maintbl") return setMainMessage(column)
    else if (table.id === "servicetbl") return setMenuMessage(table.id)
  }

  if (div && div.id === "cssmenu") return setMenuMessage(id)
  if (div && div.id === "titlebar") return setMenuMessage(id)
  if (div && div.id === "oneRowMenu") return setMenuMessage(id)
}
