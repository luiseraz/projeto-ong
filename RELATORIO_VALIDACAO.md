# Relatório de validação e entrega

## Checklist estrutural

- [x] Declaração `<!doctype html>` nas quatro páginas.
- [x] Idioma `pt-BR`, codificação UTF-8 e meta viewport.
- [x] Um conteúdo principal (`main`) e um título principal (`h1`) em cada página.
- [x] Navegação nomeada e indicação da página atual com `aria-current`.
- [x] Imagens com `alt`, largura, altura e formatos alternativos.
- [x] Campos com `label`, `id`, `name` e agrupamento por `fieldset`/`legend`.
- [x] Validações nativas para e-mail, CPF, telefone, CEP e campos obrigatórios.
- [x] Ordem de foco lógica, foco visível e link “Pular para o conteúdo”.
- [x] CSS e JavaScript em arquivos externos.
- [x] Pastas separadas para estilos, scripts, imagens e capturas de tela.
- [x] Componentes de feedback com badges, alertas, toast e modal acessível.

## Padrões dos campos estritos

| Campo | Validação aplicada |
|---|---|
| CPF | `pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}"`, `maxlength="14"`, `required` |
| Telefone | `type="tel"`, `pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}"`, `maxlength="15"`, `required` |
| CEP | `pattern="[0-9]{5}-[0-9]{3}"`, `maxlength="9"`, `required` |

`pattern` verifica o formato antes da submissão; as máscaras em JavaScript apenas auxiliam a digitação. O CPF demonstrativo é validado estruturalmente, não por dígitos verificadores. Uma aplicação real também deve fazer validação e sanitização no servidor.

## Como conferir no W3C

Envie individualmente `index.html`, `projetos.html`, `cadastro.html` e `componentes.html` ao Nu HTML Checker em <https://validator.w3.org/nu/>. O validador online precisa receber também o contexto correto dos arquivos externos apenas quando alguma checagem adicional for necessária.

## Resultado da submissão

As quatro páginas foram submetidas individualmente ao Nu HTML Checker. `index.html` e `projetos.html` foram aprovados de imediato, sem erros ou avisos. Na primeira análise de `cadastro.html`, a ferramenta indicou um valor inadequado em `autocomplete="street-address"` para um campo `input` e informou que a seção externa do formulário não possuía um cabeçalho próprio. O campo foi corrigido para `autocomplete="address-line1"`, e o contêiner externo, que tinha finalidade apenas visual, foi alterado de `section` para `div`.

Na primeira submissão de `componentes.html`, o W3C apontou que `aria-label` não poderia ser aplicado diretamente a uma `div` genérica. O grupo de badges foi então reestruturado como uma lista semântica, usando `ul` e itens `li`. Após as correções, `index.html`, `projetos.html`, `cadastro.html` e `componentes.html` retornaram `messages: []`: zero erros e zero avisos estruturais.

Nos testes visuais em navegador, o toast foi exibido e fechado corretamente, e o modal nativo abriu com fundo de sobreposição, foco controlado e fechamento por teclado. O console da página não registrou erros provenientes dos arquivos do projeto.

## Entrega

O arquivo compactado contém todo o projeto e pode ser extraído sem dependências. As imagens fotográficas estão disponíveis em AVIF, WebP e JPG para compatibilidade e otimização. As evidências visuais dos componentes estão em `assets/screenshots/`.
