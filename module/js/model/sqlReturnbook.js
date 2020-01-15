
import { postData, MYSQLIPHP } from "./fetch.js"
import { BEGINDATE, ENDDATE } from "../control/start.js"

export async function sqlReturnbook(sql)
{
  return await postData(MYSQLIPHP, {
    "sqlReturnbook": sql,
    "begindate": BEGINDATE,
    "enddate": ENDDATE
  })
}
