
import { sqlSaveFocusOutElement } from "./sqlRegistry.js"
import { sqlSaveRegistry } from "./sqlRegistry.js"
import { fillRegistrySheet } from "./fillRegistrySheet.js"

export function saveFocusOutElement(target)
{
  let record = {}

  if (target.tagName !== "INPUT") { return } 

  if (target.id) { record[target.id] = target.value } 
  else if (target.checked) { record[target.name] = target.value } 

  if (!Object.keys(record).length) { return }

  const qn = document.getElementById("wrapper").dataset.qn

  sqlSaveFocusOutElement(record, qn).then(response => {
    if (typeof response !== "object") {
return;      alert("saveFocusOutElement", response)
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
    if (typeof response !== "object") {
      alert("saveRegistry", response)
    }
  }).catch(error => alert(error.stack))
}

export function addNewRecord(hn)
{
  const record = {hn: hn}

  sqlInsertNewRecord(record).then(response => {
    if (typeof response !== "object") {
      alert("addNewRecord", response)
    }
  }).catch(error => alert(error.stack))
}
