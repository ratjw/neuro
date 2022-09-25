import { sqlSaveRegistry } from "./sqlRegistry.js"
import { fillRegistrySheet } from "./fillRegistrySheet.js"

export function saveRegistry()
{
  let allElenotDIV = document.querySelectorAll('*[id]:not(div[id]'),
    allIDnotDIV = allElenotDIV.map(e => e.id),
    allElename = document.querySelectorAll('*[name]'),
    allname = allElename.map(e => e.name),
    record = {}

  allElenotDIV.forEach(e => (e.value) && record[e] = value)
  allElename.forEach(e => (e.check) && record[e] = value)
/*
  if (deepEqual(RegistryJSON, _JsonRegistry)) { return }

  Registryment = JSON.stringify(RegistryJSON)
  Registryment = apostrophe(Registryment)
*/
  if (!Object.key(record).length) { return }

  sqlSaveRegistry(record).then(response => {
    if (typeof response === "object") {
      localStorage.setItem("updateSheet", response)
    } else {
      Alert("saveRegistry", response)

      // failed save, roll back
      fillRegistrySheet()
    }
  }).catch(error => alert(error.stack))
}

export function cancelAllRegistry()
{
  sqlCancelAllRegistry(_qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
    } else {
      Alert("cancelAllRegistry", response)

      // failed cancel, roll back
      fillRegistrySheet()
    }
  }).catch(error => alert(error.stack))
}
