
function login()
{
	// Ridirect to https
//	if (window.location.protocol === "http:" && window.location.hostname !== "localhost") {
//		window.location = "https://" + window.host
//	}

	// desktop via vpn or old browser is to "es5"
	var browser = /rvpn/.test(window.origin) ? "es5/es5.html" : "surg"
  var admin = '000000'
					
  sessionStorage.setItem('admin', admin)
	sessionStorage.setItem('userid', document.getElementById("userid").value)
	document.getElementById("browser").value = browser
  if (location.host === "localhost") {
    sessionStorage.setItem('userid', admin)
    document.getElementById("userid").value = admin
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
