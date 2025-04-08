<?php
// Configurar cabeçalhos para permitir requisições de outras origens (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");	
header("Access-Control-Allow-Credentials: true");


// Captura o corpo da requisição

//$json2 = new stdClass();
//$json2->tokenId = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3M1VKYl9fSkZ5ckh6ZmtpazZJSkN0UFpQVEJ4emZkT3pZV0laMExlS2pZIn0.eyJleHAiOjE3NDMyODM1NTYsImlhdCI6MTc0MzI4MTc1NiwiYXV0aF90aW1lIjoxNzQzMjc2MjMxLCJqdGkiOiI1MGU0YmFlYy0xNWViLTQ0NDUtYmEyNS0yM2I4NTZhYTZkNzAiLCJpc3MiOiJodHRwczovL2FtZWkuaG9tb2xvZy5rdWJlcm5ldGVzLnNlYnJhZS5jb20uYnIvYXV0aC9yZWFsbXMvZXh0ZXJubyIsImF1ZCI6Im1hdHVyaWRhZGVkaWdpdGFsIiwic3ViIjoiNjI5YzA1ZDMtYWI4ZS00NGY1LThmNjMtZWJmMzIwNzI4OWJiIiwidHlwIjoiSUQiLCJhenAiOiJtYXR1cmlkYWRlZGlnaXRhbCIsIm5vbmNlIjoiZDNmNWFmMzYtOWFkOS00MjQ1LThkMGYtNGNkMGE3Mjc0NjcyIiwic2Vzc2lvbl9zdGF0ZSI6IjgyMjc4NjYyLWViOTEtNGQ1NS1iZTU0LTUyZGUzYTZhYzNjNiIsImF0X2hhc2giOiItdThJVFJaM3JCWDF6LWFjYk1HUmp3Iiwic2lkIjoiODIyNzg2NjItZWI5MS00ZDU1LWJlNTQtNTJkZTNhNmFjM2M2IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjcGYiOiIwNjI0OTMzNjYwNSIsIm5hbWUiOiJSYWZhZWwgT3JuZWxhcyIsInByZWZlcnJlZF91c2VybmFtZSI6IjA2MjQ5MzM2NjA1IiwiZ2l2ZW5fbmFtZSI6IlJhZmFlbCIsImZhbWlseV9uYW1lIjoiT3JuZWxhcyIsImVtYWlsIjoiZmFlbHNvQGdtYWlsLmNvbSJ9.DvyGZZEgD0LAX56jjjkpwrlFTrCs7BSVYkUfJKTgr5gztH5KwAA8jD_2OknYWxw0nV_sTSEeHUKYqzythB0JjkggnsHbMKjsVqYmJ1KOZLplB73Zek5MnpjxcMB4_FRvbQIl_LL-jpOTqhSdOapmwWtLRs2jLaGXnv5HHtxeDuAxRL0iRQAbYQ59Iq9ejqWU8w4JQ-OOFgokXmr7LXhgwDc4onqzBEasDaXeR6INy92Av1S1WpeclqFyRgaQGhg2FfjBzc-C_arjTC_fieY-b5cW16kMYi6MBC-vLMdihTWjOK7X5A5oyraud5Ii3Afd3P_ywPPlR2UYJ4v4JJrUQA";
//$json2->userId = "06249336605";
//$json = json_encode($json2);

$json = file_get_contents('php://input');
$dados = json_decode($json, true);
$urlAmei = "https://amei.kubernetes.sebrae.com.br/auth/realms/externo/protocol/openid-connect/token";

// Verifica se os dados foram recebidos corretamente
if ($dados && isset($dados['tokenId']) && isset($dados['userId'])) {
    
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://amei.kubernetes.sebrae.com.br/auth/realms/externo/protocol/openid-connect/token',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'grant_type=client_credentials&client_id=maturidadedigital-backend&client_secret=aUOg6iGnSLivRtMNzVB7N6bHBFHbZ6nZ',
        CURLOPT_HTTPHEADER => array(
                'Content-Type: application/x-www-form-urlencoded',
            ),
        )
    );

    $response = curl_exec($curl);
    $statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    curl_close($curl);

    if (curl_errno($curl)) {
        echo "Erro: ".curl_errno($curl);
    } else {
        if ($statusCode === 200) {
            $token_decode = json_decode($response);
            $token = $token_decode->access_token;
            
            $cr = curl_init();

            curl_setopt_array($cr, array(
              CURLOPT_URL => 'https://cpe-backend.sebrae.com.br/v1/vinculo-empresa?cpf=' . $dados['userId'],
              CURLOPT_RETURNTRANSFER => true,
              CURLOPT_ENCODING => '',
              CURLOPT_MAXREDIRS => 10,
              CURLOPT_TIMEOUT => 0,
              CURLOPT_FOLLOWLOCATION => true,
              CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
              CURLOPT_CUSTOMREQUEST => 'GET',
              CURLOPT_HTTPHEADER => array(
                'accept: application/json',
                'authorization: Bearer ' . $token 
              ),
            ));
        
            $dataCia = curl_exec($cr);
            $newStatusCode = curl_getinfo($cr, CURLINFO_HTTP_CODE);
            
            curl_close($cr);

            $dataJson = json_decode($dataCia, true);

            foreach ($dataJson as $key) {
                if($key['isPrincipal'] === true) {
                    $data = json_decode($key["cnpj"]);
                    $cnpj = $data;
                    echo json_encode($data);            
                    //return $cnpj;
                }
            }

        } else {
            echo json_encode([
                "status" => "erro",
                "mensagem" => "Falha ao realizar a solicitação à API AMEI.",
                //"URL" => $urlAmei,
                "resposta" => $response,
                "statusCode" => $statusCode
            ]);
        }
    }
} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Os dados de token e ID do usuário devem ser fornecidos."
    ]);
}
