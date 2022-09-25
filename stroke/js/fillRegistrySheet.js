
//import { USER } from "./main.js"
//import { sqlGetEditedBy, sqlSaveRegistry, sqlCancelAllRegistry } from "../model/sqlRegistry.js"

export function fillRegistrySheet(record)
{
  let allElenotDIV = document.querySelectorAll('*[id]:not(div[id]'),
    allIDnotDIV = allElenotDIV.map(e => e.id),
    allElename = document.querySelectorAll('*[name]'),
    allname = allElename.map(e => e.name)

//  for (let key in thisRegistry) {
//    document.getElementById(key).innerHTML = thisRegistry[key]
//  }

  if (!record.length) { return }

  Object.entries(JSON.parse(record)).forEach(([key, val]) => {
    if (key in allIDnotDIV) {
      allElenotDIV[allIDnotDIV.indexOf(key)].innerHTML = val
    }
    if (key in allname) {
      allElename[allname.indexOf(key)].checked = true
    }
  })
}
