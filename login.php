<?php
require_once "personnel.php";

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$userid = !empty($_POST['userid']) ? $_POST['userid'] : '';
		$pwd = !empty($_POST['pwd']) ? $_POST['pwd'] : '';
		$browser = !empty($_POST['browser']) ? $_POST['browser'] : '';

		$browserDoctor = "location:$browser";
		$browserNurse = "location:nurse/nurse.html";

		$servername = "surgery.rama.mahidol.ac.th";
    $thisname = $_SERVER["SERVER_NAME"];
		$wsdl="http://appcenter/webservice/patientservice.wsdl";
		$resultz = "";
		$error = "";
    $personnel = preg_match('/^\d{6}$/', $userid);

		if ($personnel) {
      $localhost = strpos($thisname, "localhost") !== false;
      $localnet = strpos($thisname, "192.168") !== false;
      $intranet = strpos($thisname, $servername) !== false;

			if ($localhost || $localnet) {
				$resultz = "S";
			}
			else if ($intranet) {
				$client = new SoapClient($wsdl);
				$resultx = $client->Get_staff_detail($userid, $pwd);
				$resulty = simplexml_load_string($resultx);
				$resultz = (string)$resulty->children()->children()->role;
			}

			$staff = $resultz === "S";
      $resident = $resultz === "R";
      $nurse = $resultz === "N";
      $secretary = $resultz === "G";
 
      if ($staff || $resident || $secretary) {
				header($browserDoctor);
			}
			else if ($nurse) {
				header($browserNurse);
			}
			else {
				$error = "Incorrect password or username";
        header("location:index.php?error=$error");
			}
		} else {
			$error = "Invalid username";
      header("location:index.php?error=$error");
		}
	}
?>
