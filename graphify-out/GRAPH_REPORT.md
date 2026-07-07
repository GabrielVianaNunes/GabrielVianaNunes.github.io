# Graph Report - .  (2026-07-07)

## Corpus Check
- 4 files · ~20,104 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 90 nodes · 127 edges · 16 communities (10 shown, 6 thin omitted)
- Extraction: 87% EXTRACTED · 11% INFERRED · 2% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.82)
- Token cost: 73,815 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `#experiencia timeline section (index.html)` - 9 edges
2. `Estrutura do projeto (README)` - 6 edges
3. `Gabriel Viana Nunes CV (PDF)` - 5 edges
4. `Manual Light/Dark Theme Toggle` - 5 edges
5. `SENAI Metrology Lab Management System (case study)` - 5 edges
6. `URL final limpa: gabrielviananunes.github.io` - 5 edges
7. `.theme-toggle button (index.html)` - 5 edges
8. `.lang-switcher dropdown (index.html)` - 5 edges
9. `Task 2: Manual light/dark theme toggle` - 4 edges
10. `i18n Engine (PT/EN/DE/ES)` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry)` --semantically_similar_to--> `#experiencia timeline section (index.html)`  [AMBIGUOUS] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → index.html
- `ZEISS Industrial Quality Solutions — Engenheiro de software (CV entry)` --semantically_similar_to--> `#experiencia timeline section (index.html)`  [INFERRED] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → index.html
- `Estagiário Web Development e Metrologia — SENAI Zeiss Centro de Excelência (CV entry)` --semantically_similar_to--> `SENAI Metrology Lab Management System (case study)`  [INFERRED] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → PROJECT_STATUS.md
- `Faculdade SENAI Fatesg — Bacharelado Engenharia de Software (CV entry)` --semantically_similar_to--> `#experiencia timeline section (index.html)`  [INFERRED] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → index.html
- `Task 1: Foundation (design tokens, mono font, CV asset, preview server)` --references--> `Gabriel Viana Nunes CV (PDF)`  [EXTRACTED]
  docs/superpowers/plans/2026-07-06-portfolio-redesign.md → assets/cv/Gabriel-Viana-Nunes-CV.pdf

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Prontidão para deploy final (URL limpa + GitHub Pages + assets vazios)** — project_status_clean_url, project_status_github_pages_pending, project_status_pending_favicon_og_image [INFERRED 0.85]
- **Cadeia cronológica da timeline de Experience (FIEG -> SENAI ZEISS -> ZEISS Alemanha)** — concept_fieg_internship, concept_senai_zeiss_metrology_internship, concept_zeiss_germany_internship [EXTRACTED 1.00]
- **Bugs de acessibilidade/tema corrigidos na auditoria final** — bug_tags_li_theme, bug_lang_dropdown_keyboard, bug_angular_icon_dark, bug_skills_grid_align [EXTRACTED 1.00]
- **Portfolio redesign 11-task plan sequence** — plan_task1_foundation, plan_task2_theme_toggle, plan_task3_i18n, plan_task4_responsive_nav, plan_task5_hero [EXTRACTED 0.90]

## Communities (16 total, 6 thin omitted)

### Community 0 - "Deploy & Publishing Status"
Cohesion: 0.23
Nodes (12): Bug: ícone Angular invisível no tema claro, Bug: URL canônica/og:url apontando para domínio errado, Subagent-Driven Development Workflow, Worktree .worktrees/portfolio-redesign, Design Spec Goal: portfólio multilíngue premium minimalista, <head> meta/OG/canonical tags (index.html), URL final limpa: gabrielviananunes.github.io, Pendência: ativar GitHub Pages (Settings > Pages) (+4 more)

### Community 1 - "Theme Toggle & Redesign Tasks"
Cohesion: 0.22
Nodes (11): Bug: .tags li preso em prefers-color-scheme, Manual Light/Dark Theme Toggle, Theme Architecture (spec), Inline FOUC guard script (data-theme early set), .theme-toggle button (index.html), Task 1: Foundation (design tokens, mono font, CV asset, preview server), Task 2: Manual light/dark theme toggle, Task 3: i18n engine, translation dictionary, language dropdown (+3 more)

### Community 2 - "Experience Timeline & CV"
Cohesion: 0.39
Nodes (9): Gabriel Viana Nunes CV (PDF), Timeline de Experience completada (FIEG + SENAI ZEISS Metrologia), FIEG — Estagiário de Engenharia de Software, SENAI ZEISS Centro de Excelência em Metrologia — estágio, ZEISS Alemanha — estágio internacional (destaque), Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry), Faculdade SENAI Fatesg — Bacharelado Engenharia de Software (CV entry), ZEISS Industrial Quality Solutions — Engenheiro de software (CV entry) (+1 more)

### Community 3 - "Core Page Sections"
Cohesion: 0.22
Nodes (8): Responsive Navigation (Hamburger Menu), #contato Contact section (index.html), site-footer (index.html), .hero section (index.html), .nav-toggle hamburger button (index.html), #sobre About section (index.html), Pendência: trocar assets/img/profile.jpg por foto profissional, assets/js/main.js

### Community 4 - "README Documentation"
Cohesion: 0.25
Nodes (8): graphify-out/GRAPH_REPORT.md, Mapa do projeto via graphify, assets/js/i18n.js, Idiomas e tema (README), Seções da página (README), Estrutura do projeto (README), Rodando localmente (python -m http.server), assets/css/styles.css

### Community 5 - "Skills Section & Icons"
Cohesion: 0.29
Nodes (7): Bug: grid de Outras competências desalinhado, #habilidades Skills section (index.html), Language proficiency cards (index.html), .skills-icons Other competencies grid (index.html), devicon (ícones via CDN), flag-icons (bandeiras via CDN), Stack técnica do portfólio

### Community 6 - "Projects Case Studies"
Cohesion: 0.33
Nodes (7): Estagiário Web Development e Metrologia — SENAI Zeiss Centro de Excelência (CV entry), Information Architecture (ordem de seções), #projetos case studies section (index.html), Metrology Lab Management System case-study article (index.html), Ultralino card in Projects (index.html), SENAI Metrology Lab Management System (case study), Ultralino (robô Python + Playwright)

### Community 7 - "i18n Engine Functions"
Cohesion: 0.47
Nodes (3): applyTranslations(), initDropdown(), setLanguage()

### Community 8 - "i18n Architecture & Accessibility"
Cohesion: 0.50
Nodes (5): Bug: dropdown de idioma sem suporte a teclado, i18n Engine (PT/EN/DE/ES), Accessibility, SEO, Performance requirements, i18n Architecture (spec), .lang-switcher dropdown (index.html)

## Ambiguous Edges - Review These
- `Task 4: Responsive header (mobile menu, scroll-reveal, active nav)` → `Task 5: Hero section rewrite`  [AMBIGUOUS]
  docs/superpowers/plans/2026-07-06-portfolio-redesign.md · relation: references
- `Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry)` → `#experiencia timeline section (index.html)`  [AMBIGUOUS]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf · relation: semantically_similar_to

## Knowledge Gaps
- **16 isolated node(s):** `Portfolio Redesign Implementation Plan`, `Portfolio Redesign Design Spec`, `Visual Design System (accent azul, tipografia, tema)`, `i18n Architecture (spec)`, `Theme Architecture (spec)` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Task 4: Responsive header (mobile menu, scroll-reveal, active nav)` and `Task 5: Hero section rewrite`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry)` and `#experiencia timeline section (index.html)`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `#experiencia timeline section (index.html)` connect `Experience Timeline & CV` to `Core Page Sections`, `Projects Case Studies`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `.theme-toggle button (index.html)` connect `Theme Toggle & Redesign Tasks` to `Core Page Sections`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `Estrutura do projeto (README)` connect `README Documentation` to `Theme Toggle & Redesign Tasks`, `Core Page Sections`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `#experiencia timeline section (index.html)` (e.g. with `Faculdade SENAI Fatesg — Bacharelado Engenharia de Software (CV entry)` and `ZEISS Industrial Quality Solutions — Engenheiro de software (CV entry)`) actually correct?**
  _`#experiencia timeline section (index.html)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `SENAI Metrology Lab Management System (case study)` (e.g. with `Estagiário Web Development e Metrologia — SENAI Zeiss Centro de Excelência (CV entry)` and `Ultralino (robô Python + Playwright)`) actually correct?**
  _`SENAI Metrology Lab Management System (case study)` has 2 INFERRED edges - model-reasoned connections that need verification._