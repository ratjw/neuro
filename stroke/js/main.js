
import { fillRegistrySheet } from "./fillRegistrySheet.js"
import { saveRegistry } from "./saveRegistry.js"
/*
// from login.js
export let ADMIN = sessionStorage.getItem("admin")
export let USER = sessionStorage.getItem("userid")
export let DIVISION = 'ประสาทศัลยศาสตร์'
//new URLSearchParams(window.location.search).get("division")
// For staff & residents with login id / password from Get_staff_detail
*/
  const inputhn = document.querySelector("#hn"),
    spanmessage = document.querySelector("#message")

  inputhn.addEventListener('input', getHN);

  if (Number(1 + inputhn.value) >= 10000000) {
    getOldRecord(inputhn.value)
  } else {
    spanmessage.innerHTML = "กรุณาใส่หมายเลขเวชระเบียน"
  }

  window.addEventListener("keyup", (event) => {
    setTimeout(saveRegistry, 3)
  });
  window.addEventListener("click", (event) => {
    saveRegistry()
  });

function getHN(e) {
  const hn = e.target.value

  if (Number(1 + hn) >= 10000000) { getOldRecord(hn) }
}

function getOldRecord(hn)
{
  document.querySelector("#message").innerHTML = "here"
  return
  sqlGetOldRecord(hn).then(response => {
		typeof response === "object"
		? fillRegistrySheet(response)
		: alert(response)
	})
  .catch(error => alert(error + "\n\n" + error.stack))
}
