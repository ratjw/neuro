
function login()
{
  let ADMIN = '000000'
  let url = location.host
					
	sessionStorage.setItem('userid', document.getElementById("userid").value)

  if (url === "localhost" || url.includes("192.168")) {
    sessionStorage.setItem('userid', ADMIN)           // for main.js
    document.getElementById("userid").value = ADMIN  // for login.php
    document.getElementById("form").submit()
  }
}

function namesix()
{
	let userid = document.getElementById("userid").value
	if (/.{6}$/.test(userid)) {
		sessionStorage.setItem('userid', userid)
		document.getElementById("pwd").focus()
	}
}
