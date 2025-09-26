<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre  = htmlspecialchars(trim($_POST["nombre"] ?? ''));
    $email   = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $mensaje = htmlspecialchars(trim($_POST["mensaje"] ?? ''));

    if (!$nombre || !$email || !$mensaje) {
        die("❌ Por favor completa todos los campos.");
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'LMH.innovations.and.solutions@gmail.com';
        $mail->Password   = 'fzhj hilg fedv gdku'; // usa tu app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom($email, $nombre);
        $mail->addAddress('LMH.innovations.and.solutions@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = "Nuevo mensaje desde la landing";
        $mail->Body    = "<h2>Nuevo mensaje</h2>
                          <p><strong>Nombre:</strong> $nombre</p>
                          <p><strong>Email:</strong> $email</p>
                          <p><strong>Mensaje:</strong><br>$mensaje</p>";

        $mail->send();
        echo "✅ Mensaje enviado correctamente.";
    } catch (Exception $e) {
        echo "❌ Error al enviar: {$mail->ErrorInfo}";
    }
} else {
    echo "Método no permitido.";
}
