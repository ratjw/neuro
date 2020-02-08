
import {
  STAFFNAME, RAMAID, ONCALL, START, SKIPBEGIN, SKIPEND
} from '../setting/settingStaff.js'
import { postData, MYSQLIPHP } from "./fetch.js"
import { URIcomponent } from "../util/util.js"
import { checkKeyExist } from "../util/getSTAFFparsed.js"

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
    getTextContent(cell[ONCALL], 'oncall'),
    getDateContent(id, cell[START], 'start'),
    getSkipContent(id, cell[SKIPBEGIN], cell[SKIPEND], 'skip'),
  ]

  const sql = data.reduce((result, item) => {
                result += item && (result ? `,${item}` : `${item}`)
                return result
              }, "")

  if (!sql) { return '' }

  return `sqlReturnStaff=UPDATE staff SET profile=json_set(profile,${sql}) WHERE id=${id};`
}

function sqlInsert(cell)
{
  const staffname = cell[STAFFNAME].textContent
  const ramaid = cell[RAMAID].textContent
  const oncall = cell[ONCALL].textContent
  const values = `JSON_OBJECT("staffname","${staffname}","ramaid","${ramaid}","oncall",${oncall})`

  if (!staffname || !ramaid || !oncall) { return "" }

  return `sqlReturnStaff=INSERT INTO staff (profile) VALUES (${values});`
}

function getTextContent(cell, field) {
  const oldcontent = cell.dataset.content
  const newcontent = cell.textContent

  return oldcontent === newcontent ? '' : `"$.${field}","${newcontent}"`
}

function getDateContent(id, cell, field)
{
  const oldcontent = cell.dataset.content
  const newcontent = cell.querySelector('input').value
  const notnew = oldcontent === newcontent
  const now = Date.now()
  const keyExist = checkKeyExist(id, field)

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
  const beginNewcontent = begin.querySelector('input').value
  const endNewcontent = end.querySelector('input').value
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
