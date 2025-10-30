# Caminhos Livres

**Caminhos Livres** é um site fictício desenvolvido com **HTML**, **CSS** e **JavaScript**, criado como parte de um projeto acadêmico.  
O objetivo é apresentar uma organização não governamental (ONG) que promove iniciativas sociais, além de demonstrar boas práticas de desenvolvimento web, usabilidade, responsividade e versionamento de código.

- Acesse o site em produção: [Caminhos Livres](site-ong-caminhos-livres.vercel.app)
- Demonstração do site (versão v0.3.0) disponível no YouTube: [Assista aqui](https://www.youtube.com/watch?v=47c2X-Y3uTA)

---
## Tabela de Conteudos

- [Sobre o projeto](#caminhos-livres)
- [Estrutura do projeto](#estrutura-do-projeto)
    - [Estrutura das páginas](#estrutura-das-páginas)
- [Design e responsividade](#design-e-responsividade)
    - [Modo escuro](#modo-escuro-e-claro)
    - [Otimização e SEO](#otimização-e-seo)
- [Desenvolvimento e fluxo de trabalho](#desenvolvimento-e-fluxo-de-trabalho)
- [Deploy e hospedagem](#deploy-e-hospedagem)
- [Como executar o projeto](#como-executar-o-projeto-localmente)
- [Agradecimentos](#agradecimentos)
- [Autor](#autor)
- [Licença](#licença)

## Estrutura do Projeto

A estrutura do projeto foi organizada para manter os arquivos minificados na raiz e seus equivalentes legíveis dentro da pasta `src/`, conforme apresentado abaixo:

```
├── src
│   ├── html
│   │   ├── cadastro.html
│   │   ├── index.html
│   │   └── projetos.html
│   ├── css
│   │   └── styles.css
│   └── js
│       ├── actions.js
│       └── cadastro.js
├── icons
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   └── site.webmanifest
├── images
│   ├── arte.avif
│   ├── casa.webp
│   ├── classroom.jpg
│   ├── estudo.webp
│   ├── hero-desktop.jpg
│   ├── hero-mobile.jpg
│   ├── preview.jpg
│   ├── saude.webp
│   └── trabalho.jpeg
├── css
│   └── styles.min.css
├── js
│   ├── actions.min.js
│   └── cadastro.min.js
├── README.md
├── index.html
├── cadastro.html
└── projetos.html
```

### Estrutura das Páginas

#### 🏠 `index.html`
Apresenta a ONG **Caminhos Livres**, com sua **missão**, **visão** e um cabeçalho com menu de navegação adaptável a diferentes tamanhos de tela (*responsive design*).

#### 🧾 `cadastro.html`
Contém um **formulário de cadastro** com validações completas:
- **HTML5** (`required`, `pattern`);
- **JavaScript**, validando:
  - CPF (formato e validade);
  - E-mail;
  - Maioridade (campo de data de nascimento).   
  - CEP: validação do formato e consulta à API ViaCEP para preenchimento automático dos campos cidade e estado.

As validações são acionadas **on-blur** e exibem mensagens de erro personalizadas.
Ao inserir um CEP válido, o formulário realiza uma requisição à API ViaCEP; caso a consulta retorne dados, os campos cidade e estado são preenchidos automaticamente, melhorando a usabilidade e reduzindo erros de digitação.

Quando todos os campos são preenchidos corretamente, o formulário:

- Exibe um **toast** de sucesso;
- Limpa automaticamente os campos usando JavaScript.

#### 💡 `projetos.html`
Apresenta uma **galeria de projetos** da ONG.  
Cada item é um **componente card** que contém:
- Uma imagem representativa;
- Uma lista de **tags** (componente personalizado) para categorização;
- O **título** e uma **descrição curta**.

## Design e Responsividade

O layout foi construído com **design responsivo**, garantindo boa experiência tanto em desktops quanto em dispositivos móveis.  
O menu de navegação adapta-se automaticamente, transformando-se em um **menu hambúrguer** em telas menores.

### Modo Escuro e Claro
O site inclui um **botão de alternância (switch)** no menu de navegação que permite alternar entre os modos **claro** e **escuro**.  
A escolha do usuário é armazenada no `localStorage`, garantindo a persistência da preferência de tema.

#### Fragmento do código (`actions.js`)
```javascript
const THEME_KEY = "theme";
const html = document.documentElement;
const toggle = document.querySelector("#switch-theme");

function applyTheme(mode) {
    html.setAttribute("data-theme", mode);
    toggle.checked = mode === "dark";
    localStorage.setItem(THEME_KEY, mode);
}

const storedTheme = localStorage.getItem(THEME_KEY);
const initialTheme = storedTheme === "dark" ? "dark" : "light";
applyTheme(initialTheme);

toggle.addEventListener("change", () => {
    const newTheme = toggle.checked ? "dark" : "light";
    applyTheme(newTheme);
});
```

#### Fragmento do código (`styles.css`)

```css
html[data-theme="dark"] {
  color-scheme: dark;
  --clr-primary: #F8981C;
  --clr-secondary: hsl(315, 71%, 40%);
  --clr-black: #FFF;
  --clr-white: #1E2019;
}

html[data-theme="light"] {
  color-scheme: light;
  --clr-primary: #F8981C;
  --clr-secondary: #007DC2;
  --clr-black: #000;
  --clr-white: #FFF;
}
```

### Otimização e SEO

Foram configuradas metatags descritivas e sociais em todas as páginas do site, garantindo melhor indexação em mecanismos de pesquisa e compatibilidade com o compartilhamento em redes sociais.

As metatags incluem informações essenciais como o título da página, descrição, autor e URL canônica. Além disso, foram adicionadas propriedades Open Graph (OG) e Twitter Cards, permitindo que o conteúdo seja exibido de forma rica e consistente ao ser compartilhado em plataformas como Facebook, LinkedIn e Twitter.

Essas configurações favorecem a visibilidade da ONG na web e reforçam a identidade do projeto, proporcionando uma experiência mais completa tanto para usuários quanto para buscadores.

Exemplo de configuração aplicada no projeto:
```html
<meta name="title" content="Caminhos Livres - ONG">
<meta name="description" content="Somos uma organização com o objetivo de acolher, orientar e apoiar migrantes e refugiados que chegam ao Brasil">
<meta property="og:title" content="Caminhos Livres - ONG">
<meta property="og:description" content="Somos uma organização com o objetivo de acolher, orientar e apoiar migrantes e refugiados que chegam ao Brasil">
<meta property="og:image" content="https://site-ong-caminhos-livres.vercel.app/images/preview.jpg">
```

## Desenvolvimento e fluxo de trabalho

O desenvolvimento do projeto seguiu a metodologia GitHub Flow, baseada em branches curtas e integração contínua.
Foram criadas [20 issues](https://github.com/keinermendoza/site-ong-caminhos-livres/issues) distribuídas em [4 milestones](https://github.com/keinermendoza/site-ong-caminhos-livres/milestones), cada uma representando uma etapa do desenvolvimento.

### Durante o processo:

- Cada feature foi implementada em uma branch própria (feature/nome-da-feature);
- Os pull requests foram associados às issues correspondentes;
- A branch develop serviu como ambiente de integração;
- Após os testes, o código foi mesclado em main, gerando uma nova versão estável.

### Exemplo de fluxo de commits:
```
feature/homepage → develop → main
feature/pagina-projetos → develop → main
hotfix/style-mobile-navbar → develop → main
feature/dark-mode → develop → main
feature/reorganiza-estrutura → develop → main
```

## Como Executar o Projeto Localmente

### Clone o repositório:

```
git clone https://github.com/keinermendoza/site-ong-caminhos-livres.git
```

### Acesse a pasta do projeto:
```
cd site-ong-caminhos-livres
```

### Abra o arquivo index.html diretamente em seu navegador ou utilize uma extensão como Live Server para servir os arquivos localmente.

## Deploy e hospedagem

O repositório foi configurado para deploy automático na Vercel, acionado sempre que a branch main recebe um pull request aprovado.

O site está disponível desde a versão [v0.1.0](https://github.com/keinermendoza/site-ong-caminhos-livres/releases/tag/v0.1.0) no seguinte endereço:

🔗 [https://site-ong-caminhos-livres.vercel.app](https://site-ong-caminhos-livres.vercel.app)

## Agradecimentos

Durante o desenvolvimento deste projeto, utilizei diversos materiais de apoio, tutoriais e exemplos disponíveis publicamente, que foram fundamentais para o aprimoramento técnico e visual do site.

Em especial, gostaria de reconhecer:

**Kevin Powell** – pelos tutoriais sobre boas práticas de CSS, responsividade e uso de variáveis customizadas, especialmente no contexto da implementação do modo escuro.
[How to make a website light/dark toggle with CSS & JS](https://www.youtube.com/watch?v=wodWDIdV9BY&t=712s)

**Tiger Codes** – cuja versão serviu de base para a criação do menu navbar responsivo do site.
[Como Fazer um Menu Navbar Responsivo Animado - Tutorial HTML, CSS e JavaScript para Iniciantes](https://www.youtube.com/watch?v=T6UDjGfeaFU&t=283s)

**Riccardo Rapelli** – por compartilhar seu design do switch button utilizado para alternar entre os temas claro e escuro.
[Switch by RiccardoRapelli made with CSS | Uiverse.io](https://uiverse.io/RiccardoRapelli/jolly-chicken-91)


A todos esses criadores e à comunidade web em geral, expresso meu sincero agradecimento pelo compartilhamento de conhecimento, que tornou este projeto possível.

## Autor

### Keiner Mendoza

- 🔗 [GitHub](https://github.com/keinermendoza/)
- 🔗 [LinkedIn](www.linkedin.com/in/keiner-mendoza)

## Licença

Este projeto foi desenvolvido para fins acadêmicos e de demonstração.
O uso, modificação e redistribuição são permitidos desde que sejam mantidos os créditos ao autor original.