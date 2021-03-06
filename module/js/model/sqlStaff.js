
import { postData, MYSQLIPHP } from "../model/fetch.js"
import { checkFieldExist } from "../setting/getStaff.js"
import { NAME, RAMAID, ROLE, ONCALL, START, SKIPBEGIN, SKIPEND } from "../setting/constSTAFF.js"
import { DIVISION } from "../main.js"

// cell.dataset was set from filldataStaff() in settingStaff.js
export function sqlSaveStaff(row)
{
  const cells = row.cells
  const ramaid = cells[RAMAID].dataset.val
  const sql = ramaid ? sqlUpdateStaff(cells, ramaid) : sqlInsertStaff(cells)

  if (!sql) { return "Incomplete Entry" }

  return postData(MYSQLIPHP, sql)
}

function sqlUpdateStaff(cells, ramaid)
{
  let data = [
    getTextContent(cells[NAME], 'name'),
    getTextContent(cells[RAMAID], 'ramaid'),
    getTextContent(cells[ROLE], 'role'),
    getOncallNum(cells[ONCALL], 'oncall'),
    getDateContent(ramaid, cells[START], 'start'),
    getSkipContent(ramaid, cells, 'skip')
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
  const rama_id = `profile->"$.ramaid"`
  const updateRemove = `UPDATE personnel SET profile=${jsonremove} WHERE ${rama_id}="${ramaid}";`
  const updateSet = `UPDATE personnel SET profile=${jsonset} WHERE ${rama_id}="${ramaid}";`

  if (!jsonremove && !jsonset) { return '' }
  if (jsonremove && !jsonset) {
    return { sqlReturnStaff: updateRemove }
  }
  if (!jsonremove && jsonset) {
    return { sqlReturnStaff: updateSet }
  }
  if (jsonremove && jsonset) {
    return { sqlReturnStaff: updateRemove + updateSet }
  }
}

function sqlInsertStaff(cells)
{
  const cname = cells[NAME].textContent
  const cramaid = cells[RAMAID].textContent
  const crole = cells[ROLE].textContent
  const concall = cells[ONCALL].textContent

  const name = cname ? `"name","${cname}"` : ""
  const ramaid = cramaid ? `"ramaid","${cramaid}"` : ""
  const role = crole ? `"role","${crole}"` : ""
  const oncall = concall ? `"oncall",${concall}` : ""

  const values = `${name},${role},${ramaid},${oncall}`.replace(/,$/, "")
  const json = `JSON_OBJECT(${values})`

  if (!ramaid) { return "" }

  return {
    sqlReturnStaff:`INSERT INTO personnel (division,profile)`
                    + `VALUES ("${DIVISION}",${json});`
  }
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
  const begincell = cells[SKIPBEGIN]
  const endcell = cells[SKIPEND]
  const begininput = begincell.querySelector('input')
  const endinput = endcell.querySelector('input')
  const beginNewContent = begininput ? begininput.value : ''
  const endNewContent = endinput ? endinput.value : ''
  const beginOldContent = begincell.dataset.val
  const endOldContent = endcell.dataset.val

  const deleteBegin = !beginNewContent && beginOldContent
  const deleteEnd = !endNewContent && endOldContent

  if (deleteBegin && deleteEnd) {
    return key ? `JSON_REMOVE'$.${field}."${key}"'` : ''
  }

  const sameBegin = beginOldContent === beginNewContent
  const sameEnd = endOldContent === endNewContent
  const noChange = sameBegin && sameEnd

  if (!beginNewContent || !endNewContent || noChange) { return '' }

  const fieldExist = checkFieldExist(ramaid, field)
  const now = Date.now()
  const beginend = `"begin","${beginNewContent}", "end","${endNewContent}"`
  const key = cells[SKIPEND].dataset.key

  if (!fieldExist) {
    return `"$.${field}",JSON_OBJECT("${now}",JSON_OBJECT(${beginend}))`
  }

  if (key) {
    return `'$.${field}."${key}"',JSON_OBJECT(${beginend})`
  }

  return `'$.${field}."${now}"',JSON_OBJECT(${beginend})`
}
