
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
    getSkipContent(id, cell, 'skip'),
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
  const oldcontent = cell.dataset.val
  const newcontent = cell.textContent

  return oldcontent === newcontent ? '' : `"$.${field}","${newcontent}"`
}

function getOncallNum(cell, field) {
  const oldcontent = cell.dataset.val
  const newcontent = cell.textContent

  return oldcontent === newcontent ? '' : `"$.${field}",${newcontent}`
}

function getDateContent(id, cell, field)
{
  const newinput = cell.querySelector('input')
  const newcontent = newinput ? newinput.value : ''
  const oldcontent = cell.dataset.val
  const notnew = oldcontent === newcontent

  if (notnew) {
    return ''
  }

  const keyExist = checkKeyExist(id, field)
  const now = Date.now()

  if (!keyExist) {
     return `'$.${field}',JSON_OBJECT("${now}", "${newcontent}")`
  }

  const key = cell.startKey
  const remove = oldcontent && !newcontent

  if (remove) {
    return key ? `JSON_REMOVE'$.${field}."${key}"'` : ''
  }
  return `'$.${field}."${now}"',"${newcontent}"`
}

function getSkipContent(id, cell, field)
{
  const begin = cell[SKIPBEGIN]
  const end = cell[SKIPEND]
  const begininput = begin.querySelector('input')
  const endinput = end.querySelector('input')
  const beginNewContent = begininput ? begininput.value : ''
  const endNewContent = endinput ? endinput.value : ''
  const beginOldContent = begin.dataset.val
  const endOldContent = end.dataset.val

  const keyExist = checkKeyExist(id, field)
  const now = Date.now()
  const beginend = `"begin","${beginNewContent}", "end","${endNewContent}"`

  if (!keyExist) {
    return `"$.${field}",JSON_OBJECT("${now}",JSON_OBJECT(${beginend}))`
  }

  const key = cell.startKey
  const deleteBegin = !beginNewContent && beginOldContent
  const deleteEnd = !endNewContent && endOldContent

  if (deleteBegin && deleteEnd) {
    return key ? `JSON_REMOVE'$.${field}."${key}"'` : ''
  }

  const newBegin = beginOldContent !== beginNewContent
  const newEnd = endOldContent !== endNewContent
  const notnew = !newBegin && !newEnd
  const noBegin = (deleteBegin && endNewContent)
  const noEnd = (deleteEnd && beginNewContent)

  if (notnew || noBegin || noEnd) {
    return ''
  }

  const existedBeginEnd = beginOldContent && endOldContent
  const updateBegin = newBegin && existedBeginEnd
  const updateEnd = newEnd && existedBeginEnd

  return updateBegin || updateEnd
          ? `'$.${field}."${key}"',JSON_OBJECT(${beginend})`
          : `'$.${field}."${now}"',JSON_OBJECT(${beginend})`
}
