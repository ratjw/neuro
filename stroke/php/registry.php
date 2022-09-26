<?php
//  $mysqli = new mysqli("localhost", "root", "Zaq1@wsx", "neurosurgery");
//  if ($mysqli->connect_errno)
//    exit("Connect failed: %s\n". $mysqli->connect_error);
//  echo json_encode(registry($mysqli));

function registryHN($mysqli, $hn)
{
  date_default_timezone_set("Asia/Bangkok");

  $rowi = array();
  $registry = array();

  $sql = "SELECT * FROM registry 
          WHERE JSON_EXTRACT(registrysheet, '$.hn') = '$hn';";

  if (!$result = $mysqli->query ($sql)) {
    return $mysqli->error;
  }
  while ($rowi = $result->fetch_assoc()) {
    $registry[] = $rowi;
  }

  $sql = "INSERT INTO registry (registrysheet) VALUES ('{\"hn\":\"$hn\"}');";
  $mysqli->query($sql);
  return $mysqli->error;

  return $registry;
}

function registryQN($mysqli, $qn)
{
  date_default_timezone_set("Asia/Bangkok");

  $rowi = array();
  $registry = array();

  $sql = "SELECT * FROM registry 
          WHERE qn = $qn;";

  if (!$result = $mysqli->query ($sql)) {
    return $mysqli->error;
  }
  while ($rowi = $result->fetch_assoc()) {
    $registry[] = $rowi;
  }

  return $registry;
}
