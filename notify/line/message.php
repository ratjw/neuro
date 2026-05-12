<?php
//	$line_api = "https://notify-api.line.me/api/notify";
	$line_api = "https://api.line.me/v2/bot/message/push";
//	$line_token = "jyaKhr5MuY9jBeWbEzk2OjhT9ucAzCY9Q8ei3ieEGac"; // my LINE
//	$line_token = "2ItNh2j4Z1fIFCSWkZXBH4qtDYigXpl19ahsdWIR5pX"; // group LINE นิวโรศัลย์ รามา ปัจจุบัน
  $line_token = "hUNVJKEFaDK+g5KNdPK7kU6DzaiEke19xDI8lPriN0d4E6FibCkzku2Cm1eKjJGrNPvt0METVy5Y09wS6lwrMFmD11tchvXv+u9hP1DTQUX81O75EOaErmUXjV60JMjlCW10JMfZRCJSb9vB14g7/AdB04t89/1O/w1cDnyilFU=";

	$data = [
		"message" => "test",
		"imageFile" => new CURLFile("1751367603.png")
	];
 
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $line_api);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

	// follow redirects
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, [
		"Content-type: multipart/form-data",
		"Authorization: Bearer " . $line_token
	]);

	// receive server response ...
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_exec ($ch);
	curl_close ($ch);
?>