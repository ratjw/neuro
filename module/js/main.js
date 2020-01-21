
import { start } from "./control/start.js"
import { Alert, msie } from "./util/util.js"

// from login.js
export let ADMIN = sessionStorage.getItem("admin").split(',')
export let isMobile = sessionStorage.getItem("isMobile") === 'true'
export let USER = sessionStorage.getItem("userid")

let wrapper = document.getElementById("wrapper")
let mwrapper = document.getElementById("mainwrapper")
let cssmenu = document.getElementById("cssmenu")

wrapper.style.display = "block"
mwrapper.style.height = wrapper.clientHeight - cssmenu.clientHeight + 'px'

; /^\d{6}$/.test(USER)
  ? start()
  : Alert("Alert!", "Invalid userid")
