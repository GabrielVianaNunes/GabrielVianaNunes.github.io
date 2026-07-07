# Gabriel Nunes — Portfolio

Site pessoal de portfólio e currículo. Página única, estática (HTML/CSS/JS
puro, sem build tools), com 4 idiomas e tema claro/escuro.

**Site publicado:** https://gabrielviananunes.github.io/

## Stack

- HTML5 + CSS3 (custom properties para tema) + JavaScript puro (ES2017, sem
  bundler, sem framework).
- Ícones: [devicon](https://devicon.dev/) via CDN + SVGs próprios para
  competências sem logo oficial.
- Bandeiras: [flag-icons](https://github.com/lipis/flag-icons) via CDN.
- Fontes: Inter (texto) e JetBrains Mono (tags/labels técnicos) via Google
  Fonts.

## Rodando localmente

Não precisa instalar nada além de servir os arquivos estáticos. Com Python
já instalado:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador. Um preset de servidor já
está configurado em `.claude/launch.json` para quem usa Claude Code.

## Estrutura

```
index.html                 conteúdo e estrutura de todas as seções
assets/
  css/styles.css           design tokens (cores, tipografia), componentes
  js/
    theme.js                toggle claro/escuro (localStorage + FOUC guard)
    i18n.js                  motor de traduções PT/EN/DE/ES + dropdown de idioma
    main.js                   menu mobile, scroll-reveal, destaque de nav ativo
  cv/Gabriel-Viana-Nunes-CV.pdf   currículo para download
  img/                      foto de perfil, favicon, imagem de Open Graph
docs/
  superpowers/specs/        specs de design das reformas do site
  superpowers/plans/        planos de implementação das reformas do site
graphify-out/                grafo de conhecimento do projeto (ver abaixo)
```

## Seções da página

Header (nav + seletor de idioma + tema) · Hero · Sobre mim · Experiência
(SENAI FATESG + estágio internacional na ZEISS) · Skills (Backend, Frontend,
Banco de Dados, Ferramentas, Outras competências, Soft Skills, Idiomas) ·
Projetos (case do SENAI + Ultralino) · Contato · Rodapé.

## Idiomas e tema

- 4 idiomas: Português, English, Deutsch, Español. Detecta o idioma do
  navegador no primeiro acesso (com fallback em inglês) e lembra a escolha
  manual feita no dropdown do menu.
- Tema claro/escuro alternável manualmente, com a preferência do sistema
  como padrão inicial e persistência entre visitas.
- Todo o texto traduzível usa atributos `data-i18n` / `data-i18n-attr`
  apontando para chaves no dicionário de `assets/js/i18n.js`.

## Mapa do projeto (graphify)

Este projeto tem um grafo de conhecimento gerado com
[graphify](https://github.com/safishamsi/graphify) em `graphify-out/`, com
nós hub, comunidades e relações entre arquivos. Ver
[GRAPH_REPORT.md](graphify-out/GRAPH_REPORT.md) para a análise completa.

```bash
graphify query "<pergunta>"          # busca ampla no grafo
graphify path "<A>" "<B>"            # caminho mais curto entre dois conceitos
graphify explain "<conceito>"        # explicação pontual de um nó
graphify . --update                  # re-extrai só os arquivos que mudaram
```

## Deploy

GitHub Pages, servindo a branch `main` diretamente (sem etapa de build).
