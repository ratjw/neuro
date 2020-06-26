
import { postData, MYSQLIPHP } from "../model/fetch.js"
import { URIcomponent } from "../util/util.js"
import { checkFieldExist } from "../setting/getSTAFFparsed.js"

const STAFFNAME = 0,
  RAMAID = 1,
  ONCALL = 2,
  START = 3,
  SKIPBEGIN = 4,
  SKIPEND = 5

export function sqlDoSaveStaff(row)
{
  const sql = row.cells[RAMAID].dataset.ramaid
              ? sqlUpdate(cells)
              : sqlInsert(cells)

  if (!sql) { return "Incomplete Entry" }

  return postData(MYSQLIPHP, sql)
}

function sqlUpdate(cells)
{
  const ramaid = cells[RAMAID].dataset.val
  let data = [
    getTextContent(cells[STAFFNAME], 'staffname'),
    getTextContent(cells[RAMAID], 'ramaid'),
    getOncallNum(cells[ONCALL], 'oncall'),
    getDateContent(ramaid, cells[START], 'start'),
    getSkipContent(ramaid, cells, 'skip'),
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
    return `sqlReturnStaff=UPDATE personnel SET profile=${jsonremove} WHERE ramaid=${ramaid};`
  }
  if (!jsonremove && jsonset) {
    return `sqlReturnStaff=UPDATE personnel SET profile=${jsonset} WHERE ramaid=${ramaid};`
  }
  if (jsonremove && jsonset) {
    return`sqlReturnStaff=UPDATE personnel SET profile=${jsonremove} WHERE ramaid=${ramaid};`
                        + `UPDATE personnel SET profile=${jsonset} WHERE ramaid=${ramaid};`
  }
}

function sqlInsert(cells)
{
  const staffname = cells[STAFFNAME].textContent
  const ramaid = cells[RAMAID].textContent
  const oncall = cells[ONCALL].textContent
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

  return oldcontent === newcontent ? '' : `"$.${field}",${newcontent || null}`
}

function getDateContent(ramaid, cell, field)
{
  const newinput = cell.querySelector('input')
  const newcontent = newinput ? newinput.value : ''
  const oldcontent = cell.dataset.val
  const notnew = oldcontent === newcontent

  if (notnew) {
    return ''
  }

  const fieldExist = checkFieldExist(ramaid, field)
  const now = Date.now()

  if (!fieldExist) {
     return `'$.${field}',JSON_OBJECT("${now}", "${newcontent}")`
  }

  const key = cell.dataset.key
  const remove = oldcontent && !newcontent

  if (remove) {
    return key ? `JSON_REMOVE'$.${field}."${key}"'` : ''
  }
  return `'$.${field}."${now}"',"${newcontent}"`
}

function getSkipContent(ramaid, cells, field)
{
  const begin = cells[SKIPBEGIN]
  const end = cells[SKIPEND]
  const begininput = begin.querySelector('input')
  const endinput = end.querySelector('input')
  const beginNewContent = begininput ? begininput.value : ''
  const endNewContent = endinput ? endinput.value : ''
  const beginOldContent = begin.dataset.val
  const endOldContent = end.dataset.val

  const deleteBegin = !beginNewContent && beginOldContent
  const deleteEnd = !endNewContent && endOldContent

  const newBegin = beginOldContent !== beginNewContent
  const newEnd = endOldContent !== endNewContent
  const notnew = !newBegin && !newEnd
  const noBegin = (deleteBegin && endNewContent)
  const noEnd = (deleteEnd && beginNewContent)

  if (notnew || noBegin || noEnd) {
    return ''
  }

  const fieldExist = checkFieldExist(ramaid, field)
  const now = Date.now()
  const beginend = `"begin","${beginNewContent}", "end","${endNewContent}"`

  if (!fieldExist) {
    return `"$.${field}",JSON_OBJECT("${now}",JSON_OBJECT(${beginend}))`
  }

  const key = cells[SKIPEND].dataset.key

  if (deleteBegin && deleteEnd) {
    return key ? `JSON_REMOVE'$.${field}."${key}"'` : ''
  }

  const existedBeginEnd = beginOldContent && endOldContent
  const updateBegin = newBegin && existedBeginEnd
  const updateEnd = newEnd && existedBeginEnd

  return updateBegin || updateEnd
          ? `'$.${field}."${key}"',JSON_OBJECT(${beginend})`
          : `'$.${field}."${now}"',JSON_OBJECT(${beginend})`
}
