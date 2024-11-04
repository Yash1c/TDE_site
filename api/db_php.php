<?php
$host = "localhost";
$db_name = "spotify_tde";
$username = "root";
$password = "1234";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo "Erro de conexão: " . $e->getMessage();
    exit();
}
?>
