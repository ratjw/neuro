
import { PATIENT } from "../control/const.js"
import { getOncallExchange } from "../setting/getSTAFF.js"
import { START_DATE } from "../util/date.js"
import { getLatestKey } from "../util/util.js"

export function fillExchange(tableSaturdayRows)
{
  const staffs = getOncallExchange()
  const staffsOncall = getActiveExchange(staffs)
  const staffsObj = getUniqExchDates(staffsOncall)

  if (!staffsObj) { return }

  Object.entries(staffsObj).forEach(([staffname, exchng]) => {
    Object.keys(exchng).forEach(date => {
      let rowSat = tableSaturdayRows.find(row => row.dataset.opdate === date)
      fillExchngCell(rowSat.cells[PATIENT], staffname)
    })
  })
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

function fillExchngCell(cell, staffname)
{
  if (staffname === cell.dataset.consult) { return }

  if (!cell.dataset.origconsult) {
    cell.dataset.origconsult = cell.dataset.consult
  }
  else if (cell.dataset.origconsult === staffname) {
    delete cell.dataset.origconsult
  }

  cell.dataset.consult = staffname
}

function removeDupExchng(staffs)
{
  const eachExchDates = getUniqueExchDates(staffs)

  return removeDups(eachExchDates)
}

function getUniqExchDates(staffs)
{
  // convert from array of objects to an object of objects
  let staffsObj = Object.assign({}, ...staffs)
  let exchngDates = Object.values(staffsObj).map(exchng => Object.keys(exchng)).flat()
  let findDups = exchngDates.filter((e, i) => exchngDates.indexOf(e) !== i)

  if (findDups.length) {
    staffsObj = deleteDups(findDups, staffsObj)
  }

  Object.entries(staffsObj).forEach(([name, exchng]) => {
    if (Object.entries(exchng).length === 0) {
      delete staffsObj[name]
    }
  })

  return staffsObj
}

function deleteDups(findDups, staffsObj)
{
  const dupDates = [...new Set(findDups)]

  dupDates.forEach(dupDate => {
    let timestamp = 0
    let staffname = ''
    Object.entries(staffsObj).forEach(([name, exchng]) => {
      Object.entries(exchng).forEach(([date, edit]) => {
        if (date === dupDate) {
          let editTime = getLatestKey(edit)
          if (timestamp === 0) {
            timestamp = editTime
            staffname = name
            return
          }
          if (editTime > timestamp) {
            timestamp = editTime
            delete staffsObj[staffname][date]
          } else {
            delete staffsObj[name][date]
          }
        }
      })
    })
  })

  return staffsObj
}
