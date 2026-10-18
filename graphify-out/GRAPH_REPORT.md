# Graph Report - .  (2026-10-17)

## Corpus Check
- 18 files · ~42,526 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 246 nodes · 314 edges · 30 communities (21 shown, 9 thin omitted)
- Extraction: 81% EXTRACTED · 19% INFERRED · 0% AMBIGUOUS · INFERRED: 60 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Página e Hero|Página e Hero]]
- [[_COMMUNITY_Identidade western e git flow|Identidade western e git flow]]
- [[_COMMUNITY_Header, idioma e tema|Header, idioma e tema]]
- [[_COMMUNITY_Currículo e experiência|Currículo e experiência]]
- [[_COMMUNITY_Plano do redesign inicial|Plano do redesign inicial]]
- [[_COMMUNITY_Plano dos efeitos mobile|Plano dos efeitos mobile]]
- [[_COMMUNITY_Plano do scroll storytelling|Plano do scroll storytelling]]
- [[_COMMUNITY_Spec do scroll storytelling|Spec do scroll storytelling]]
- [[_COMMUNITY_Spec dos efeitos interativos|Spec dos efeitos interativos]]
- [[_COMMUNITY_Spec do redesign inicial|Spec do redesign inicial]]
- [[_COMMUNITY_Spec dos efeitos mobile|Spec dos efeitos mobile]]
- [[_COMMUNITY_Plano dos efeitos interativos|Plano dos efeitos interativos]]
- [[_COMMUNITY_Cartão Open Graph|Cartão Open Graph]]
- [[_COMMUNITY_Motor i18n|Motor i18n]]
- [[_COMMUNITY_Spec e plano western|Spec e plano western]]
- [[_COMMUNITY_Seção de habilidades|Seção de habilidades]]
- [[_COMMUNITY_Tema claroescuro (JS)|Tema claro/escuro (JS)]]
- [[_COMMUNITY_Favicon GN|Favicon GN]]
- [[_COMMUNITY_Foto de perfil|Foto de perfil]]
- [[_COMMUNITY_Acessibilidade e SEO|Acessibilidade e SEO]]
- [[_COMMUNITY_Objetivo do design|Objetivo do design]]
- [[_COMMUNITY_Arquitetura i18n|Arquitetura i18n]]
- [[_COMMUNITY_Arquitetura de informação|Arquitetura de informação]]
- [[_COMMUNITY_Arquitetura de tema|Arquitetura de tema]]
- [[_COMMUNITY_Sistema visual|Sistema visual]]
- [[_COMMUNITY_Task i18n|Task i18n]]
- [[_COMMUNITY_Task header|Task header]]

## God Nodes (most connected - your core abstractions)
1. `Portfolio Redesign Implementation Plan` - 14 edges
2. `Sessao de reforma completa (plano de 11 tarefas)` - 13 edges
3. `index.html (pagina unica)` - 12 edges
4. `Scroll Storytelling & Motion Implementation Plan` - 11 edges
5. `Portfolio Redesign — Design Spec` - 10 edges
6. `Sessao scroll storytelling (2026-07-08/09)` - 10 edges
7. `Sessao redesign western e git flow (2026-10-14 a 17)` - 10 edges
8. `README.md (Gabriel Nunes Portfolio)` - 10 edges
9. `Estrutura de pastas do projeto` - 10 edges
10. `Mobile Effects Implementation Plan` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry)` --semantically_similar_to--> `Secao Experience com timeline (#experiencia)`  [AMBIGUOUS] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → index.html
- `ZEISS Industrial Quality Solutions — Engenheiro de software (CV entry)` --semantically_similar_to--> `Secao Experience com timeline (#experiencia)`  [INFERRED] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → index.html
- `Faculdade SENAI Fatesg — Bacharelado Engenharia de Software (CV entry)` --semantically_similar_to--> `Secao Experience com timeline (#experiencia)`  [INFERRED] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → index.html
- `GSAP + ScrollTrigger via CDN` --semantically_similar_to--> `GSAP + ScrollTrigger (gsap@3.12.5 via CDN)`  [INFERRED] [semantically similar]
  README.md → PROJECT_STATUS.md
- `Identidade visual western moderno (Ranch Noir)` --semantically_similar_to--> `Paleta Ranch Noir (latao e ferrugem, Rye/Oswald)`  [INFERRED] [semantically similar]
  README.md → PROJECT_STATUS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Personal branding block of the OG card** — assets_img_og_image_gn_monogram, assets_img_og_image_gabriel_nunes_name, assets_img_og_image_full_stack_software_engineer, assets_img_og_image_portfolio_url [INFERRED 0.85]
- **Scroll storytelling effects (GSAP)** — project_status_scroll_progress_bar, project_status_section_parallax, project_status_reveal_group_cascade, project_status_timeline_line_drawing, project_status_gsap_scrolltrigger [EXTRACTED 1.00]
- **Git flow branch model and protection** — project_status_git_flow, project_status_branch_protection, readme_git_flow, readme_deploy [INFERRED 0.85]
- **Projects section cards** — index_senai_case_study, index_ultralino_card, index_blackbox_card, index_projects_section [EXTRACTED 1.00]
- **Portfolio redesign 11-task plan sequence** — plan_task1_foundation, plan_task2_theme_toggle, plan_task3_i18n, plan_task4_responsive_nav, plan_task5_hero [EXTRACTED 0.90]

## Communities (30 total, 9 thin omitted)

### Community 0 - "Página e Hero"
Cohesion: 0.11
Nodes (31): Secao Contact e rodape, index.html (pagina unica), Secao Hero (headline, CTAs), Terminal do Hero (guest@portfolio, data-cmd), Carregamento de scripts (main, i18n, theme, GSAP, effects), Elemento .scroll-progress, Elementos .section-parallax por secao, Secao Sobre mim (#sobre) (+23 more)

### Community 1 - "Identidade western e git flow"
Cohesion: 0.12
Nodes (25): Typography: Rye display, Oswald labels, Inter body, Metadados SEO, Open Graph e canonical, Protecao de main e develop, Bug: URL canonica e og:url com dominio errado, Travessoes removidos do HTML e i18n, Favicon GN e og-image 1200x630, Git flow (feature -> develop -> main), Deploy no GitHub Pages (GabrielVianaNunes.github.io) (+17 more)

### Community 2 - "Header, idioma e tema"
Cohesion: 0.13
Nodes (22): Seletor de idioma (listbox pt/en/de/es), Header com nav, menu e hamburguer, Script inline de tema (site-theme, default dark), Botao theme-toggle (sol/lua), Observacao: nav ativo nunca marca Contato, Bug: grid de Outras competencias esticando itens, Bug: dropdown de idioma sem teclado, Bug: .tags li preso em prefers-color-scheme (+14 more)

### Community 3 - "Currículo e experiência"
Cohesion: 0.15
Nodes (17): Gabriel Viana Nunes CV (PDF), Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry), Faculdade SENAI Fatesg — Bacharelado Engenharia de Software (CV entry), Estagiário Web Development e Metrologia — SENAI Zeiss Centro de Excelência (CV entry), ZEISS Industrial Quality Solutions — Engenheiro de software (CV entry), Card Developer Black Box, Secao Experience com timeline (#experiencia), Secao Projects (#projetos) (+9 more)

### Community 4 - "Plano do redesign inicial"
Cohesion: 0.13
Nodes (14): Global Constraints, Portfolio Redesign Implementation Plan, Reminder, Task 10: Contact & footer — real data and CV link, Task 11: Final integration, accessibility, and SEO/performance audit, Task 2: Manual light/dark theme toggle, Task 3: i18n engine, full translation dictionary, and language dropdown, Task 4: Responsive header — mobile menu, scroll-reveal, active nav link (+6 more)

### Community 5 - "Plano dos efeitos mobile"
Cohesion: 0.15
Nodes (12): 1. Gyroscope tilt on Projects cards, 2. Tap feedback on buttons and Projects cards, 3. Parallax re-enabled on mobile, at reduced intensity, 4. Animated mobile menu, Accessibility & performance, Context: current mobile support (audited before this spec), Features, File changes (+4 more)

### Community 6 - "Plano do scroll storytelling"
Cohesion: 0.17
Nodes (11): Global Constraints, Reminder, Scroll Storytelling & Motion Implementation Plan, Task 1: Foundation — GSAP/ScrollTrigger scripts, module skeleton, progress bar, remove old reveal system, Task 2: Parallax background layers, Task 3: Cascade reveal helper + Hero, Task 4: Cascade — About and Contact, Task 5: Cascade — Skills (categories, soft skills, languages) (+3 more)

### Community 7 - "Spec do scroll storytelling"
Cohesion: 0.17
Nodes (11): 1. Scroll progress bar, 2. Staggered cascade reveals, 3. Parallax background layers (all major sections), 4. Timeline draw-in (Experience section), Accessibility & performance, Features, File changes, Goal (+3 more)

### Community 8 - "Spec dos efeitos interativos"
Cohesion: 0.17
Nodes (11): 1. Magnetic buttons, 2. 3D card tilt, 3. Theme-toggle transition, 4. Terminal element (Hero), Accessibility & performance, Features, File changes, Goal (+3 more)

### Community 9 - "Spec do redesign inicial"
Cohesion: 0.18
Nodes (10): Accessibility, SEO, performance, File changes, Goal, i18n architecture, Information architecture (section order), Non-goals, Portfolio Redesign — Design Spec, Real content to use (+2 more)

### Community 10 - "Spec dos efeitos mobile"
Cohesion: 0.20
Nodes (9): Global Constraints, Mobile Effects Implementation Plan, Reminder, Task 1: Hamburger icon morph (CSS only), Task 2: Menu item cascade on open, Task 3: Tap feedback on buttons and Projects cards, Task 4: Mobile parallax at reduced intensity, Task 5: Gyroscope tilt on Projects cards (+1 more)

### Community 11 - "Plano dos efeitos interativos"
Cohesion: 0.22
Nodes (8): Global Constraints, Interactive Effects Implementation Plan, Reminder, Task 1: Magnetic buttons, Task 2: 3D card tilt, Task 3: Theme-toggle circle-reveal transition, Task 4: Terminal element in Hero, Task 5: Final audit — reduced motion, touch guard, full regression

### Community 12 - "Cartão Open Graph"
Cohesion: 0.32
Nodes (8): Open Graph social card (og-image.png), Full-Stack Development / Process Automation tagline, Full-Stack Software Engineer (role subtitle), Gabriel Nunes (headline in Rye display font), GN brass monogram badge, Goiania, Brazil - open to remote and international opportunities, gabrielviananunes.github.io (portfolio URL), Modern western / Ranch Noir visual identity (dark brown, brass, Rye, Oswald)

### Community 13 - "Motor i18n"
Cohesion: 0.47
Nodes (3): applyTranslations(), initDropdown(), setLanguage()

### Community 15 - "Spec e plano western"
Cohesion: 0.47
Nodes (6): Plan: Western Modern Redesign, Regenerate favicon and og-image with Pillow, Spec: Western modern redesign, Constraint: no pixel art, no SVG illustration, nothing copied from GitHub overview, Ranch Noir palette (brass, rust, warm dark), Numbered section tags via CSS counters

### Community 16 - "Seção de habilidades"
Cohesion: 0.40
Nodes (6): Grupos Backend, Frontend e Database, Secao Skills (#habilidades), Grupos Tools e Other competencies, Soft Skills e cartoes de Languages, Bug: icone do Angular invisivel no tema claro, Habilidades novas (Rust, Tauri, React, SQLite, Vite, Actions, Docker)

### Community 18 - "Tema claro/escuro (JS)"
Cohesion: 0.60
Nodes (3): animateThemeToggle(), applyTheme(), toggleTheme()

### Community 19 - "Favicon GN"
Cohesion: 0.67
Nodes (3): Site Favicon (GN monogram), GN monogram in brass on dark brown rounded square, Modern Western / Ranch Noir visual identity

## Ambiguous Edges - Review These
- `Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry)` → `Secao Experience com timeline (#experiencia)`  [AMBIGUOUS]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf · relation: semantically_similar_to

## Knowledge Gaps
- **96 isolated node(s):** `Global Constraints`, `Task 2: Manual light/dark theme toggle`, `Task 3: i18n engine, full translation dictionary, and language dropdown`, `Task 4: Responsive header — mobile menu, scroll-reveal, active nav link`, `Task 5: Hero section rewrite` (+91 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry)` and `Secao Experience com timeline (#experiencia)`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `index.html (pagina unica)` connect `Página e Hero` to `Seção de habilidades`, `Identidade western e git flow`, `Header, idioma e tema`, `Currículo e experiência`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `Sessao redesign western e git flow (2026-10-14 a 17)` connect `Identidade western e git flow` to `Página e Hero`, `Seção de habilidades`, `Header, idioma e tema`, `Currículo e experiência`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `PROJECT_STATUS.md (Estado atual do projeto)` connect `Página e Hero` to `Identidade western e git flow`, `Header, idioma e tema`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `Global Constraints`, `Task 2: Manual light/dark theme toggle`, `Task 3: i18n engine, full translation dictionary, and language dropdown` to the rest of the system?**
  _101 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Página e Hero` be split into smaller, more focused modules?**
  _Cohesion score 0.10967741935483871 - nodes in this community are weakly interconnected._
- **Should `Identidade western e git flow` be split into smaller, more focused modules?**
  _Cohesion score 0.12333333333333334 - nodes in this community are weakly interconnected._