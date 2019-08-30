<?php

	$user = $_POST['user'];
	$message = $_POST['message'];
	$image = $_POST['image'];

	$message = $user . "\n" . $message;
	$subdir = "imagefile/";
   
	$line_api = 'https://notify-api.line.me/api/notify';
	$line_token = 'jyaKhr5MuY9jBeWbEzk2OjhT9ucAzCY9Q8ei3ieEGac'; // my LINE
	$line_token1 = '2ItNh2j4Z1fIFCSWkZXBH4qtDYigXpl19ahsdWIR5pX'; // group LINE นิวโรศัลย์ รามา ปัจจุบัน
	$line_token2 = 'KKVhc6ZVdAHqGQtL23U9kvfT502cjprMNNbRTH9NEll'; // group LINE Navigator
	$line_token3 = 'GDcs3oGABywMlCJAxlwT3egmcEDlnfMoA8mQTADKLXh'; // group LINE Nerve monitoring

	// Use userID and time in seconds for filename
	$t = microtime();
	$sec = substr($t, strpos($t, ' ') + 1);
	$filename = $sec . '.png';

	// remove "data:image/png;base64,"
	$content = substr($image, strpos($image, ",") + 1);
	$file_content = base64_decode($content);

	// Save file locally
	file_put_contents($subdir . $filename, $file_content);

	// "@" is deprecated from PHP 5.5 upward
	$data = array(
		"message" => $message,
		"imageFile" => new CURLFile($subdir . $filename)
	);

  curl($line_api, $data, $line_token);
//  curl($line_api, $data, $line_token1);
//  curl($line_api, $data, $line_token2);
//  curl($line_api, $data, $line_token3);

function curl($line_api, $data, $line_token)
{
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $line_api);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

	// follow redirects
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, [
		'Content-type: multipart/form-data',
		'Authorization: Bearer '.$line_token
	]);
	// receive server response ...
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$server_output = curl_exec ($ch);

	curl_close ($ch);
}
?>