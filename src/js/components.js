import { readFavorites, toggleFavorite, readTheme, saveTheme } from './storage.js';

export function initTheme() {
  const preferred = window.matchMedia('(prefers-color-scheme: dark)');
  function apply() {
    document.documentElement.dataset.theme = readTheme() || (preferred.matches ? 'dark' : 'light');
    const button = document.querySelector('[data-theme-toggle]');
    if (button) {
      const dark = document.documentElement.dataset.theme === 'dark';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Desativar modo escuro' : 'Ativar modo escuro');
      button.textContent = dark ? 'Modo claro' : 'Modo escuro';
    }
  }
  apply();
  preferred.addEventListener('change', apply);
  return apply;
}

export function initComponents(root, refreshTheme) {
  root.querySelectorAll('[data-current-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
  const themeButton = root.querySelector('[data-theme-toggle]');
  function syncThemeButton() {
    if (!themeButton) return;
    const dark = document.documentElement.dataset.theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', dark ? 'Desativar modo escuro' : 'Ativar modo escuro');
    themeButton.textContent = dark ? 'Modo claro' : 'Modo escuro';
  }
  syncThemeButton();
  themeButton?.addEventListener('click', () => {
    saveTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    refreshTheme();
    syncThemeButton();
  });

  const menuButton = root.querySelector('.menu-button');
  const navigation = root.querySelector('.main-nav');
  const dropdown = root.querySelector('.nav-dropdown');
  const dropdownButton = dropdown?.querySelector('.dropdown-toggle');
  function closeDropdown() { dropdown?.classList.remove('is-open'); dropdownButton?.setAttribute('aria-expanded', 'false'); }
  function closeMenu() { navigation?.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded', 'false'); menuButton?.setAttribute('aria-label', 'Abrir menu'); closeDropdown(); }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (!open) closeDropdown();
  });
  dropdownButton?.addEventListener('click', () => {
    const open = dropdownButton.getAttribute('aria-expanded') !== 'true';
    dropdown.classList.toggle('is-open', open);
    dropdownButton.setAttribute('aria-expanded', String(open));
  });
  root.addEventListener('click', event => { if (!event.target.closest('.nav-dropdown')) closeDropdown(); if (event.target.closest('.main-nav a')) closeMenu(); });
  root.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (dropdown?.classList.contains('is-open')) { closeDropdown(); dropdownButton.focus(); }
    else if (navigation?.classList.contains('is-open')) { closeMenu(); menuButton.focus(); }
  });

  const projectArticles = root.querySelectorAll('.feature-project, .project-list article');
  const ids = ['raizes-do-saber', 'colheita-compartilhada', 'trilhas-de-autonomia'];
  projectArticles.forEach((article, index) => {
    const heading = article.querySelector('h3');
    if (!heading) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'favorite-button';
    button.dataset.favorite = ids[index];
    const sync = () => {
      const active = readFavorites().includes(ids[index]);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', `${active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}: ${heading.textContent}`);
      button.textContent = active ? '♥ Favorito' : '♡ Favoritar';
    };
    sync();
    button.addEventListener('click', () => { toggleFavorite(ids[index]); sync(); });
    heading.insertAdjacentElement('afterend', button);
  });
}
