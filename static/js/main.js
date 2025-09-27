// ============================
// ANIMACIONES AL SCROLL Y PARALAX
// ============================

// Activar animaciones de aparición
function animateOnScroll() {
    const elements = document.querySelectorAll(".animate-up");
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight * 0.85) {
            el.classList.add("active");
        }
    });
}

// Paralaje suave para títulos, párrafos y cards
function parallaxEffect() {
    const speed = 0.2; // controla la intensidad del efecto
    const titles = document.querySelectorAll("h2, h3");
    const paragraphs = document.querySelectorAll("p");
    const cards = document.querySelectorAll(".service-card");

    const scrollY = window.scrollY;

    titles.forEach(el => {
        el.style.transform = `translateY(${scrollY * speed}px)`;
    });

    paragraphs.forEach(el => {
        el.style.transform = `translateY(${scrollY * speed * 0.6}px)`;
    });

    cards.forEach(el => {
        el.style.transform = `translateY(${scrollY * speed * 0.4}px)`;
    });
}

// ============================
// CARGAR HEADER Y FOOTER
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
// MENU RESPONSIVE
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
            } else {
                window.location.href = href;
            }
            if (navbar && navbar.classList.contains("active")) navbar.classList.remove("active");
        });
    });
}

// ============================
// EVENTOS DE SCROLL
// ============================
function onScroll() {
    animateOnScroll();
    parallaxEffect();
}

window.addEventListener("scroll", onScroll);
window.addEventListener("load", () => {
    animateOnScroll();
    parallaxEffect();
    loadInclude("header", "includes/header.html");
    loadInclude("footer", "includes/footer.html");
});
