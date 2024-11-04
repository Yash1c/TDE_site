<?php
require 'db_php.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->password)) {
    echo json_encode(["status" => "error", "message" => "Username e senha são obrigatórios."]);
    http_response_code(400);
    exit();
}

$username = $data->username;
$password = $data->password;

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username LIMIT 1"); // Corrigido de "name" para "username"
    $stmt->bindParam(":username", $username);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password_hash'])) {
        $token = bin2hex(random_bytes(16)); // Gerar token seguro

        $stmt = $pdo->prepare("UPDATE users SET token = :token WHERE id = :id");
        $stmt->bindParam(":token", $token);
        $stmt->bindParam(":id", $user['id']);
        $stmt->execute();

        echo json_encode(["status" => "success", "token" => $token]);
        http_response_code(200);
    } else {
        echo json_encode(["status" => "error", "message" => "Usuário ou senha incorretos."]);
        http_response_code(401);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Erro no servidor."]);
    http_response_code(500);
}
?>
