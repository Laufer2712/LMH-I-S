// Solo animaciones al hacer scroll
function animateOnScroll() {
    document.querySelectorAll(".animate-up").forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight * 0.85) el.classList.add("active");
    });
}

function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (!toggle || !navbar) {
        console.warn("initMenu: faltan .menu-toggle o .navbar");
        return;
    }

    // Asegurar overlay (si no existe, lo creamos)
    let overlay = document.querySelector(".overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "overlay";
        document.body.appendChild(overlay);
    }

    // Accesibilidad básica
    toggle.setAttribute("aria-controls", "navbar");
    toggle.setAttribute("aria-expanded", "false");
    navbar.setAttribute("aria-hidden", "true");

    const openMenu = () => {
        navbar.classList.add("active");
        overlay.classList.add("active");
        toggle.classList.add("active");
        toggle.setAttribute("aria-expanded", "true");
        navbar.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // evitar scroll del body
    };

    const closeMenu = () => {
        navbar.classList.remove("active");
        overlay.classList.remove("active");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        navbar.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // restaurar scroll
    };

    // Toggle al pulsar el botón
    toggle.addEventListener("click", () => {
        if (navbar.classList.contains("active")) closeMenu();
        else openMenu();
    });

    // Cerrar al pulsar overlay
    overlay.addEventListener("click", closeMenu);

    // Cerrar al pulsar un enlace del menú
    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            // Si el link es externo a la página (p. ej. servicios.html) dejar que navegue,
            // pero cerramos el menú antes para evitar "quedarse abierto".
            closeMenu();
        });
    });

    // Cerrar con ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navbar.classList.contains("active")) closeMenu();
    });

    // Cerrar si redimensionas a escritorio
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && navbar.classList.contains("active")) closeMenu();
    });
}


window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", () => {
    animateOnScroll();
    initMenu();
});
