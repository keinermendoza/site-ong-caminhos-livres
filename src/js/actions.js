// aplica efeito fade-in ao switch theme  
window.addEventListener("load", () => {
    const darkModeToggle = document.querySelector('#switch-theme');
    darkModeToggle.parentNode.classList.add("active")
});

document.addEventListener('DOMContentLoaded', () => {
    // DARK MODE
    const THEME_KEY = "theme";
    const html = document.documentElement;
    const toggle = document.querySelector("#switch-theme");

    // Função auxiliar para definir o tema
    function applyTheme(mode) {
        html.setAttribute("data-theme", mode);
        toggle.checked = mode === "dark";
        localStorage.setItem(THEME_KEY, mode);
    }

    // Obtém o tema selecionado anteriormente; se não existir, define como "light"
    const storedTheme = localStorage.getItem(THEME_KEY);
    const initialTheme = storedTheme === "dark" ? "dark" : "light";

    // Aplicar o tema inicial
    applyTheme(initialTheme);

    
    // Escuta mudanças no toggle feitas pelo usuário
    toggle.addEventListener("change", () => {
        const newTheme = toggle.checked ? "dark" : "light";
        applyTheme(newTheme);
    });

    // hamburguer
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