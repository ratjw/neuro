
import { start } from "./control/start.js"

export let USER = '000000'//sessionStorage.getItem("userid")

document.getElementById("wrapper").style.display = "block"
document.getElementById("mainwrapper").style.height = window.innerHeight
  - document.getElementById("cssmenu").style.height

start()
