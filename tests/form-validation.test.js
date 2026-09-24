import { beforeEach, describe, expect, it } from 'vitest';
import { initForm, validateField } from '../src/js/form-validation.js';

describe('validação visual e acessível', () => {
  beforeEach(() => {
    document.body.innerHTML = `<form id="cadastro-form"><div class="field"><label for="email">E-mail *</label><input id="email" name="email" type="email" required aria-describedby="email-ajuda"><small id="email-ajuda">Seu e-mail.</small></div><button type="submit">Enviar</button><p id="form-status" hidden></p></form>`;
  });

  it('expõe erro e mantém a descrição anterior', () => {
    const input = document.querySelector('#email');
    expect(validateField(input)).toBe(false);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe('email-ajuda email-erro');
    expect(document.querySelector('#email-erro').textContent).toMatch(/obrigatório/);
    input.value = 'pessoa@exemplo.org';
    expect(validateField(input)).toBe(true);
    expect(input.getAttribute('aria-describedby')).toBe('email-ajuda');
    expect(document.querySelector('#email-erro').hidden).toBe(true);
  });

  it('impede envio inválido e confirma sem armazenar dados', () => {
    initForm(document);
    const form = document.querySelector('form');
    form.requestSubmit();
    expect(document.querySelector('#form-status').getAttribute('role')).toBe('alert');
    document.querySelector('#email').value = 'pessoa@exemplo.org';
    form.requestSubmit();
    expect(document.querySelector('#form-status').textContent).toMatch(/nenhum dado foi enviado/);
  });
});
