<?php
//  $mysqli = new mysqli("localhost", "root", "Zaq1@wsx", "neurosurgery");
//  if ($mysqli->connect_errno)
//    exit("Connect failed: %s\n". $mysqli->connect_error);
//  echo json_encode(book($mysqli));

// waitnum < 0    : consult cases
// waitnum > 0    : booking cases
function registry($mysqli, $hn)
{
  date_default_timezone_set("Asia/Bangkok");

//  if (session_id() == "") session_start();
//  $start = $_SESSION['START_DATE'];
  $rowi = array();
  $registry = array();

  $sql = "SELECT * FROM registry WHERE hn = '$hn';

  if (!$result = $mysqli->query ($sql)) {
    return $mysqli->error;
  }
  while ($rowi = $result->fetch_assoc()) {
    $registry[] = $rowi;
  }

  return $registry;
}
