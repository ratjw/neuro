
import { Alert } from "../util/util.js"
import { viewAddResident, viewResident } from "../setting/viewResident.js"
import { sqlgetResident, sqlDoSaveResident, sqlDoUpdateResident, sqlDoDeleteResident } from "../model/sqlDoResident.js"

export let RESIDENT = []

export async function getResident()
{
  let response = await sqlgetResident()
  if (typeof response === "object") {
    RESIDENT = response.RESIDENT
  } else {
    Alert("getResident", response)
  }  
}

export function doAddResident(row)
{
  let residenttr = document.querySelector("#residentcells tr")
  let clone = residenttr.cloneNode(true)
  let save = clone.cells[3]

  save.innerHTML = "Save"
  row.after(clone)
  save.addEventListener("click", function() {
    doSaveResident(clone, 1)
  })
}

export async function doSaveResident(row)
{
  let response = await sqlDoSaveResident(row)
  if (typeof response === "object") {
    showResident(response)
  } else {
    response && Alert("doSaveResident", response)
  }
}

export async function doUpdateResident(row)
{
  let response = await sqlDoUpdateResident(row)
  if (typeof response === "object") {
    showResident(response)
  } else {
    response && Alert("doUpdateResident", response)
  }
}

export async function doDeleteResident(row)
{
  let response = await sqlDoDeleteResident(row)
  if (typeof response === "object") {
    showResident(response)
  } else {
    response && Alert("doDeleteResident", response)
  }
}

function showResident(response)
{
  RESIDENT = response.RESIDENT
  viewResident()
}
