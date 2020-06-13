
import { postData, MYSQLIPHP } from "./fetch.js"
import { Alert } from "../util/util.js"
import { settingResident } from "../setting/settingResident.js"
import {
  setRESIDENT, presentRESIDENT, xRange, MAXYEAR, RAMAID, RNAME,
  LEVEL, eduYear, RESEARCHBAR
} from '../setting/constResident.js'

export async function sqlResident()
{
  const sql = `sqlReturnResident=`

  const response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    setRESIDENT(response)
  } else {
    Alert("sqlResident", response)
  }  
}

// xRange (X axis) is double the research time range (fulltrain),
// because half of it is the white bars
// fulltrain is MAXYEAR in graphic x-range
// eduYear = education year on the day of key-in resident setting
// level = resident year level at key-in
export async function newResident(row)
{
  const cell = row.cells,
    ramaid = cell[RAMAID].textContent,
    name = cell[RNAME].textContent,
    level = cell[LEVEL].textContent,
    yearOne = eduYear - level + 1,

    fulltrain = xRange / 2,
    month = fulltrain / MAXYEAR / 12,
    research = { proposal: [month*3,""],
                  planning: [month*12,""],
                  ethic: [month*9,""],
                  data: [month*33,""],
                  analysis: [month*2,""],
                  complete: [month*1,""]
                }

  if (!name) {
    Alert("newResident", "<br>Incomplete Entry")
    return
  }

  const sql = `sqlReturnResident=INSERT INTO personnel (profile)
                VALUES (JSON_OBJECT('ramaid','${ramaid}',
                  'name','${name}',
                  'yearOne','${yearOne}',
                  'addLevel',0,
                  'research',CAST('${JSON.stringify(research)}' AS JSON),
                  'role','resident'));`

  const response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    showResident(response)
  } else {
    response && Alert("newResident", response)
  }
}

// addLevel = user-key-in change of year level
export async function updateResident(row)
{
  const cell = row.cells,
    oldramaid = row.dataset.ramaid,
    newramaid = cell[RAMAID].textContent,
    name = cell[RNAME].textContent,

    oldLevel = row.dataset.level,
    newLevel = cell[LEVEL].textContent,
    diffLevel = oldLevel - newLevel,

    oldAddLevel = row.dataset.addLevel,
    addLevel = +oldAddLevel + diffLevel

  if (!name) { return "<br>Incomplete Entry" }

  const sql = `sqlReturnResident=UPDATE personnel
             SET profile=JSON_SET(profile,
                        '$.ramaid','${newramaid}',
                        '$.name','${name}',
                        '$.addLevel',${addLevel}
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
  setRESIDENT(response)
  settingResident()
}

export async function updateResearch(barChart, ridx, _ranges)
{
  const residents = presentRESIDENT(),
    ramaid = residents[ridx].ramaid,
    progress = RESEARCHBAR.map(e => e.progress).filter(e => e),
    slidertbl = document.getElementById('slidertbl'),
    columns = [...slidertbl.querySelectorAll('td')],
    columnsText = columns.map(e => e.textContent),
    json = {}

    progress.forEach((e, i) => json[e] = [_ranges[i], columnsText[i]])
    
  const sql = `sqlReturnResident=UPDATE personnel
             SET profile=JSON_SET(profile,"$.research",CAST('${JSON.stringify(json)}' AS JSON))
             WHERE JSON_EXTRACT(profile,'$.ramaid')='${ramaid}';`

  const response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    setRESIDENT(response)
    updateBar(barChart, ridx)
    $("#slidertbl").colResizable({ disable: true })
  } else {
    Alert("updateResearch", response)
  }  
}

function updateBar(barChart, ridx)
{
  const residents = presentRESIDENT(),
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
