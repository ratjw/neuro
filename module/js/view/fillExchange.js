
import { PATIENT } from "../control/const.js"
import { getOncallExchange } from "../util/getSTAFFparsed.js"
import { START_DATE } from "../util/date.js"

export function fillExchange(tableSaturdayRows)
{
  let staffs = getOncallExchange()

  staffs = getActiveExchange(staffs)
  staffs = uniqueExchngDates(staffs)
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
/*
"อ.อัตถพร": {"2020-02-22": {1582636820525: "000000"}}

"อ.เกรียงศักดิ์": {"2020-02-22": {1582635474678: "000000"}}
*/
function uniqueExchngDates(staffs)
{
  const staffsObj = mutateToObj(staffs)
  const exchngDates = Object.values(staffsObj).map(exchng => Object.keys(exchng).toString())
  const findDups = exchngDates.filter((e, i) => exchngDates.indexOf(e) != i)
  const dupDates = [...new Set(findDups)]

  dupDates.forEach(dupDate => {
    let timestamp = 0
    let staffItem = {}
    Object.entries(staffsObj).forEach(([staff, exchng]) => {
      Object.entries(exchng).forEach(([date, edit]) => {
        if (date === dupDate) {
          let editTime = Object.keys(edit)[0]
          if (timestamp === 0) {
            timestamp = editTime
            staffItem = staff
            return
          }
          if (editTime > timestamp) {
            timestamp = editTime
            delete staffsObj[staffItem][date]
          } else {
            delete staffsObj[staff][date]
          }
        }
      })
    })
  })

  Object.entries(staffsObj).forEach(([staff, exchng]) => {
    if (Object.entries(exchng).length === 0) {
      delete staffsObj[staff]
    }
  })

  return staffsObj
}

function mutateToObj(staffs)
{
  const staffsObj = {}

  staffs.forEach(staff => {
    staffsObj[Object.keys(staff)[0]] = Object.values(staff)[0]
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
/*
function uniqueExchngDates(exchange)
{
  const exchngDates = Object.values(exchange).map(exchng => Object.keys(exchng).toString())
  const findDups = exchngDates.filter((e, i) => exchngDates.indexOf(e) != i)
  const dupDates = [...new Set(findDups)]

  dupDates.forEach(dupDate => {
    let timestamp = 0
    let staffItem = {}
    Object.entries(exchange).forEach(([staff, exchng]) => {
      Object.entries(exchng).forEach(([date, edit]) => {
        if (date === dupDate) {
          let editTime = Object.keys(edit)[0]
          if (timestamp === 0) {
            timestamp = editTime
            staffItem = staff
            return
          }
          if (editTime > timestamp) {
            timestamp = editTime
            delete exchange[staffItem][date]
          } else {
            delete exchange[staff][date]
          }
        }
      })
    })
  })

  return [...exchange].filter(staff => Object.values(staff).filter(exchng => 
    Object.keys(exchng).length !== 0))
}

export function getOncallExchange()
{
  let staffs = getSTAFFparsed()

  // retrieve exchange field in only staffs with exchange
  staffs = staffs.filter(staff => staff.profile.exchange)
  staffs = staffs.map(has => ( {[has.profile.staffname]: has.profile.exchange} ))

  staffs.forEach(staff => {
    Object.entries(staff).forEach(([name, exchng]) => {
      Object.entries(exchng).forEach(([date, edit]) => {
        // remove out-of-date exchange
        if (date < START_DATE) {
          delete staffs[staff][date]
        }
        // remove staff with empty exchange
        if (Object.entries(edit).length === 0) {
          delete staffs[staff]
        }
      })
    })
  })

  return staffs
}
*/
