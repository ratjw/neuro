<?php
include "connect.php";
include "record.php";
require_once "getPatientByName.php";
require_once "merge.php";
require_once "lastEntryHN.php";
require_once "saveRecord.php";

  $record = record($_POST);
  $result = getPatientByName($record["patientname"]);

  // More than one name found
  if (!array_key_exists("initial_name", $result)) {
    exit(json_encode($result));
  }

  // Name not found
  if (empty($result["initial_name"])) {
    exit("ไม่มีผู้ป่วยชื่อนี้");
  }

  // Only one name found
  $merge = merge($record, $result);

  $lastrecord = lastEntryHN($mysqli, $merge);

  echo saveRecord($mysqli, $lastrecord);
?>