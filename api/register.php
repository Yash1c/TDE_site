<?php
header("Content-Type: application/json");

require_once 'db_php.php';

if (!isset($_POST['username'], $_POST['email'], $_POST['password'])) {
    echo $_POST['username'];
    echo $_POST['email'];
    echo $_POST['age'];
}


$username = $_POST['username'];
$email = $_POST['email'];
$age = $_POST['age'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT);

try {
    // Conexão com o banco de dados
    $sql = "INSERT INTO users (username, email, age, password_hash) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$username, $email, $age, $password]);

    echo json_encode(["status" => "success", "message" => "Cadastro realizado com sucesso."]);
    http_response_code(201);  // Código HTTP para sucesso de criação
} catch (PDOException $e) {
    echo ($_POST['username']);
    echo ($_POST['email']);
    echo ($_POST['age']);
    echo "Erro ao cadastrar usuário. Detalhe: " . $e->getMessage();
}

?>