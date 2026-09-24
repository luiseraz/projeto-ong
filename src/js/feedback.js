export function initFeedback(root) {
  const toast = root.querySelector('#demo-toast');
  const modal = root.querySelector('#demo-modal');
  if (!toast || !modal) return () => {};
  let timer;
  function hideToast() { toast.classList.remove('is-visible'); toast.hidden = true; }
  function showToast() {
    clearTimeout(timer);
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    timer = setTimeout(hideToast, 6500);
  }
  root.querySelector('[data-toast-trigger]')?.addEventListener('click', showToast);
  root.querySelector('[data-toast-close]')?.addEventListener('click', hideToast);
  root.querySelector('[data-modal-trigger]')?.addEventListener('click', () => modal.showModal());
  root.querySelector('[data-modal-confirm]')?.addEventListener('click', () => setTimeout(showToast, 120));
  modal.addEventListener('click', event => { if (event.target === modal) modal.close('cancel'); });
  const state = new URLSearchParams(location.search).get('state');
  if (state === 'toast') showToast();
  if (state === 'modal') modal.showModal();
  return () => { clearTimeout(timer); if (modal.open) modal.close(); };
}
