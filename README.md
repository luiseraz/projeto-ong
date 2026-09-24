# Instituto Semente Viva — projeto HTML5

Site institucional demonstrativo para uma ONG fictícia, desenvolvido com HTML5 semântico, CSS responsivo e JavaScript progressivo.

## Estrutura

```text
projeto-ong/
├── index.html
├── projetos.html
├── cadastro.html
├── componentes.html
├── package.json
├── assets/
│   ├── css/style.css
│   ├── js/script.js
│   ├── images/
│       ├── logo.svg e favicon.svg
│       ├── hero-comunidade.(avif|webp|jpg)
│       └── oficina-leitura.(avif|webp|jpg)
│   └── screenshots/
│       ├── feedback-badges-alertas.jpg
│       ├── feedback-toast.jpg
│       └── feedback-modal.jpg
├── scripts/dev_server.py
└── RELATORIO_VALIDACAO.md
```

## Como executar

Abra `index.html` diretamente no navegador ou, na pasta do projeto, rode um servidor local:

```bash
npm run dev
```

Depois acesse `http://localhost:4173`.

## Recursos implementados

- Tags semânticas: `header`, `nav`, `main`, `section`, `article`, `aside`, `address` e `footer`.
- Hierarquia de títulos com um `h1` por página e subseções em `h2`/`h3`.
- Link para pular ao conteúdo, foco visível, navegação por teclado e suporte a redução de movimento.
- Imagens responsivas em AVIF, WebP e JPG com `<picture>`, dimensões explícitas e textos alternativos contextuais.
- Formulário organizado com `fieldset` e `legend`, rótulos associados e `autocomplete`.
- Validação HTML5 nativa com `required`, `type`, `pattern`, `minlength` e `maxlength`.
- Máscaras progressivas de CPF, telefone e CEP em JavaScript, mantendo o `pattern` como validação nativa.
- Navegação responsiva com submenu acessível por ponteiro, teclado e clique; no breakpoint de 768 px, o menu horizontal é convertido em menu hambúrguer.
- Estados visuais completos para botões (`hover`, `focus-visible`, `active` e `disabled`) e feedback de validação dos formulários com `:user-valid`, `:user-invalid` e mensagens de status.
- Catálogo visual com badges semânticos, alertas, toast não obstrutivo e modal acessível.
- Layout responsivo para desktop, tablet e celular.

## Design System

O arquivo `assets/css/style.css` concentra os tokens visuais no seletor `:root`. A paleta possui verdes primários, terracotas secundários e uma escala de neutros. A tipografia utiliza oito níveis, de `--font-size-xs` a `--font-size-3xl`, incluindo títulos fluidos com `clamp()`. Os espaçamentos seguem uma escala modular de 4 px, de `--space-1` (4 px) a `--space-32` (128 px). Os componentes consomem aliases semânticos para permitir ajustes globais sem alterar cada regra individualmente.

O layout macroscópico usa CSS Grid com 12 colunas fluidas, declarado por `repeat(var(--grid-columns), minmax(0, 1fr))`. Cards e indicadores ocupam 4 colunas; blocos duplos utilizam combinações 6/6, 7/5 ou 4/8. Cinco breakpoints de largura reorganizam o conteúdo em 1280, 1024, 768, 480 e 360 px, além da consulta específica para redução de movimento.

## Observação acadêmica

O nome da organização, os números de impacto, contatos e dados bancários são fictícios. O formulário demonstra a validação no navegador, mas não envia nem armazena dados. Em produção, seria indispensável validar novamente no servidor, proteger os dados pessoais e fornecer uma política de privacidade compatível com a LGPD.
