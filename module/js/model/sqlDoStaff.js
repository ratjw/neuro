
import {
  STAFFNAME, RAMAID, ONCALL, START, SKIPBEGIN, SKIPEND
} from '../setting/settingStaff.js'
import { postData, MYSQLIPHP } from "./fetch.js"
import { URIcomponent } from "../util/util.js"
import { checkKeyExist } from "../util/getSTAFFparsed.js"
import { getSTAFFparsed } from "../util/getSTAFFparsed.js"

export function sqlDoSaveStaff(row)
{
  const id = row.dataset.id
  const cell = row.cells
  const sql = id ? sqlUpdate(id, cell) : sqlInsert(cell)

  if (!sql) { return "<br>Incomplete Entry" }

  return postData(MYSQLIPHP, sql)
}

function sqlUpdate(id, cell)
{
  const data = [
    getTextContent(cell[STAFFNAME], 'staffname'),
    getTextContent(cell[RAMAID], 'ramaid'),
    getOncallNum(cell[ONCALL], 'oncall'),
    getDateContent(id, cell[START], 'start'),
    getSkipContent(id, cell[SKIPBEGIN], cell[SKIPEND], 'skip'),
  ]
  const remove = data.filter(e => e.includes('JSON_REMOVE'))

  if (remove) {
    data = data.filter(e => !e.includes('JSON_REMOVE'))
  }

  const set = data.reduce((result, item) => {
                result += item && (result ? `,${item}` : `${item}`)
                return result
              }, "")
  const update = `JSON_SET(profile, ${set})`

  if (!remove && !update) { return '' }
  if (remove && !update) {
    return `sqlReturnStaff=UPDATE staff SET profile=${remove} WHERE id=${id};`
  }
  if (!remove && update) {
    return `sqlReturnStaff=UPDATE staff SET profile=${update} WHERE id=${id};`
  }
  if (remove && update) {
    return`sqlReturnStaff=UPDATE staff SET profile=${remove} WHERE id=${id};`
                        + `UPDATE staff SET profile=${update} WHERE id=${id};`
  }
}

function sqlInsert(cell)
{
  const staffname = cell[STAFFNAME].textContent
  const ramaid = cell[RAMAID].textContent
  const oncall = Number(cell[ONCALL].textContent)
  const values = `JSON_OBJECT("staffname","${staffname}","ramaid","${ramaid}","oncall",${oncall})`

  if (!staffname || !ramaid || !oncall) { return "" }

  return `sqlReturnStaff=INSERT INTO staff (profile) VALUES (${values});`
}

function getTextContent(cell, field) {
  const oldcontent = cell.dataset.content
  const newcontent = cell.textContent

  return oldcontent === newcontent ? '' : `"$.${field}","${newcontent}"`
}

function getOncallNum(cell, field) {
  const oldcontent = cell.dataset.content
  const newcontent = cell.textContent

  return oldcontent === newcontent ? '' : `"$.${field}",${newcontent}`
}

function getDateContent(id, cell, field)
{
  const oldcontent = cell.dataset.content
  const newinput = cell.querySelector('input')
  const newcontent = newinput ? newinput.value : ''
  const notnew = oldcontent === newcontent
  const now = Date.now()
  const keyExist = checkKeyExist(id, field)

  if (oldcontent && !newcontent) {
    return deleteThisKey(id, field, oldcontent)
  }
  return notnew
        ? ''
        : keyExist
           ? `'$.${field}."${now}"',"${newcontent}"`
           : `'$.${field}',JSON_OBJECT("${now}", "${newcontent}")`
}

function getSkipContent(id, begin, end, field)
{
  const beginOldContent = begin.dataset.content
  const endOldContent = end.dataset.content
  const begininput = begin.querySelector('input')
  const endinput = end.querySelector('input')
  const beginNewcontent = begininput ? begininput.value : ''
  const endNewcontent = endinput ? endinput.value : ''
  const beginend = `"begin","${beginNewcontent}", "end","${endNewcontent}"`

  const notnew = (beginOldContent === beginNewcontent) && (endOldContent === endNewcontent)
  const now = Date.now()
  const keyExist = checkKeyExist(id, field)

  return notnew || !beginNewcontent || !endNewcontent
    ? ''
    : keyExist
      ? `'$.${field}."${now}"',JSON_OBJECT(${beginend})`
      : `"$.${field}",JSON_OBJECT("${now}",JSON_OBJECT(${beginend}))`
}

function deleteThisKey(id, field, value)
{
  const staffs = getSTAFFparsed()
  const staff = staffs.filter(e => e.id === id)[0]
  const key = Object.entries(staff.profile.start).find(([key, val]) => (val === value) && key)[0]

  return `JSON_REMOVE(profile, '$.${field}."${key}"'`
}
