<?php
// Find last previous entry of this hn
function lastEntryHN($record)
{
  $hn = $record["hn"];
	$sql = "SELECT staffname,diagnosis,treatment,contact
          FROM book
          WHERE hn = '$hn' AND deleted=0 AND opdate<CURDATE()
          ORDER BY opdate DESC;";
	$query = $mysqli->query ($sql);
	if ($query) {
    $oldpatient = $query->fetch_assoc();
    if (!$record["staffname"]) { $record["staffname"] = $oldpatient["staffname"]; }
    if (!$record["diagnosis"]) { $record["diagnosis"] = $oldpatient["diagnosis"]; }
    if (!$record["treatment"]) { $record["treatment"] = $oldpatient["treatment"]; }
    if (!$record["contact"]) { $record["contact"] = $oldpatient["contact"]; }
  }

  return $record;
}
