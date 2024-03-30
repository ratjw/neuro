
import { postData } from "./fetch.js"

const SEARCH  = "php/search.php"

export function sqlSearchDB(hn, name, surname, staffname, others, datebegin, dateend) {
  let sql = {
              hn:hn,
              name:name,
              surname:surname,
              staffname:staffname,
              others:others,
              datebegin,
              dateend
            }

  return postData(SEARCH, sql)
}
