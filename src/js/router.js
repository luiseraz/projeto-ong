const routes = new Map([
  ['/', 'inicio'], ['/projetos', 'projetos'], ['/cadastro', 'cadastro'], ['/componentes', 'componentes'],
]);

export function resolveRoute(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const legacy = normalized.replace(/\.html$/, '');
  const path = legacy === '/index' ? '/' : legacy;
  return { path, page: routes.get(path) ?? '404' };
}

export function createRouter(render, win = window) {
  function show({ focus = false } = {}) {
    const route = resolveRoute(win.location.pathname);
    render(route);
    const target = win.location.hash && win.document.getElementById(decodeURIComponent(win.location.hash.slice(1)));
    if (target) target.scrollIntoView();
    else win.scrollTo?.(0, 0);
    if (focus) (target || win.document.querySelector('main'))?.focus({ preventScroll: true });
  }

  function navigate(url) {
    const next = new URL(url, win.location.href);
    if (next.origin !== win.location.origin) return false;
    if (next.pathname === win.location.pathname && next.search === win.location.search && next.hash === win.location.hash) return true;
    win.history.pushState({}, '', next.pathname + next.search + next.hash);
    show({ focus: true });
    return true;
  }

  function onClick(event) {
    const anchor = event.target.closest?.('a[href]');
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.hasAttribute('download') || anchor.target && anchor.target !== '_self') return;
    const url = new URL(anchor.href);
    if (url.origin !== win.location.origin || !['http:', 'https:'].includes(url.protocol)) return;
    if (resolveRoute(url.pathname).page === '404' && !url.pathname.endsWith('.html')) return;
    event.preventDefault();
    navigate(url.href);
  }

  win.document.addEventListener('click', onClick);
  win.addEventListener('popstate', show);
  show();
  return { navigate, destroy() { win.document.removeEventListener('click', onClick); win.removeEventListener('popstate', show); } };
}
