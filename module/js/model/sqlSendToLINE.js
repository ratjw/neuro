
import { postData } from "./fetch.js"
import { USER } from "../main.js"

const LINENOTIFY = "line/lineNotify.php"

export function sqlSendToLINE(message, canvas) {
  let sql = `user=${USER}&message=${message}&image=${canvas.toDataURL('image/png',1.0)}`

  return postData(LINENOTIFY, sql)
}
