
function login()
{
  var ADMIN = '000000'
					
	sessionStorage.setItem('userid', document.getElementById("userid").value)

  if (location.host === "localhost") {
    sessionStorage.setItem('userid', ADMIN)           // for main.js
    document.getElementById("userid").value = ADMIN  // for login.php
    document.getElementById("form").submit()
  }
}

function namesix()
{
	var userid = document.getElementById("userid").value
	if (/.{6}$/.test(userid)) {
		sessionStorage.setItem('userid', userid)
		document.getElementById("pwd").focus()
	}
}
