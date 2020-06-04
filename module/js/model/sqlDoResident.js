
import { postData, MYSQLIPHP } from "./fetch.js"
import { Alert } from "../util/util.js"
import { settingResident } from "../setting/settingResident.js"
import { RESEARCHBAR } from '../setting/prepareData.js'
import { xRange } from '../setting/resResearch.js'

export let RESIDENT = []

// Neurosurgery residency training is 5 years
export const YEARS = 5,
  RAMAID = 0,
  RNAME = 1,
  START = 2,
  END = 3,
  ICONS = 4

export async function getRESIDENT()
{
  let residents = getRESIDENTparsed()
  if (!residents.length) {
    await sqlResident()
    residents = getRESIDENTparsed()
  }

  return residents
}

function getRESIDENTparsed()
{
  const residents = JSON.parse(JSON.stringify(RESIDENT))

  residents.forEach(e => e.profile = JSON.parse(e.profile))

  return residents.map(resident => resident.profile)
}

async function sqlResident()
{
  let sql = `sqlReturnResident=`

  let response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    RESIDENT = response
  } else {
    Alert("sqlResident", response)
  }  
}

export async function saveResident(row)
{
  let cell = row.cells
  let ramaid = cell[RAMAID].textContent
  let residentname = cell[RNAME].textContent
  let enlistStart = cell[START].textContent
  let enlistEnd = cell[END].textContent

  // X axis is double the research time range, because half of it is the white bars
  let fulltrain = xRange / 2
  let month = fulltrain / YEARS / 12
  let research = JSON.stringify({ proposal: month*3,
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

  let sql = `sqlReturnResident=INSERT INTO personnel (profile)
               VALUES (JSON_OBJECT('ramaid','${ramaid}',
                 'residentname','${residentname}',
                 'trainingTime','${YEARS}',
                 'enlistStart','${enlistStart}',
                 'enlistEnd','${enlistEnd}',
                 'research','${research}',
                 'position','resident'));`

  let response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    showResident(response)
  } else {
    response && Alert("saveResident", response)
  }
}

export async function updateResident(row)
{
  let cell = row.cells
  let oldramaid = row.dataset.ramaid
  let newramaid = cell[RAMAID].textContent
  let residentname = cell[RNAME].textContent
  let enlistStart = cell[START].textContent
  let enlistEnd = cell[END].textContent

  if (!residentname || !enlistStart) { return "<br>Incomplete Entry" }

  if (confirm("ต้องการแก้ไขข้อมูลนี้?")) {
    let sql = `sqlReturnResident=UPDATE personnel
               SET profile=JSON_SET(profile,'$.ramaid','${newramaid}',
                   '$.residentname','${residentname}',
                   '$.trainingTime','${YEARS}',
                   '$.enlistStart','${enlistStart}',
                   '$.enlistEnd','${enlistEnd}')
               WHERE JSON_EXTRACT(profile,'$.ramaid')='${oldramaid}';`
    let response = await postData(MYSQLIPHP, sql)
    if (typeof response === "object") {
      showResident(response)
    } else {
      response && Alert("updateResident", response)
    }
  }
}

export async function updateResidentLevel(residents)
{
  let sql = "sqlReturnResident="
  residents.forEach(dent => {
    sql += `UPDATE personnel SET profile=JSON_SET(profile,'$.yearLevel',${dent.yearLevel})
       WHERE JSON_EXTRACT(profile,'$.ramaid')='${dent.ramaid}';`
  })

  let response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    showResident(response)
  } else {
    response && Alert("updateResidentLevel", response)
  }
}

export async function deleteResident(row)
{
  let cell = row.cells
  let ramaid = cell[RAMAID].textContent

  if (!ramaid) { return "<br>No Number" }

  if (confirm("ต้องการลบข้อมูลนี้?")) {
    let sql = `sqlReturnResident=DELETE FROM personnel
                WHERE JSON_EXTRACT(profile,'$.ramaid')=${ramaid};`
    let response = await postData(MYSQLIPHP, sql)
    if (typeof response === "object") {
      showResident(response)
    } else {
      response && Alert("deleteResident", response)
    }
  }
}

function showResident(response)
{
  RESIDENT = response.RESIDENT
  settingResident()
}

export async function updateResearch(barChart, ridx, _ranges)
{
  const residents = getRESIDENTparsed(),
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

  let response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    RESIDENT = response.RESIDENT
    updateBar(barChart, ridx)
    $("#slidertbl").colResizable({ disable: true })
  } else {
    Alert("updateResearch", response)
  }  
}

function updateBar(barChart, ridx)
{
  const residents = getRESIDENTparsed(),
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
