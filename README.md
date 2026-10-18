# Gabriel Nunes — Portfolio

Site pessoal de portfólio e currículo. Página única, estática (HTML/CSS/JS
puro, sem build tools), com 4 idiomas e tema claro/escuro.

**Site publicado:** https://gabrielviananunes.github.io/

## Stack

- HTML5 + CSS3 (custom properties para tema) + JavaScript puro (ES2017, sem
  bundler, sem framework).
- [GSAP](https://gsap.com/) + ScrollTrigger via CDN para os efeitos de
  scroll (barra de progresso, parallax, cascatas de revelação, timeline se
  desenhando).
- Ícones: [devicon](https://devicon.dev/) via CDN + SVGs próprios para
  competências sem logo oficial.
- Bandeiras: [flag-icons](https://github.com/lipis/flag-icons) via CDN.
- Fontes via Google Fonts: Rye (títulos), Oswald (rótulos, botões e menu, em
  caixa-alta espaçada), Inter (texto) e JetBrains Mono (tags e terminal).

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
    main.js                   menu mobile (com animação de abertura), destaque de nav ativo
    scroll-effects.js         efeitos de scroll via GSAP/ScrollTrigger (barra
                               de progresso, parallax, cascatas, timeline)
    interactive-effects.js    botões magnéticos, terminal digitando no Hero,
                               feedback de toque no mobile
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
Projetos (case do SENAI com link para o repo `TCC`, Ultralino e Developer Black Box) · Contato · Rodapé.

## Identidade visual

Direção "western moderno" (tom de rancho contemporâneo, sem pixel art nem
ilustração): paleta Ranch Noir (marrom escuro quente, latão `#b8893f`,
ferrugem `#8c4a2b`; tema claro com latão escurecido para contraste AA),
títulos em Rye, rótulos em Oswald, cantos quase retos, linhas finas e
seções numeradas via CSS counters. Tokens em `:root` e
`html[data-theme="dark"]` no `styles.css`. Spec e plano em `docs/superpowers/`.

## Idiomas e tema

- 4 idiomas: Português, English, Deutsch, Español. Detecta o idioma do
  navegador no primeiro acesso (com fallback em inglês) e lembra a escolha
  manual feita no dropdown do menu.
- Tema escuro como padrão ('Ranch Noir') e tema claro 'dia' alternável
  manualmente, com persistência da escolha entre visitas.
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

## Fluxo de trabalho (git flow)

- `main`: produção, publicada no GitHub Pages. Só recebe `develop` por PR de
  release (ou hotfix).
- `develop`: integração. Recebe `feature/*` por PR.
- `feature/*`, `release/*`, `hotfix/*`: temporárias, apagadas depois do merge.
- `main` e `develop` têm proteção: PR obrigatório, sem force push e sem
  exclusão. Depois de cada release, um PR `main` → `develop` (merge commit)
  mantém as duas alinhadas.

## Deploy

GitHub Pages, servindo a branch `main` diretamente (sem etapa de build).
