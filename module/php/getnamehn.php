<?php
include "connect.php";
require_once "book.php";
require_once "getPatientByHN.php";
require_once "getPatientByName.php";
require_once "lastEntryHN.php";
require_once "saveRecord.php";

	$result = [];
  $record = [
    "hn" => "เจีย กากแก้ว",
    "initial_name" => "Mr.",
    "first_name" => "Name",
    "last_name" => "Surname",
    "dob" => "2000-01-01",
    "gender" => "M",

    "waitnum" => 1,
    "opdate" => date("Y-m-d"),
    "staffname" => "",
    "qn" => 0,
    "editor" => "",
    "diagnosis" => "",
    "treatment" => "",
    "contact" => ""
  ];

  foreach ($_POST as $key => $val) {
    $record[$key] = $_POST[$key];
  }

  $ip = gethostbyname(trim(`hostname`));
	if (strpos($ip, "10.6") !== false) {
    $arg = $record["hn"];
    if (preg_match('/\d{7}$/', $arg)) {
      $arg = filter_var($arg, FILTER_SANITIZE_NUMBER_INT);
      $result = getPatientByHN($arg);
    } else {
      $patient = preg_replace('/\d/', '',  $arg);
      $patient = trim($arg);
      $patient = preg_replace('/\s+/', ' ',  $arg);
      $name = explode(" ", $patient);
      $result = getPatientByName($name);
      // Name not found
      if (array_key_exists("initial_name", $result)) { exit("ม่มีผู้ป่วย ชื่อ/hn นี้"); }
      // More than one name found
      if (empty($result["initial_name"])) { exit(json_encode($result)); }
    }
	}

  // Only one name found
  foreach ($record as $key => $val) {
    if ($result[$key]) {
      $record[$key] = $result[$key];
    }
  }

  $record = lastEntryHN($record);

  echo saveRecord($record);
