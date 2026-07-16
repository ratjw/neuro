<?php

//find last children, then
//use json encode-decode to make numeric array into assoc array
function getPatientByName($name)
{
  $name = explode(" ", $name);
  $first_name = isset($name[0]) ? $name[0] : "";
  $last_name = isset($name[1]) ? $name[1] : "";
  $space = $last_name ? " " : "";
  $fullname = $first_name.$space.$last_name;

  $wsdl="http://appcenter.rama.mahidol.ac.th/webservice/patientservice.wsdl";
  $client = new SoapClient($wsdl);
  $resultx = $client->Get_demographic_shortByName($fullname);
  $resulty = simplexml_load_string($resultx);

  if (sizeof($resulty) > 1) {
    $resultz = [];
    foreach ($resulty as $result) {
      while ($result->children())
        $result = $result->children();
      array_push($resultz, $result);
    }
  } else {
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
  }

  return $resultz;
}
