<?php
include "connect.php";
require_once "mysqli.php";

  $input = json_decode(file_get_contents('php://input'), true);
	extract($input);

	$sql = "";

  if ($hn) {
    $sql .= "hn='$hn'";
  }
  if ($name) {
		if ($sql) { $sql .= " AND "; }
    $sql .= "patient like '%$name%'";
  }
  if ($surname) {
		if ($sql) { $sql .= " AND "; }
    $sql .= "patient like '%$surname%'";
  }
	if ($staffname) {
		if ($sql) { $sql .= " AND "; }
		$sql .= "staffname='$staffname'";
	}
	if ($others) {
		$data = getData($mysqli, $sql, $others);
	} else {
		if ($sql) {
			$data = search($mysqli, $sql);
		}
	}

	echo json_encode($data);

function getData($mysqli, $sql, $others)
{
	$column = array("diagnosis","treatment","equipment","admission","final");
	$data = array();
	$qns = array();
	$findArr = explode(" ", $others);
  $findArr = array_filter($findArr);

	$sqlx = $sql ? "AND $sql" : "";
	$sqls = "SELECT * FROM book
					 WHERE deleted=0 $sqlx
					 ORDER BY opdate;";

	if (!$result = $mysqli->query ($sqls)) {
		return $mysqli->error;
	}

	while ($rowi = $result->fetch_assoc()) {
		$data[] = $rowi;
	}

	foreach($data as $row) {
		$match = false;
		$allcols = "";

		// Add 4 columns together
		foreach($column as $key) {
			$allcols .= $row[$key]." ";
		}

		// use non-alphanumeric characters as separators
		$allcols = preg_replace("/[^A-Za-z0-9 ']/", ' ', $allcols);
		$allcols = preg_replace('/\s\s+/', ' ', $allcols);
		$alldata = explode(" ", $allcols);

		foreach ($findArr as $find) {
			$match = false;
			if (strpos($allcols, $find) === false) {
				foreach ($alldata as $onedata) {
					$leven = levenshtein($find, $onedata);
					if ($leven >= 0 && $leven < 4) {
						$find = strtolower($find);
						$onedata = strtolower($onedata);
						similar_text($find, $onedata, $percent);
						if ($percent > 70) {
							$match = true;
							break;
						}
					}
				}
			} else {
				$match = true;
			}
			// must found every $find, if one $find is not found => no match
			if (!$match) { break; }
		}
    // Create array for the names that are close to or match the search term
		if ($match === true) {
			array_push($qns, $row);
		}
	}

	return $qns;
}

function search($mysqli, $sql)
{
	$data = array();
  $sqls = "SELECT * FROM book WHERE $sql ORDER BY opdate;";

	if (!$result = $mysqli->query ($sqls)) {
		return $mysqli->error;
	}

	while ($rowi = $result->fetch_assoc()) {
		$data[] = $rowi;
	}

	return $data;
}

/*
$word = strtolower(mysql_real_escape_string($_GET['term']));

$rs = mysql_query("SELECT LOWER(`term`) FROM `words` WHERE SOUNDEX(term) = SOUNDEX(" . $word . ")");

while ($row = mysql_fetch_assoc($rs)) { 

    $lev = levenshtein($word, $row['term']);

    ....

}

//-----------------------

// Users search terms is saved in $_POST['q']
$q = $_POST['q'];
// Create array for the names that are close to or match the search term
$results = array();
foreach($db->query('SELECT `id`, `name` FROM `users`') as $name) {
  // Keep only relevant results
  if (levenshtein($q, $name['name']) < 4) {
    array_push($results,$name['name']);
  }
}
// Echo out results
foreach ($results as $result) {
  echo $result."\n";
}

//-----------------------

if (levenshtein(metaphone($q), metaphone($name['name'])) < 4) {
  array_push($results,$name['name']);
}

or

if (similar_text(metaphone($q), metaphone($name)['name']) < 2) {
  array_push($results,$name['name']);
}

or

if (similar_text($q, $name['name']) > 2) {
 array_push($results,$name['name']);
}
*/
