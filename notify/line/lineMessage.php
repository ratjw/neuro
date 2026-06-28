<?php
// set include path for SFTP if needed
set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib1.0.11');
include('Net/SFTP.php');

// รับค่าจาก JSON POST
$input = json_decode(file_get_contents('php://input'), true);
$image = $input['image'] ?? null;
$message = $input['message'] ?? '';
$user = $input['user'] ?? '';

// LINE API Config
$line_api = "https://api.line.me/v2/bot/message/push";
$accessToken = "IWJoZnZHI33U7eC5jKsen22SdFFsNC24FNE7cqCMY1YOlR+ef+Mqr3wAtCdx2eTF0yd31/g+xzn/jaedXA1PHJKoDm7vgcxIwZlRC9OhQRzMy7TzevfQdaTrVEPkiRB81tL23mfxDAEr/Hz3Ygr7RgdB04t89/1O/w1cDnyilFU=";
$line_token = $accessToken;
$userID = "Cb29eab04f05a14f5f83c8b75961879d0";

// Image Hosting
$remote_domain = "https://www5.ra.mahidol.ac.th";
$realpath = "/neuro/notify/line/imagefile/";
$remote_realpath = $remote_domain . $realpath;

// ตั้งชื่อไฟล์
$t = microtime();
$sec = substr($t, strpos($t, ' ') + 1);
$filename = $sec . '.png';
$filetest = '1751367603.png';

// ถอด base64
$uri = $image ? substr($image, strpos($image, ",") + 1) : '';
$content = base64_decode($uri);

// บันทึกภาพ
$subdir = "imagefile/";
if (!is_dir($subdir)) mkdir($subdir);
if ($content) {
    file_put_contents($subdir . $filename, $content);
} else {
    $filename = $filetest;
}
$image_url = $remote_realpath . $filename;

// ส่งไป LINE Group
$arrayHeader = [
    "Content-Type: application/json",
    "Authorization: Bearer {$accessToken}"
];
$data = [
    "to" => $userID,
    "messages" => [
        [
            "type" => "image",
            "originalContentUrl" => $image_url,
            "previewImageUrl" => $image_url
        ]
    ]
];

curl1($line_api, $data, $line_token)
//curl2($line_api, $data, $arrayHeader)
curl3($line_api, $data, $line_token)

function curl1($line_api, $data, $line_token)
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

function curl2($line_api, $data, $arrayHeader)
{
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $line_api);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $arrayHeader);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  $line_response = curl_exec($ch);
  curl_close($ch);

  // ส่ง image_url ไปยัง Google Apps Script
  $gas_url = "https://script.google.com/macros/s/AKfycbxtsPMnNftgGmQmuRcJ4vwZ7e8yvWe5MDcx7bOApoKZmS9cc_N0kM0ZzjQ0ZG5im7wlrw/exec";
  $post = ["image" => $image_url];

  $ch2 = curl_init($gas_url);
  curl_setopt($ch2, CURLOPT_POST, true);
  curl_setopt($ch2, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
  curl_setopt($ch2, CURLOPT_POSTFIELDS, json_encode($post));
  curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch2, CURLOPT_FOLLOWLOCATION, true); // สำคัญ: redirect
  $gas_response = curl_exec($ch2);
  curl_close($ch2);

  // แสดงผล debug
  echo "✅ image URL = $image_url<br>";
  echo "📨 response from LINE = <pre>$line_response</pre><br>";
  echo "📡 response from GAS = <pre>$gas_response</pre><br>";
}

function curl3($line_api, $data, $line_token)
{
  curl -v -X POST https://api.line.me/v2/bot/message/push \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {channel access token}' \
  -H 'X-Line-Retry-Key: {UUID}' \
  -d '{
      "to": "U4af4980629...",
      "messages":[
          {
              "type":"text",
              "text":"Hello, world1"
          },
          {
              "type":"text",
              "text":"Hello, world2"
          }
      ]
  }'
}


?>
