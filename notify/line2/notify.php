<?php
	$url = 'https://api.line.me/v2/bot/message/push';
	$channelAccessToken = "gjI40a510+vAQqjt5bS7HloB0cM1i6MZH2wNRKPF4R3XYnAnNempSwknR/2/LuWR0yd31/g+xzn/jaedXA1PHJKoDm7vgcxIwZlRC9OhQRyiYofrcgSs0pHXwGzsSSGST6BaYBnjYFTTXhpnQROTtwdB04t89/1O/w1cDnyilFU="; // my LINE


function sendLineMessage($message, $to) {
    global $channelAccessToken, $url;

    //$url = 'https://api.line.me/v2/bot/message/push';

    $headers = [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $channelAccessToken,
    ];

    $data = [
        'to' => $to,
        'messages' => [
            [
                'type' => 'text',
                'text' => $message,
            ]
        ]
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Curl error: ' . curl_error($ch);
    }
    curl_close($ch);

    return $result;
}
$to = 'Cb29eab04f05a14f5f83c8b75961879d0'; // แทนที่ด้วย userId หรือ groupId จริง
$message = 'สวัสดีจาก PHP LINE ลอฟท์แอทสีมา!';
//$imagePath = './imagefile/1578969424.png';
$response = sendLineMessage($message, $to);

echo $response;



?>