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
    const overlay = document.querySelector(".overlay");

    if (!toggle || !navbar || !overlay) return;

    toggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
        toggle.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
        navbar.classList.remove("active");
        overlay.classList.remove("active");
        toggle.classList.remove("active");
    });

    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            overlay.classList.remove("active");
            toggle.classList.remove("active");
        });
    });
}



window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", () => {
    animateOnScroll();
    initMenu();
});
