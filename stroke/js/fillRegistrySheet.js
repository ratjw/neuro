
//import { USER } from "./main.js"
//import { sqlGetEditedBy, sqlSaveRegistry, sqlCancelAllRegistry } from "../model/sqlRegistry.js"

export function fillRegistrySheet(record)
{
  if (!record.length) { return }

  Object.entries(JSON.parse(record)).forEach(([key, val]) => {
    if (const id = document.getElementById(key)) {
      id.innerHTML = value
    } else {
      document.getElementsByName("key").find(e => e.value === val).checked = true
    }
  })
}
