<?php
require_once "book.php";

function saveRecord($mysqli, $record)
{
  // Escape special characters, if any
  $string = array("diagnosis", "treatment", "contact");
  foreach ($string as $value) {
    $record[$value] = $mysqli -> real_escape_string($record[$value]);
  }

  if ($record[qn]) {
    $sql = sqlUpdate($record);
	} else {
    $sql = sqlInsert($record);
	}

	$query = $mysqli->query ($sql);
	if (!$query)
		return $mysqli->error . $sql;
	else
		return json_encode(book($mysqli));
}

//existing row, ignore waitnum
function sqlUpdate($record)
{
	extract($record);

  $sql = "UPDATE book 
      SET staffname = CASE WHEN staffname = ''
                 THEN '$staffname'
                 ELSE staffname
              END,
        hn = '$hn', 
        patient = '$initial_name$first_name $last_name',
        dob = CASE WHEN $dob IS NOT NULL THEN '$dob' ELSE dob END,
        gender = '$gender', 
        diagnosis = CASE WHEN diagnosis = ''
                 THEN '$diagnosis'
                 ELSE diagnosis
              END,
        treatment = CASE WHEN treatment = ''
                 THEN '$treatment'
                 ELSE treatment
              END,
        contact =  CASE WHEN contact = ''
                THEN '$contact'
                ELSE contact
              END,
        editor = '$editor' 
      WHERE qn = $qn;";

  return $sql;
}

//new row, insert waitnum, opdate and others if any
function sqlInsert($record)
{
	extract($record);

  $patient = "$initial_name$first_name $last_name";
  $dob = $dob ? "'$dob'" : "null";
  $sql = "INSERT INTO book (
         waitnum,   opdate,    staffname,    hn,   patient,   dob,  gender,    diagnosis,    treatment,    contact,    editor) 
VALUES ($waitnum,'$opdate','$staffname','$hn','$patient',$dob,'$gender','$diagnosis','$treatment','$contact','$editor');";

  return $sql;
}
