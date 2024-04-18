
import { start } from "./control/start.js"
import { Alert } from "./util/util.js"

// from login.js
export let ADMIN = "000000"
export let USER = sessionStorage.getItem("userid")
export let DIVISION = 'ประสาทศัลยศาสตร์'
//new URLSearchParams(window.location.search).get("division")

let wrapper = document.getElementById("wrapper")
let mcontainer = document.getElementById("maintblContainer")
let cssmenu = document.getElementById("cssmenu")

wrapper.style.display = "block"
mcontainer.style.height = wrapper.clientHeight - cssmenu.clientHeight + 'px'

; /^\d{6}$/.test(USER)
  ? start()
  : Alert("Alert!", "Invalid userid")
