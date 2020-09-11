<?php
include "connect.php";
require_once "book.php";
require_once "getSql.php";

  $input = json_decode(file_get_contents('php://input'));
	if (isset($input->start)) {
		if (session_id() == "") { session_start(); }
		$_SESSION['START_DATE'] = $input->start;
		echo start($mysqli);
	}
	else if (isset($input->sqlReturnbook)) {
		echo returnbook($mysqli, $input->sqlReturnbook);
	}
	else if (isset($input->sqlReturnService)) {
		echo returnService($mysqli, $input->sqlReturnService);
	}
	else if (isset($input->sqlReturnData)) {
		echo returnData($mysqli, $input->sqlReturnData);
	}
	else if (isset($input->sqlReturnResident)) {
		echo returnResident($mysqli, $input->sqlReturnResident);
	}
	else if (isset($input->sqlReturnStaff)) {
		echo returnStaff($mysqli, $input->sqlReturnStaff);
	}

function start($mysqli)
{
	$data = array();
	$data = book($mysqli);
	$data[STAFF] = getStaff($mysqli);
	$data[HOLIDAY] = getHoliday($mysqli);
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

function returnData($mysqli, $sql)
{
	$return = multiquery($mysqli, $sql);
	if (is_string($return)) {
		return $return;
	} else {
		return json_encode($return);
	}
}

function returnResident($mysqli, $sql)
{
	$data = array();
  $return = array();
  if ($sql) {
    $return = multiquery($mysqli, $sql);
    if (is_string($return)) {
      return $return;
    }
  }

  return json_encode(getResident($mysqli));
}

function returnStaff($mysqli, $sql)
{
	$data = array();
	$return = multiquery($mysqli, $sql);
	if (is_string($return)) {
		return $return;
	} else {
		return json_encode(getStaff($mysqli));
	}
}

function returnService($mysqli, $service)
{
  $from = isset($service->serviceFromDate) ? $service->serviceFromDate : "";
  $to = isset($service->serviceToDate) ? $service->serviceToDate : "";
  $sql = isset($service->sql) ? $service->sql : "";
	$data = array();

	if (!$sql) {
    return json_encode(getService($mysqli, $from, $to));
  }

  $return = multiquery($mysqli, $sql);
  if (is_string($return)) {
    return $return;
	} else {
    $data = book($mysqli);
    $data[SERVICE] = getService($mysqli, $from, $to);
    return json_encode($data);
  }
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
