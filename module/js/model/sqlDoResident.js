
import { postData, MYSQLIPHP } from "./fetch.js"
import { Alert } from "../util/util.js"
import { RAMAID, RNAME, ENYEAR, ICONS, viewResident } from "../setting/viewResident.js"
import { xRange, training, RESEARCHBAR } from '../setting/prepareData.js'
import { resResearch } from '../setting/resResearch.js'

export let RESIDENT = []

export async function getResident()
{
  let sql = `sqlReturnResident=&training=${training}`

  let response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    RESIDENT = response.RESIDENT
  } else {
    Alert("getResident", response)
  }  
}

export function addResident(row)
{
  let residenttr = document.querySelector("#residentcells tr")
  let clone = residenttr.cloneNode(true)
  let ramaid = clone.cells[RAMAID]
  let icon = clone.cells[ICONS]

  icon.innerHTML = "Save"
  row.after(clone)
  icon.addEventListener("click", function() {
    saveResident(clone)
  })
  ramaid.focus()
}

export async function saveResident(row)
{
  let cell = row.cells
  let ramaid = cell[RAMAID].textContent
  let residentname = cell[RNAME].textContent
  let enrollyear = cell[ENYEAR].textContent

  // X axis is double the research time range, because half of it is the white bars
  let fulltrain = xRange / 2
  let month = fulltrain / training / 12
  let research = JSON.stringify({ proposal: month*3,
                   planning: month*12,
                   ethic: month*9,
                   "data50": month*18,
                   "data100": month*15,
                   analysis: month*2,
                   complete: month*1
                 })

  if (!residentname || !enrollyear) {
    Alert("saveResident", "<br>Incomplete Entry")
    return
  }

  let sql = `sqlReturnResident=INSERT INTO resident (ramaid,residentname,enrollyear,research)
               VALUES('${ramaid}','${residentname}','${enrollyear}','${research}');&training=${training}`

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
  let enrollyear = cell[ENYEAR].textContent

  if (!residentname || !enrollyear) { return "<br>Incomplete Entry" }

  if (confirm("ต้องการแก้ไขข้อมูลนี้")) {
    let sql = `sqlReturnResident=UPDATE resident
               SET ramaid='${newramaid}',residentname='${residentname}',enrollyear='${enrollyear}'
               WHERE ramaid=${oldramaid};&training=${training}`
    let response = await postData(MYSQLIPHP, sql)
    if (typeof response === "object") {
      showResident(response)
    } else {
      response && Alert("updateResident", response)
    }
  }
}

export async function deleteResident(row)
{
  let cell = row.cells
  let ramaid = cell[RAMAID].textContent

  if (!ramaid) { return "<br>No Number" }

  if (confirm("ต้องการลบข้อมูลนี้หรือไม่")) {
    let sql = `sqlReturnResident=DELETE FROM resident 
               WHERE ramaid=${ramaid};&training=${training}`
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
  viewResident()
}

export async function updateResearch(barChart, newval, ridx, cidx)
{
  let ramaid = RESIDENT[ridx].ramaid
  let progress = RESEARCHBAR[cidx].progress
  let progressval = newval

  let sql = `sqlReturnResident=UPDATE resident
             SET research=JSON_SET(research,'$.${progress}',${progressval})
             WHERE ramaid=${ramaid};&training=${training}`

  let response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    RESIDENT = response.RESIDENT
    updateBar(barChart, ridx)
  } else {
    Alert("getResident", response)
  }  
}

function updateBar(barChart, ridx)
{
  let fulltrain = xRange / 2
  let bardataset = barChart.data.datasets
  let sumMonths = 0
  let time = 0
  let research = JSON.parse(RESIDENT[ridx].research)
  let resbar = RESEARCHBAR.map(e => e.progress)

  resbar.filter(e => e).forEach(key => {
    let time = research[key]
    if (sumMonths + time <= fulltrain) {
      sumMonths += time
    } else {
      research[key] = fulltrain - sumMonths
      sumMonths = fulltrain
    }
  })

  bardataset.forEach((e, i) => {
    if (i) {
      e.data[ridx] = research[resbar[i]]
    }
  })

  barChart.update()
}

