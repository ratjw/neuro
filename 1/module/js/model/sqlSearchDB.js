
import { postData, MYSQLIPHP } from "./fetch.js"

const SEARCH  = "php/search.php"

export function sqlSearchDB(hn, name, surname, staffname, others) {
  let sql = `hn=${hn}&name=${name}&surname=${surname}&staffname=${staffname}&others=${others}`

  return postData(SEARCH, sql)
}
