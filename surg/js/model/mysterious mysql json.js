
// This is ok for getting service table in mysql 5.7, * not 8.0 *
// and can save profile by adding b.* in select (doing in JS)
function sqlOneMonth()
{
  return `SELECT b.* FROM book b left join personnel p
            ON b.staffname=p.profile->"$.name
          WHERE opdate BETWEEN '${serviceFromDate}' AND '${serviceToDate}'
            AND deleted=0
            AND waitnum<>0
            AND hn
          ORDER BY p.id,opdate,oproom,casenum,waitnum;`
}

// Finally in mysql 8.0 and 5.7 (doing in PHP)
function getService($mysqli, $from, $to)
{
  $sql = "SELECT b.* FROM book b left join personnel p
            ON JSON_CONTAINS(p.profile,JSON_QUOTE(b.staffname),'$.name')
          WHERE opdate BETWEEN '$from' AND '$to'
            AND deleted=0
            AND waitnum<>0
            AND hn
          ORDER BY p.id,opdate,oproom,casenum,waitnum;";
	return multiquery($mysqli, $sql);
}
