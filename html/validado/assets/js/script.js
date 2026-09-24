const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
    menuButton.querySelector('[aria-hidden="true"]').textContent = isOpen ? '☰' : '×';
    if (isOpen) closeDropdowns();
  });
}

const dropdowns = [...document.querySelectorAll('.nav-dropdown')];

function setDropdownState(dropdown, isOpen) {
  dropdown.classList.toggle('is-open', isOpen);
  dropdown.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', String(isOpen));
}

function closeDropdowns(exception = null) {
  dropdowns.forEach((dropdown) => {
    if (dropdown !== exception) setDropdownState(dropdown, false);
  });
}

dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  toggle?.addEventListener('click', () => {
    const willOpen = !dropdown.classList.contains('is-open');
    closeDropdowns(dropdown);
    setDropdownState(dropdown, willOpen);
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-dropdown')) closeDropdowns();
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const opened = document.querySelector('.nav-dropdown.is-open');
  if (!opened) return;
  setDropdownState(opened, false);
  opened.querySelector('.dropdown-toggle')?.focus();
});

document.querySelectorAll('[data-current-year]').forEach((item) => {
  item.textContent = new Date().getFullYear();
});

function applyMask(input, formatter) {
  if (!input) return;
  input.addEventListener('input', () => {
    input.value = formatter(input.value.replace(/\D/g, ''));
  });
}

applyMask(document.querySelector('#cpf'), (digits) => digits
  .slice(0, 11)
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d{1,2})$/, '$1-$2'));

applyMask(document.querySelector('#telefone'), (digits) => {
  const value = digits.slice(0, 11);
  if (value.length <= 10) {
    return value.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
  }
  return value.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
});

applyMask(document.querySelector('#cep'), (digits) => digits.slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2'));

const form = document.querySelector('#cadastro-form');
const status = document.querySelector('#form-status');

if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    status.hidden = false;
    status.focus();
  });
}

// Componentes de feedback: toast não obstrutivo e modal acessível.
const toast = document.querySelector('#demo-toast');
const toastTrigger = document.querySelector('[data-toast-trigger]');
const toastClose = document.querySelector('[data-toast-close]');
let toastTimer;

function hideToast() {
  if (!toast) return;
  toast.classList.remove('is-visible');
  window.setTimeout(() => {
    toast.hidden = true;
  }, 180);
}

function showToast() {
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.hidden = false;
  window.requestAnimationFrame(() => toast.classList.add('is-visible'));
  toastTimer = window.setTimeout(hideToast, 6500);
}

toastTrigger?.addEventListener('click', showToast);
toastClose?.addEventListener('click', hideToast);

const modal = document.querySelector('#demo-modal');
const modalTrigger = document.querySelector('[data-modal-trigger]');
const modalConfirm = document.querySelector('[data-modal-confirm]');

modalTrigger?.addEventListener('click', () => modal?.showModal());
modalConfirm?.addEventListener('click', () => window.setTimeout(showToast, 120));
modal?.addEventListener('click', (event) => {
  if (event.target === modal) modal.close('cancel');
});

const demoState = new URLSearchParams(window.location.search).get('state');
if (demoState === 'toast') showToast();
if (demoState === 'modal') modal?.showModal();
