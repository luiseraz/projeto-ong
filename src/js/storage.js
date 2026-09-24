const FAVORITES_KEY = 'semente-viva:favorites';
const THEME_KEY = 'semente-viva:theme';
const allowedProjects = new Set(['raizes-do-saber', 'colheita-compartilhada', 'trilhas-de-autonomia']);

export function readFavorites(storage = localStorage) {
  try {
    const parsed = JSON.parse(storage.getItem(FAVORITES_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter(id => allowedProjects.has(id)) : [];
  } catch { return []; }
}

export function toggleFavorite(id, storage = localStorage) {
  if (!allowedProjects.has(id)) return readFavorites(storage);
  const favorites = new Set(readFavorites(storage));
  if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
  const result = [...favorites];
  try { storage.setItem(FAVORITES_KEY, JSON.stringify(result)); } catch { /* Navegação privada pode bloquear armazenamento. */ }
  return result;
}

export function readTheme(storage = localStorage) {
  try { return ['light', 'dark'].includes(storage.getItem(THEME_KEY)) ? storage.getItem(THEME_KEY) : null; }
  catch { return null; }
}

export function saveTheme(theme, storage = localStorage) {
  if (!['light', 'dark'].includes(theme)) return false;
  try { storage.setItem(THEME_KEY, theme); return true; } catch { return false; }
}
