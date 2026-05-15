
import { start } from "./control/start.js"
import { Alert } from "./util/util.js"

// from login.js
export const ADMIN = "000000"
export const USER = sessionStorage.getItem("userid")
export const DIVISION = 'ประสาทศัลยศาสตร์'
//new URLSearchParams(window.location.search).get("division")

let wrapper = document.getElementById("wrapper")
let mcontainer = document.getElementById("maintblContainer")
let cssmenu = document.getElementById("cssmenu")
let url = location.host
let ramaneuro = "10.6.22.116"
let homehub = "192.168.1"

if (url.includes(ramaneuro) || url.includes(homehub)) {
  sessionStorage.setItem('userid', ADMIN)
}

wrapper.style.display = "block"
mcontainer.style.height = wrapper.clientHeight - cssmenu.clientHeight + 'px'

; /^\d{6}$/.test(USER)
  ? start()
  : Alert("Alert!", "Invalid userid")
