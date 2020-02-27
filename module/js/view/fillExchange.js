
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
  if (staffname === cell.dataset.consult) { return }
  if (edittime < cell.dataset.edittime) { return }
  cell.dataset.edittime = edittime
  if (!cell.dataset.origconsult) {
    cell.dataset.origconsult = cell.dataset.consult
  }
  else if (cell.dataset.origconsult === staffname) {
    delete cell.dataset.origconsult
  }

  cell.dataset.consult = staffname
}

//=====================================
function removeDupExchng(staffs)
{
  // convert from array of objects to an object of objects
//  const staffsObj = Object.assign({}, ...staffs)
  const eachExchDates = getEachExchDate(staffs)

  return removeDups(eachExchDates)
}

function getEachExchDate(staffs)
{
  const eachExchDate = []

  staffs.forEach(staff => {
    Object.entries(staff).forEach(([name, exch]) => {
      Object.entries(exch).forEach(([date, edit]) => {
        let latestEdit = getLatestKey(edit)
        let subObj = {[name]: {[date]: latestEdit}}
        eachExchDate.push(subObj)
      })
    })
  })

  return eachExchDate
}

function removeDups(staffs)
{
  let dateArray = []
  let timestamp = 0
  let num = 0

  staffs.forEach((staff, i) => {
    Object.entries(staff).forEach(([name, exchng]) => {
      Object.entries(exchng).forEach(([date, edit]) => {
        let editTime = Object.keys(edit)[0]
        if (timestamp === 0) {
          dateArray.push(date)
          timestamp = editTime
          num = i
          return
        }
        if (dateArray.includes(date)) {
          if (editTime > timestamp) {
            timestamp = editTime
            staffs.splice(num, 1)
          } else {
            staffs.splice(i, 1)
          }
        } else {
          dateArray.push(date)
        }
      })
    })
  })

  return staffs
}

/*
function removeDupExchng(staffs)
{
  // convert from array of objects to an object of objects
  const staffsObj = Object.assign({}, ...staffs)
  const exchngDates = Object.values(staffsObj).map(exchng => Object.keys(exchng).join())
  const findDups = exchngDates.filter((e, i) => exchngDates.indexOf(e) !== i)
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

  Object.entries(staffsObj).forEach(([name, exchng]) => {
    if (Object.entries(exchng).length === 0) {
      delete staffsObj[name]
    }
  })

  return staffsObj
}
*/
