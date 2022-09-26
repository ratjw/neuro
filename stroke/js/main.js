
import { fillRegistrySheet } from "./fillRegistrySheet.js"
import { sqlGetOldHN } from "./sqlRegistry.js"
import { addEventListener } from "./eventListener.js"
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
		? haveOldRecord(response)
		: noOldRecord(hn)
	})
  .catch(error => alert(error + "\n\n" + error.stack))
}

function haveOldRecord(response)
{return
/*  const registry = JSON.parse(response)
  const selected = selectAdmission(response)
  
  if (selected === "newAdmission")
  fillRegistrySheet(response)*/
}

function noOldRecord(hn)
{return

  let record = {}

  const qn = document.getElementById("wrapper").dataset.qn

  sqlInsertNewRecord(record, qn).then(response => {
    if (typeof response === "object") {
      return
    } else {
      
//      alert("saveFocusOutElement", response)
    }
  }).catch(error => alert(error.stack))
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
  const admission = document.getElementById("admission"),
    admit = prompt("เลือกครั้ง", admission.innerHTML)

  fillRegistrySheet(response)
  newAdmission()
  addEventListener()
}
