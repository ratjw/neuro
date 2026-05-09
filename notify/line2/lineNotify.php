<?php

$input = json_decode(file_get_contents('php://input'), true);
$user = $input['user'];
$message = $input['message'];
$image = $input['image']; // Base64 image data

$message = $user . "\n" . $message;

$line_api = 'https://api.line.me/v2/bot/message/push';
$channelAccessToken = 'gjI40a510+vAQqjt5bS7HloB0cM1i6MZH2wNRKPF4R3XYnAnNempSwknR/2/LuWR0yd31/g+xzn/jaedXA1PHJKoDm7vgcxIwZlRC9OhQRyiYofrcgSs0pHXwGzsSSGST6BaYBnjYFTTXhpnQROTtwdB04t89/1O/w1cDnyilFU='; // แทนที่ด้วย Channel Access Token ของคุณ
$userId = 'Cb29eab04f05a14f5f83c8b75961879d0'; // แทนที่ด้วย User ID ของผู้รับ

// แปลง Base64 image เป็น URL (หรือส่ง Base64 โดยตรง)
$imageURL = uploadImageToTemporaryStorage($image); // function to upload image and return url.

if ($imageURL) {
    $messages = [
        [
            'type' => 'text',
            'text' => $message,
        ],
        [
            'type' => 'image',
            'originalContentUrl' => $imageURL,
            'previewImageUrl' => $imageURL,
        ],
    ];
} else {
    $messages = [
        [
            'type' => 'text',
            'text' => $message,
        ],
    ];
}

$data = [
    'to' => $userId,
    'messages' => $messages,
];

curl($line_api, $data, $channelAccessToken);

function curl($line_api, $data, $channelAccessToken)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $line_api);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $channelAccessToken,
    ]);

    $result = curl_exec($ch);
    curl_close($ch);

    // Handle the result (optional)
    // echo $result;
}

function uploadImageToTemporaryStorage($base64ImageData) {
    // Implement your image upload logic here.
    // This function should upload the image to a publicly accessible URL.
    // Example: Upload to a cloud storage service (S3, Google Cloud Storage, etc.)
    // For simplicity, you can also save the image to a temporary folder on your server
    // and return the URL to that file.
    // example:
    $subdir = "imagefile/";
    if(!is_dir($subdir)) {
        mkdir($subdir);
    }
    $t = microtime();
    $sec = substr($t, strpos($t, ' ') + 1);
    $filename = $sec . '.png';
    $content = substr($base64ImageData, strpos($base64ImageData, ",") + 1);
    $file_content = base64_decode($content);
    file_put_contents($subdir . $filename, $file_content);
    return 'https://www5.ra.mahidol.ac.th/neuro/notify/line2/'.$subdir.$filename;
}
  $post = [
"image"=>$image_url
"secret"=> "QBOOK123"
;]


file_get_contents("https://script.google.com/macros/s/AKfycbxtsPMnNftgGmQmuRcJ4vwZ7e8yvWe5MDcx7bOApoKZmS9cc_N0kM0ZzjQ0ZG5im7wlrw/exec",false,
  stream_context_create([
  "http"=> [
  "header" => "Content-Type: application/json",
  "method" => "POST",
  "content" => json_encode($post)
  ]
  ])
);
?>