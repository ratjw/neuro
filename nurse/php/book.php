<?php
//  $mysqli = new mysqli("localhost", "root", "Zaq1@wsx", "neurosurgery");
//  if ($mysqli->connect_errno)
//    exit("Connect failed: %s\n". $mysqli->connect_error);
//  echo json_encode(book($mysqli));
function book($mysqli)
{
  date_default_timezone_set("Asia/Bangkok");

  $rowi = array();
  $book = array();
  $consult = array();
  $time = array();
  $wait = array();
  $staff = array();

  $sql = "SELECT waitnum,opdate,oproom,optime,casenum,staffname,hn,
            patient,dob,diagnosis,treatment,equipment,contact,qn,editor
          FROM book 
          WHERE opdate >= DATE_FORMAT(CURDATE()-INTERVAL 1 MONTH,'%Y-%m-01')
            AND deleted = 0 AND waitnum > 0 AND opdate < '9999-01-01'
          ORDER BY opdate,oproom is null,oproom,casenum,
            IF(oproom, optime, null),waitnum;";
          // The one with no oproom will be the last, sorted by ASC
          // If no oproom, then will not sort on optime

  if (!$result = $mysqli->query ($sql)) {
    return $mysqli->error;
  }
  while ($rowi = $result->fetch_assoc()) {
    $book[] = $rowi;
  }
  // current() = array.toString()
  if ($result = $mysqli->query ("SELECT now();")) {
    $time = current($result->fetch_row());
  }

  $allarray["BOOK"] = $book;
  $allarray["QTIME"] = $time;

  return $allarray;
}
