// ============================
// Función para cargar header/footer
// ============================
async function loadInclude(id, file) {
    try {
        const res = await fetch(file);
        const content = await res.text();
        document.getElementById(id).innerHTML = content;

        if (id === "header") initMenu();
        if (id === "footer") {
            const yearSpan = document.getElementById("year");
            if (yearSpan) yearSpan.textContent = new Date().getFullYear();
        }
    } catch (err) {
        console.error(`Error al cargar ${file}:`, err);
    }
}

// ============================
// Inicializar menú hamburguesa y scroll suave
// ============================
function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (toggle && navbar) {
        toggle.addEventListener("click", () => navbar.classList.toggle("active"));
    }

    document.querySelectorAll('.navbar a[href^="#"], .navbar a[href$=".html"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            if (href.startsWith("#")) {
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: "smooth" });
            } else { window.location.href = href; }
            if (navbar && navbar.classList.contains("active")) navbar.classList.remove("active");
        });
    });
}

// ============================
// Animaciones al hacer scroll
// ============================
function animateOnScroll() {
    document.querySelectorAll(".animate-up").forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight * 0.85) el.classList.add("active");
    });
}

// ============================
// Eventos globales
// ============================
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", () => {
    animateOnScroll();
    loadInclude("header", "includes/header.html");
    loadInclude("footer", "includes/footer.html");
});


// netlify/functions/send-email.js
const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Método no permitido" };
    }

    const data = JSON.parse(event.body);

    const { nombre, email, mensaje } = data;

    if (!nombre || !email || !mensaje) {
        return { statusCode: 400, body: "Por favor completa todos los campos." };
    }

    // Configura tu cuenta de Gmail o cualquier SMTP
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
        return { statusCode: 500, body: "❌ Error al enviar el mensaje." };
    }
};

