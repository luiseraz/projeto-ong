import inicio from '../pages/index.html?raw';
import projetos from '../pages/projetos.html?raw';
import cadastro from '../pages/cadastro.html?raw';
import componentes from '../pages/componentes.html?raw';

const pages = {
  inicio: { title: 'Instituto Semente Viva | Transformação que cria raízes', description: 'Conheça o Instituto Semente Viva e participe de ações comunitárias.', html: inicio },
  projetos: { title: 'Projetos e doações | Instituto Semente Viva', description: 'Conheça projetos, voluntariado e formas de doação.', html: projetos },
  cadastro: { title: 'Cadastro de voluntariado | Instituto Semente Viva', description: 'Cadastre-se para participar das ações voluntárias.', html: cadastro },
  componentes: { title: 'Componentes de feedback | Semente Viva', description: 'Demonstração dos componentes de feedback.', html: componentes },
  '404': { title: 'Página não encontrada | Instituto Semente Viva', description: 'Página não encontrada.', html: '<main id="conteudo" class="section"><div class="container"><h1 tabindex="-1">Página não encontrada</h1><p>O endereço solicitado não existe.</p><a class="button" href="/">Voltar ao início</a></div></main>' },
};

function mainHeader(page) {
  return `<header class="site-header"><div class="container header-inner">
    <a class="brand" href="/" aria-label="Instituto Semente Viva — página inicial"><img src="/assets/images/logo.svg" width="44" height="44" alt=""><span>Instituto<br><strong>Semente Viva</strong></span></a>
    <div class="header-actions"><button class="theme-button" type="button" data-theme-toggle aria-pressed="false" aria-label="Ativar modo escuro">Modo escuro</button>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menu"><span aria-hidden="true">☰</span></button></div>
    <nav id="menu-principal" class="main-nav" aria-label="Navegação principal">
      <a ${page === 'inicio' ? 'aria-current="page"' : ''} href="/">Início</a>
      <a href="/#sobre">Quem somos</a>
      <div class="nav-dropdown"><button class="dropdown-toggle" type="button" aria-expanded="false" aria-controls="submenu-participar">Participar <span class="dropdown-icon" aria-hidden="true">⌄</span></button>
        <div id="submenu-participar" class="dropdown-menu" role="group" aria-label="Formas de participação">
          <a ${page === 'projetos' ? 'aria-current="page"' : ''} href="/projetos">Conhecer os projetos</a><a ${page === 'cadastro' ? 'aria-current="page"' : ''} href="/cadastro">Ser voluntário</a><a href="/projetos#doacao">Fazer uma doação</a>
        </div></div><a class="button button-small" href="/projetos#doacao">Quero contribuir</a>
    </nav></div></header>`;
}

function demoHeader() {
  return `<header class="demo-header"><div class="container demo-header-inner"><a class="brand" href="/" aria-label="Semente Viva — página inicial"><span class="brand-mark" aria-hidden="true">SV</span><span><strong>Semente Viva</strong><br>Plataforma social</span></a><div class="header-actions"><button class="theme-button" type="button" data-theme-toggle aria-pressed="false" aria-label="Ativar modo escuro">Modo escuro</button><a class="button button-secondary button-small" href="/">Voltar ao site</a></div></div></header>`;
}

const footer = `<footer class="site-footer"><div class="container footer-inner"><p>© <span data-current-year></span> Instituto Semente Viva.</p><p>Projeto acadêmico demonstrativo — dados fictícios.</p></div></footer>`;

export function renderTemplate(page) {
  const entry = pages[page] ?? pages['404'];
  const html = entry.html.replace(/<main\b/, '<main tabindex="-1"');
  return {
    title: entry.title,
    description: entry.description,
    html: `<a class="skip-link" href="#conteudo">Pular para o conteúdo principal</a>${page === 'componentes' ? demoHeader() : mainHeader(page)}${html}${page === 'componentes' ? '' : footer}`,
  };
}
