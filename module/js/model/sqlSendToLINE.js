
import { postData } from "./fetch.js"
import { USER } from "../main.js"
import { URIcomponent } from "../util/util.js"

const LINENOTIFY = "line/lineNotify.php"

export function sqlSendToLINE(message, canvas) {
  let pic = canvas.toDataURL('image/png',1.0),
    sql = `user=${USER}&message=${message}&image=${URIcomponent(pic)}`

  return postData(LINENOTIFY, sql)
}
