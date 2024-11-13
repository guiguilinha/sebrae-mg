<?php
// Conectar ao banco de dados MySQL
$servername = "192.168.10.22:3306";
$username = "developer";
$password = "And20@Gui21";  // A senha do banco de dados, se houver
$dbname = "maturidade_digital_db";  // Nome do banco de dados

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Ler os dados JSON enviados do frontend
$data = json_decode(file_get_contents("php://input"), true);
echo json_encode($data);

break;
// Preparar a query SQL para inserção
$sql = "INSERT INTO usuarios_quiz (nome, email, whatsapp, uf, processo_r1, processo_p1) 
        VALUES (?, ?, ?, ?, ?, ?)";

// Preparar e vincular os parâmetros
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", 
    $data['nome'], 
    $data['email'], 
    $data['whatsapp'], 
    $data['uf'], 
    $data['processo_r1'], 
    $data['processo_p1']
);

// Executar a consulta
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
