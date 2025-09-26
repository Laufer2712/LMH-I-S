<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Content-Type: text/plain'); // Importante para que fetch reciba texto plano

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo 'Método no permitido.';
    exit;
}

$nombre  = htmlspecialchars(trim($_POST["nombre"] ?? ''));
$email   = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
$mensaje = htmlspecialchars(trim($_POST["mensaje"] ?? ''));

if (empty($nombre) || empty($email) || empty($mensaje)) {
    echo 'Por favor completa todos los campos.';
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'Correo inválido.';
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'LMH.innovations.and.solutions@gmail.com';
    $mail->Password = 'fzhj hilg fedv gdku';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('LMH.innovations.and.solutions@gmail.com', 'LMH I&S');
    $mail->addAddress('LMH.innovations.and.solutions@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = "Nuevo mensaje desde la landing";
    $mail->Body = "
        <h2>Nuevo mensaje</h2>
        <p><strong>Nombre:</strong> {$nombre}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Mensaje:</strong><br>{$mensaje}</p>
    ";

    $mail->send();
    echo '✅ Mensaje enviado correctamente.';
} catch (Exception $e) {
    echo '❌ Error al enviar el mensaje: ' . $mail->ErrorInfo;
}
