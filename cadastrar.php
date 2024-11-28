<?php
include 'conectar.php'; 

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password']; 


$sql = "INSERT INTO usuarios (username, email, password) VALUES ('$username', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    
    echo "<script>
            alert('Usuário cadastrado com sucesso!');
            window.location.href = 'loginform.html';
          </script>";
} else {
    
    echo "Erro: " . $sql . "<br>" . $conn->error;
}


$conn->close();
?>
