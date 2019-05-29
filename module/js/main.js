
import { userDesktop } from "./control/startDesktop.js"
import { userMobile } from "./control/startMobile.js"
import { Alert, msie } from "./util/util.js"

// from login.js
export const USER = sessionStorage.getItem("userid")
export const isMobile = sessionStorage.getItem("isMobile") === 'true'
export const isPACS = !isMobile && msie()

document.getElementById("wrapper").style.display = "block"
document.getElementById("mainwrapper").style.height = window.innerHeight
  - document.getElementById("cssmenu").style.height

;/^\d{6}$/.test(USER)
? isMobile
  ? userMobile()
  : userDesktop()
: Alert("Alert!", "Invalid userid")
