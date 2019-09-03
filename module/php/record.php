<?php
function record($POST)
{
  $record = [
    "waitnum" => 1,
    "opdate" => date("Y-m-d"),
    "staffname" => "",
    "hn" => "1234567",
    "patientname" => "สมหมาย หล",
    "initial_name" => "Mr.",
    "first_name" => "Name",
    "last_name" => "Surname",
    "dob" => "2000-01-01",
    "gender" => "M",
    "diagnosis" => "",
    "treatment" => "",
    "contact" => "",
    "qn" => 0,
    "editor" => ""
  ];

  foreach ($POST as $key => $val) {
    $record[$key] = $POST[$key];
  }

  return $record;
}
