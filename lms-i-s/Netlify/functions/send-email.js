const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Método no permitido" };

    const data = JSON.parse(event.body);
    const { nombre, email, mensaje } = data;

    if (!nombre || !email || !mensaje) return { statusCode: 400, body: "Por favor completa todos los campos." };

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "LMH.innovations.and.solutions@gmail.com",
            pass: "fzhj hilg fedv gdku" // contraseña de app
        }
    });

    const mailOptions = {
        from: email,
        to: "LMH.innovations.and.solutions@gmail.com",
        subject: "Nuevo mensaje desde la landing",
        html: `
      <h2>Nuevo mensaje</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong><br>${mensaje}</p>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: "✅ Mensaje enviado correctamente." };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, body: "❌ Error al enviar el mensaje." };
    }
};
