# Plano de implementação e estado

1. [x] Auditar os arquivos e o estado do Git; registrar a versão original em `main`.
2. [x] Preservar os quatro HTMLs e seus recursos em `html/validado/`.
3. [x] Criar a SPA com Vite, entrada única, templates, módulos e roteamento.
4. [x] Integrar menu, favoritos, tema, formulários, toast e modal.
5. [x] Adicionar imagens responsivas, estilos acessíveis, testes e configuração Netlify.
6. [x] Executar instalação, testes, build, validação HTML e auditorias no navegador.
7. [x] Documentar o resultado e preparar `release/v1.0.0`.

Verificações em 24/09/2026: 6 testes Vitest passaram; build Vite passou; Nu HTML Checker retornou `messages: []` nas rotas início, projetos, cadastro, componentes e 404; Chrome passou na auditoria de navegação, formulário e console; axe não relatou violações WCAG 2.1 A/AA nas cinco rotas em temas claro e escuro, a 1280 e 375 px. A verificação automatizada de acessibilidade tem limites e recomenda-se revisão manual com leitor de tela antes de um uso real.
