import { afterEach, describe, expect, it, vi } from 'vitest';
import { createRouter, resolveRoute } from '../src/js/router.js';

describe('roteamento', () => {
  afterEach(() => { history.replaceState({}, '', '/'); document.body.innerHTML = ''; });

  it('resolve páginas conhecidas, URLs antigas e 404', () => {
    expect(resolveRoute('/projetos/').page).toBe('projetos');
    expect(resolveRoute('/cadastro.html').page).toBe('cadastro');
    expect(resolveRoute('/index.html').page).toBe('inicio');
    expect(resolveRoute('/inexistente').page).toBe('404');
  });

  it('navega com History API e responde ao voltar', () => {
    const render = vi.fn();
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const router = createRouter(render);
    expect(render).toHaveBeenLastCalledWith({ path: '/', page: 'inicio' });
    router.navigate('/projetos');
    expect(location.pathname).toBe('/projetos');
    expect(render).toHaveBeenLastCalledWith({ path: '/projetos', page: 'projetos' });
    history.replaceState({}, '', '/cadastro');
    window.dispatchEvent(new PopStateEvent('popstate'));
    expect(render).toHaveBeenLastCalledWith({ path: '/cadastro', page: 'cadastro' });
    router.destroy();
    scrollTo.mockRestore();
  });
});
