
import { postData, MYSQLIPHP } from "./fetch.js"

export function sqlSaveHoliday(holidate, holiname)
{
  let sql=`sqlReturnData=INSERT INTO holiday (holidate,dayname)
              VALUES('${holidate}','${holiname}');
            SELECT * FROM holiday ORDER BY holidate;`

  return postData(MYSQLIPHP, sql)
}

export function sqlDelHoliday(holidate, holiname)
{
  let sql=`sqlReturnData=DELETE FROM holiday
              WHERE holidate='${holidate}' AND dayname='${holiname}';
            SELECT * FROM holiday ORDER BY holidate;`

  return postData(MYSQLIPHP, sql)
}
