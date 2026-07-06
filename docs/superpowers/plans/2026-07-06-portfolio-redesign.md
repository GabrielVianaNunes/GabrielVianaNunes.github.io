# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `index.html` / `assets/css/styles.css` and add three vanilla JS modules so the portfolio gets a manual light/dark theme, PT/EN/DE/ES translations, a new Experience section spotlighting the ZEISS internship, project case studies, and real contact/CV data — all without introducing a build step.

**Architecture:** Single-page static site (no framework, no bundler). Three independent, self-initializing JS modules (`theme.js`, `i18n.js`, `main.js`) attach behavior via `data-*` attribute contracts on plain HTML; CSS custom properties drive theming. Each task is verified by loading the page in a real browser (via the Preview tool, backed by `python -m http.server`) and asserting on DOM/console/network state — there is no unit test runner in this project, and adding one would be scope creep for a static HTML/CSS/JS site, so browser-driven checks are this project's test cycle.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS (ES2017, no modules/bundler), Google Fonts (Inter + JetBrains Mono), devicon + flag-icons CDN (already in use).

## Global Constraints

- No build tools, bundlers, or frameworks — plain HTML/CSS/JS only, deployable as static files on GitHub Pages.
- `<html lang="en">` and the raw HTML text stay the source-of-truth English content (SEO/crawler baseline); i18n only swaps the rendered DOM at runtime.
- All new interactive UI (theme toggle, language dropdown, mobile menu) must be keyboard-operable and screen-reader friendly.
- Real contact data only: email `gabrielnunes.service@gmail.com`, LinkedIn `https://www.linkedin.com/in/gabriel-nunes-b8820a254`, GitHub `https://github.com/GabrielVianaNunes` (all project repo links use this user).
- No repo link for the SENAI Metrology Lab case study (none exists).
- ZEISS content stays high-level/generic — no confidential internal system details.
- Respect the existing `@media (prefers-reduced-motion: reduce)` block in `styles.css` — new animations must not fight it.
- Do not `git push` at any point in this plan — commits are local only until the user explicitly approves publishing.

---

## Task 1: Foundation — design tokens, monospace font, CV asset, preview server

**Files:**
- Modify: `assets/css/styles.css:18-38` and `assets/css/styles.css:371-393` (duplicate `:root` / dark-mode token blocks)
- Modify: `index.html:16-18` (font links)
- Create: `assets/cv/Gabriel-Viana-Nunes-CV.pdf`
- Create: `.claude/launch.json`

**Interfaces:**
- Produces: CSS custom property `--mono` (monospace font stack) available to all later tasks; `assets/cv/Gabriel-Viana-Nunes-CV.pdf` file path used by Task 5 and Task 10; a `portfolio` preview server config used by every later task's verification steps.

- [ ] **Step 1: Consolidate the duplicated design-token blocks**

`assets/css/styles.css` currently defines `:root { ... }` and
`@media (prefers-color-scheme: dark) { :root { ... } }` twice (once near the
top, identically again near line 371). Replace **both** occurrences with a
single, merged set of tokens (delete the second `:root`/dark-media block
entirely, lines 371-393, and replace the first block, lines 18-38, with
this):

```css
:root {
    --bg: #ffffff;
    --text: #111827;
    --muted: #6b7280;
    --surface: #f3f4f6;
    --border: #e5e7eb;
    --primary: #3b82f6;
    --ring: #93c5fd;
    --accent: var(--primary);
    --mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg: #0b0f19;
        --text: #e5e7eb;
        --muted: #9ca3af;
        --surface: #111827;
        --border: #1f2937;
        --primary: #60a5fa;
        --ring: #1d4ed8;
        --accent: var(--primary);
    }
}
```

(Task 2 will change the dark-mode trigger from this media query to a
`data-theme` attribute — this step only removes the duplication and adds
`--mono` and a brighter `--primary`/`--ring` pair, with no behavior change
yet.)

- [ ] **Step 2: Add the JetBrains Mono font link**

In `index.html`, right after the existing Inter font `<link>` (line 18),
add:

```html
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```

- [ ] **Step 3: Copy the CV into the repo**

```bash
mkdir -p "C:\Users\gabri\OneDrive\Área de Trabalho\Developer\portifolio-gabriel\assets\cv"
cp "C:\Users\gabri\OneDrive\Área de Trabalho\Gabriel-Docs\Documentos_Tarefas\Currículos\Currículo Gabriel Viana Nunes.pdf" "C:\Users\gabri\OneDrive\Área de Trabalho\Developer\portifolio-gabriel\assets\cv\Gabriel-Viana-Nunes-CV.pdf"
```

- [ ] **Step 4: Create the preview server config**

Create `.claude/launch.json` in the portfolio repo root:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "portfolio",
      "runtimeExecutable": "python",
      "runtimeArgs": ["-m", "http.server", "8080"],
      "port": 8080
    }
  ]
}
```

- [ ] **Step 5: Verify — start the server and check nothing broke**

Start the `portfolio` preview server (Preview tool → start server named
`portfolio`). Then:
- Take a screenshot: page should look visually identical to before (same
  layout, slightly more saturated blue accent is acceptable/expected).
- Check console logs (errors only): must be empty.
- Check network requests: request for
  `assets/cv/Gabriel-Viana-Nunes-CV.pdf` (navigate the browser tab to that
  URL directly, or check via `preview_network` after adding a temporary
  link — simplest is confirming the file is served with status 200 by
  requesting `http://localhost:8080/assets/cv/Gabriel-Viana-Nunes-CV.pdf`).

Expected: screenshot unchanged, zero console errors, CV file returns 200.

- [ ] **Step 6: Commit**

```bash
git add assets/css/styles.css index.html assets/cv/Gabriel-Viana-Nunes-CV.pdf .claude/launch.json
git commit -m "Consolida tokens de tema, adiciona fonte mono e asset do CV"
```

---

## Task 2: Manual light/dark theme toggle

**Files:**
- Modify: `index.html` (head: inline FOUC-prevention script + dynamic `theme-color` meta; nav: add `.nav-controls` wrapper with the toggle button; body end: load `theme.js`)
- Modify: `assets/css/styles.css` (switch dark tokens from media query to `[data-theme="dark"]`; add `.theme-toggle` styles)
- Create: `assets/js/theme.js`

**Interfaces:**
- Consumes: `--mono`, `--primary`, `--ring` tokens from Task 1.
- Produces: `window.themeModule = { getPreferredTheme(), applyTheme(theme), toggleTheme() }` (pure-ish, callable from the browser console for verification); `html[data-theme]` attribute that Task 3+ CSS can also key off if needed; `.nav-controls` wrapper div in the header that Task 3 (language dropdown) and Task 4 (hamburger) will insert into.

- [ ] **Step 1: Switch the dark tokens to `data-theme` instead of the media query**

In `assets/css/styles.css`, replace the `@media (prefers-color-scheme: dark) { :root { ... } }` block written in Task 1 with an attribute selector:

```css
html[data-theme="dark"] {
    --bg: #0b0f19;
    --text: #e5e7eb;
    --muted: #9ca3af;
    --surface: #111827;
    --border: #1f2937;
    --primary: #60a5fa;
    --ring: #1d4ed8;
    --accent: var(--primary);
}
```

- [ ] **Step 2: Add the theme toggle button styles**

Append to `assets/css/styles.css`:

```css
.nav-controls {
    display: flex;
    align-items: center;
    gap: .5rem;
}

.theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: .625rem;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text);
    cursor: pointer;
}

.theme-toggle:hover {
    background: var(--surface);
}

.theme-toggle:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
}

.theme-toggle svg {
    width: 1.1rem;
    height: 1.1rem;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.theme-toggle .icon-sun {
    display: none;
}

html[data-theme="dark"] .theme-toggle .icon-sun {
    display: inline;
}

html[data-theme="dark"] .theme-toggle .icon-moon {
    display: none;
}
```

- [ ] **Step 3: Add the FOUC-prevention script and dynamic theme-color meta to `index.html`**

Replace the two static `theme-color` meta tags (lines 12-14):

```html
    <!-- Theme colors for light/dark -->
    <meta name="theme-color" content="#ffffff" data-dynamic>

    <script>
      (function () {
        var stored = localStorage.getItem('site-theme');
        var theme = (stored === 'light' || stored === 'dark')
          ? stored
          : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
      })();
    </script>
```

- [ ] **Step 4: Add the toggle button and `.nav-controls` wrapper to the header**

In `index.html`, inside `<nav class="nav container" aria-label="main">`,
right after the closing `</ul>` of `.menu`, add:

```html
            <div class="nav-controls">
                <button type="button" class="theme-toggle" aria-label="Switch to dark mode">
                    <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="4"></circle>
                        <line x1="12" y1="2" x2="12" y2="4"></line>
                        <line x1="12" y1="20" x2="12" y2="22"></line>
                        <line x1="4.2" y1="4.2" x2="5.6" y2="5.6"></line>
                        <line x1="18.4" y1="18.4" x2="19.8" y2="19.8"></line>
                        <line x1="2" y1="12" x2="4" y2="12"></line>
                        <line x1="20" y1="12" x2="22" y2="12"></line>
                        <line x1="4.2" y1="19.8" x2="5.6" y2="18.4"></line>
                        <line x1="18.4" y1="5.6" x2="19.8" y2="4.2"></line>
                    </svg>
                    <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path>
                    </svg>
                </button>
            </div>
```

- [ ] **Step 5: Create `assets/js/theme.js`**

```js
(function () {
    var STORAGE_KEY = 'site-theme';
    var root = document.documentElement;

    function getPreferredTheme() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        var meta = document.querySelector('meta[name="theme-color"][data-dynamic]');
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b0f19' : '#ffffff');
        var btn = document.querySelector('.theme-toggle');
        if (btn) {
            var label = window.i18n
                ? window.i18n.t(theme === 'dark' ? 'theme.toLight' : 'theme.toDark')
                : (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            btn.setAttribute('aria-label', label);
        }
    }

    function toggleTheme() {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    }

    document.addEventListener('DOMContentLoaded', function () {
        applyTheme(getPreferredTheme());
        var btn = document.querySelector('.theme-toggle');
        if (btn) btn.addEventListener('click', toggleTheme);
    });

    window.themeModule = {
        getPreferredTheme: getPreferredTheme,
        applyTheme: applyTheme,
        toggleTheme: toggleTheme
    };
})();
```

- [ ] **Step 6: Load `theme.js` from `index.html`**

Right before the closing `</body>` tag, add:

```html
    <script src="assets/js/theme.js" defer></script>
```

- [ ] **Step 7: Verify in the browser**

Restart/reload the `portfolio` preview server tab. Run these checks:
- `preview_eval`: `localStorage.clear(); location.reload()` — after reload,
  run `document.documentElement.getAttribute('data-theme')`. Expected:
  matches the OS/browser color scheme (in this sandboxed browser, default
  is `"light"`).
- `preview_click` on `.theme-toggle`. Expected: `data-theme` flips to
  `"dark"`, background/text colors visibly invert (screenshot to confirm),
  and `preview_eval` of `localStorage.getItem('site-theme')` returns
  `"dark"`.
- Reload the page (`preview_eval`: `location.reload()`). Expected:
  `data-theme` is still `"dark"` (persisted).
- Click `.theme-toggle` again, confirm it flips back to `"light"` and
  persists.
- Check console logs (errors only): must be empty.

- [ ] **Step 8: Commit**

```bash
git add index.html assets/css/styles.css assets/js/theme.js
git commit -m "Adiciona alternância manual de tema claro/escuro com persistência"
```

---

## Task 3: i18n engine, full translation dictionary, and language dropdown

**Files:**
- Modify: `index.html` (nav links get `data-i18n`; skip-link gets `data-i18n`; add language dropdown markup inside `.nav-controls`; load `i18n.js`)
- Modify: `assets/css/styles.css` (dropdown styles)
- Create: `assets/js/i18n.js`

**Interfaces:**
- Consumes: `.nav-controls` wrapper from Task 2.
- Produces: `window.i18n = { resolveLanguage(stored, browserLang), setLanguage(lang, persist), t(key), SUPPORTED }`; the `data-i18n="key"` / `data-i18n-attr="attr:key,attr2:key2"` attribute contract that every later task (5-10) uses; the **complete** translation dictionary (all keys used anywhere in this plan) — later tasks only add `data-i18n` attributes referencing these existing keys, they do not add new dictionary entries.

- [ ] **Step 1: Create `assets/js/i18n.js` with the full dictionary and engine**

```js
(function () {
    var STORAGE_KEY = 'site-lang';
    var SUPPORTED = ['pt', 'en', 'de', 'es'];
    var FLAGS = { pt: 'fi-br', en: 'fi-us', de: 'fi-de', es: 'fi-es' };
    var NAMES = { pt: 'Português', en: 'English', de: 'Deutsch', es: 'Español' };

    var dict = {
        en: {
            'nav.about': 'About',
            'nav.experience': 'Experience',
            'nav.skills': 'Skills',
            'nav.projects': 'Projects',
            'nav.contact': 'Contact',
            'nav.menuToggle': 'Open menu',
            'skip.link': 'Skip to content',
            'theme.toLight': 'Switch to light mode',
            'theme.toDark': 'Switch to dark mode',
            'langSwitcher.aria': 'Change language',
            'hero.badge': 'Ex-intern at ZEISS · Germany',
            'hero.headline': 'Full-Stack Software Engineer building clean, scalable products.',
            'hero.lead': 'Java & Spring Boot, Angular & TypeScript, PostgreSQL — from data modeling to deployment. Final-year Software Engineering student, with 6 months of international experience at ZEISS in Germany.',
            'hero.location': '📍 Goiânia, Brazil — open to remote & international opportunities',
            'hero.cta.projects': 'See projects',
            'hero.cta.cv': 'Download CV',
            'about.title': 'About me',
            'about.p1': "I'm a final-year Software Engineering student (SENAI FATESG, Goiânia) and full-stack developer who enjoys turning real problems into working software — from the database schema to the interface people actually use.",
            'about.p2': 'My biggest step so far was a 6-month international internship at ZEISS, in Germany, working as a full-stack developer inside a multicultural corporate team. It gave me first-hand exposure to enterprise-grade development, agile practices, and international communication.',
            'about.p3': "Outside of web development, I build automations and integrations that remove manual work from teams' day-to-day, and I keep exploring Python for data and automation projects. I care about clean code, sensible architecture, and interfaces that feel effortless to use.",
            'experience.title': 'Experience',
            'experience.senai.role': 'Software Engineering — SENAI FATESG',
            'experience.senai.period': '2023 — Expected late 2026',
            'experience.senai.desc': 'Undergraduate degree in Software Engineering, covering full-stack development, databases, software architecture and design patterns, and agile methodologies.',
            'experience.zeiss.role': 'Full-Stack Developer Intern — ZEISS (Germany)',
            'experience.zeiss.period': 'Oct 2025 — Apr 2026 · 6 months',
            'experience.zeiss.desc': 'International internship at ZEISS in Germany, developing internal full-stack applications within a multicultural corporate team — from requirements gathering to implementation, testing and maintenance. First-hand exposure to enterprise software practices and agile methodologies in a global company.',
            'skills.hardTitle': 'Hard Skills',
            'skills.softTitle': 'Soft Skills',
            'skills.langTitle': 'Languages',
            'skills.cat.backend': 'Backend',
            'skills.cat.frontend': 'Frontend',
            'skills.cat.database': 'Database',
            'skills.cat.tools': 'Tools',
            'skills.cat.other': 'Other competencies',
            'skills.backend.auth': 'Authentication',
            'skills.backend.restapi': 'REST APIs',
            'skills.frontend.responsive': 'Responsive UI',
            'skills.db.modeling': 'Data modeling',
            'skills.other.fullstack': 'Full-stack development',
            'skills.other.automation': 'Process automation',
            'skills.other.integration': 'Systems integration',
            'skills.other.architecture': 'Software architecture',
            'skills.other.patterns': 'Design patterns (Factory, Decorator, Observer, Template Method)',
            'skills.other.dsa': 'Data structures & algorithms',
            'skills.other.metrology': 'Optical metrology',
            'skills.soft.written': 'Written communication',
            'skills.soft.critical': 'Critical thinking',
            'skills.soft.problem': 'Problem solving',
            'skills.soft.oral': 'Oral communication & presentation',
            'skills.soft.adapt': 'Adaptability',
            'skills.soft.agile': 'Agile methodologies',
            'skills.soft.team': 'Team collaboration',
            'lang.level.native': 'Native',
            'lang.level.fluent': 'Fluent',
            'lang.level.advanced': 'Advanced',
            'lang.level.intermediate': 'Intermediate (A2)',
            'projects.title': 'Projects',
            'projects.senai.badge': 'Featured case',
            'projects.senai.title': 'Metrology Lab Management System',
            'projects.senai.problem': "SENAI's metrology lab needed a single system to manage users, permissions, and service orders instead of relying on manual spreadsheets and paperwork.",
            'projects.senai.solution': 'Built a full management system with role-based permission hierarchy, service-order (OS) workflow, and automatic PDF report generation, backed by a Spring Boot API and PostgreSQL database.',
            'projects.senai.impact': "Digitized the lab's operational workflow end-to-end, from data modeling to backend implementation.",
            'projects.labelProblem': 'Problem',
            'projects.labelSolution': 'Solution',
            'projects.labelImpact': 'Impact',
            'projects.library.title': 'Library System',
            'projects.library.desc': 'Full CRUD system with Spring Boot, JPA and Swagger documentation. Built with a clean, RESTful API ready for a future Angular front-end.',
            'projects.agenda.title': 'Contacts Agenda',
            'projects.agenda.desc': 'Angular 17 SPA with full CRUD, search filters and a reusable, responsive component structure built on PrimeNG.',
            'projects.rental.title': 'Vehicle Rental API',
            'projects.rental.desc': 'REST API modeling real rental business rules with JPA, fully documented and ready to plug into any front-end.',
            'contact.title': 'Contact',
            'contact.lead': "Open to opportunities and collaborations — let's talk.",
            'footer.text': '© 2026 Gabriel Nunes · Goiânia, Brazil'
        },
        pt: {
            'nav.about': 'Sobre',
            'nav.experience': 'Experiência',
            'nav.skills': 'Habilidades',
            'nav.projects': 'Projetos',
            'nav.contact': 'Contato',
            'nav.menuToggle': 'Abrir menu',
            'skip.link': 'Pular para o conteúdo',
            'theme.toLight': 'Mudar para tema claro',
            'theme.toDark': 'Mudar para tema escuro',
            'langSwitcher.aria': 'Mudar idioma',
            'hero.badge': 'Ex-estagiário na ZEISS · Alemanha',
            'hero.headline': 'Engenheiro de Software Full Stack construindo produtos limpos e escaláveis.',
            'hero.lead': 'Java & Spring Boot, Angular & TypeScript, PostgreSQL — da modelagem do banco até o deploy. Estudante do último período de Engenharia de Software, com 6 meses de experiência internacional na ZEISS, na Alemanha.',
            'hero.location': '📍 Goiânia, Brasil — aberto a oportunidades remotas e internacionais',
            'hero.cta.projects': 'Ver projetos',
            'hero.cta.cv': 'Baixar currículo',
            'about.title': 'Sobre mim',
            'about.p1': 'Sou estudante do último período de Engenharia de Software (SENAI FATESG, Goiânia) e desenvolvedor full stack, apaixonado por transformar problemas reais em software funcional — desde a modelagem do banco de dados até a interface que as pessoas realmente usam.',
            'about.p2': 'Meu maior passo até agora foi um estágio internacional de 6 meses na ZEISS, na Alemanha, atuando como desenvolvedor full stack em uma equipe corporativa multicultural. Essa experiência me deu contato direto com desenvolvimento em nível corporativo, práticas ágeis e comunicação internacional.',
            'about.p3': 'Além do desenvolvimento web, também crio automações e integrações que tiram trabalho manual do dia a dia das equipes, e continuo explorando Python em projetos de dados e automação. Prezo por código limpo, arquitetura bem pensada e interfaces que parecem simples de usar.',
            'experience.title': 'Experiência',
            'experience.senai.role': 'Engenharia de Software — SENAI FATESG',
            'experience.senai.period': '2023 — Previsão: final de 2026',
            'experience.senai.desc': 'Graduação em Engenharia de Software, com foco em desenvolvimento full stack, bancos de dados, arquitetura de software, design patterns e metodologias ágeis.',
            'experience.zeiss.role': 'Estagiário Full Stack — ZEISS (Alemanha)',
            'experience.zeiss.period': 'Out/2025 — Abr/2026 · 6 meses',
            'experience.zeiss.desc': 'Estágio internacional na ZEISS, na Alemanha, desenvolvendo aplicações full stack internas dentro de uma equipe corporativa multicultural — do levantamento de requisitos à implementação, testes e manutenção. Contato direto com práticas de engenharia de software e metodologias ágeis em uma empresa global.',
            'skills.hardTitle': 'Competências Técnicas',
            'skills.softTitle': 'Competências Comportamentais',
            'skills.langTitle': 'Idiomas',
            'skills.cat.backend': 'Backend',
            'skills.cat.frontend': 'Frontend',
            'skills.cat.database': 'Banco de Dados',
            'skills.cat.tools': 'Ferramentas',
            'skills.cat.other': 'Outras competências',
            'skills.backend.auth': 'Autenticação',
            'skills.backend.restapi': 'APIs REST',
            'skills.frontend.responsive': 'Interfaces responsivas',
            'skills.db.modeling': 'Modelagem de dados',
            'skills.other.fullstack': 'Desenvolvimento Full Stack',
            'skills.other.automation': 'Automação de processos',
            'skills.other.integration': 'Integração de sistemas',
            'skills.other.architecture': 'Arquitetura de software',
            'skills.other.patterns': 'Design patterns (Factory, Decorator, Observer, Template Method)',
            'skills.other.dsa': 'Estruturas de dados e algoritmos',
            'skills.other.metrology': 'Metrologia óptica',
            'skills.soft.written': 'Comunicação escrita',
            'skills.soft.critical': 'Pensamento crítico',
            'skills.soft.problem': 'Resolução de problemas',
            'skills.soft.oral': 'Comunicação oral e apresentação',
            'skills.soft.adapt': 'Adaptabilidade',
            'skills.soft.agile': 'Metodologias ágeis',
            'skills.soft.team': 'Trabalho em equipe',
            'lang.level.native': 'Nativo',
            'lang.level.fluent': 'Fluente',
            'lang.level.advanced': 'Avançado',
            'lang.level.intermediate': 'Intermediário (A2)',
            'projects.title': 'Projetos',
            'projects.senai.badge': 'Case em destaque',
            'projects.senai.title': 'Sistema de Gestão para Laboratório de Metrologia',
            'projects.senai.problem': 'O laboratório de metrologia do SENAI precisava de um sistema único para gerenciar usuários, permissões e ordens de serviço, no lugar de planilhas e processos manuais.',
            'projects.senai.solution': 'Desenvolvi um sistema completo de gestão com hierarquia de permissões por perfil, fluxo de Ordens de Serviço e geração automática de relatórios em PDF, com backend em Spring Boot e banco PostgreSQL.',
            'projects.senai.impact': 'Digitalizei o fluxo operacional do laboratório de ponta a ponta, desde a modelagem dos dados até a implementação do backend.',
            'projects.labelProblem': 'Problema',
            'projects.labelSolution': 'Solução',
            'projects.labelImpact': 'Impacto',
            'projects.library.title': 'Sistema de Biblioteca',
            'projects.library.desc': 'Sistema completo de CRUD com Spring Boot, JPA e documentação via Swagger. Construído com uma API RESTful limpa, pronta para um futuro front-end em Angular.',
            'projects.agenda.title': 'Agenda de Contatos',
            'projects.agenda.desc': 'SPA em Angular 17 com CRUD completo, filtros de busca e estrutura de componentes reutilizável e responsiva, construída com PrimeNG.',
            'projects.rental.title': 'API de Aluguel de Veículos',
            'projects.rental.desc': 'API REST modelando regras reais de negócio de locação com JPA, totalmente documentada e pronta para ser integrada a qualquer front-end.',
            'contact.title': 'Contato',
            'contact.lead': 'Aberto a oportunidades e colaborações — vamos conversar.',
            'footer.text': '© 2026 Gabriel Nunes · Goiânia, Brasil'
        },
        de: {
            'nav.about': 'Über mich',
            'nav.experience': 'Erfahrung',
            'nav.skills': 'Fähigkeiten',
            'nav.projects': 'Projekte',
            'nav.contact': 'Kontakt',
            'nav.menuToggle': 'Menü öffnen',
            'skip.link': 'Zum Inhalt springen',
            'theme.toLight': 'Zum hellen Modus wechseln',
            'theme.toDark': 'Zum dunklen Modus wechseln',
            'langSwitcher.aria': 'Sprache ändern',
            'hero.badge': 'Ehemaliger Praktikant bei ZEISS · Deutschland',
            'hero.headline': 'Full-Stack-Softwareentwickler, der saubere, skalierbare Produkte baut.',
            'hero.lead': 'Java & Spring Boot, Angular & TypeScript, PostgreSQL — von der Datenmodellierung bis zum Deployment. Student im letzten Semester der Softwaretechnik, mit 6 Monaten internationaler Erfahrung bei ZEISS in Deutschland.',
            'hero.location': '📍 Goiânia, Brasilien — offen für Remote- und internationale Möglichkeiten',
            'hero.cta.projects': 'Projekte ansehen',
            'hero.cta.cv': 'Lebenslauf herunterladen',
            'about.title': 'Über mich',
            'about.p1': 'Ich bin Student im letzten Semester der Softwaretechnik (SENAI FATESG, Goiânia) und Full-Stack-Entwickler, der reale Probleme gerne in funktionierende Software verwandelt — vom Datenbankschema bis zur Oberfläche, die Menschen tatsächlich benutzen.',
            'about.p2': 'Mein bisher größter Schritt war ein 6-monatiges internationales Praktikum bei ZEISS in Deutschland, wo ich als Full-Stack-Entwickler in einem multikulturellen Unternehmensteam gearbeitet habe. Das gab mir direkten Einblick in professionelle Softwareentwicklung, agile Praktiken und internationale Kommunikation.',
            'about.p3': 'Neben der Webentwicklung baue ich Automatisierungen und Integrationen, die Teams manuelle Arbeit abnehmen, und erkunde weiterhin Python für Daten- und Automatisierungsprojekte. Mir sind sauberer Code, durchdachte Architektur und mühelos nutzbare Oberflächen wichtig.',
            'experience.title': 'Erfahrung',
            'experience.senai.role': 'Softwaretechnik — SENAI FATESG',
            'experience.senai.period': '2023 — Voraussichtlich Ende 2026',
            'experience.senai.desc': 'Bachelorstudium der Softwaretechnik mit Schwerpunkt auf Full-Stack-Entwicklung, Datenbanken, Softwarearchitektur, Design Patterns und agilen Methoden.',
            'experience.zeiss.role': 'Praktikant Full-Stack-Entwicklung — ZEISS (Deutschland)',
            'experience.zeiss.period': 'Okt. 2025 — Apr. 2026 · 6 Monate',
            'experience.zeiss.desc': 'Internationales Praktikum bei ZEISS in Deutschland, Entwicklung interner Full-Stack-Anwendungen in einem multikulturellen Unternehmensteam — von der Anforderungsanalyse bis zu Implementierung, Tests und Wartung. Direkter Einblick in Software-Engineering-Praktiken und agile Methoden in einem globalen Unternehmen.',
            'skills.hardTitle': 'Fachliche Fähigkeiten',
            'skills.softTitle': 'Soziale Kompetenzen',
            'skills.langTitle': 'Sprachen',
            'skills.cat.backend': 'Backend',
            'skills.cat.frontend': 'Frontend',
            'skills.cat.database': 'Datenbank',
            'skills.cat.tools': 'Werkzeuge',
            'skills.cat.other': 'Weitere Kompetenzen',
            'skills.backend.auth': 'Authentifizierung',
            'skills.backend.restapi': 'REST-APIs',
            'skills.frontend.responsive': 'Responsives UI',
            'skills.db.modeling': 'Datenmodellierung',
            'skills.other.fullstack': 'Full-Stack-Entwicklung',
            'skills.other.automation': 'Prozessautomatisierung',
            'skills.other.integration': 'Systemintegration',
            'skills.other.architecture': 'Softwarearchitektur',
            'skills.other.patterns': 'Design Patterns (Factory, Decorator, Observer, Template Method)',
            'skills.other.dsa': 'Datenstrukturen & Algorithmen',
            'skills.other.metrology': 'Optische Metrologie',
            'skills.soft.written': 'Schriftliche Kommunikation',
            'skills.soft.critical': 'Kritisches Denken',
            'skills.soft.problem': 'Problemlösung',
            'skills.soft.oral': 'Mündliche Kommunikation & Präsentation',
            'skills.soft.adapt': 'Anpassungsfähigkeit',
            'skills.soft.agile': 'Agile Methoden',
            'skills.soft.team': 'Teamarbeit',
            'lang.level.native': 'Muttersprache',
            'lang.level.fluent': 'Fließend',
            'lang.level.advanced': 'Fortgeschritten',
            'lang.level.intermediate': 'Mittelstufe (A2)',
            'projects.title': 'Projekte',
            'projects.senai.badge': 'Hervorgehobenes Projekt',
            'projects.senai.title': 'Verwaltungssystem für Metrologie-Labor',
            'projects.senai.problem': 'Das Metrologie-Labor des SENAI benötigte ein einziges System zur Verwaltung von Nutzern, Berechtigungen und Serviceaufträgen, anstatt sich auf manuelle Tabellen und Papierkram zu verlassen.',
            'projects.senai.solution': 'Ich entwickelte ein vollständiges Verwaltungssystem mit rollenbasierter Berechtigungshierarchie, einem Workflow für Serviceaufträge und automatischer PDF-Berichterstellung, unterstützt durch eine Spring-Boot-API und eine PostgreSQL-Datenbank.',
            'projects.senai.impact': 'Digitalisierte den betrieblichen Arbeitsablauf des Labors durchgängig, von der Datenmodellierung bis zur Backend-Implementierung.',
            'projects.labelProblem': 'Problem',
            'projects.labelSolution': 'Lösung',
            'projects.labelImpact': 'Auswirkung',
            'projects.library.title': 'Bibliothekssystem',
            'projects.library.desc': 'Vollständiges CRUD-System mit Spring Boot, JPA und Swagger-Dokumentation. Gebaut mit einer sauberen RESTful-API, bereit für ein zukünftiges Angular-Frontend.',
            'projects.agenda.title': 'Kontaktverzeichnis',
            'projects.agenda.desc': 'Angular-17-SPA mit vollständigem CRUD, Suchfiltern und einer wiederverwendbaren, responsiven Komponentenstruktur auf Basis von PrimeNG.',
            'projects.rental.title': 'Fahrzeugvermietungs-API',
            'projects.rental.desc': 'REST-API, die reale Vermietungsgeschäftsregeln mit JPA abbildet, vollständig dokumentiert und bereit für die Anbindung an jedes Frontend.',
            'contact.title': 'Kontakt',
            'contact.lead': 'Offen für Gelegenheiten und Zusammenarbeit — lass uns reden.',
            'footer.text': '© 2026 Gabriel Nunes · Goiânia, Brasilien'
        },
        es: {
            'nav.about': 'Sobre mí',
            'nav.experience': 'Experiencia',
            'nav.skills': 'Habilidades',
            'nav.projects': 'Proyectos',
            'nav.contact': 'Contacto',
            'nav.menuToggle': 'Abrir menú',
            'skip.link': 'Saltar al contenido',
            'theme.toLight': 'Cambiar a modo claro',
            'theme.toDark': 'Cambiar a modo oscuro',
            'langSwitcher.aria': 'Cambiar idioma',
            'hero.badge': 'Ex-becario en ZEISS · Alemania',
            'hero.headline': 'Ingeniero de Software Full Stack construyendo productos limpios y escalables.',
            'hero.lead': 'Java & Spring Boot, Angular & TypeScript, PostgreSQL — desde el modelado de datos hasta el despliegue. Estudiante del último período de Ingeniería de Software, con 6 meses de experiencia internacional en ZEISS, Alemania.',
            'hero.location': '📍 Goiânia, Brasil — abierto a oportunidades remotas e internacionales',
            'hero.cta.projects': 'Ver proyectos',
            'hero.cta.cv': 'Descargar CV',
            'about.title': 'Sobre mí',
            'about.p1': 'Soy estudiante del último período de Ingeniería de Software (SENAI FATESG, Goiânia) y desarrollador full stack, apasionado por transformar problemas reales en software funcional — desde el modelado de la base de datos hasta la interfaz que las personas realmente usan.',
            'about.p2': 'Mi mayor paso hasta ahora fue una pasantía internacional de 6 meses en ZEISS, en Alemania, trabajando como desarrollador full stack dentro de un equipo corporativo multicultural. Esa experiencia me dio contacto directo con el desarrollo a nivel corporativo, prácticas ágiles y comunicación internacional.',
            'about.p3': 'Además del desarrollo web, también creo automatizaciones e integraciones que eliminan el trabajo manual del día a día de los equipos, y sigo explorando Python en proyectos de datos y automatización. Me importa el código limpio, la arquitectura bien pensada y las interfaces que se sienten simples de usar.',
            'experience.title': 'Experiencia',
            'experience.senai.role': 'Ingeniería de Software — SENAI FATESG',
            'experience.senai.period': '2023 — Previsto para fines de 2026',
            'experience.senai.desc': 'Grado en Ingeniería de Software, con enfoque en desarrollo full stack, bases de datos, arquitectura de software, patrones de diseño y metodologías ágiles.',
            'experience.zeiss.role': 'Pasante Full Stack — ZEISS (Alemania)',
            'experience.zeiss.period': 'Oct. 2025 — Abr. 2026 · 6 meses',
            'experience.zeiss.desc': 'Pasantía internacional en ZEISS, Alemania, desarrollando aplicaciones full stack internas dentro de un equipo corporativo multicultural — desde el relevamiento de requisitos hasta la implementación, pruebas y mantenimiento. Contacto directo con prácticas de ingeniería de software y metodologías ágiles en una empresa global.',
            'skills.hardTitle': 'Competencias Técnicas',
            'skills.softTitle': 'Competencias Blandas',
            'skills.langTitle': 'Idiomas',
            'skills.cat.backend': 'Backend',
            'skills.cat.frontend': 'Frontend',
            'skills.cat.database': 'Base de Datos',
            'skills.cat.tools': 'Herramientas',
            'skills.cat.other': 'Otras competencias',
            'skills.backend.auth': 'Autenticación',
            'skills.backend.restapi': 'APIs REST',
            'skills.frontend.responsive': 'UI responsiva',
            'skills.db.modeling': 'Modelado de datos',
            'skills.other.fullstack': 'Desarrollo Full Stack',
            'skills.other.automation': 'Automatización de procesos',
            'skills.other.integration': 'Integración de sistemas',
            'skills.other.architecture': 'Arquitectura de software',
            'skills.other.patterns': 'Patrones de diseño (Factory, Decorator, Observer, Template Method)',
            'skills.other.dsa': 'Estructuras de datos y algoritmos',
            'skills.other.metrology': 'Metrología óptica',
            'skills.soft.written': 'Comunicación escrita',
            'skills.soft.critical': 'Pensamiento crítico',
            'skills.soft.problem': 'Resolución de problemas',
            'skills.soft.oral': 'Comunicación oral y presentación',
            'skills.soft.adapt': 'Adaptabilidad',
            'skills.soft.agile': 'Metodologías ágiles',
            'skills.soft.team': 'Trabajo en equipo',
            'lang.level.native': 'Nativo',
            'lang.level.fluent': 'Fluido',
            'lang.level.advanced': 'Avanzado',
            'lang.level.intermediate': 'Intermedio (A2)',
            'projects.title': 'Proyectos',
            'projects.senai.badge': 'Caso destacado',
            'projects.senai.title': 'Sistema de Gestión para Laboratorio de Metrología',
            'projects.senai.problem': 'El laboratorio de metrología del SENAI necesitaba un sistema único para gestionar usuarios, permisos y órdenes de servicio, en lugar de depender de hojas de cálculo y procesos manuales.',
            'projects.senai.solution': 'Desarrollé un sistema completo de gestión con jerarquía de permisos por perfil, flujo de Órdenes de Servicio y generación automática de informes en PDF, con backend en Spring Boot y base de datos PostgreSQL.',
            'projects.senai.impact': 'Digitalicé el flujo operativo del laboratorio de extremo a extremo, desde el modelado de datos hasta la implementación del backend.',
            'projects.labelProblem': 'Problema',
            'projects.labelSolution': 'Solución',
            'projects.labelImpact': 'Impacto',
            'projects.library.title': 'Sistema de Biblioteca',
            'projects.library.desc': 'Sistema CRUD completo con Spring Boot, JPA y documentación Swagger. Construido con una API RESTful limpia, lista para un futuro front-end en Angular.',
            'projects.agenda.title': 'Agenda de Contactos',
            'projects.agenda.desc': 'SPA en Angular 17 con CRUD completo, filtros de búsqueda y una estructura de componentes reutilizable y responsiva, construida con PrimeNG.',
            'projects.rental.title': 'API de Alquiler de Vehículos',
            'projects.rental.desc': 'API REST que modela reglas de negocio reales de alquiler con JPA, totalmente documentada y lista para integrarse con cualquier front-end.',
            'contact.title': 'Contacto',
            'contact.lead': 'Abierto a oportunidades y colaboraciones — hablemos.',
            'footer.text': '© 2026 Gabriel Nunes · Goiânia, Brasil'
        }
    };

    function resolveLanguage(stored, browserLang) {
        if (SUPPORTED.indexOf(stored) !== -1) return stored;
        var short = (browserLang || '').slice(0, 2).toLowerCase();
        return SUPPORTED.indexOf(short) !== -1 ? short : 'en';
    }

    function t(key) {
        var lang = document.documentElement.getAttribute('lang') || 'en';
        return (dict[lang] && dict[lang][key]) || dict.en[key] || key;
    }

    function applyTranslations(lang) {
        document.documentElement.setAttribute('lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var value = (dict[lang] && dict[lang][key]) || dict.en[key];
            if (value !== undefined) el.textContent = value;
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
            el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
                var parts = pair.split(':');
                var attr = parts[0].trim();
                var key = parts[1].trim();
                var value = (dict[lang] && dict[lang][key]) || dict.en[key];
                if (value !== undefined) el.setAttribute(attr, value);
            });
        });

        var flagEl = document.querySelector('.lang-current-flag');
        if (flagEl) flagEl.className = 'fi ' + FLAGS[lang] + ' lang-current-flag';
        var nameEl = document.querySelector('.lang-current-name');
        if (nameEl) nameEl.textContent = NAMES[lang];

        document.querySelectorAll('.lang-option').forEach(function (opt) {
            var selected = opt.getAttribute('data-lang') === lang;
            opt.setAttribute('aria-selected', selected ? 'true' : 'false');
        });
    }

    function setLanguage(lang, persist) {
        if (SUPPORTED.indexOf(lang) === -1) lang = 'en';
        if (persist) localStorage.setItem(STORAGE_KEY, lang);
        applyTranslations(lang);
    }

    function initDropdown() {
        var toggle = document.querySelector('.lang-toggle');
        var menu = document.querySelector('.lang-menu');
        if (!toggle || !menu) return;

        function close() {
            menu.hidden = true;
            toggle.setAttribute('aria-expanded', 'false');
        }
        function open() {
            menu.hidden = false;
            toggle.setAttribute('aria-expanded', 'true');
        }

        toggle.addEventListener('click', function () {
            if (menu.hidden) open(); else close();
        });
        document.addEventListener('click', function (e) {
            if (!menu.hidden && !e.target.closest('.lang-switcher')) close();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !menu.hidden) {
                close();
                toggle.focus();
            }
        });
        menu.querySelectorAll('.lang-option').forEach(function (opt) {
            opt.addEventListener('click', function () {
                setLanguage(opt.getAttribute('data-lang'), true);
                close();
                toggle.focus();
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var stored = localStorage.getItem(STORAGE_KEY);
        var lang = resolveLanguage(stored, navigator.language);
        applyTranslations(lang);
        initDropdown();
    });

    window.i18n = {
        resolveLanguage: resolveLanguage,
        setLanguage: setLanguage,
        t: t,
        SUPPORTED: SUPPORTED
    };
})();
```

- [ ] **Step 2: Add the language dropdown markup and load the script**

In `index.html`, inside `.nav-controls` (added in Task 2), right **before**
the `.theme-toggle` button, add:

```html
                <div class="lang-switcher">
                    <button type="button" class="lang-toggle" aria-haspopup="listbox" aria-expanded="false" data-i18n-attr="aria-label:langSwitcher.aria">
                        <span class="fi fi-us lang-current-flag" aria-hidden="true"></span>
                        <span class="lang-current-name">English</span>
                    </button>
                    <ul class="lang-menu" role="listbox" hidden>
                        <li class="lang-option" role="option" data-lang="pt" aria-selected="false"><span class="fi fi-br" aria-hidden="true"></span> Português</li>
                        <li class="lang-option" role="option" data-lang="en" aria-selected="true"><span class="fi fi-us" aria-hidden="true"></span> English</li>
                        <li class="lang-option" role="option" data-lang="de" aria-selected="false"><span class="fi fi-de" aria-hidden="true"></span> Deutsch</li>
                        <li class="lang-option" role="option" data-lang="es" aria-selected="false"><span class="fi fi-es" aria-hidden="true"></span> Español</li>
                    </ul>
                </div>
```

Add `data-i18n` to the nav links and skip-link:

```html
    <a class="skip-link" href="#conteudo" data-i18n="skip.link">Skip to content</a>
```

```html
            <ul class="menu" role="list">
                <li><a href="#sobre" data-i18n="nav.about">About</a></li>
                <li><a href="#experiencia" data-i18n="nav.experience">Experience</a></li>
                <li><a href="#habilidades" data-i18n="nav.skills">Skills</a></li>
                <li><a href="#projetos" data-i18n="nav.projects">Projects</a></li>
                <li><a href="#contato" data-i18n="nav.contact">Contact</a></li>
            </ul>
```

(The `#experiencia` section itself is created in Task 7 — this link will
be a dead anchor until then, which is fine mid-plan.)

Load the script before `theme.js` at the bottom of `index.html` (order
matters: `theme.js`'s `applyTheme` calls `window.i18n.t`, so `i18n.js`
must be defined and have run by the time a theme toggle click happens —
both are `defer`red so they execute in document order after parsing):

```html
    <script src="assets/js/i18n.js" defer></script>
    <script src="assets/js/theme.js" defer></script>
```

- [ ] **Step 3: Add the dropdown CSS**

```css
.lang-switcher {
    position: relative;
}

.lang-toggle {
    display: inline-flex;
    align-items: center;
    gap: .4rem;
    height: 2.25rem;
    padding: 0 .6rem;
    border-radius: .625rem;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text);
    font-size: .875rem;
    cursor: pointer;
}

.lang-toggle:hover {
    background: var(--surface);
}

.lang-toggle:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
}

.lang-menu {
    position: absolute;
    right: 0;
    top: calc(100% + .4rem);
    min-width: 160px;
    margin: 0;
    padding: .35rem;
    list-style: none;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: .75rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, .15);
    z-index: 20;
}

.lang-option {
    display: flex;
    align-items: center;
    gap: .5rem;
    padding: .5rem .6rem;
    border-radius: .5rem;
    font-size: .9rem;
    cursor: pointer;
}

.lang-option:hover {
    background: var(--surface);
}

.lang-option[aria-selected="true"] {
    font-weight: 700;
    color: var(--primary);
}
```

- [ ] **Step 4: Verify `resolveLanguage` logic directly**

With the `portfolio` server running, use `preview_eval` to test the pure
function in isolation:
- `window.i18n.resolveLanguage(null, 'de-DE')` → expected `"de"`.
- `window.i18n.resolveLanguage('es', 'de-DE')` → expected `"es"` (stored
  choice wins over browser language).
- `window.i18n.resolveLanguage(null, 'fr-FR')` → expected `"en"` (unsupported
  browser language falls back to English).

- [ ] **Step 5: Verify the dropdown end-to-end in the browser**

- `preview_eval`: `localStorage.clear(); location.reload()`.
- `preview_click` on `.lang-toggle`. Expected: `.lang-menu` becomes
  visible, `aria-expanded` on the toggle becomes `"true"`.
- `preview_click` on the `pt` `.lang-option`. Expected: nav links now read
  "Sobre / Habilidades / Projetos / Contato" (via `preview_snapshot`),
  `<html lang>` is `"pt"`, the dropdown closes, and
  `localStorage.getItem('site-lang')` is `"pt"`.
- Reload the page. Expected: still in Portuguese (persisted choice beats
  the browser's default language).
- Press `Escape` while the menu is open (`preview_eval`:
  `document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}))`
  after reopening it) — menu should close.
- Check console logs (errors only): must be empty.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/styles.css assets/js/i18n.js
git commit -m "Adiciona motor de i18n com dicionario completo PT/EN/DE/ES e dropdown de idioma"
```

---

## Task 4: Responsive header — mobile menu, scroll-reveal, active nav link

**Files:**
- Modify: `index.html` (add hamburger button + `id="primary-menu"`; load `main.js`)
- Modify: `assets/css/styles.css` (mobile nav collapse, hamburger bars, `[data-reveal]` animation classes)
- Create: `assets/js/main.js`

**Interfaces:**
- Consumes: `.menu`, `.nav-controls` from Tasks 2-3.
- Produces: `main.js` functions `initMobileNav()`, `initScrollReveal()`, `initActiveNav()` (auto-run on `DOMContentLoaded`, not exported — no later task calls them directly); the `data-reveal` attribute contract that Tasks 6-9 use on their section/card elements to opt into scroll-reveal.

- [ ] **Step 1: Add the hamburger button and menu id**

In `index.html`, change the nav's opening structure:

```html
        <nav class="nav container" aria-label="main">
            <a class="logo" href="#">GN</a>
            <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-menu" data-i18n-attr="aria-label:nav.menuToggle">
                <span class="nav-toggle-bar"></span>
                <span class="nav-toggle-bar"></span>
                <span class="nav-toggle-bar"></span>
            </button>
            <ul class="menu" id="primary-menu" role="list">
```

(Keep the existing `<li>` items and their `data-i18n` attributes from
Task 3 unchanged; only the opening `<nav>`/`<a class="logo">` block and
the `<ul>` tag itself change.)

- [ ] **Step 2: Add mobile nav + hamburger CSS**

```css
.nav-toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid var(--border);
    border-radius: .625rem;
    background: transparent;
    cursor: pointer;
}

.nav-toggle-bar {
    display: block;
    width: 1.1rem;
    height: 2px;
    background: var(--text);
}

.nav-toggle:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
}

@media (max-width: 800px) {
    .nav-toggle {
        display: flex;
    }

    .nav {
        position: relative;
        flex-wrap: wrap;
    }

    .menu {
        display: none;
        flex-direction: column;
        gap: 0;
        width: 100%;
        position: absolute;
        top: 100%;
        left: 0;
        background: var(--bg);
        border-bottom: 1px solid var(--border);
        padding: .5rem 1rem 1rem;
    }

    .menu.is-open {
        display: flex;
    }

    .menu a {
        display: block;
        padding: .6rem .5rem;
    }
}
```

- [ ] **Step 3: Add scroll-reveal CSS**

```css
[data-reveal] {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity .5s ease, transform .5s ease;
}

[data-reveal].is-visible {
    opacity: 1;
    transform: none;
}
```

- [ ] **Step 4: Create `assets/js/main.js`**

```js
(function () {
    function initMobileNav() {
        var toggle = document.querySelector('.nav-toggle');
        var menu = document.querySelector('.menu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    function initScrollReveal() {
        var targets = document.querySelectorAll('[data-reveal]');
        if (!targets.length) return;

        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced || !('IntersectionObserver' in window)) {
            targets.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        targets.forEach(function (el) { observer.observe(el); });
    }

    function initActiveNav() {
        var links = document.querySelectorAll('.menu a[href^="#"]');
        var sections = Array.prototype.map.call(links, function (link) {
            return document.querySelector(link.getAttribute('href'));
        }).filter(Boolean);

        if (!sections.length || !('IntersectionObserver' in window)) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var link = document.querySelector('.menu a[href="#' + entry.target.id + '"]');
                if (!link) return;
                links.forEach(function (l) { l.removeAttribute('aria-current'); });
                link.setAttribute('aria-current', 'page');
            });
        }, { rootMargin: '-40% 0px -50% 0px' });

        sections.forEach(function (section) { observer.observe(section); });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initMobileNav();
        initScrollReveal();
        initActiveNav();
    });
})();
```

- [ ] **Step 5: Load `main.js`**

Add it as the first of the three deferred scripts (order:
`main.js`, `i18n.js`, `theme.js` — `main.js` has no dependency on the
other two, so its position relative to them doesn't matter, but list it
first for readability):

```html
    <script src="assets/js/main.js" defer></script>
    <script src="assets/js/i18n.js" defer></script>
    <script src="assets/js/theme.js" defer></script>
```

- [ ] **Step 6: Verify responsive behavior**

- `preview_resize` to mobile (375x812). Screenshot: `.menu` should be
  hidden, hamburger visible, no horizontal scrollbar.
- `preview_click` on `.nav-toggle`. Expected: `.menu` gains class
  `is-open` and becomes visible (screenshot), `aria-expanded` becomes
  `"true"`.
- `preview_click` on a menu link (e.g. "Skills"). Expected: menu closes
  (`is-open` removed), page scrolls to `#habilidades`.
- `preview_resize` back to desktop (1280x800). Expected: hamburger hidden,
  `.menu` visible inline again.
- Check console logs (errors only): must be empty.

- [ ] **Step 7: Commit**

```bash
git add index.html assets/css/styles.css assets/js/main.js
git commit -m "Adiciona menu mobile, scroll-reveal e destaque do link ativo no nav"
```

---

## Task 5: Hero section rewrite

**Files:**
- Modify: `index.html` (`.hero` section)
- Modify: `assets/css/styles.css` (badge + location styles)

**Interfaces:**
- Consumes: `data-i18n` keys `hero.badge`, `hero.headline`, `hero.lead`, `hero.location`, `hero.cta.projects`, `hero.cta.cv` (Task 3); `assets/cv/Gabriel-Viana-Nunes-CV.pdf` (Task 1); `--mono` token (Task 1).

- [ ] **Step 1: Replace the `.hero` section markup**

Replace the entire `<section class="hero">...</section>` block with:

```html
        <section class="hero">
            <div class="container">
                <p class="badge" data-i18n="hero.badge">Ex-intern at ZEISS · Germany</p>
                <h1 data-i18n="hero.headline">Full-Stack Software Engineer building clean, scalable products.</h1>
                <p class="lead" data-i18n="hero.lead">
                    Java &amp; Spring Boot, Angular &amp; TypeScript, PostgreSQL — from data modeling to deployment.
                    Final-year Software Engineering student, with 6 months of international experience at ZEISS in
                    Germany.
                </p>
                <p class="location" data-i18n="hero.location">📍 Goiânia, Brazil — open to remote &amp; international
                    opportunities</p>
                <div class="cta">
                    <a class="btn primary" href="#projetos" data-i18n="hero.cta.projects">See projects</a>
                    <a class="btn outline" href="assets/cv/Gabriel-Viana-Nunes-CV.pdf" download
                        data-i18n="hero.cta.cv">Download CV</a>
                    <a class="btn outline" href="https://github.com/GabrielVianaNunes" target="_blank"
                        rel="noopener noreferrer">GitHub</a>
                </div>
            </div>
        </section>
```

- [ ] **Step 2: Add hero badge/location CSS**

```css
.badge {
    display: inline-block;
    margin: 0 0 .75rem;
    padding: .3rem .7rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface);
    font-family: var(--mono);
    font-size: .8rem;
    color: var(--primary);
}

.location {
    margin-top: .75rem;
    color: var(--muted);
    font-size: .95rem;
}
```

- [ ] **Step 3: Verify**

- Screenshot the hero at desktop width: badge, headline, lead, location
  line and 3 CTA buttons all visible and readable in both themes (toggle
  `.theme-toggle` and re-screenshot).
- `preview_click` on "Download CV": confirm (via `preview_network`) the
  request for `assets/cv/Gabriel-Viana-Nunes-CV.pdf` returns status 200.
- Switch language to `de` via the dropdown: hero text should switch to
  the German strings from Task 3's dictionary.
- Check console logs (errors only): must be empty.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "Reescreve a secao hero com badge ZEISS, localizacao e botao de CV"
```

---

## Task 6: About section rewrite

**Files:**
- Modify: `index.html` (`#sobre` section)

**Interfaces:**
- Consumes: `data-i18n` keys `about.title`, `about.p1`, `about.p2`, `about.p3` (Task 3).

- [ ] **Step 1: Replace the `#sobre` section markup**

Replace the entire `<section id="sobre" class="section">...</section>`
block (removing the `<ul class="highlights">` list — that content now
lives in the Skills section from Task 8, so keeping it here would just
duplicate it) with:

```html
        <section id="sobre" class="section">
            <div class="container grid-2">
                <div>
                    <h2 data-i18n="about.title">About me</h2>
                    <p data-i18n="about.p1">
                        I'm a final-year Software Engineering student (SENAI FATESG, Goiânia) and full-stack developer
                        who enjoys turning real problems into working software — from the database schema to the
                        interface people actually use.
                    </p>
                    <p data-i18n="about.p2">
                        My biggest step so far was a 6-month international internship at ZEISS, in Germany, working
                        as a full-stack developer inside a multicultural corporate team. It gave me first-hand
                        exposure to enterprise-grade development, agile practices, and international communication.
                    </p>
                    <p data-i18n="about.p3">
                        Outside of web development, I build automations and integrations that remove manual work
                        from teams' day-to-day, and I keep exploring Python for data and automation projects. I care
                        about clean code, sensible architecture, and interfaces that feel effortless to use.
                    </p>
                </div>
                <figure class="portrait">
                    <img src="assets/img/profile.jpg" alt="Photo of Gabriel Nunes" width="1560" height="1560"
                        loading="lazy">
                </figure>
            </div>
        </section>
```

- [ ] **Step 2: Verify**

- Screenshot: About section shows the 3 paragraphs and portrait image,
  no leftover bullet list.
- `preview_inspect` on the `img`: confirm `width`/`height` attributes are
  `1560`/`1560` (prevents layout shift; CSS still scales it to
  `width: 100%`).
- Switch language to `es`: paragraphs update to Spanish text.
- Check console logs (errors only): must be empty.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Reescreve secao About com narrativa mais pessoal e remove lista duplicada"
```

---

## Task 7: Experience section (new)

**Files:**
- Modify: `index.html` (insert new `#experiencia` section between `#sobre` and `#habilidades`)
- Modify: `assets/css/styles.css` (timeline styles)

**Interfaces:**
- Consumes: `data-i18n` keys `experience.title`, `experience.senai.*`, `experience.zeiss.*` (Task 3); `data-reveal` contract (Task 4); resolves the dead `#experiencia` nav anchor from Task 3.

- [ ] **Step 1: Insert the Experience section**

In `index.html`, right after the closing `</section>` of `#sobre` and
before `<section id="habilidades" class="section">`, insert:

```html
        <section id="experiencia" class="section">
            <div class="container">
                <h2 data-i18n="experience.title">Experience</h2>
                <ol class="timeline" role="list">
                    <li class="timeline-item" data-reveal>
                        <span class="timeline-marker" aria-hidden="true"></span>
                        <div class="timeline-body">
                            <p class="timeline-period" data-i18n="experience.senai.period">2023 — Expected late 2026
                            </p>
                            <h3 data-i18n="experience.senai.role">Software Engineering — SENAI FATESG</h3>
                            <p data-i18n="experience.senai.desc">
                                Undergraduate degree in Software Engineering, covering full-stack development,
                                databases, software architecture and design patterns, and agile methodologies.
                            </p>
                        </div>
                    </li>
                    <li class="timeline-item timeline-item--featured" data-reveal>
                        <span class="timeline-marker" aria-hidden="true"></span>
                        <div class="timeline-body">
                            <p class="timeline-period" data-i18n="experience.zeiss.period">Oct 2025 — Apr 2026 · 6
                                months</p>
                            <h3 data-i18n="experience.zeiss.role">Full-Stack Developer Intern — ZEISS (Germany)</h3>
                            <p data-i18n="experience.zeiss.desc">
                                International internship at ZEISS in Germany, developing internal full-stack
                                applications within a multicultural corporate team — from requirements gathering to
                                implementation, testing and maintenance. First-hand exposure to enterprise software
                                practices and agile methodologies in a global company.
                            </p>
                        </div>
                    </li>
                </ol>
            </div>
        </section>
```

- [ ] **Step 2: Add timeline CSS**

```css
.timeline {
    position: relative;
    list-style: none;
    margin: 2rem 0 0;
    padding: 0 0 0 1.5rem;
    border-left: 2px solid var(--border);
}

.timeline-item {
    position: relative;
    padding-bottom: 2rem;
}

.timeline-item:last-child {
    padding-bottom: 0;
}

.timeline-marker {
    position: absolute;
    left: -1.6rem;
    top: .3rem;
    width: .7rem;
    height: .7rem;
    border-radius: 50%;
    background: var(--primary);
    box-shadow: 0 0 0 4px var(--bg);
}

.timeline-period {
    font-family: var(--mono);
    font-size: .8rem;
    color: var(--muted);
    margin: 0 0 .25rem;
}

.timeline-item h3 {
    margin: 0 0 .5rem;
    font-size: 1.1rem;
}

.timeline-item--featured .timeline-marker {
    background: var(--accent);
    box-shadow: 0 0 0 4px var(--bg), 0 0 8px var(--ring);
}

.timeline-item--featured h3 {
    color: var(--primary);
}
```

- [ ] **Step 3: Verify**

- Screenshot: timeline renders with 2 entries, SENAI first then ZEISS,
  vertical line + markers visible, ZEISS entry visually distinguished
  (colored marker/heading).
- Click the "Experience" nav link: page scrolls to this new section, and
  (per Task 4's `initActiveNav`) the nav link gets `aria-current="page"`
  while the section is in view.
- Switch language to `pt`: role/period/description text switches to the
  Portuguese strings, including the "2023 — Previsão: final de 2026" and
  "Out/2025 — Abr/2026 · 6 meses" period strings.
- Check console logs (errors only): must be empty.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "Adiciona secao Experience com timeline SENAI + estagio ZEISS"
```

---

## Task 8: Skills section reorganization

**Files:**
- Modify: `index.html` (`#habilidades` section)
- Modify: `assets/css/styles.css` (`.skills-cat` category heading style)

**Interfaces:**
- Consumes: all `skills.*` and `lang.level.*` `data-i18n` keys (Task 3); existing `.skills-icons`, `.skills-soft`, `.lang-container`/`.lang-grid`/`.lang-card` styles (unchanged, already in `styles.css`).

- [ ] **Step 1: Replace the `#habilidades` section markup**

Replace the entire `<section id="habilidades" class="section">...</section>`
block with:

```html
        <section id="habilidades" class="section">
            <div class="container">
                <h2 data-i18n="skills.hardTitle">Hard Skills</h2>

                <h3 class="skills-cat" data-i18n="skills.cat.backend">Backend</h3>
                <ul class="skills-icons" role="list">
                    <li><i class="devicon-java-plain colored"></i> Java</li>
                    <li><i class="devicon-spring-plain colored"></i> Spring Boot</li>
                    <li><i class="devicon-python-plain colored"></i> Python</li>
                    <li><i class="devicon-nodejs-plain colored"></i> Node.js</li>
                    <li><span data-i18n="skills.backend.restapi">REST APIs</span></li>
                    <li><span data-i18n="skills.backend.auth">Authentication</span></li>
                    <li><i class="devicon-postgresql-plain colored"></i> PostgreSQL</li>
                    <li>H2 Database</li>
                    <li><i class="devicon-amazonwebservices-plain-wordmark colored"></i> AWS Cloud Foundations</li>
                </ul>

                <h3 class="skills-cat" data-i18n="skills.cat.frontend">Frontend</h3>
                <ul class="skills-icons" role="list">
                    <li><i class="devicon-html5-plain colored"></i> HTML5</li>
                    <li><i class="devicon-css3-plain colored"></i> CSS3</li>
                    <li><i class="devicon-javascript-plain colored"></i> JavaScript</li>
                    <li><i class="devicon-typescript-plain colored"></i> TypeScript</li>
                    <li><i class="devicon-angular-plain colored"></i> Angular / Angular CLI</li>
                    <li>PrimeNG</li>
                    <li><span data-i18n="skills.frontend.responsive">Responsive UI</span></li>
                </ul>

                <h3 class="skills-cat" data-i18n="skills.cat.database">Database</h3>
                <ul class="skills-icons" role="list">
                    <li><i class="devicon-postgresql-plain colored"></i> PostgreSQL</li>
                    <li><span data-i18n="skills.db.modeling">Data modeling</span></li>
                    <li>SQL</li>
                </ul>

                <h3 class="skills-cat" data-i18n="skills.cat.tools">Tools</h3>
                <ul class="skills-icons" role="list">
                    <li><i class="devicon-git-plain colored"></i> Git &amp; GitHub</li>
                    <li><i class="devicon-vscode-plain colored"></i> VS Code</li>
                    <li>Power BI</li>
                </ul>

                <h3 class="skills-cat" data-i18n="skills.cat.other">Other competencies</h3>
                <ul class="skills-icons" role="list">
                    <li><span data-i18n="skills.other.fullstack">Full-stack development</span></li>
                    <li><span data-i18n="skills.other.automation">Process automation</span></li>
                    <li><span data-i18n="skills.other.integration">Systems integration</span></li>
                    <li><span data-i18n="skills.other.architecture">Software architecture</span></li>
                    <li><span data-i18n="skills.other.patterns">Design patterns (Factory, Decorator, Observer,
                            Template Method)</span></li>
                    <li>
                        <svg class="skill-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <line x1="6" y1="6" x2="18" y2="6"></line>
                            <line x1="6" y1="6" x2="12" y2="18"></line>
                            <line x1="18" y1="6" x2="12" y2="18"></line>
                            <circle cx="6" cy="6" r="2.5"></circle>
                            <circle cx="18" cy="6" r="2.5"></circle>
                            <circle cx="12" cy="18" r="2.5"></circle>
                        </svg>
                        <span data-i18n="skills.other.dsa">Data structures &amp; algorithms</span>
                    </li>
                    <li>
                        <svg class="skill-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <circle cx="10" cy="10" r="5.5"></circle>
                            <line x1="13.5" y1="13.5" x2="19" y2="19"></line>
                            <circle cx="10" cy="10" r="2.5"></circle>
                        </svg>
                        <span data-i18n="skills.other.metrology">Optical metrology</span>
                    </li>
                </ul>

                <h2 style="margin-top:3rem;" data-i18n="skills.softTitle">Soft Skills</h2>
                <ul class="skills-soft" role="list">
                    <li data-i18n="skills.soft.written">Written communication</li>
                    <li data-i18n="skills.soft.critical">Critical thinking</li>
                    <li data-i18n="skills.soft.problem">Problem solving</li>
                    <li data-i18n="skills.soft.oral">Oral communication &amp; presentation</li>
                    <li data-i18n="skills.soft.adapt">Adaptability</li>
                    <li data-i18n="skills.soft.agile">Agile methodologies</li>
                    <li data-i18n="skills.soft.team">Team collaboration</li>
                </ul>

                <h2 class="with-accent" data-i18n="skills.langTitle">Languages</h2>

                <div class="lang-container">
                    <div class="lang-grid">
                        <article class="lang-card">
                            <span class="fi fi-us" role="img" aria-label="United States flag"></span>
                            <div>
                                <div class="lang-name">English</div>
                                <div class="lang-level" data-i18n="lang.level.fluent">Fluent</div>
                            </div>
                        </article>

                        <article class="lang-card">
                            <span class="fi fi-de" role="img" aria-label="Germany flag"></span>
                            <div>
                                <div class="lang-name">Deutsch</div>
                                <div class="lang-level" data-i18n="lang.level.intermediate">Intermediate (A2)</div>
                            </div>
                        </article>

                        <article class="lang-card">
                            <span class="fi fi-ar" role="img" aria-label="Argentina flag"></span>
                            <div>
                                <div class="lang-name">Español</div>
                                <div class="lang-level" data-i18n="lang.level.advanced">Advanced</div>
                            </div>
                        </article>

                        <article class="lang-card">
                            <span class="fi fi-br" role="img" aria-label="Brazil flag"></span>
                            <div>
                                <div class="lang-name">Português</div>
                                <div class="lang-level" data-i18n="lang.level.native">Native</div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
```

- [ ] **Step 2: Add the category heading style**

```css
.skills-cat {
    margin: 1.5rem 0 .5rem;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: .04em;
    color: var(--muted);
    font-family: var(--mono);
}
```

- [ ] **Step 3: Verify**

- Screenshot: skills now show 5 categorized groups (Backend, Frontend,
  Database, Tools, Other competencies) under "Hard Skills", followed by
  Soft Skills and Languages — all icons that existed before (Java,
  Python, Node, Angular, TypeScript, HTML5, CSS3, PostgreSQL, AWS, Git,
  the two custom SVGs) are still present, nothing lost.
- Confirm the old "Languages: Portuguese (Native)..." bullet is gone from
  the soft-skills list (no duplication with the Languages cards below).
- Switch language to `de`: category headers (Backend/Frontend/...) and
  descriptive skill labels (Authentication → "Authentifizierung", etc.)
  switch; hardcoded tech names (Java, Angular, PostgreSQL...) stay the
  same across languages, which is expected.
- Check console logs (errors only): must be empty.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "Reorganiza Skills em categorias e une lista antiga com a nova"
```

---

## Task 9: Projects section — case studies

**Files:**
- Modify: `index.html` (`#projetos` section)
- Modify: `assets/css/styles.css` (case-study styles)

**Interfaces:**
- Consumes: `data-i18n` keys `projects.*` (Task 3); `data-reveal` contract (Task 4); `github.com/GabrielVianaNunes` links.

- [ ] **Step 1: Replace the `#projetos` section markup**

Replace the entire `<section id="projetos" class="section">...</section>`
block with:

```html
        <section id="projetos" class="section">
            <div class="container">
                <h2 data-i18n="projects.title">Projects</h2>

                <article class="case-study case-study--featured" data-reveal>
                    <span class="case-badge" data-i18n="projects.senai.badge">Featured case</span>
                    <h3 data-i18n="projects.senai.title">Metrology Lab Management System</h3>
                    <div class="case-body">
                        <div>
                            <p class="case-label" data-i18n="projects.labelProblem">Problem</p>
                            <p data-i18n="projects.senai.problem">
                                SENAI's metrology lab needed a single system to manage users, permissions, and
                                service orders instead of relying on manual spreadsheets and paperwork.
                            </p>
                        </div>
                        <div>
                            <p class="case-label" data-i18n="projects.labelSolution">Solution</p>
                            <p data-i18n="projects.senai.solution">
                                Built a full management system with role-based permission hierarchy, service-order
                                (OS) workflow, and automatic PDF report generation, backed by a Spring Boot API and
                                PostgreSQL database.
                            </p>
                        </div>
                        <div>
                            <p class="case-label" data-i18n="projects.labelImpact">Impact</p>
                            <p data-i18n="projects.senai.impact">
                                Digitized the lab's operational workflow end-to-end, from data modeling to backend
                                implementation.
                            </p>
                        </div>
                    </div>
                    <ul class="tags" role="list">
                        <li>Java</li>
                        <li>Spring Boot</li>
                        <li>PostgreSQL</li>
                        <li>PDF Generation</li>
                    </ul>
                </article>

                <div class="cards">
                    <article class="card" data-reveal>
                        <h3>
                            <a href="https://github.com/GabrielVianaNunes/biblioteca-jpa" target="_blank"
                                rel="noopener noreferrer" data-i18n="projects.library.title">Library System</a>
                        </h3>
                        <p data-i18n="projects.library.desc">
                            Full CRUD system with Spring Boot, JPA and Swagger documentation. Built with a clean,
                            RESTful API ready for a future Angular front-end.
                        </p>
                        <ul class="tags" role="list">
                            <li>Java</li>
                            <li>Spring</li>
                            <li>H2/Swagger</li>
                        </ul>
                    </article>

                    <article class="card" data-reveal>
                        <h3>
                            <a href="https://github.com/GabrielVianaNunes/agenda-angular" target="_blank"
                                rel="noopener noreferrer" data-i18n="projects.agenda.title">Contacts Agenda</a>
                        </h3>
                        <p data-i18n="projects.agenda.desc">
                            Angular 17 SPA with full CRUD, search filters and a reusable, responsive component
                            structure built on PrimeNG.
                        </p>
                        <ul class="tags" role="list">
                            <li>Angular</li>
                            <li>TypeScript</li>
                            <li>PrimeNG</li>
                        </ul>
                    </article>

                    <article class="card" data-reveal>
                        <h3>
                            <a href="https://github.com/GabrielVianaNunes/vehiclerental_api" target="_blank"
                                rel="noopener noreferrer" data-i18n="projects.rental.title">Vehicle Rental</a>
                        </h3>
                        <p data-i18n="projects.rental.desc">
                            REST API modeling real rental business rules with JPA, fully documented and ready to plug
                            into any front-end.
                        </p>
                        <ul class="tags" role="list">
                            <li>Java</li>
                            <li>Spring</li>
                            <li>PostgreSQL</li>
                        </ul>
                    </article>
                </div>
            </div>
        </section>
```

- [ ] **Step 2: Add case-study CSS**

```css
.case-study {
    position: relative;
    margin-bottom: 2rem;
    padding: 1.5rem;
    border: 1px solid var(--border);
    border-radius: 1rem;
    background: var(--surface);
}

.case-study--featured {
    border-color: var(--primary);
}

.case-badge {
    display: inline-block;
    margin-bottom: .75rem;
    padding: .25rem .6rem;
    border-radius: 999px;
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--primary);
    font-family: var(--mono);
    font-size: .75rem;
}

.case-body {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    margin: 1rem 0;
}

.case-label {
    margin: 0 0 .25rem;
    font-family: var(--mono);
    font-size: .75rem;
    text-transform: uppercase;
    letter-spacing: .04em;
    color: var(--muted);
}
```

- [ ] **Step 3: Verify**

- Screenshot: SENAI case study renders as a larger, bordered block above
  the 3 secondary project cards, with Problem/Solution/Impact columns and
  tags, no repo link present for it.
- `preview_click` each of the 3 secondary project titles (opens in a new
  tab per `target="_blank"` — instead just check the `href` via
  `preview_inspect` or `preview_snapshot`) and confirm the URLs are
  `https://github.com/GabrielVianaNunes/biblioteca-jpa`,
  `.../agenda-angular`, and `.../vehiclerental_api`.
- Switch language to `es`: case-study title, problem/solution/impact
  text, and secondary project titles/descriptions all switch to Spanish.
- Check console logs (errors only): must be empty.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "Transforma projetos em case studies com SENAI em destaque e links corretos"
```

---

## Task 10: Contact & footer — real data and CV link

**Files:**
- Modify: `index.html` (`#contato` section and `.site-footer`)

**Interfaces:**
- Consumes: `data-i18n` keys `contact.title`, `contact.lead`, `hero.cta.cv` (reused), `footer.text` (Task 3); real email/LinkedIn/GitHub; `assets/cv/Gabriel-Viana-Nunes-CV.pdf` (Task 1).

- [ ] **Step 1: Replace the `#contato` section markup**

```html
        <section id="contato" class="section">
            <div class="container">
                <h2 data-i18n="contact.title">Contact</h2>
                <p data-i18n="contact.lead">Open to opportunities and collaborations — let's talk.</p>
                <ul class="contact" role="list">
                    <li><a href="mailto:gabrielnunes.service@gmail.com">gabrielnunes.service@gmail.com</a></li>
                    <li><a href="https://www.linkedin.com/in/gabriel-nunes-b8820a254" target="_blank"
                            rel="noopener noreferrer">LinkedIn</a></li>
                    <li><a href="https://github.com/GabrielVianaNunes" target="_blank"
                            rel="noopener noreferrer">GitHub</a></li>
                </ul>
                <a class="btn outline" href="assets/cv/Gabriel-Viana-Nunes-CV.pdf" download
                    data-i18n="hero.cta.cv">Download CV</a>
            </div>
        </section>
```

- [ ] **Step 2: Replace the footer**

```html
    <footer class="site-footer">
        <div class="container small" data-i18n="footer.text">© 2026 Gabriel Nunes · Goiânia, Brazil</div>
    </footer>
```

- [ ] **Step 3: Verify**

- Screenshot: Contact section shows real email, LinkedIn, GitHub links
  and a "Download CV" button; footer shows the new copyright line.
- `preview_snapshot`: confirm the mailto link is exactly
  `mailto:gabrielnunes.service@gmail.com` and the LinkedIn href is exactly
  `https://www.linkedin.com/in/gabriel-nunes-b8820a254`.
- Switch language to `de`: contact lead sentence and footer text switch;
  email/LinkedIn/GitHub links stay the same (they're not translatable
  content).
- Check console logs (errors only): must be empty.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Atualiza contato e rodape com dados reais e link de CV"
```

---

## Task 11: Final integration, accessibility, and SEO/performance audit

**Files:** none created — this task only verifies the assembled site and
fixes anything the checks below surface (fixes, if any, land in whichever
existing file needs the change).

**Interfaces:** consumes the full site produced by Tasks 1-10.

- [ ] **Step 1: Cross-viewport visual check**

`preview_resize` to `mobile` (375x812), `tablet` (768x1024), and
`desktop` (1280x800) presets. At each size, screenshot every section
(hero, about, experience, skills, projects, contact, footer). Expected:
no horizontal scrollbars, no overlapping text, hamburger only appears
below 800px, case-study/card grids reflow to single column on mobile.

- [ ] **Step 2: Theme + language matrix check**

For each of the 4 languages (`en`, `pt`, `de`, `es`) × 2 themes
(`light`, `dark`) — 8 combinations — set the state via `preview_eval`:

```js
localStorage.setItem('site-lang', 'de');
localStorage.setItem('site-theme', 'dark');
location.reload();
```

Screenshot the hero + skills sections each time. Expected: text is fully
translated (no leftover English strings inside `data-i18n` elements,
no raw `key.like.this` text — that would mean a dictionary/attribute
mismatch), and color contrast looks correct in both themes (no
light-on-light or dark-on-dark text).

- [ ] **Step 3: Keyboard navigation check**

`preview_eval` to confirm handlers respond to keyboard events, not just
clicks:

```js
document.querySelector('.lang-toggle').focus();
document.querySelector('.lang-toggle').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
```

Then Tab through the page (`preview_eval`: repeatedly dispatch
`new KeyboardEvent('keydown', {key: 'Tab'})` is unreliable for real focus
movement — instead use `preview_snapshot` combined with manually clicking
the skip-link, nav links, dropdown, and theme toggle to confirm each has
a visible focus outline via `preview_inspect` on `:focus-visible` styles
(check the `outline` computed style equals `2px solid` the `--ring`
color). Expected: every interactive element (skip-link, nav links,
hamburger, language toggle + options, theme toggle, buttons) shows a
visible focus ring.

- [ ] **Step 4: Network and console check**

- `preview_network`: confirm no 404s for any asset (CSS, JS, images, CV
  PDF, devicon/flag-icons/Google Fonts CDN requests).
- `preview_console_logs` (level `error`): must be empty across all
  language/theme combinations tested in Step 2.

- [ ] **Step 5: Reduced-motion sanity check (code review, not runtime)**

Confirm `assets/js/main.js`'s `initScrollReveal` checks
`window.matchMedia('(prefers-reduced-motion: reduce)').matches` before
relying on the CSS transition (it does, from Task 4), and that the
existing global `@media (prefers-reduced-motion: reduce)` block in
`styles.css` (zeroing `animation-duration`/`transition-duration`) still
applies to the new `[data-reveal]` transition (it does, since that rule
targets the universal selector `*`).

- [ ] **Step 6: Fix anything Steps 1-5 surfaced**

If any check fails, fix it directly in the relevant file (`index.html`,
`assets/css/styles.css`, or the affected JS module) and re-run the
specific check that failed until it passes. Do not move on with a known
failure.

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "Ajustes finais de integracao e acessibilidade apos auditoria"
```

(Only commit if Step 6 produced changes — if every check passed on the
first pass, there is nothing to commit for this task.)

---

## Reminder

Do not run `git push` for any task above — the user will explicitly say
when the site is ready to publish to GitHub.
