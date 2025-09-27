async function loadInclude(id, file) {
    try {
        const res = await fetch(file);
        const content = await res.text();
        document.getElementById(id).innerHTML = content;

        if (id === "header") initMenu(); // solo se llama después de cargar
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

    if (!toggle || !navbar) return;

    toggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

    // Cerrar menú al hacer clic en un enlace
    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
        });
    });
}

// Scroll animaciones
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
