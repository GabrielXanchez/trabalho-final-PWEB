<?php

$host = "sql203.infinityfree.com";
$user = "if0_37783421"; 
$pass = "diW3p2InvnF"; 
$banco = "if0_37783421_canastraboats";

$conn = new mysqli($host, $user, $pass, $banco);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
mysqli_set_charset($conn, "utf8");
?>
