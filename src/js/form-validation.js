const masks = {
  cpf: digits => digits.slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
  telefone: digits => {
    const value = digits.slice(0, 11);
    return value.replace(/(\d{2})(\d)/, '($1) $2').replace(value.length > 10 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2');
  },
  cep: digits => digits.slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2'),
};

export function messageFor(input) {
  if (input.validity.valueMissing) return 'Este campo é obrigatório.';
  if (input.validity.typeMismatch) return 'Informe um e-mail válido.';
  if (input.validity.tooShort) return `Use pelo menos ${input.minLength} caracteres.`;
  if (input.validity.patternMismatch) return `Confira o formato de ${input.labels?.[0]?.textContent.trim().replace('*', '').trim() || 'este campo'}.`;
  if (input.validity.rangeOverflow || input.validity.rangeUnderflow) return 'Informe uma data válida.';
  return input.validity.valid ? '' : 'Confira este campo.';
}

export function validateField(input) {
  const group = input.closest('.field, .choice-group, .consent');
  if (!group) return input.checkValidity();
  const invalid = !input.checkValidity();
  const id = `${input.id || input.name}-erro`;
  let error = group.querySelector(`[id="${id}"]`);
  if (!error) {
    error = document.createElement('small');
    error.id = id;
    error.className = 'field-error';
    group.append(error);
  }
  error.textContent = invalid ? messageFor(input) : '';
  error.hidden = !invalid;
  input.setAttribute('aria-invalid', String(invalid));
  const describedBy = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean).filter(token => token !== id);
  if (invalid) describedBy.push(id);
  if (describedBy.length) input.setAttribute('aria-describedby', describedBy.join(' '));
  else input.removeAttribute('aria-describedby');
  group.classList.toggle('has-error', invalid);
  return !invalid;
}

export function initForm(root) {
  const form = root.querySelector('#cadastro-form');
  if (!form) return;
  form.noValidate = true;
  const inputs = [...form.querySelectorAll('input, select, textarea')];
  for (const input of inputs) {
    if (masks[input.id]) input.addEventListener('input', () => { input.value = masks[input.id](input.value.replace(/\D/g, '')); });
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => { if (input.hasAttribute('aria-invalid')) validateField(input); });
    input.addEventListener('change', () => { if (input.hasAttribute('aria-invalid')) validateField(input); });
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const invalid = inputs.filter(input => !validateField(input));
    const status = form.querySelector('#form-status');
    status.hidden = false;
    status.classList.toggle('is-error', invalid.length > 0);
    status.setAttribute('role', invalid.length ? 'alert' : 'status');
    status.textContent = invalid.length
      ? `Revise ${invalid.length} campo${invalid.length > 1 ? 's' : ''} destacado${invalid.length > 1 ? 's' : ''} antes de continuar.`
      : 'Cadastro validado com sucesso. Como este é um projeto demonstrativo, nenhum dado foi enviado ou armazenado.';
    (invalid[0] || status).focus();
  });
}
