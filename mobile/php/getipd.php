<?php
include "connect.php";
require_once "book.php";
require_once "mysqli.php";

const $neuroStaffs = [
  "004415", "003391", "007841", "008146", "004606", "006599", "006805"
];

	$from = $_POST["from"];
	$to = $_POST["to"];
	$sql = $_POST["sql"];

	$result = $mysqli->query ("SELECT hn, admit, discharge, qn
		FROM book
		WHERE opdate BETWEEN '$from' AND '$to';");

	if (!$result) { return; }

	while ($rowi = $result->fetch_assoc()) {
		$case[] = $rowi;
	}

	$update = false;
	foreach ($case as $eachcase)
	{
		$hn = $eachcase["hn"];
		$qn = $eachcase["qn"];

		$ipd = getipd($hn);

    $staff = $ipd[attender];
    if (in_array($staff, $neuroStaffs)) { continue; }

		$oldAdmit = $eachcase[admit];
		$oldDischarge = $eachcase[discharge];

		$newAdmit = getIPDdate($ipd[effectivestartdate]);
		$newDischarge = getIPDdate($ipd[effectiveenddate]);

		$admit = "";
		$discharge = "";
		if (($newAdmit >= $from) && ($newAdmit <= $to) && ($oldAdmit < $newAdmit)) {
			$admit = "admit='$newAdmit',";
		}
		if (($newDischarge >= $from) && ($newDischarge <= $to) && ($oldDischarge < $newDischarge)) {
				$discharge = "discharge='$newDischarge',";
		}
		if ($admit || $discharge) {
			$mysqli->query("UPDATE book SET $admit$discharge editor='getipd' WHERE qn=$qn;");
			$update = true;
		}
	}

 	if ($update) {
		echo returnService($mysqli, $sql);
	}

//use json encode-decode to convert XML to assoc array
function getipd($hn)
{
	$wsdl="http://appcenter/webservice/patientservice.wsdl";
	$client = new SoapClient($wsdl);
	$resultx = $client->GetEncounterDetailByMRNENCTYPE($hn, "IMP");
	$resulty = simplexml_load_string($resultx);
	while ($resulty->children())
		$resulty = $resulty->children();
	$resultj = json_encode($resulty);

	return json_decode($resultj,true);
}

function getIPDdate($date)
{
	if (empty($date)) {
		return null;
	} else {
		$DateTime = DateTime::createFromFormat('d/m/Y H:i:s', $date);
		return $DateTime->format('Y-m-d');
	}
}
