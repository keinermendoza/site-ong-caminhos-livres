document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".navbar");
    hamburger.addEventListener("click", () => nav.classList.toggle("active"));

    // fecha mobile menu se modifiacam tamanho da janela do browser
    window.addEventListener('resize', () => {
        nav.classList.remove("active")
    });
})