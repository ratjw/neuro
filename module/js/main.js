
import { userDesktop } from "./control/startDesktop.js"
import { userMobile } from "./control/startMobile.js"
import { Alert, msie } from "./util/util.js"

// from login.js
export let ADMIN = sessionStorage.getItem("admin")
export let SECRETARY = sessionStorage.getItem("secretary")
export let isMobile = sessionStorage.getItem("isMobile") === 'true'
export let isPACS = !isMobile && msie()
export let USER = sessionStorage.getItem("userid")

document.getElementById("wrapper").style.display = "block"
document.getElementById("mainwrapper").style.height = window.innerHeight
  - document.getElementById("cssmenu").style.height

; /^\d{6}$/.test(USER)
  ? isMobile
    ? userMobile()
    : userDesktop()
  : Alert("Alert!", "Invalid userid")
