<?php
// Configurar cabeçalhos para permitir requisições de outras origens (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");	
header("Access-Control-Allow-Credentials: true");


// Captura o corpo da requisição
$json = file_get_contents('php://input');
$dados = json_decode($json, true);
$urlAmei =  "https://amei.sebrae.com.br/auth/realms/externo/protocol/openid-connect/token"; //"https://amei.homolog.kubernetes.sebrae.com.br/auth/realms/externo/protocol/openid-connect/token"; https://amei.homolog.kubernetes.sebrae.com.br/auth/realms/externo/protocol/openid-connect/token

// Verifica se os dados foram recebidos corretamente
if ($dados && isset($dados['tokenId']) && isset($dados['userId'])) {
    
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://amei.sebrae.com.br/auth/realms/externo/protocol/openid/token', //'https://amei.homolog.kubernetes.sebrae.com.br/auth/realms/externo/protocol/openid-connect/token'; https://amei.kubernetes.sebrae.com.br/auth/realms/externo/protocol/openid-connect/token
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
              CURLOPT_URL => 'https://cpe-backend.sebrae.com.br/v1/vinculo-empresa?cpf=' . $dados['userId'], //https://cpe-backend.sebrae.com.br/v1/vinculo-empresa?cpf=' . $dados['userId']
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
