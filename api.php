<?php
if (isset($_POST)){

    $data = file_get_contents("php://input");
    $group = json_decode($data , true);

    $externalUrl = 'https://ismo.ma/emploisphp/ajax.php';

    $curl = curl_init($externalUrl);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    if (!empty($group)) {
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query( $group ));
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded'
        ]);
    }

    $response = curl_exec($curl);

    if ($response === false) {
        echo 'cURL error: ' . curl_error($curl);
    } else {

        header('Content-Type: application/json');
        echo $response;
    }
    curl_close($curl);
}

?>