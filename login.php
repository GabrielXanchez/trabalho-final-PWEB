<?php
session_start(); 

include 'conectar.php';

$username = $_POST['username'];
$password = $_POST['password']; 

$username = mysqli_real_escape_string($conn, $username);
$password = mysqli_real_escape_string($conn, $password);

$sql = "SELECT * FROM usuarios WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($password === $row['password']) { 
        
        $_SESSION['username'] = $username;
        echo "<script>
                alert('Login Bem Sucedido!');
                window.location.href = 'index.html';
              </script>";
        exit();
    } else {
        
        echo "<script>
                alert('Login Incorreto!');
                window.location.href = 'loginform.html';
              </script>";
        exit();
    }
} else {
   
    echo "<script>
            alert('Login Incorreto!');
            window.location.href = 'loginform.html';
          </script>";
    exit();
}

$conn->close();
?>
