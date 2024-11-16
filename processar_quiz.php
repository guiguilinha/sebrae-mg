<?php
// Conectar ao banco de dados MySQL
$servername = "localhost";  // Host
$username = "root";  // Usuário do Banco de dados MySQL
$password = "";  // A senha do banco de dados, se houver
$dbname = "maturidade_digital_db";  // Nome do banco de dados

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Ler os dados JSON enviados do frontend
$data = json_decode(file_get_contents("php://input"), true);

// Preparar a query SQL para inserção
$sql = "INSERT INTO resposta_teste_maturidade (
    	    nome,                   -- Nome do usuário
            empresa,                -- Empresa do usuário
            email,                  -- E-mail do usuário
            whatsapp,               -- WhatsApp do usuário
            uf,                     -- UF (estado) do usuário
            cidade,                 -- Cidade do usuário
            newsletter,             -- Se o usuário deseja receber a newsletter
            processo_r1,            -- Resposta do usuário para processo (r1, r2, r3)
            processo_r2,            -- Resposta do usuário para processo (r1, r2, r3)
            processo_r3,            -- Resposta do usuário para processo (r1, r2, r3)
            processo_p1,            -- Pontuação do usuário para processo (p1, p2, p3)
            processo_p2,            -- Pontuação do usuário para processo (p1, p2, p3)
            processo_p3,            -- Pontuação do usuário para processo (p1, p2, p3)
            vendas_r1,              -- Resposta do usuário para vendas (r1, r2, r3)
            vendas_r2,              -- Resposta do usuário para vendas (r1, r2, r3)
            vendas_r3,              -- Resposta do usuário para vendas (r1, r2, r3)
            vendas_p1,              -- Pontuação do usuário para vendas (p1, p2, p3)
            vendas_p2,              -- Pontuação do usuário para vendas (p1, p2, p3)
            vendas_p3,              -- Pontuação do usuário para vendas (p1, p2, p3)
            presenca_r1,            -- Resposta do usuário para presença (r1, r2, r3)
            presenca_r2,            -- Resposta do usuário para presença (r1, r2, r3)
            presenca_r3,            -- Resposta do usuário para presença (r1, r2, r3)
            presenca_p1,            -- Pontuação do usuário para presença (p1, p2, p3)
            presenca_p2,            -- Pontuação do usuário para presença (p1, p2, p3)
            presenca_p3,            -- Pontuação do usuário para presença (p1, p2, p3)
            com_r1,                 -- Resposta do usuário para comunicação (r1, r2, r3)
            com_r2,                 -- Resposta do usuário para comunicação (r1, r2, r3)
            com_r3,                 -- Resposta do usuário para comunicação (r1, r2, r3)
            com_p1,                 -- Pontuação do usuário para comunicação (p1, p2, p3)
            com_p2,                 -- Pontuação do usuário para comunicação (p1, p2, p3)
            com_p3,                 -- Pontuação do usuário para comunicação (p1, p2, p3)
            financas_r1,            -- Resposta do usuário para finanças (r1, r2, r3)
            financas_r2,            -- Resposta do usuário para finanças (r1, r2, r3)
            financas_r3,            -- Resposta do usuário para finanças (r1, r2, r3)
            financas_p1,            -- Pontuação do usuário para finanças (p1, p2, p3)
            financas_p2,            -- Pontuação do usuário para finanças (p1, p2, p3)
            financas_p3,            -- Pontuação do usuário para finanças (p1, p2, p3)
            nvl_processo,           -- Nível do usuário no processo
            total_pts_processo,     -- Pontuação total no processo
            nvl_vendas,             -- Nível do usuário em vendas
            total_pts_venda,        -- Pontuação total em vendas
            nvl_presenca,           -- Nível do usuário em presença
            total_pts_presenca,     -- Pontuação total em presença
            nvl_com,                -- Nível do usuário em comunicação
            total_pts_com,          -- Pontuação total em comunicação
            nvl_financas,           -- Nível do usuário em finanças
            total_pts_financas,     -- Pontuação total em finanças
            nvl_geral,              -- Nível geral do usuário
            total_pts               -- Pontos totais do usuário
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Preparar e vincular os parâmetros
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssssssssssssssssssssssssssssssssssssssssssss", 
    $data[0]['user']['nome'], 
    $data[0]['user']['empresa'], 
    $data[0]['user']['email'], 
    $data[0]['user']['whatsapp'], 
    $data[0]['user']['estado'], 
    $data[0]['user']['cidade'],
    $data[0]['user']['newsletter'],
    $data[1]['question']['resposta'],
    $data[2]['question']['resposta'],
    $data[3]['question']['resposta'],
    $data[1]['question']['pontos'],
    $data[2]['question']['pontos'],
    $data[3]['question']['pontos'],
    $data[4]['question']['resposta'],
    $data[5]['question']['resposta'],
    $data[6]['question']['resposta'],
    $data[4]['question']['pontos'],
    $data[5]['question']['pontos'],
    $data[6]['question']['pontos'],
    $data[7]['question']['resposta'],
    $data[8]['question']['resposta'],
    $data[9]['question']['resposta'],
    $data[7]['question']['pontos'],
    $data[8]['question']['pontos'],
    $data[9]['question']['pontos'],
    $data[10]['question']['resposta'],
    $data[11]['question']['resposta'],
    $data[12]['question']['resposta'],
    $data[10]['question']['pontos'],
    $data[11]['question']['pontos'],
    $data[12]['question']['pontos'],
    $data[13]['question']['resposta'],
    $data[14]['question']['resposta'],
    $data[15]['question']['resposta'],
    $data[13]['question']['pontos'],
    $data[14]['question']['pontos'],
    $data[15]['question']['pontos'],
    $data[16]['level']['processo_nivel'],
    $data[16]['level']['processo_pontos'],
    $data[16]['level']['vendas_nivel'],
    $data[16]['level']['vendas_pontos'],
    $data[16]['level']['presenca_nivel'],
    $data[16]['level']['presenca_pontos'],
    $data[16]['level']['comunicacao_nivel'],
    $data[16]['level']['comunicacao_pontos'],
    $data[16]['level']['financas_nivel'],
    $data[16]['level']['financas_pontos'],
    $data[16]['level']['nivel'],
    $data[16]['level']['pontosTotais']
);

if ($stmt->execute()) {
    // Retornar uma resposta de sucesso
    echo json_encode(["success" => true]);
} else {
    // Retornar uma resposta de erro
    echo json_encode(["success" => false, "message" => "Erro ao inserir os dados"]);
}

// Fechar a conexão
$stmt->close();
$conn->close();
?>
