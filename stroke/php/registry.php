<?php
//  $mysqli = new mysqli("localhost", "root", "Zaq1@wsx", "neurosurgery");
//  if ($mysqli->connect_errno)
//    exit("Connect failed: %s\n". $mysqli->connect_error);
//  echo json_encode(registry($mysqli));

function registryHN($mysqli, $hn)
{
  $rowi = array();
  $registry = array();

  $registry = findExistingHN($mysqli, $hn);

  if (empty($registry)) {
    $sql = "INSERT INTO registry (registrysheet) VALUES ('{\"hn\":\"$hn\"}');";

    if (!$result = $mysqli->query ($sql)) {
      return $mysqli->error;
    }

    $registry = findExistingHN($mysqli, $hn);
    $new[newHN] = $registry;
    return $new;
  }

  return $registry;
}

function findExistingHN($mysqli, $hn)
{
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

  return $registry;
}

function registryQN($mysqli, $qn)
{
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
