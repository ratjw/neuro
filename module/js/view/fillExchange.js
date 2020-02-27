
import { PATIENT } from "../control/const.js"
import { getOncallExchange } from "../util/getSTAFFparsed.js"
import { START_DATE } from "../util/date.js"
import { getLatestKey } from "../util/util.js"

export function fillExchange(tableSaturdayRows)
{
  let staffs = getOncallExchange()

  staffs = getActiveExchange(staffs)
  staffs = removeDupExchng(staffs)
  Object.entries(staffs).forEach(([staffname, exchng]) => {
    Object.keys(exchng).forEach(date => {
      tableSaturdayRows.some(row => {
        const rowdate = row.dataset.opdate
        if (rowdate === date) {
          fillExchngCell(row.cells[PATIENT], staffname)
          return true
        }
        // beyond exchange date -> break loop
        else if (rowdate > date) {
          return true
        }
      })
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

function removeDupExchng(staffs)
{
  // convert from array of objects to an object of objects
//  const staffsObj = Object.assign({}, ...staffs)
  const exchngDates = getEachExchDate(staffs)
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

function getEachExchDate(staffs)
{
  const eachExchDate = []

  staffs.forEach(staff => {
    Object.entries(staff).forEach(([name, exch]) => {
      Object.entries(exch).forEach(([date, edit]) => {
        let subObj = {[name]: {[date]: edit}}
        eachExchDate.push(subObj)
      })
    })
  })

  return eachExchDate
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
function arrayToObj(staffs)
{
  const staffsObj = {}

  staffs.forEach(staff => {
    staffsObj.assign(staff)
  })

  return staffsObj
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
