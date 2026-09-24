# Instituto Semente Viva

Projeto acadêmico demonstrativo de uma ONG fictícia. A aplicação usa Vite, Vanilla JavaScript e ES Modules, com uma única entrada `index.html` e renderização em `#app`. Os quatro HTMLs originais estão preservados, sem alteração, em `html/validado/` com seus recursos CSS, JavaScript e imagens.

## Instalação e execução

Requer Node.js 20.19+ ou 22.12+ e npm.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite. Para testar a versão de produção:

```bash
npm run build
npm run preview
```

`npm run test` executa os testes Vitest. O build minificado fica em `dist/`.

## Estrutura

```text
index.html                 entrada da SPA
src/js/app.js              composição e inicialização
src/js/router.js           History API, voltar/avançar e 404
src/js/templates.js        cabeçalho, rodapé e templates das rotas
src/js/components.js       menu, favoritos e tema
src/js/form-validation.js  máscaras e validação acessível
src/js/storage.js          apenas favoritos e preferência de tema
src/js/feedback.js         toast e modal
src/pages/                 conteúdo das quatro páginas preservado como fragmentos
assets/css/style.css       design system e temas
public/assets/images/      imagens responsivas para o build
html/validado/             HTMLs originais e recursos para comprovação
tests/                    roteamento, armazenamento e validação
scripts/                  auditorias do navegador e legado do servidor estático
netlify.toml               publicação e fallback da SPA
```

## Rotas e funcionalidades

As rotas `/`, `/projetos`, `/cadastro` e `/componentes` são navegadas pela History API. Links internos, âncoras, botões voltar e avançar do navegador e endereços inexistentes têm tratamento próprio. URLs antigas como `/projetos.html` também são reconhecidas pelo roteador quando o servidor entrega `index.html`.

O cadastro mantém os campos, máscaras e validações originais. Erros aparecem junto ao campo e são relacionados por `aria-invalid` e `aria-describedby`. O formulário é demonstrativo: nenhum dado pessoal é enviado ou armazenado. Apenas identificadores de projetos favoritos e a escolha de tema entram em `localStorage`; CPF, endereço, telefone e e-mail não entram.

O tema inicial segue `prefers-color-scheme` até a pessoa usar o botão. O botão expõe o estado com `aria-pressed`. O site mantém menu responsivo, submenu, badges, alertas, toast e modal.

## Acessibilidade

Há landmarks, um `h1` por rota, link de salto, foco visível, navegação por teclado, nomes acessíveis dos controles e suporte a `prefers-reduced-motion`. As fotos usam `<picture>` com AVIF, WebP e JPG, `srcset`, `sizes`, dimensões explícitas, texto alternativo e carregamento diferido na foto de projeto. A imagem principal tem prioridade alta.

O Nu HTML Checker retornou zero erros e avisos para as cinco rotas renderizadas em 24/09/2026. O axe não apontou violações WCAG 2.1 A/AA nas mesmas rotas, em tema claro e escuro, a 1280 e 375 px. Essas verificações automatizadas não substituem uma avaliação manual completa com tecnologias assistivas.

## Testes e auditoria local

```bash
npm run test
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
node scripts/browser-audit.mjs
node scripts/a11y-audit.mjs
```

Os dois últimos scripts usam uma instalação local do Chrome em Windows. Para outro caminho, defina `CHROME_PATH`. `browser-audit.mjs` verifica interações, console e respostas HTTP e grava instantâneos HTML na pasta temporária `semente-viva-html-audit` para validação externa. O relatório histórico dos HTMLs originais está em `RELATORIO_VALIDACAO.md`.

## GitFlow e release

O commit inicial em `main` registra a versão HTML anterior. `develop` recebe funcionalidades por branches `feature/` com Conventional Commits. A branch `release/v1.0.0` contém a versão preparada para revisão; nenhum deploy, Pull Request ou publicação remota foi realizado.

## Deploy no Netlify

O arquivo `netlify.toml` define `npm run build`, publica `dist/` e redireciona caminhos da SPA para `index.html`. Para publicar, conecte o repositório no Netlify e execute o deploy após a revisão da release.

**Nota acadêmica:** organização, métricas, contatos e dados bancários são fictícios. Não faça transferências para a chave PIX demonstrativa. Um serviço real exigiria backend, validação no servidor, proteção de dados e política de privacidade apropriada.
