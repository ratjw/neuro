<?php
include "connect.php";
require_once "book.php";

  $input = json_decode(file_get_contents('php://input'), true);

	if (isset($input['begindate'])) {
		echo start($mysqli, $input['begindate'], $input['enddate']);
	}
	else if (isset($input['nosqlReturnbook'])) {
		echo json_encode(book($mysqli));
	}
	else if (isset($input['sqlReturnbook'])) {
		echo returnbook($mysqli, $input['sqlReturnbook']);
	}
	else if (isset($input['sqlReturnService'])) {
		echo returnService($mysqli, $input['sqlReturnService']);
	}
	else if (isset($input['sqlReturnData'])) {
		echo returnData($mysqli, $input['sqlReturnData']);
	}
	else if (isset($input['sqlReturnStaff'])) {
		echo returnStaff($mysqli, $input['sqlReturnStaff']);
	}

function start($mysqli, $begindate, $enddate)
{
	$data = array();
	$data = book($mysqli, $begindate, $enddate);
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

function getStaff($mysqli)
{
	$sql = "SELECT * FROM staff ORDER BY number;";
	return multiquery($mysqli, $sql);
}

function getHoliday($mysqli)
{
	$sql = "SELECT * FROM holiday ORDER BY holidate;";
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
