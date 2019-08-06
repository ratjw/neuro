
import { exportQbookToExcel } from "../util/excel.js"
import { THEATRE, OPTIME, CASENUM, CONTACT } from "../control/const.js"

export function sendtoExcel()
{
  let capture = document.querySelector("#capture"),
    tbody = capture.querySelector("tbody"),
    selected = document.querySelectorAll(".selected"),
    template = document.querySelector('#capturerow'),
    hide = [THEATRE, OPTIME, CASENUM, CONTACT]

  tbody.innerHTML = template.innerHTML
  selected.forEach(e => {
    capture.querySelector("tbody").appendChild(e.cloneNode(true))
  })

  let rows = capture.querySelectorAll('tr')

  rows.forEach(e => e.classList.remove('selected'))
  rows.forEach(e => e.classList.remove('beginselected'))

  hide.forEach(i => {
    rows.forEach(tr => {
      tr.cells[i].style.display = 'none'
    })
  })

  exportQbookToExcel()
}
