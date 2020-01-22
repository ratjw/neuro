
import { start } from "./control/start.js"
import { Alert, msie } from "./util/util.js"

// from login.js
export let ADMIN = sessionStorage.getItem("admin").split(',')
export let isMobile = sessionStorage.getItem("isMobile") === 'true'
export let USER = sessionStorage.getItem("userid")

let wrapper = document.getElementById("wrapper")
let mcontainer = document.getElementById("maintblContainer")
let cssmenu = document.getElementById("cssmenu")

wrapper.style.display = "block"
mcontainer.style.height = wrapper.clientHeight - cssmenu.clientHeight + 'px'

; /^\d{6}$/.test(USER)
  ? start()
  : Alert("Alert!", "Invalid userid")
