import { beforeEach, describe, expect, it } from 'vitest';
import { readFavorites, toggleFavorite, readTheme, saveTheme } from '../src/js/storage.js';

describe('armazenamento local', () => {
  beforeEach(() => localStorage.clear());

  it('guarda apenas identificadores permitidos de projetos', () => {
    expect(toggleFavorite('raizes-do-saber')).toEqual(['raizes-do-saber']);
    expect(toggleFavorite('cpf:123')).toEqual(['raizes-do-saber']);
    expect(readFavorites()).toEqual(['raizes-do-saber']);
    expect(toggleFavorite('raizes-do-saber')).toEqual([]);
  });

  it('ignora dados corrompidos e restringe a preferência de tema', () => {
    localStorage.setItem('semente-viva:favorites', '{invalid');
    expect(readFavorites()).toEqual([]);
    expect(saveTheme('blue')).toBe(false);
    expect(readTheme()).toBeNull();
    expect(saveTheme('dark')).toBe(true);
    expect(readTheme()).toBe('dark');
    expect(Object.keys(localStorage).every(key => !/cpf|email|telefone|endereco/.test(key))).toBe(true);
  });
});
