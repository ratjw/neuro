
//import { USER } from "./main.js"
//import { sqlGetEditedBy, sqlSaveRegistry, sqlCancelAllRegistry } from "../model/sqlRegistry.js"

export function fillRegistrySheet(record)
{
  if (!Object.keys(record)) { return }
  
  document.getElementById("wrapper").dataset.qn = record["qn"]

  const sheetstr = record["registrysheet"],
    registrysheet = JSON.parse(sheetstr)

  Object.entries(registrysheet).forEach(([key, val]) => {
    let id = {}
    if (id = document.getElementById(key)) {
      id.innerHTML = val
    } else {
      const name = document.getElementsByName(key)
      Array.from(name).find(e => e.value === val).checked = true
    }
  })
}
