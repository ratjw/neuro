
import { postData, MYSQLIPHP } from "./fetch.js"

export function sqlSaveHoliday(holidate, holiname)
{
  let sql = `INSERT INTO holiday (holidate,dayname)
                VALUES('${holidate}','${holiname}');
              SELECT * FROM holiday ORDER BY holidate;`

  return postData(MYSQLIPHP, {sqlReturnData:sql})
}

export function sqlDelHoliday(holidate, holiname)
{
  let sql = `DELETE FROM holiday
                WHERE holidate='${holidate}' AND dayname='${holiname}';
              SELECT * FROM holiday ORDER BY holidate;`

  return postData(MYSQLIPHP, {sqlReturnData:sql})
}
