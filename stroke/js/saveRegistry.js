
import { sqlSaveRegistry } from "./sqlRegistry.js"
import { fillRegistrySheet } from "./fillRegistrySheet.js"

export function saveCurrentElement(target)
{
  let record = {}

  if (target.tagName !== "INPUT") { return } 

  if (target.id) { record[target.id] = target.value } 
  else if (target.checked) { record[target.name] = target.value } 

  if (!Object.key(record).length) { return }

  sqlSaveCurrentElement(record).then(response => {
    if (typeof response === "object") {
      alert("saveCurrentElement", response)
    }
  }).catch(error => alert(error.stack))
}

export function saveRegistry()
{
  let allinputID = document.querySelectorAll("input[id]"),
    allinputName = document.querySelectorAll("input[name]"),
    record = {}

  allinputID.forEach(e => {
    if (e.value) { record[e] = value } 
  })

  allinputName.forEach(e => {
    if (e.checked) { record[e] = value } 
  })

  sqlSaveRegistry(record).then(response => {
    if (typeof response === "object") {
      alert("saveRegistry", response)
    }
  }).catch(error => alert(error.stack))
}
