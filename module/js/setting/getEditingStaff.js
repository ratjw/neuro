
import { saveStaff } from "../setting/saveStaff.js"

export function getEditingStaff($tbody)
{
  $tbody.find('tr').each(function(i, row) {
    let save = false
    $(row).find('td').each(function(i, cell) {
      let selected = cell.querySelector("select")
      let input = cell.querySelector('input')
      if (selected) {
        cell.textContent = selected.value
        save = true
        return false
      } else if (input) {
        cell.textContent = input.value
        save = true
        return false
      } else {
        if (cell.textContent !== cell.dataset.val) {
          save = true
          return false
        }
      }
    })
    if (save) saveStaff(row)
  })
}

function getSelected(selected, cell)
{
  let index = selected.selectedIndex 
  if (index > -1) {
    if (selected[index].text !== cell.dataset.val) {
      cell.innerHTML = selected[index].text
      return true
    }
  }
}
