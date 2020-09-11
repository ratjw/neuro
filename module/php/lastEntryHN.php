<?php
// Find last previous entry of this hn
function lastEntryHN($mysqli, $input)
{
  $hn = $input[hn];
	$sql = "SELECT staffname,diagnosis,treatment,contact
          FROM book
          WHERE hn = '$hn' AND deleted=0 AND opdate<CURDATE()
          ORDER BY opdate DESC;";
	$query = $mysqli->query ($sql);
	if ($query) {
    $oldpatient = $query->fetch_assoc();
    if (!$input[staffname]) { $input[staffname] = $oldpatient[staffname]; }
    if (!$input[diagnosis]) { $input[diagnosis] = $oldpatient[diagnosis]; }
    if (!$input[treatment]) { $input[treatment] = $oldpatient[treatment]; }
    if (!$input[contact]) { $input[contact] = $oldpatient[contact]; }
  }

  return $input;
}
