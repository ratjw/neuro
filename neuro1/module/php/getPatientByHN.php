<?php

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
