
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

  if (!sql) { return "Incomplete Entry" }

  return postData(MYSQLIPHP, sql)
}

function sqlUpdate(id, cell)
{
  let data = [
    getTextContent(cell[STAFFNAME], 'staffname'),
    getTextContent(cell[RAMAID], 'ramaid'),
    getOncallNum(cell[ONCALL], 'oncall'),
    getDateContent(id, cell[START], 'start'),
    getSkipContent(id, cell[SKIPBEGIN], cell[SKIPEND], 'skip'),
  ]
  let remove = data.filter(e => e.includes('JSON_REMOVE'))
  let jsonremove = ''

  if (remove.length) {
    data = data.filter(e => !e.includes('JSON_REMOVE'))
    remove = remove.reduce((result, item) => {
               result += item && (result ? `,${item}` : `${item}`)
               return result
             }, "")
    jsonremove = `JSON_REMOVE(profile, ${remove.replace('JSON_REMOVE', '')})`
  }

  const set = data.reduce((result, item) => {
                result += item && (result ? `,${item}` : `${item}`)
                return result
              }, "")
  const jsonset = set ? `JSON_SET(profile, ${set})` : ''


  if (!jsonremove && !jsonset) { return '' }
  if (jsonremove && !jsonset) {
    return `sqlReturnStaff=UPDATE staff SET profile=${jsonremove} WHERE id=${id};`
  }
  if (!jsonremove && jsonset) {
    return `sqlReturnStaff=UPDATE staff SET profile=${jsonset} WHERE id=${id};`
  }
  if (jsonremove && jsonset) {
    return`sqlReturnStaff=UPDATE staff SET profile=${jsonremove} WHERE id=${id};`
                        + `UPDATE staff SET profile=${jsonset} WHERE id=${id};`
  }
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
    return removeStartKey(id, field, oldcontent)
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
  const beginNewContent = begininput ? begininput.value : ''
  const endNewContent = endinput ? endinput.value : ''

  const beginend = `"begin","${beginNewContent}", "end","${endNewContent}"`
  const deleteBegin = !beginNewContent && beginOldContent
  const deleteEnd = !endNewContent && endOldContent

  const notnew = (beginOldContent === beginNewContent) && (endOldContent === endNewContent)
  const now = Date.now()
  const keyExist = checkKeyExist(id, field)

  if (deleteBegin && deleteEnd) {
    return removeSkipKey(id, field, beginOldContent)
  }
  if ((deleteBegin && endNewContent) || (deleteEnd && beginNewContent)) {
    return ''
  }

  return notnew
    ? ''
    : keyExist
      ? `'$.${field}."${now}"',JSON_OBJECT(${beginend})`
      : `"$.${field}",JSON_OBJECT("${now}",JSON_OBJECT(${beginend}))`
}

function removeStartKey(id, field, value)
{
  const staffs = getSTAFFparsed()
  const staff = staffs.filter(e => e.id === id)[0]
  const key = Object.entries(staff.profile[field])
                .find(([key, val]) => (val === value) && key)[0]

  return `JSON_REMOVE'$.${field}."${key}"'`
}

function removeSkipKey(id, field, value)
{
  const staffs = getSTAFFparsed()
  const staff = staffs.filter(e => e.id === id)[0]
  const key = Object.entries(staff.profile[field])
                .find(([key, val]) => (val.begin === value) && key)[0]

  return `JSON_REMOVE'$.${field}."${key}"'`
}
