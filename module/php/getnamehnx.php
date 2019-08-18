<?php
include "connect.php";
require_once "book.php";

  $record = array(
    $hn => "1234567",
    $initial_name => "Mr.",
    $first_name => "Name",
    $last_name => "Surname",
    $dob => "2000-01-01",
    $gender => "M",

    $staffname => "",
    $qn => 0,
    $editor => "",
    $diagnosis => "",
    $treatment => "",
    $contact => "",
  );

	extract($record);

	extract($_POST);

	$ip = gethostbyname(trim(`hostname`);
	if (strpos($ip, "10.6") !== false) {
    if ($hn) {
      if (preg_match('/\d{7}$/', $hn)) {
        $hn = filter_var($hn, FILTER_SANITIZE_NUMBER_INT);
        $result = getPatientByHN($hn);
      } else {
        $patient = preg_replace('/\d/', '',  $hn);
        $patient = trim($hn);
        $patient = preg_replace('/\s+/', ' ',  $hn);
        $name = explode(" ", $patient);
        $result = getPatientByName($name);
        if (!array_key_exists("initial_name", $result)) {
          foreach ($result as $resulty) {
            while ($resulty->children())
              $resulty = $resulty->children();
            $result = array_push($resulty);
          }
          exit json_encode($result);
        }
      }
    }

		extract($result);
	}

  if (!$first_name) { exit ("ไม่มีผู้ป่วย ชื่อ/hn นี้"); }

	//Find last entry of patient with this hn
	$sql = "SELECT staffname,diagnosis,treatment,contact
          FROM book
          WHERE hn = '$hn' AND deleted=0 AND opdate<CURDATE()
          ORDER BY opdate DESC;";
	$query = $mysqli->query ($sql);
	if ($query) {
    $oldpatient = $query->fetch_assoc();
    $staffname = $staffname ? $staffname : $oldpatient["staffname"];
    $diagnosis = $diagnosis ? $diagnosis : $oldpatient["diagnosis"];
    $treatment = $treatment ? $treatment : $oldpatient["treatment"];
    $contact = $contact ? $contact : $oldpatient["contact"];
  }

  foreach ($record as $key) { $record[$key] = $key; }

	if ($qn) {
    $sql = sqlUpdate($record);
	} else {
    $sql = sqlInsert($record);
	}

	$query = $mysqli->query ($sql);
	if (!$query)
		echo $mysqli->error . $sql;
	else
		echo json_encode(book($mysqli));

//-----------------------------------

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

//find last children, then
//use json encode-decode to make numeric array into assoc array
function getPatientByHN($hn)
{
  $wsdl="http://appcenter/webservice/patientservice.wsdl";
  $client = new SoapClient($wsdl);
  $resultx = $client->Get_demographic_short($hn);
  $resulty = simplexml_load_string($resultx);
  while ($resulty->children())
    $resulty = $resulty->children();
  $resultj = json_encode($resulty);
  $resultz = json_decode($resultj,true);

  if (empty($resultz["initial_name"]))
    $resultz["initial_name"] = "";
  if (empty($resultz["first_name"]))
    $resultz["first_name"] = "";
  if (empty($resultz["last_name"]))
    $resultz["last_name"] = "";
  if (empty($resultz["dob"]))
    $resultz["dob"] = null;
  if (empty($resultz["gender"]))
    $resultz["gender"] = "";

  return $resultz;
}

//find last children, then
//use json encode-decode to make numeric array into assoc array
function getPatientByName($name)
{
  $first_name = isset($name[0]) ? $name[0] : "";
  $last_name = isset($name[1]) ? $name[1] : "";

  $wsdl="http://appcenter/webservice/patientservice.wsdl";
  $client = new SoapClient($wsdl);
  $resultx = $client->Get_demographic_shortByName($first_name." ".$last_name);
  $resulty = simplexml_load_string($resultx);

  if (sizeof($resulty) > 1) { return $resulty }

  while ($resulty->children())
    $resulty = $resulty->children();
  $resultj = json_encode($resulty);
  $resultz = json_decode($resultj,true);

  if (empty($resultz["initial_name"]))
    $resultz["initial_name"] = "";
  if (empty($resultz["first_name"]))
    $resultz["first_name"] = "";
  if (empty($resultz["last_name"]))
    $resultz["last_name"] = "";
  if (empty($resultz["dob"]))
    $resultz["dob"] = null;
  if (empty($resultz["gender"]))
    $resultz["gender"] = "";

  return $resultz;
}
