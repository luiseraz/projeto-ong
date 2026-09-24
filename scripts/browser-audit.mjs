import { chromium } from 'playwright-core';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const executablePath = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', error => errors.push(`JavaScript: ${error.message}`));
page.on('console', message => { if (message.type() === 'error') errors.push(`Console: ${message.text()}`); });
page.on('response', response => { if (response.status() >= 400) errors.push(`HTTP ${response.status()}: ${response.url()}`); });
const base = 'http://127.0.0.1:4173';
const output = join(tmpdir(), 'semente-viva-html-audit');
await mkdir(output, { recursive: true });

function check(condition, message) { if (!condition) errors.push(message); }
async function snapshot(name) { await writeFile(join(output, `${name}.html`), await page.content(), 'utf8'); }

await page.goto(base);
check(await page.locator('h1').count() === 1, 'Início sem h1 único');
await snapshot('inicio');
await page.getByRole('link', { name: 'Conheça os projetos' }).first().click();
check(new URL(page.url()).pathname === '/projetos', 'Navegação para projetos falhou');
check(await page.evaluate(() => document.activeElement?.id === 'conteudo'), 'Foco após navegação não chegou ao conteúdo');
check(await page.locator('picture source[srcset*="640.avif"]').count() === 1, 'Imagem responsiva ausente');
await snapshot('projetos');
await page.locator('[data-favorite="raizes-do-saber"]').click();
check(await page.locator('[data-favorite="raizes-do-saber"]').getAttribute('aria-pressed') === 'true', 'Favorito não marcou');
await page.getByRole('button', { name: 'Ativar modo escuro' }).click();
check(await page.locator('html').getAttribute('data-theme') === 'dark', 'Tema escuro não ativou');
await page.reload();
check(await page.locator('[data-favorite="raizes-do-saber"]').getAttribute('aria-pressed') === 'true', 'Favorito não persistiu');
check(await page.locator('html').getAttribute('data-theme') === 'dark', 'Tema não persistiu');
await page.goto(`${base}/cadastro`);
await snapshot('cadastro');
await page.getByRole('button', { name: 'Enviar cadastro' }).click();
check(await page.locator('#nome').getAttribute('aria-invalid') === 'true', 'Erro de formulário sem aria-invalid');
check(await page.locator('#nome-erro').isVisible(), 'Mensagem visual de erro ausente');
const data = { nome: 'Pessoa Exemplo', email: 'pessoa@exemplo.org', nascimento: '1990-01-01', cpf: '123.456.789-00', telefone: '(41) 99999-9999', endereco: 'Rua Exemplo', numero: '10', cidade: 'Curitiba', cep: '80000-000' };
for (const [id, value] of Object.entries(data)) await page.locator(`#${id}`).fill(value);
await page.locator('#estado').selectOption('PR');
await page.locator('input[name="participacao"][value="remoto"]').check();
await page.locator('input[name="consentimento"]').check();
await page.getByRole('button', { name: 'Enviar cadastro' }).click();
check((await page.locator('#form-status').textContent()).includes('nenhum dado foi enviado'), 'Validação de formulário válido falhou');
check(!JSON.stringify(await page.evaluate(() => ({ ...localStorage }))).includes('pessoa@exemplo.org'), 'Dados pessoais foram armazenados');
await page.goto(`${base}/componentes`);
await snapshot('componentes');
await page.getByRole('button', { name: 'Exibir toast' }).click();
check(await page.locator('#demo-toast').isVisible(), 'Toast não abriu');
await page.getByRole('button', { name: 'Abrir modal' }).click();
check(await page.locator('#demo-modal').evaluate(el => el.open), 'Modal não abriu');
await page.keyboard.press('Escape');
check(!(await page.locator('#demo-modal').evaluate(el => el.open)), 'Modal não fechou com Escape');
await page.goto(`${base}/pagina-inexistente`);
check((await page.locator('h1').textContent()).includes('Página não encontrada'), 'Página 404 ausente');
await snapshot('404');
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(base);
await page.getByRole('button', { name: 'Abrir menu' }).click();
check(await page.locator('.main-nav').isVisible(), 'Menu móvel não abriu');
check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Conteúdo excede a largura móvel');
await page.getByRole('button', { name: 'Participar' }).click();
check(await page.locator('#submenu-participar').isVisible(), 'Submenu móvel não abriu');
await page.getByRole('link', { name: 'Conhecer os projetos' }).click();
check(new URL(page.url()).pathname === '/projetos', 'Link do submenu móvel falhou');
await page.goBack();
check(new URL(page.url()).pathname === '/', 'Voltar do histórico falhou');
await page.goForward();
check(new URL(page.url()).pathname === '/projetos', 'Avançar do histórico falhou');

await browser.close();
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Auditoria do navegador: sem erros; páginas e interações verificadas. HTML: ${output}`);
