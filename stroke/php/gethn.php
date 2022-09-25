<?php
include "connect.php";
include "record.php";
require_once "getPatientByHN.php";
require_once "merge.php";
require_once "lastEntryHN.php";
require_once "saveRecord.php";

  $input = json_decode(file_get_contents('php://input'), true);
  $record = record($input);
  $result = getPatientByHN($input[hn]);

  // HN not found
  if (empty($result[initial_name])) {
    exit("ไม่มีผู้ป่วย HN นี้");
  }

  // Only one name found
  $merge = merge($record, $result);

  $lastrecord = lastEntryHN($mysqli, $merge);

  echo saveRecord($mysqli, $lastrecord);
?>