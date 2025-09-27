// Solo animaciones al hacer scroll
function animateOnScroll() {
    document.querySelectorAll(".animate-up").forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight * 0.85) el.classList.add("active");
    });
}

// Menú toggle móvil
function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    // Si no existen los elementos, no se ejecuta
    if (!toggle || !navbar) return;

    // Evento para abrir/cerrar menú
    toggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
        toggle.classList.toggle("active"); // para animar el botón si quieres
    });

    // Cierra el menú al hacer clic en un enlace
    const links = navbar.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            toggle.classList.remove("active");
        });
    });
}


window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", () => {
    animateOnScroll();
    initMenu();
});
