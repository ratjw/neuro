
import { fillRegistrySheet } from "./fillRegistrySheet.js"
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

  inputhn.addEventListener('input', getHN);

function getHN(e) {
  const hn = e.target.value

  if (Number(1 + hn) >= 10000000) { getOldRecord(hn) }
}

function getOldRecord(hn)
{
  sqlGetOldRecord(hn).then(response => {
		typeof response === "object"
		? success(response)
		: alert(response)
	})
  .catch(error => alert(error + "\n\n" + error.stack))
}

function success(response)
{
  fillRegistrySheet(response)
  newAdmission()
  addEventListener()
}

function newAdmission()
{
  const spanmessage = document.querySelector("#message")

  fillRegistrySheet(response)
  newAdmission()
  addEventListener()
}
