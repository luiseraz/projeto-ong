import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';

const executablePath = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext();
const page = await context.newPage();
let count = 0;
for (const theme of ['light', 'dark']) {
  for (const width of [1280, 375]) {
  await page.setViewportSize({ width, height: 900 });
  for (const path of ['/', '/projetos', '/cadastro', '/componentes', '/pagina-inexistente']) {
    await page.goto(`http://127.0.0.1:4173${path}`);
    await page.evaluate(value => localStorage.setItem('semente-viva:theme', value), theme);
    await page.reload();
    const report = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    for (const violation of report.violations) {
      count++;
      console.error(`${theme} ${width}px ${path}: ${violation.id} (${violation.impact}) ${violation.nodes.map(node => node.target.join(' ')).join(', ')}`);
    }
  }
  }
}
await browser.close();
if (count) process.exitCode = 1;
else console.log('axe WCAG 2.1 A/AA: sem violações nas 5 rotas, em temas claro e escuro, a 1280 e 375 px.');
