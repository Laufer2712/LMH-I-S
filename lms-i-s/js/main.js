// Cargar header y footer
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
            } else {
                window.location.href = href;
            }
            if (navbar && navbar.classList.contains("active")) navbar.classList.remove("active");
        });
    });
}

// Animaciones al hacer scroll
function animateOnScroll() {
    document.querySelectorAll(".animate-up").forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight * 0.85) el.classList.add("active");
    });
}

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", () => {
    animateOnScroll();
    loadInclude("header", "includes/header.html");
    loadInclude("footer", "includes/footer.html");
});
