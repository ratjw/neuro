<?php
include "connect.php";
require_once "book.php";

	if (isset($_POST['start'])) {
    if (session_id() == "") session_start();
    $_SESSION['START_DATE'] = $_POST['start'];
		echo start($mysqli);
	}
	else if (isset($_POST['nosqlReturnbook']))
	{
		echo json_encode(book($mysqli));
	}
	else if (isset($_POST['sqlReturnbook'])) {
		echo returnbook($mysqli, $_POST['sqlReturnbook']);
	}
	else if (isset($_POST['sqlReturnService'])) {
		echo returnService($mysqli, $_POST['sqlReturnService']);
	}
	else if (isset($_POST['sqlReturnData'])) {
		echo returnData($mysqli, $_POST['sqlReturnData']);
	}
	else if (isset($_POST['sqlReturnResident'])) {
		echo returnResident($mysqli, $_POST['sqlReturnResident'], $_POST['training']);
	}
	else if (isset($_POST['sqlReturnStaff'])) {
		echo returnStaff($mysqli, $_POST['sqlReturnStaff']);
	}

function start($mysqli)
{
	$data = array();
	$data = book($mysqli);
	$data["STAFF"] = getStaff($mysqli);
	$data["HOLIDAY"] = getHoliday($mysqli);
	return json_encode($data);
}

function returnbook($mysqli, $sql)
{
	$return = multiquery($mysqli, $sql);
	if (is_string($return)) {
		return $return;
	} else {
		return json_encode(book($mysqli));
	}
}

function returnService($mysqli, $sql)
{
	$data = array();
	$return = multiquery($mysqli, $sql);
	if (is_string($return)) {
		return $return;
	} else {
		$data = book($mysqli);
		$data["SERVICE"] = $return;
		return json_encode($data);
	}
}

function returnData($mysqli, $sql)
{
	$return = multiquery($mysqli, $sql);
	if (is_string($return)) {
		return $return;
	} else {
		return json_encode($return);
	}
}

function returnResident($mysqli, $sql, $training)
{
	$data = array();
  $return = array();
  if ($sql) {
    $return = multiquery($mysqli, $sql);
  }
	if (is_string($return)) {
		return $return;
	} else {
		return json_encode(getResident($mysqli, $training));
	}
}

function returnStaff($mysqli, $sql)
{
	$data = array();
	$return = multiquery($mysqli, $sql);
	if (is_string($return)) {
		return $return;
	} else {
		$data["STAFF"] = getStaff($mysqli);
		return json_encode($data);
	}
}

function getResident($mysqli, $training)
{
	$year = date("Y") + 543;
  $month = date("m");
  $endmonth = 4;
  $yearth = ($month > $endmonth) ? ($year + 1) : $year;
  $sql = "SELECT * FROM resident WHERE $yearth-enrollyear<=$training ORDER BY enrollyear,ramaid;";
	return multiquery($mysqli, $sql);
}

function getStaff($mysqli)
{
	$sql = "SELECT * FROM personnel;";
	return multiquery($mysqli, $sql);
}

function getHoliday($mysqli)
{
	$sql = "SELECT * FROM holiday
            WHERE holidate >= CURDATE() - INTERVAL 1 YEAR
            ORDER BY holidate;";
	return multiquery($mysqli, $sql);
}

function multiquery($mysqli, $sql)
{
	$rowi = array();
	$data = array();
	if ($mysqli->multi_query($sql)) {
		do {
			// This will be skipped when no result, but no error
      // (success INSERT, UPDATE)
			if ($result = $mysqli->store_result()) {
				while ($rowi = $result->fetch_assoc()) {
					$data[] = $rowi;
				}
			}
			// no more query
			if (!$mysqli->more_results()) {
				return $data;
			}
		// next query
		} while ($mysqli->next_result());
	}
	// handle failed first query
	if ($mysqli->errno) {
		return 'DBfailed first query ' . $sql . " \n" . $mysqli->error;
	}
}
