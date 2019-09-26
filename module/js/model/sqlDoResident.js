
import { postData, MYSQLIPHP } from "./fetch.js"
import { Alert } from "../util/util.js"
import { viewResident } from "../setting/viewResident.js"
import { RESEARCHBAR } from '../setting/prepareData.js'
import { resResearch } from '../setting/resResearch.js'

export let RESIDENT = []

export async function getResident()
{
  let sql = `sqlReturnResident=`

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
  let save = clone.cells[3]

  save.innerHTML = "Save"
  row.after(clone)
  save.addEventListener("click", function() {
    saveResident(clone, 1)
  })
}

export async function saveResident(row)
{
  let cell = row.cells
  let ramaid = cell[0].textContent
  let residentname = cell[1].textContent
  let enrollyear = cell[2].textContent

  if (!residentname || !enrollyear) { return "<br>Incomplete Entry" }

  let sql = `sqlReturnResident=INSERT INTO resident (ramaid,residentname,enrollyear)
               VALUES('${ramaid}','${residentname}','${enrollyear}');`

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
  let ramaid = cell[0].textContent
  let residentname = cell[1].textContent
  let enrollyear = cell[2].textContent

  if (!residentname || !enrollyear) { return "<br>Incomplete Entry" }

  if (confirm("ต้องการแก้ไขข้อมูลนี้")) {
    let sql = `sqlReturnResident=UPDATE resident
               SET residentname='${residentname}',enrollyear='${enrollyear}'
               WHERE ramaid=${ramaid};`
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
  let ramaid = cell[0].textContent

  if (!ramaid) { return "<br>No Number" }

  if (confirm("ต้องการลบข้อมูลนี้หรือไม่")) {
    let sql = `sqlReturnResident=DELETE FROM resident WHERE ramaid=${ramaid};`
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
             SET research=JSON_SET(research,'$.${progress}','${progressval}')
             WHERE ramaid=${ramaid};`

  let response = await postData(MYSQLIPHP, sql)
  if (typeof response === "object") {
    RESIDENT = response.RESIDENT
    barChart.data.datasets[cidx].data[ridx] = newval
    barChart.update()
  } else {
    Alert("getResident", response)
  }  
}
