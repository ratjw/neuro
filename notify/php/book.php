<?php
//  $mysqli = new mysqli("localhost", "root", "Zaq1@wsx", "neurosurgery");
//  if ($mysqli->connect_errno)
//    exit("Connect failed: %s\n". $mysqli->connect_error);
//  echo json_encode(book($mysqli));

// waitnum < 0    : consult cases
// waitnum > 0    : booking cases
function book($mysqli, $begindate, $enddate)
{
  date_default_timezone_set("Asia/Bangkok");

  $rowi = array();
  $book = array();

  $sql = "SELECT waitnum,opdate,oproom,optime,casenum,staffname,hn,
            patient,dob,diagnosis,treatment,equipment,contact,qn
          FROM book 
          WHERE opdate BETWEEN '$begindate' AND '$enddate'
            AND deleted = 0
            AND waitnum > 0
          ORDER BY opdate, oproom is null,oproom,
            casenum is null,casenum, optime='',optime, waitnum;";
            // The one with blank/null will be the last, sorted by ASC

  if (!$result = $mysqli->query ($sql)) {
    return $mysqli->error;
  }
  while ($rowi = $result->fetch_assoc()) {
    $book[] = $rowi;
  }

  $allarray["BOOK"] = $book;

  return $allarray;
}
