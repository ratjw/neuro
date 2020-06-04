
import { postData, MYSQLIPHP } from "./fetch.js"
import { Alert } from "../util/util.js"
import { settingResident } from "../setting/settingResident.js"
import { RESEARCHBAR } from '../setting/prepareData.js'
import { xRange } from '../setting/resResearch.js'

let RESIDENT = []

// Neurosurgery residency training is 5 years
export const MAXYEAR = 5,
  RAMAID = 0,
  RNAME = 1,
  YEARS = 2,
  ICONS = 3

export async function getRESIDENT()
{
  if (!RESIDENT.length) {
    await sqlResident()
  }

  const residents = JSON.parse(JSON.stringify(RESIDENT))

  residents.forEach(e => e.profile = JSON.parse(e.profile))

  return residents.map(resident => resident.profile)
}

async function sqlResident()
{
  const sql = `sqlReturnResident=`

  const response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    RESIDENT = response
  } else {
    Alert("sqlResident", response)
  }  
}

export async function saveResident(row)
{
  const cell = row.cells,
    ramaid = cell[RAMAID].textContent,
    residentname = cell[RNAME].textContent,
    yearLevel = cell[YEARS].textContent,
    thisYear = new Date().getFullYear(),

  // X axis is double the research time range, because half of it is the white bars
    fulltrain = xRange / 2,
    month = fulltrain / MAXYEAR / 12,
    research = JSON.stringify({ proposal: month*3,
                   planning: month*12,
                   ethic: month*9,
                   data: month*33,
                   analysis: month*2,
                   complete: month*1
                 })

  if (!residentname) {
    Alert("saveResident", "<br>Incomplete Entry")
    return
  }

  // yearLevel is to be changed every yearLevel
  // startLevel is fixed, for calculation of correctLevel()
  const sql = `sqlReturnResident=INSERT INTO personnel (profile)
               VALUES (JSON_OBJECT('ramaid','${ramaid}',
                 'residentname','${residentname}',
                 'yearLevel','${yearLevel}',
                 'enlistStart','${thisYear}',
                 'startLevel','${yearLevel}',
                 'research','${research}',
                 'position','resident'));`

  const response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    showResident(response)
  } else {
    response && Alert("saveResident", response)
  }
}

export async function updateResident(row)
{
  const cell = row.cells,
    oldramaid = row.dataset.ramaid,
    newramaid = cell[RAMAID].textContent,
    residentname = cell[RNAME].textContent,

    rowYearLevel = row.dataset.yearLevel,
    oldYearLevel = rowYearLevel === "null" ? null : rowYearLevel,
    newYearLevel = Number(cell[YEARS].textContent) || null,
    diffLevel = newYearLevel - oldYearLevel,

    rowAddLevel = row.dataset.addLevel,
    oldAddLevel = rowAddLevel === "undefined" ? 0 : rowAddLevel,
    addLevel = oldYearLevel === newYearLevel ? null : oldAddLevel + diffLevel,

    level = addLevel === null ? "" : `,'$.yearLevel',${newYearLevel},'$.addLevel',${addLevel}`

  if (!residentname) { return "<br>Incomplete Entry" }

  const sql = `sqlReturnResident=UPDATE personnel
             SET profile=JSON_SET(profile,
                        '$.ramaid','${newramaid}',
                        '$.residentname','${residentname}'
                        ${level}
                        )
             WHERE JSON_EXTRACT(profile,'$.ramaid')='${oldramaid}';`
  const response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    showResident(response)
  } else {
    response && Alert("updateResident", response)
  }
}

export async function updateResidentLevel(residents)
{
  let sql = "sqlReturnResident="

  residents.forEach(dent => {
    sql += `UPDATE personnel SET profile=JSON_SET(profile,'$.yearLevel',${dent.yearLevel})
       WHERE JSON_EXTRACT(profile,'$.ramaid')='${dent.ramaid}';`
  })

  const response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    RESIDENT = response
  } else {
    response && Alert("updateResidentLevel", response)
  }
}

export async function deleteResident(row)
{
  const cell = row.cells
  const ramaid = cell[RAMAID].textContent

  if (!ramaid) { return "<br>No Number" }

  if (confirm("ต้องการลบข้อมูลนี้?")) {
    const sql = `sqlReturnResident=DELETE FROM personnel
                WHERE JSON_EXTRACT(profile,'$.ramaid')=${ramaid};`
    const response = await postData(MYSQLIPHP, sql)
    if (typeof response === "object") {
      showResident(response)
    } else {
      response && Alert("deleteResident", response)
    }
  }
}

function showResident(response)
{
  RESIDENT = response
  settingResident()
}

export async function updateResearch(barChart, ridx, _ranges)
{
  const residents = getRESIDENT(),
    ramaid = residents[ridx].ramaid,
    progress = RESEARCHBAR.map(e => e.progress).filter(e => e),
    slidertbl = document.getElementById('slidertbl'),
    columns = [...slidertbl.querySelectorAll('td')],
    columnsText = columns.map(e => e.textContent),
    json = {}

    progress.forEach((e, i) => json[e] = [_ranges[i], columnsText[i]])
    
  const sql = `sqlReturnResident=UPDATE personnel
             SET research='${JSON.stringify(json)}'
             WHERE JSON_EXTRACT(profile,'$.ramaid')=${ramaid};`

  const response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    RESIDENT = response
    updateBar(barChart, ridx)
    $("#slidertbl").colResizable({ disable: true })
  } else {
    Alert("updateResearch", response)
  }  
}

function updateBar(barChart, ridx)
{
  const residents = getRESIDENT(),
    fulltrain = xRange / 2,
    bardataset = barChart.data.datasets,
    research = residents[ridx].research,
    resbar = RESEARCHBAR.map(e => e.progress)

  bardataset.forEach((e, i) => {
    if (i) {
      e.data[ridx] = research[resbar[i]][0]
      e.caption[ridx] = research[resbar[i]][1]
    }
  })

  barChart.update()
}
