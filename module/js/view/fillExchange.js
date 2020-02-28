
import { PATIENT } from "../control/const.js"
import { getOncallExchange } from "../util/getSTAFFparsed.js"
import { START_DATE } from "../util/date.js"
import { getLatestKey } from "../util/util.js"

export function fillExchange(tableSaturdayRows)
{
  let staffs = getOncallExchange()

  staffs = getActiveExchange(staffs)
//  staffs = removeDupExchng(staffs)
  staffs.forEach(staff => {
    Object.entries(staff).forEach(([staffname, exchng]) => {
      Object.entries(exchng).forEach(([date, edit]) => {
        tableSaturdayRows.some(row => {
          let rowdate = row.dataset.opdate,
            edittime = getLatestKey(edit)
          if (rowdate === date) {
            fillExchngCell(row.cells[PATIENT], staffname, edittime)
            return true
          }
          // beyond exchange date -> break loop
          else if (rowdate > date) {
            return true
          }
        })
      })
    })
  })

  tableSaturdayRows.forEach(row => delete row.cells[PATIENT].dataset.edittime)
}

function getActiveExchange(staffs)
{
  staffs.forEach((staff, i) => {
    Object.entries(staff).forEach(([name, exchng]) => {
      Object.keys(exchng).forEach(date => {
        // remove out-of-date exchange
        if (date < START_DATE) {
          delete staffs[i][name][date]
        }
      })
    })
  })
          // remove staffs with empty exchange
  return staffs.filter(staff => Object.entries(Object.values(staff)[0]).length !== 0)
}

function fillExchngCell(cell, staffname, edittime)
{
  let celltime = cell.dataset.edittime ? Number(cell.dataset.edittime) : 0

  if (staffname === cell.dataset.consult) { return }
  if (edittime < celltime) { return }
  cell.dataset.edittime = edittime
  if (!cell.dataset.origconsult) {
    cell.dataset.origconsult = cell.dataset.consult
  }
  else if (cell.dataset.origconsult === staffname) {
    delete cell.dataset.origconsult
  }

  cell.dataset.consult = staffname
}
