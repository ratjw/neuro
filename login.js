function login()
{
	// Ridirect to https
//	if (window.location.protocol === "http:" && window.location.hostname !== "localhost") {
//		window.location = "https://" + window.host
//	}

	// all via vpn (desktops and mobiles) must be "vpn-es5"
	// intranet old browser is in "vpn-es5"
	// Browsers that support module: Chrome/61, Firefox/60, Edge/16, Safari 10.1
	// (.*)$ is the second argument
	var ua = navigator.userAgent
	var isMobile = /Android|webOS|iPhone|iPad|BlackBerry|IEMobile/i.test(ua)
	var Chrome = ua.match(/Chrome\/(.*)$/)
	var Firefox = ua.match(/Firefox\/(.*)$/)
	var Edge = ua.match(/Edge\/(.*)$/)
	var Safari = ua.match(/Safari\/(.*)$/)
	var module = (Edge && Edge.length > 1)
              ? false
              : (Chrome && Chrome.length > 1)
                ? Chrome[1] >= "61"
                : (Firefox && Firefox.length > 1)
                  ? Firefox[1] >= "60"
                  : (Safari && Safari.length > 1)
                    ? Safari[1] >= "10.1"
                    : false
	var browser = /rvpn/.test(window.origin)
              ? isMobile
                ? "mobilevpn/mobilevpn.html"
                : "es5/es5.html"
              : module
                ? isMobile
                  ? "module/mobile.html"
                  : "module/desktop.html"
                : "es5/es5.html"
  var admin = '000000'
					
	document.getElementById("browser").value = browser
	sessionStorage.setItem('userid', document.getElementById("userid").value)
	sessionStorage.setItem('isMobile', isMobile)
  if (location.host === "localhost") {
    sessionStorage.setItem('userid', admin)
    document.getElementById("userid").value = admin
    document.getElementById("form").submit()
  }
}

function namesix()
{
	var userid = document.getElementById("userid").value
	if (/^\d{6}$/.test(userid)) {
		sessionStorage.setItem('userid', userid)
		document.getElementById("pwd").focus()
	}
}
