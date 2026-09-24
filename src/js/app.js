import '../../assets/css/style.css';
import { createRouter } from './router.js';
import { renderTemplate } from './templates.js';
import { initTheme, initComponents } from './components.js';
import { initForm } from './form-validation.js';
import { initFeedback } from './feedback.js';

const app = document.querySelector('#app');
const refreshTheme = initTheme();
let cleanupFeedback = () => {};

createRouter(({ page }) => {
  cleanupFeedback();
  const template = renderTemplate(page);
  document.title = template.title;
  document.querySelector('meta[name="description"]').content = template.description;
  document.body.classList.toggle('feedback-demo-page', page === 'componentes');
  app.innerHTML = template.html;
  initComponents(app, refreshTheme);
  initForm(app);
  cleanupFeedback = initFeedback(app);
});
