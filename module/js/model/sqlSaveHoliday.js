
import { postData, MYSQLIPHP } from "./fetch.js"

export function sqlSaveHoliday(vdate, vname)
{
  let sql=`INSERT INTO holiday (holidate,dayname)
              VALUES('${vdate}','${vname}');
            SELECT * FROM holiday ORDER BY holidate;`

  return postData(MYSQLIPHP, {
    "sqlReturnData": sql
  })
}

export function sqlDelHoliday(vdate, holidayEng)
{
  let sql=`DELETE FROM holiday
              WHERE holidate='${vdate}' AND dayname='${holidayEng}';
            SELECT * FROM holiday ORDER BY holidate;`

  return postData(MYSQLIPHP, {
    "sqlReturnData": sql
  })
}
