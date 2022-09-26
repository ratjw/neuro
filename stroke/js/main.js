
import { fillRegistrySheet } from "./fillRegistrySheet.js"
import { sqlGetOldHN } from "./sqlRegistry.js"
import { addEventListener } from "./eventListener.js"
import { addNewRecord } from "./saveRegistry.js"
/*
// from login.js
export let ADMIN = sessionStorage.getItem("admin")
export let USER = sessionStorage.getItem("userid")
export let DIVISION = 'ประสาทศัลยศาสตร์'
//new URLSearchParams(window.location.search).get("division")
// For staff & residents with login id / password from Get_staff_detail
*/
  const inputhn = document.querySelector("#hn")

  inputhn.addEventListener('input', getHN)
  inputhn.focus()

function getHN(e) {
  const hn = e.target.value

  if (Number(1 + hn) >= 10000000) {
    getOldRecord(hn)
    addEventListener()
  }
}

function getOldRecord(hn)
{
  sqlGetOldHN(hn).then(response => {
		typeof response === "object"
		? success(response)
		: alert(response)
	})
  .catch(error => alert(error + "\n\n" + error.stack))
}

function success(response)
{
  if (Object.keys(response)[0] === "newHN") {
    newRecord(response)
  } else {
    oldRecord(response)
  }
}

function newRecord(response)
{
  let registry = Object.values(response)

  document.getElementById("wrapper").dataset.qn = registry[0][0].qn
}

function oldRecord(response)
{
  const registryArr = Object.values(response),
    registry = registryArr[0]

  if (registryArr.length > 1) {
    selectAdmission(registry)
  } else {
    const registrysheet = registry.registrysheet

    if (registrysheet.discharge) {
      if (confirm("มาครั้งใหม่")) {
        addNewRecord(registrysheet.hn)
      } else {
        fillRegistrySheet(registry)
      }
    } else {
      fillRegistrySheet(registry)
    }
  }
}

function selectAdmission(response)
{
  const admission = document.getElementById('admission');
  const selectEl = admission.querySelector('select');
  const confirmBtn = admission.querySelector('#confirmBtn');

  admission.showModal();

  return selectEl.value;
}

function newAdmission()
{
  const spanmessage = document.querySelector("#message")

  fillRegistrySheet(response)
  newAdmission()
  addEventListener()
}

function oldAdmission(response)
{

  fillRegistrySheet(response)
  newAdmission()
  addEventListener()
}
