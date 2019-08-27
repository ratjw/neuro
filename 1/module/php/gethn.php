<?php
include "connect.php";
include "record.php";
require_once "getPatientByHN.php";
require_once "merge.php";
require_once "lastEntryHN.php";
require_once "saveRecord.php";

	$result = [];
  $record = record($_POST);

  $hn = filter_var($record["hn"], FILTER_SANITIZE_NUMBER_INT);
  $result = getPatientByHN($hn);

  // HN not found
  if (empty($result["initial_name"])) {
    exit("ไม่มีผู้ป่วย HN นี้");
  }

  // Only one name found
  $merge = merge($record, $result);

  $lastrecord = lastEntryHN($mysqli, $merge);

  echo saveRecord($mysqli, $lastrecord);
?>