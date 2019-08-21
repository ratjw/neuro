<?php
include "connect.php";
require_once "book.php";
require_once "getPatientByHN.php";
require_once "getPatientByName.php";
require_once "lastEntryHN.php";
require_once "saveRecord.php";

	$result = [];
  $record = [
    "hn" => "สมหมาย หล",
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
    $namehn = $record["hn"];
    if (preg_match('/\d{7}$/', $namehn)) {
      $hn = filter_var($namehn, FILTER_SANITIZE_NUMBER_INT);
      $result = getPatientByHN($hn);
    } else {
      $name = preg_replace('/\d/', '',  $namehn);
      $name = trim($name);
      $name = preg_replace('/\s+/', ' ',  $name);
      $result = getPatientByName($name);

      // More than one name found
      if (!array_key_exists("initial_name", $result)) {
        exit(json_encode($result));
      }

      // Name not found
      if (empty($result["initial_name"])) {
        exit("ไม่มีผู้ป่วย ชื่อ/hn นี้");
      }
    }
	}

  // Only one name found
  foreach ($record as $key => $val) {
    if (array_key_exists($key, $result)) {
      $record[$key] = $result[$key];
    }
  }

  $record = lastEntryHN($mysqli, $record);

  echo saveRecord($mysqli, $record);
?>