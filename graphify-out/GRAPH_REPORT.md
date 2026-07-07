# Graph Report - .  (2026-07-06)

## Corpus Check
- Corpus is ~19,307 words - fits in a single context window. You may not need a graph.

## Summary
- 57 nodes · 52 edges · 15 communities (6 shown, 9 thin omitted)
- Extraction: 79% EXTRACTED · 17% INFERRED · 4% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.83)
- Token cost: 225,634 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Header Controls & UI Bugs|Header Controls & UI Bugs]]
- [[_COMMUNITY_Experience & CV Background|Experience & CV Background]]
- [[_COMMUNITY_Site Docs & Bug Fixes|Site Docs & Bug Fixes]]
- [[_COMMUNITY_i18n Engine Functions|i18n Engine Functions]]
- [[_COMMUNITY_Project Docs & Projects Section|Project Docs & Projects Section]]
- [[_COMMUNITY_Theme Toggle Functions|Theme Toggle Functions]]
- [[_COMMUNITY_i18n Architecture Concept|i18n Architecture Concept]]
- [[_COMMUNITY_Theme Toggle Concept|Theme Toggle Concept]]
- [[_COMMUNITY_Subagent Workflow & Worktree|Subagent Workflow & Worktree]]
- [[_COMMUNITY_Site Favicon|Site Favicon]]
- [[_COMMUNITY_OG Image (Empty File)|OG Image (Empty File)]]
- [[_COMMUNITY_Profile Photo|Profile Photo]]
- [[_COMMUNITY_Responsive Navigation Concept|Responsive Navigation Concept]]
- [[_COMMUNITY_Visual Design System|Visual Design System]]

## God Nodes (most connected - your core abstractions)
1. `Gabriel Viana Nunes CV (PDF)` - 5 edges
2. `Task 2: Manual light/dark theme toggle` - 4 edges
3. `#experiencia timeline section (index.html)` - 4 edges
4. `setLanguage()` - 3 edges
5. `SENAI Metrology Lab Management System (case study)` - 3 edges
6. `Task 3: i18n engine, translation dictionary, language dropdown` - 3 edges
7. `Task 4: Responsive header (mobile menu, scroll-reveal, active nav)` - 3 edges
8. `Task 5: Hero section rewrite` - 3 edges
9. `.theme-toggle button (index.html)` - 3 edges
10. `applyTranslations()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry)` --semantically_similar_to--> `#experiencia timeline section (index.html)`  [AMBIGUOUS] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → index.html
- `Estagiário Web Development e Metrologia — SENAI Zeiss Centro de Excelência (CV entry)` --semantically_similar_to--> `SENAI Metrology Lab Management System (case study)`  [INFERRED] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → PROJECT_STATUS.md
- `Faculdade SENAI Fatesg — Bacharelado Engenharia de Software (CV entry)` --semantically_similar_to--> `#experiencia timeline section (index.html)`  [INFERRED] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → index.html
- `ZEISS Industrial Quality Solutions — Engenheiro de software (CV entry)` --semantically_similar_to--> `#experiencia timeline section (index.html)`  [INFERRED] [semantically similar]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf → index.html
- `Task 1: Foundation (design tokens, mono font, CV asset, preview server)` --references--> `Gabriel Viana Nunes CV (PDF)`  [EXTRACTED]
  docs/superpowers/plans/2026-07-06-portfolio-redesign.md → assets/cv/Gabriel-Viana-Nunes-CV.pdf

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Nav controls group: theme toggle + language dropdown + hamburger menu** — index_theme_toggle_button, index_lang_switcher, index_nav_toggle [EXTRACTED 0.90]
- **Portfolio redesign 11-task plan sequence** — plan_task1_foundation, plan_task2_theme_toggle, plan_task3_i18n, plan_task4_responsive_nav, plan_task5_hero [EXTRACTED 0.90]
- **Post-audit accessibility and visual bug fixes** — bug_tags_li_theme, bug_lang_dropdown_keyboard, bug_angular_icon_dark, bug_skills_grid_align, bug_canonical_url [EXTRACTED 0.85]

## Communities (15 total, 9 thin omitted)

### Community 0 - "Header Controls & UI Bugs"
Cohesion: 0.22
Nodes (11): Bug: dropdown de idioma sem suporte a teclado, Bug: .tags li preso em prefers-color-scheme, Accessibility, SEO, Performance requirements, .lang-switcher dropdown (index.html), .nav-toggle hamburger button (index.html), .theme-toggle button (index.html), Task 1: Foundation (design tokens, mono font, CV asset, preview server), Task 2: Manual light/dark theme toggle (+3 more)

### Community 1 - "Experience & CV Background"
Cohesion: 0.36
Nodes (8): Gabriel Viana Nunes CV (PDF), Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry), Faculdade SENAI Fatesg — Bacharelado Engenharia de Software (CV entry), Estagiário Web Development e Metrologia — SENAI Zeiss Centro de Excelência (CV entry), ZEISS Industrial Quality Solutions — Engenheiro de software (CV entry), Information Architecture (ordem de seções), #experiencia timeline section (index.html), SENAI Metrology Lab Management System (case study)

### Community 2 - "Site Docs & Bug Fixes"
Cohesion: 0.29
Nodes (5): Bug: ícone Angular invisível no tema claro, Bug: URL canônica/og:url apontando para domínio errado, Bug: grid de Outras competências desalinhado, Mapa do projeto via graphify, Stack técnica do portfólio

### Community 3 - "i18n Engine Functions"
Cohesion: 0.47
Nodes (3): applyTranslations(), initDropdown(), setLanguage()

### Community 4 - "Project Docs & Projects Section"
Cohesion: 0.33
Nodes (5): Design Spec Goal: portfólio multilíngue premium minimalista, Portfolio Redesign Implementation Plan, Portfolio Redesign Design Spec, #projetos case studies section (index.html), Ultralino (robô Python + Playwright)

## Ambiguous Edges - Review These
- `Task 4: Responsive header (mobile menu, scroll-reveal, active nav)` → `Task 5: Hero section rewrite`  [AMBIGUOUS]
  docs/superpowers/plans/2026-07-06-portfolio-redesign.md · relation: references
- `#experiencia timeline section (index.html)` → `Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry)`  [AMBIGUOUS]
  assets/cv/Gabriel-Viana-Nunes-CV.pdf · relation: semantically_similar_to

## Knowledge Gaps
- **14 isolated node(s):** `Portfolio Redesign Design Spec`, `Manual Light/Dark Theme Toggle`, `i18n Engine (PT/EN/DE/ES)`, `Responsive Navigation (Hamburger Menu)`, `Worktree .worktrees/portfolio-redesign` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Task 4: Responsive header (mobile menu, scroll-reveal, active nav)` and `Task 5: Hero section rewrite`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `#experiencia timeline section (index.html)` and `Federação das Indústrias do Estado de Goiás — Estagiário de engenharia de software (CV entry)`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `Gabriel Viana Nunes CV (PDF)` connect `Experience & CV Background` to `Header Controls & UI Bugs`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `Task 1: Foundation (design tokens, mono font, CV asset, preview server)` connect `Header Controls & UI Bugs` to `Experience & CV Background`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `#experiencia timeline section (index.html)` (e.g. with `Faculdade SENAI Fatesg — Bacharelado Engenharia de Software (CV entry)` and `ZEISS Industrial Quality Solutions — Engenheiro de software (CV entry)`) actually correct?**
  _`#experiencia timeline section (index.html)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Portfolio Redesign Design Spec`, `Subagent-Driven Development Workflow`, `Manual Light/Dark Theme Toggle` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._