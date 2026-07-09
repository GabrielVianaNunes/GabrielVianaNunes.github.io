# Graph Report - portifolio-gabriel  (2026-07-09)

## Corpus Check
- 16 files · ~40,217 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 211 nodes · 177 edges · 45 communities (18 shown, 27 thin omitted)
- Extraction: 94% EXTRACTED · 5% INFERRED · 1% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4f39ba02`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Deploy & Publishing Status|Deploy & Publishing Status]]
- [[_COMMUNITY_Theme Toggle & Redesign Tasks|Theme Toggle & Redesign Tasks]]
- [[_COMMUNITY_Experience Timeline & CV|Experience Timeline & CV]]
- [[_COMMUNITY_Core Page Sections|Core Page Sections]]
- [[_COMMUNITY_README Documentation|README Documentation]]
- [[_COMMUNITY_Skills Section & Icons|Skills Section & Icons]]
- [[_COMMUNITY_Projects Case Studies|Projects Case Studies]]
- [[_COMMUNITY_i18n Engine Functions|i18n Engine Functions]]
- [[_COMMUNITY_i18n Architecture & Accessibility|i18n Architecture & Accessibility]]
- [[_COMMUNITY_Theme Toggle Functions|Theme Toggle Functions]]
- [[_COMMUNITY_Redesign Plan & Spec|Redesign Plan & Spec]]
- [[_COMMUNITY_Site Favicon|Site Favicon]]
- [[_COMMUNITY_OG Image (Empty File)|OG Image (Empty File)]]
- [[_COMMUNITY_Profile Photo|Profile Photo]]
- [[_COMMUNITY_Visual Design System|Visual Design System]]
- [[_COMMUNITY_Mobile Effects Design — Design Spec|Mobile Effects Design — Design Spec]]
- [[_COMMUNITY_Scroll Storytelling & Motion Implementation Plan|Scroll Storytelling & Motion Implementation Plan]]
- [[_COMMUNITY_Scroll Storytelling & Motion Design — Design Spec|Scroll Storytelling & Motion Design — Design Spec]]
- [[_COMMUNITY_Interactive Effects Design — Design Spec|Interactive Effects Design — Design Spec]]
- [[_COMMUNITY_Portfolio Redesign — Design Spec|Portfolio Redesign — Design Spec]]
- [[_COMMUNITY_Mobile Effects Implementation Plan|Mobile Effects Implementation Plan]]
- [[_COMMUNITY_Interactive Effects Implementation Plan|Interactive Effects Implementation Plan]]
- [[_COMMUNITY_Bug ícone Angular invisível no tema claro|Bug: ícone Angular invisível no tema claro]]
- [[_COMMUNITY_Subagent-Driven Development Workflow|Subagent-Driven Development Workflow]]
- [[_COMMUNITY_Worktree .worktreesportfolio-redesign|Worktree .worktrees/portfolio-redesign]]
- [[_COMMUNITY_Design Spec Goal portfólio multilíngue premium minimalista|Design Spec Goal: portfólio multilíngue premium minimalista]]
- [[_COMMUNITY_i18n Architecture (spec)|i18n Architecture (spec)]]
- [[_COMMUNITY_Theme Architecture (spec)|Theme Architecture (spec)]]
- [[_COMMUNITY_Task 1 Foundation (design tokens, mono font, CV asset, preview server)|Task 1: Foundation (design tokens, mono font, CV asset, preview server)]]
- [[_COMMUNITY_Task 3 i18n engine, translation dictionary, language dropdown|Task 3: i18n engine, translation dictionary, language dropdown]]
- [[_COMMUNITY_Task 4 Responsive header (mobile menu, scroll-reveal, active nav)|Task 4: Responsive header (mobile menu, scroll-reveal, active nav)]]
- [[_COMMUNITY_Pendência ativar GitHub Pages (Settings  Pages)|Pendência: ativar GitHub Pages (Settings > Pages)]]
- [[_COMMUNITY_Repositório renomeado para GabrielVianaNunes.github.io|Repositório renomeado para GabrielVianaNunes.github.io]]
- [[_COMMUNITY_devicon (ícones via CDN)|devicon (ícones via CDN)]]
- [[_COMMUNITY_graphify-outGRAPH_REPORT|graphify-out/GRAPH_REPORT.md]]
- [[_COMMUNITY_Mapa do projeto via graphify|Mapa do projeto via graphify]]
- [[_COMMUNITY_Idiomas e tema (README)|Idiomas e tema (README)]]
- [[_COMMUNITY_Seções da página (README)|Seções da página (README)]]
- [[_COMMUNITY_Estrutura do projeto (README)|Estrutura do projeto (README)]]
- [[_COMMUNITY_Rodando localmente (python -m http.server)|Rodando localmente (python -m http.server)]]
- [[_COMMUNITY_Site publicado gabrielviananunes.github.io|Site publicado: gabrielviananunes.github.io]]
- [[_COMMUNITY_assetscssstyles.css|assets/css/styles.css]]

## God Nodes (most connected - your core abstractions)
1. `Portfolio Redesign Implementation Plan` - 14 edges
2. `Estado atual do projeto — Portfólio Gabriel Nunes` - 11 edges
3. `Scroll Storytelling & Motion Implementation Plan` - 11 edges
4. `Portfolio Redesign — Design Spec` - 10 edges
5. `Mobile Effects Implementation Plan` - 9 edges
6. `Gabriel Nunes — Portfolio` - 8 edges
7. `Interactive Effects Implementation Plan` - 8 edges
8. `Mobile Effects Design — Design Spec` - 8 edges
9. `#experiencia timeline section (index.html)` - 8 edges
10. `Scroll Storytelling & Motion Design — Design Spec` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry)` --semantically_similar_to--> `#experiencia timeline section (index.html)`  [AMBIGUOUS] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → index.html
- `ZEISS Industrial Quality Solutions — Engenheiro de software (CV entry)` --semantically_similar_to--> `#experiencia timeline section (index.html)`  [INFERRED] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → index.html
- `Faculdade SENAI Fatesg — Bacharelado Engenharia de Software (CV entry)` --semantically_similar_to--> `#experiencia timeline section (index.html)`  [INFERRED] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → index.html
- `Estagiário Web Development e Metrologia — SENAI Zeiss Centro de Excelência (CV entry)` --semantically_similar_to--> `SENAI Metrology Lab Management System (case study)`  [INFERRED] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → PROJECT_STATUS.md
- `.theme-toggle button (index.html)` --conceptually_related_to--> `assets/js/theme.js`  [INFERRED]
  index.html → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Prontidão para deploy final (URL limpa + GitHub Pages + assets vazios)** — project_status_clean_url, project_status_github_pages_pending, project_status_pending_favicon_og_image [INFERRED 0.85]
- **Cadeia cronológica da timeline de Experience (FIEG -> SENAI ZEISS -> ZEISS Alemanha)** — concept_fieg_internship, concept_senai_zeiss_metrology_internship, concept_zeiss_germany_internship [EXTRACTED 1.00]
- **Bugs de acessibilidade/tema corrigidos na auditoria final** — bug_tags_li_theme, bug_lang_dropdown_keyboard, bug_angular_icon_dark, bug_skills_grid_align [EXTRACTED 1.00]
- **Portfolio redesign 11-task plan sequence** — plan_task1_foundation, plan_task2_theme_toggle, plan_task3_i18n, plan_task4_responsive_nav, plan_task5_hero [EXTRACTED 0.90]

## Communities (45 total, 27 thin omitted)

### Community 0 - "Deploy & Publishing Status"
Cohesion: 0.13
Nodes (14): Ajustes pós-implantação (mesma sessão, direto na `main`), Ajustes pós-merge dos efeitos mobile (2026-07-09, direto na `main`), Bugs encontrados e corrigidos (registro rápido), Decisões de conteúdo (para não repetir perguntas), Estado atual do projeto — Portfólio Gabriel Nunes, Próximos passos, Redesign via plano de 11 tarefas (subagent-driven-development), Sessão de reforma completa (2026-07-06 / 2026-07-07) (+6 more)

### Community 2 - "Experience Timeline & CV"
Cohesion: 0.15
Nodes (15): Gabriel Viana Nunes CV (PDF), Timeline de Experience completada (FIEG + SENAI ZEISS Metrologia), FIEG — Estagiário de Engenharia de Software, SENAI ZEISS Centro de Excelência em Metrologia — estágio, ZEISS Alemanha — estágio internacional (destaque), Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry), Faculdade SENAI Fatesg — Bacharelado Engenharia de Software (CV entry), Estagiário Web Development e Metrologia — SENAI Zeiss Centro de Excelência (CV entry) (+7 more)

### Community 3 - "Core Page Sections"
Cohesion: 0.10
Nodes (20): Bug: URL canônica/og:url apontando para domínio errado, Bug: dropdown de idioma sem suporte a teclado, i18n Engine (PT/EN/DE/ES), Manual Light/Dark Theme Toggle, Responsive Navigation (Hamburger Menu), #contato Contact section (index.html), site-footer (index.html), Inline FOUC guard script (data-theme early set) (+12 more)

### Community 4 - "README Documentation"
Cohesion: 0.22
Nodes (8): Deploy, Estrutura, Gabriel Nunes — Portfolio, Idiomas e tema, Mapa do projeto (graphify), Rodando localmente, Seções da página, Stack

### Community 5 - "Skills Section & Icons"
Cohesion: 0.40
Nodes (5): Bug: grid de Outras competências desalinhado, #habilidades Skills section (index.html), Language proficiency cards (index.html), .skills-icons Other competencies grid (index.html), flag-icons (bandeiras via CDN)

### Community 7 - "i18n Engine Functions"
Cohesion: 0.47
Nodes (3): applyTranslations(), initDropdown(), setLanguage()

### Community 10 - "Theme Toggle Functions"
Cohesion: 0.60
Nodes (3): animateThemeToggle(), applyTheme(), toggleTheme()

### Community 11 - "Redesign Plan & Spec"
Cohesion: 0.13
Nodes (14): Global Constraints, Portfolio Redesign Implementation Plan, Reminder, Task 10: Contact & footer — real data and CV link, Task 11: Final integration, accessibility, and SEO/performance audit, Task 1: Foundation — design tokens, monospace font, CV asset, preview server, Task 2: Manual light/dark theme toggle, Task 3: i18n engine, full translation dictionary, and language dropdown (+6 more)

### Community 16 - "Mobile Effects Design — Design Spec"
Cohesion: 0.15
Nodes (12): 1. Gyroscope tilt on Projects cards, 2. Tap feedback on buttons and Projects cards, 3. Parallax re-enabled on mobile, at reduced intensity, 4. Animated mobile menu, Accessibility & performance, Context: current mobile support (audited before this spec), Features, File changes (+4 more)

### Community 17 - "Scroll Storytelling & Motion Implementation Plan"
Cohesion: 0.17
Nodes (11): Global Constraints, Reminder, Scroll Storytelling & Motion Implementation Plan, Task 1: Foundation — GSAP/ScrollTrigger scripts, module skeleton, progress bar, remove old reveal system, Task 2: Parallax background layers, Task 3: Cascade reveal helper + Hero, Task 4: Cascade — About and Contact, Task 5: Cascade — Skills (categories, soft skills, languages) (+3 more)

### Community 18 - "Scroll Storytelling & Motion Design — Design Spec"
Cohesion: 0.17
Nodes (11): 1. Scroll progress bar, 2. Staggered cascade reveals, 3. Parallax background layers (all major sections), 4. Timeline draw-in (Experience section), Accessibility & performance, Features, File changes, Goal (+3 more)

### Community 19 - "Interactive Effects Design — Design Spec"
Cohesion: 0.17
Nodes (11): 1. Magnetic buttons, 2. 3D card tilt, 3. Theme-toggle transition, 4. Terminal element (Hero), Accessibility & performance, Features, File changes, Goal (+3 more)

### Community 20 - "Portfolio Redesign — Design Spec"
Cohesion: 0.18
Nodes (10): Accessibility, SEO, performance, File changes, Goal, i18n architecture, Information architecture (section order), Non-goals, Portfolio Redesign — Design Spec, Real content to use (+2 more)

### Community 21 - "Mobile Effects Implementation Plan"
Cohesion: 0.20
Nodes (9): Global Constraints, Mobile Effects Implementation Plan, Reminder, Task 1: Hamburger icon morph (CSS only), Task 2: Menu item cascade on open, Task 3: Tap feedback on buttons and Projects cards, Task 4: Mobile parallax at reduced intensity, Task 5: Gyroscope tilt on Projects cards (+1 more)

### Community 22 - "Interactive Effects Implementation Plan"
Cohesion: 0.22
Nodes (8): Global Constraints, Interactive Effects Implementation Plan, Reminder, Task 1: Magnetic buttons, Task 2: 3D card tilt, Task 3: Theme-toggle circle-reveal transition, Task 4: Terminal element in Hero, Task 5: Final audit — reduced motion, touch guard, full regression

## Ambiguous Edges - Review These
- `Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry)` → `#experiencia timeline section (index.html)`  [AMBIGUOUS]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf · relation: semantically_similar_to

## Knowledge Gaps
- **128 isolated node(s):** `Próximos passos`, `Status atual (resumo)`, `Redesign via plano de 11 tarefas (subagent-driven-development)`, `Ajustes pós-implantação (mesma sessão, direto na `main`)`, `Timeline de Experience completada (a partir do CV real)` (+123 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry)` and `#experiencia timeline section (index.html)`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `#experiencia timeline section (index.html)` connect `Experience Timeline & CV` to `Core Page Sections`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `#habilidades Skills section (index.html)` connect `Skills Section & Icons` to `Core Page Sections`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `Próximos passos`, `Status atual (resumo)`, `Redesign via plano de 11 tarefas (subagent-driven-development)` to the rest of the system?**
  _141 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Deploy & Publishing Status` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Core Page Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Redesign Plan & Spec` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._