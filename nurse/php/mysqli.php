<?php
include "connect.php";
require_once "book.php";

	if (isset($_POST['start'])) {
		echo start($mysqli);
	}
	else if (isset($_POST['nosqlReturnbook']))
	{
		echo json_encode(book($mysqli));
	}
	else if (isset($_POST['sqlReturnData'])) {
		echo returnData($mysqli, $_POST['sqlReturnData']);
	}

function start($mysqli)
{
	$data = array();
	$data = book($mysqli);
	$data["HOLIDAY"] = getHoliday($mysqli);
	$data["STAFF"] = getStaff($mysqli);

	return json_encode($data);
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

function getHoliday($mysqli)
{
	$sql = "SELECT * FROM holiday
          WHERE holidate >= MAKEDATE(year(now()),1)- interval 1 month
          ORDER BY holidate;";
	return multiquery($mysqli, $sql);
}

function getStaff($mysqli)
{
	$sql = "SELECT * FROM personnel;";
	return multiquery($mysqli, $sql);
}

function multiquery($mysqli, $sql)
{
	$rowi = array();
	$data = array();
	if ($mysqli->multi_query(urldecode($sql))) {
		do {
			// This will be skipped when no result, but no error (success INSERT, UPDATE)
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
