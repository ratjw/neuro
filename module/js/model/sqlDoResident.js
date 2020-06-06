
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
  LEVEL = 2,
  ICONS = 3

export async function startRESIDENT()
{
  await sqlResident()

  return getRESIDENT()
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

export function getRESIDENT()
{
  const residents = JSON.parse(JSON.stringify(RESIDENT))

  residents.forEach(e => e.profile = JSON.parse(e.profile))

  return residents.map(resident => resident.profile)
}

// xRange (X axis) is double the research time range (fulltrain),
// because half of it is the white bars
// fulltrain is MAXYEAR in graphic range
export async function saveResident(row)
{
  const cell = row.cells,
    ramaid = cell[RAMAID].textContent,
    residentname = cell[RNAME].textContent,
    entryLevel = cell[LEVEL].textContent,
    entryDate = Date.now(),

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

  const sql = `sqlReturnResident=INSERT INTO personnel (profile)
               VALUES (JSON_OBJECT('ramaid','${ramaid}',
                 'residentname','${residentname}',
                 'entryDate','${entryDate}',
                 'entryLevel','${entryLevel}',
                 'research','${research}',
                 'position','resident'));`

  const response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    showResident(response)
  } else {
    response && Alert("saveResident", response)
  }
}

// entryDate = the date of key-in resident setting
// entryLevel = resident year level at key-in
// addLevel = user-key-in change of year level
export async function updateResident(row)
{
  const cell = row.cells,
    oldramaid = row.dataset.ramaid,
    newramaid = cell[RAMAID].textContent,
    residentname = cell[RNAME].textContent,

    oldLevel = row.dataset.level,
    newLevel = cell[LEVEL].textContent,
    diffLevel = +newLevel - oldLevel,

    oldAddLevel = row.dataset.addLevel,
    addLevel = +oldAddLevel + diffLevel,

    level = diffLevel ? `,'$.addLevel',${addLevel}` : ""

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
             SET profile=JSON_SET(profile,"$.research",'${JSON.stringify(json)}')
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
