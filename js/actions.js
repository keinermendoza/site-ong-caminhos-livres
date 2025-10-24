document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".navbar");
    hamburger.addEventListener("click", () => nav.classList.toggle("active"));

    // adiciona dinamicamente class ao carregar pagina
    // se for menor a 48rem
    if(window.innerWidth < 768) {
        nav.classList.add("is-mobile");
    }

    // fecha mobile menu se modifiacam tamanho da janela do browser
    window.addEventListener('resize', () => {
        nav.classList.remove("active");
        
        // atualiza dinamicamente class is-mobile
        if(window.innerWidth < 768) {
           nav.classList.add("is-mobile");
        }
    });
})