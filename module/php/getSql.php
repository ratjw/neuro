<?php
function getService($mysqli, $from, $to)
{
  $sql = "SELECT * FROM book b left join personnel p
            ON b.staffname=p.profile->'$.name'
          WHERE opdate BETWEEN '$from' AND '$to'
            AND deleted=0
            AND waitnum<>0
            AND hn
          ORDER BY p.id,opdate,oproom,casenum,waitnum;";
	return multiquery($mysqli, $sql);
}

function getResident($mysqli)
{
  $sql = "SELECT * FROM personnel
          WHERE profile->'$.role'='resident'
          ORDER BY profile->'$.yearOne'+profile->'$.addLevel',profile->'$.ramaid';";
	return multiquery($mysqli, $sql);
}

function getStaff($mysqli)
{
	$sql = "SELECT * FROM personnel where profile->'$.role'='staff';";
	return multiquery($mysqli, $sql);
}

function getHoliday($mysqli)
{
	$sql = "SELECT * FROM holiday
            WHERE holidate >= MAKEDATE(year(now()),1)- interval 1 month
            ORDER BY holidate;";
	return multiquery($mysqli, $sql);
}
