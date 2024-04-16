<?php
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$userid = !empty($_POST['userid']) ? $_POST['userid'] : '';
		$pwd = !empty($_POST['pwd']) ? $_POST['pwd'] : '';
		$doctor = !empty($_POST['browser']) ? $_POST['browser'] : '';
    $admin = ($userid === "000000") && ($pwd === "BzAs1953");

    $thisname = $_SERVER["SERVER_NAME"];
    $localhost = strpos($thisname, "localhost") !== false;
    $localnet = strpos($thisname, "192.168") !== false;

    // exclude non-Rama registers
    if (!$localhost && !$localnet && !$admin) {
      $success = getLogin($userid, $pwd);
      if (!$success) {
				$error = "Incorrect password or username";
        header("location:index.php?error=$error");
        return;
      }
    }

    $neurosurgery = getOrgId($userid);

		// exclude non-neurosurgery personnels
    if (!$neurosurgery) {
			$error = "For Neurosurgery Personnels Only";
      header("location:index.php?error=$error");
		}

    echo "<script>localStorage.setItem('role', '$neurosurgery');</script>";
		$browserDoctor = "location:$doctor";
		$browserNurse = "location:nurse/nurse.html";
    if ($neurosurgery === "N") {
      header($browserNurse);
    }	else {
      header($browserDoctor);
    }
	}

function getLogin($userid, $pwd)
{
  $wsdl="http://appcenter/webservice/patientservice.wsdl";
  $client = new SoapClient($wsdl);
  $response = $client->Get_staff_detail($userid, $pwd);
  $xml = simplexml_load_string($response);
  $roleCode = (string)$xml->staff_detail->role;

  return !!$roleCode;
}

// check personnel and role
// use key 'http' even if you send the request to https://...
function getOrgId($userid)
{
  $neurosurg = "50010566";
  $url = 'http://prod-nodeserv.rama.mahidol.ac.th:8080/AuthenticationAPI/services/staffservice/getstaffinfobyid';
  $data = json_encode(['staffId' => $userid]);
  $options = [
      "http" => [
          "header" => "Content-Type: application/json",
          "method" => "POST",
          "content" => $data
      ]
  ];

  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  $resultz = json_decode($result);
  $orgID = $resultz->data->orgId;
  $roleCode = $resultz->data->roleCode;
  $positionName = $resultz->data->positionName;

  if ($userid === "000000") {
    return true;
  }
  if ($orgID === $neurosurg) {
    if ($roleCode === "S" && $positionName === "แพทย์") {
      return "F";
    } else {
      return $roleCode;
    }
  }
}
?>
