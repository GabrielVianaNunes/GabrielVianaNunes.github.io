# Interactive Effects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four independent pointer/interaction-driven micro-polish effects to the existing minimalist portfolio — magnetic buttons, 3D card tilt, a circle-reveal theme-toggle transition, and a typewriter terminal block in the Hero — without changing colors/typography/layout.

**Architecture:** Magnetic buttons, card tilt, and the terminal typewriter live in one new self-initializing module, `assets/js/interactive-effects.js`, loaded last (after GSAP/ScrollTrigger/`scroll-effects.js`). The theme-toggle transition is added directly to the existing `assets/js/theme.js` (which already owns theme toggling) using the native View Transitions API — no new dependency.

**Tech Stack:** GSAP 3.12.5 core (already loaded via CDN from the previous round, provides `gsap.quickTo`), native browser View Transitions API (`document.startViewTransition`, no polyfill), vanilla JS (ES2017, matches existing modules), plain CSS.

## Global Constraints

- No build tools, bundlers, or frameworks — plain HTML/CSS/JS only; any new dependency added only via CDN `<script>` tags, same pattern as devicon/flag-icons/GSAP.
- No visual/branding redesign — reuse existing tokens (`--primary`, `--ring`, `--border`, `--bg`, `--surface`, `--muted`, `--mono`) and layout; this plan only adds motion/interaction.
- No new fonts or icon sets — the terminal reuses the JetBrains Mono font already loaded (exposed as the `--mono` custom property).
- All animations must respect `prefers-reduced-motion: reduce`: magnetic buttons and card tilt apply no transform at all (not just "instant" — genuinely inert, since these are continuous hover effects); the theme transition falls back to the existing instant toggle; the terminal shows its final text immediately with no per-character typing.
- Magnetic buttons and card tilt are gated on `window.matchMedia('(hover: hover) and (pointer: fine)').matches`, checked once on load — a hover-capability check, not a viewport-width check (distinct from `isMobile` in `scroll-effects.js`, which is a width check).
- No `git push` — the user pushes when ready; this plan's tasks only commit locally.
- There is no automated test suite for this static site. Every task's verification step uses the Preview tool (browser-based checks: screenshot, console logs, `preview_eval` DOM/computed-style assertions), exactly as established in the prior two plans (`docs/superpowers/plans/2026-07-06-portfolio-redesign.md`, `docs/superpowers/plans/2026-07-08-scroll-storytelling.md`).
- `prefers-reduced-motion` and `(hover: hover) and (pointer: fine)` cannot be toggled live in the Preview tool — verify those guards by direct code inspection (reading the shipped source), the same limitation and method already used in Task 8 of the previous plan.

---

## Task 1: Magnetic buttons

**Files:**
- Create: `assets/js/interactive-effects.js`
- Modify: `index.html` (add the new script tag)

**Interfaces:**
- Produces: `assets/js/interactive-effects.js` IIFE that self-initializes on `DOMContentLoaded`. Exposes module-scope `prefersReduced` (boolean) and `canHover` (boolean) constants that Tasks 2 and 4 read when adding their own init functions inside this same file. Later tasks add new `function initX() {...}` blocks and a matching call inside the existing `DOMContentLoaded` listener — they do not create a second listener.

- [ ] **Step 1: Create `assets/js/interactive-effects.js`**

```js
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

        function initMagneticButtons() {
            if (!window.gsap || !canHover || prefersReduced) return;
            var strength = 0.3;
            document.querySelectorAll('.btn').forEach(function (btn) {
                var xTo = gsap.quickTo(btn, 'x', { duration: 0.3, ease: 'power3' });
                var yTo = gsap.quickTo(btn, 'y', { duration: 0.3, ease: 'power3' });

                btn.addEventListener('mousemove', function (e) {
                    var rect = btn.getBoundingClientRect();
                    var relX = e.clientX - (rect.left + rect.width / 2);
                    var relY = e.clientY - (rect.top + rect.height / 2);
                    xTo(relX * strength);
                    yTo(relY * strength);
                });

                btn.addEventListener('mouseleave', function () {
                    xTo(0);
                    yTo(0);
                });
            });
        }

        initMagneticButtons();
    });
})();
```

- [ ] **Step 2: Add the script tag to `index.html`**

Replace the existing five script tags at the bottom of the page:

```html
    <script src="assets/js/main.js" defer></script>
    <script src="assets/js/i18n.js" defer></script>
    <script src="assets/js/theme.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
    <script src="assets/js/scroll-effects.js" defer></script>
```

with:

```html
    <script src="assets/js/main.js" defer></script>
    <script src="assets/js/i18n.js" defer></script>
    <script src="assets/js/theme.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
    <script src="assets/js/scroll-effects.js" defer></script>
    <script src="assets/js/interactive-effects.js" defer></script>
```

- [ ] **Step 3: Verify in the browser**

Use the Preview tool (`preview_start` with server name `"portfolio"`, serving the repo root — no worktree `--directory` needed this round unless one is created for isolation).
- Reload. Console errors: must be empty.
- `preview_eval`: `document.querySelectorAll('.btn').length` — expected: `4` (3 in Hero CTA, 1 in Contact/footer).
- `preview_eval`: read a Hero `.btn`'s baseline transform: `getComputedStyle(document.querySelector('.hero .btn.primary')).transform` — expected: `"none"`.
- Simulate a mousemove near the button's center via `preview_eval` dispatching a synthetic `MouseEvent('mousemove', { clientX, clientY })` on the button (compute `clientX`/`clientY` from `getBoundingClientRect()` offset by a few pixels from center), then (separate `preview_eval` call, to give GSAP's ticker a round trip) read `getComputedStyle(...).transform` again — expected: no longer `"none"` (a `matrix(...)` with a small translation).
- Dispatch a `mouseleave` event on the same button, then re-check `transform` — expected: eases back toward `"none"` (or a matrix very close to identity) within ~500ms.
- Code-inspection check (per the Global Constraints note on unmockable media queries): confirm `initMagneticButtons` in the shipped `assets/js/interactive-effects.js` has `if (!window.gsap || !canHover || prefersReduced) return;` as its first line, before any `gsap.quickTo`/event-listener call.
- Confirm the rest of the site still works: theme toggle and language dropdown still function (click each), no regressions from the new script tag.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/js/interactive-effects.js
git commit -m "Adiciona botoes magneticos aos CTAs (.btn)"
```

---

## Task 2: 3D card tilt

**Files:**
- Modify: `assets/js/interactive-effects.js` (add `initCardTilt`)

**Interfaces:**
- Consumes: `prefersReduced`, `canHover` from Task 1's `DOMContentLoaded` handler scope.
- Produces: nothing consumed by later tasks in this plan.

- [ ] **Step 1: Add `initCardTilt` and its call**

Add this function inside the existing `DOMContentLoaded` handler (after `initMagneticButtons`'s definition), and call it right after `initMagneticButtons();`:

```js
        function initCardTilt() {
            if (!window.gsap || !canHover || prefersReduced) return;
            var maxTilt = 8;
            document.querySelectorAll('#projetos .case-study, #projetos .card').forEach(function (card) {
                gsap.set(card, { transformPerspective: 800, transformStyle: 'preserve-3d' });
                var rotateXTo = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3' });
                var rotateYTo = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3' });

                card.addEventListener('mousemove', function (e) {
                    var rect = card.getBoundingClientRect();
                    var relX = (e.clientX - rect.left) / rect.width;
                    var relY = (e.clientY - rect.top) / rect.height;
                    rotateYTo((relX - 0.5) * maxTilt * 2);
                    rotateXTo(-(relY - 0.5) * maxTilt * 2);
                });

                card.addEventListener('mouseleave', function () {
                    rotateXTo(0);
                    rotateYTo(0);
                });
            });
        }

        initMagneticButtons();
        initCardTilt();
```

(Replace the old lone `initMagneticButtons();` call line from Task 1 with these two lines.)

- [ ] **Step 2: Verify in the browser**

- Reload (cache-busted: `preview_eval` `fetch(location.href, {cache:'reload'})` then `location.reload()`). Console errors: must be empty.
- `preview_eval`: `document.querySelectorAll('#projetos .case-study, #projetos .card').length` — expected: `2` (the SENAI case study, the Ultralino card).
- Baseline: `getComputedStyle(document.querySelector('#projetos .case-study')).transform` — expected: `"none"`.
- Dispatch a synthetic `mousemove` at a point offset from the card's center (e.g. near a corner, via `getBoundingClientRect()`), then (separate `preview_eval` call) read `transform` again — expected: a `matrix3d(...)` (confirms 3D rotation is applied, not just a 2D translate).
- Dispatch `mouseleave`, re-check — expected: eases back toward `"none"`/identity.
- Code-inspection check: confirm `initCardTilt` has the same `if (!window.gsap || !canHover || prefersReduced) return;` guard as its first line.
- Screenshot the Projects section at desktop width to confirm the cards still read normally at rest (no stuck rotation).

- [ ] **Step 3: Commit**

```bash
git add assets/js/interactive-effects.js
git commit -m "Adiciona tilt 3D aos cards de Projects"
```

---

## Task 3: Theme-toggle circle-reveal transition

**Files:**
- Modify: `assets/js/theme.js` (wrap the toggle click handler)
- Modify: `assets/css/styles.css` (view-transition rules)

**Interfaces:**
- Consumes: nothing from Tasks 1–2 (fully independent).
- Produces: nothing consumed by later tasks in this plan.

- [ ] **Step 1: Wrap the theme-toggle click handler in `assets/js/theme.js`**

Replace:

```js
    document.addEventListener('DOMContentLoaded', function () {
        applyTheme(getPreferredTheme());
        var btn = document.querySelector('.theme-toggle');
        if (btn) btn.addEventListener('click', toggleTheme);
    });
```

with:

```js
    function animateThemeToggle(x, y) {
        var endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );
        root.style.setProperty('--theme-toggle-x', x + 'px');
        root.style.setProperty('--theme-toggle-y', y + 'px');
        root.style.setProperty('--theme-toggle-radius', endRadius + 'px');
        document.startViewTransition(toggleTheme);
    }

    document.addEventListener('DOMContentLoaded', function () {
        applyTheme(getPreferredTheme());
        var btn = document.querySelector('.theme-toggle');
        if (!btn) return;
        btn.addEventListener('click', function (e) {
            var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!document.startViewTransition || prefersReduced) {
                toggleTheme();
                return;
            }
            animateThemeToggle(e.clientX, e.clientY);
        });
    });
```

- [ ] **Step 2: Add the view-transition CSS**

Append to `assets/css/styles.css` (after the existing `.theme-toggle` rules at the end of the file):

```css
/* ========== Transição de tema ========== */
::view-transition-old(root) {
    animation: none;
}

::view-transition-new(root) {
    animation: theme-circle-reveal .5s ease forwards;
    clip-path: circle(0px at var(--theme-toggle-x, 50%) var(--theme-toggle-y, 50%));
}

@keyframes theme-circle-reveal {
    to {
        clip-path: circle(var(--theme-toggle-radius, 150%) at var(--theme-toggle-x, 50%) var(--theme-toggle-y, 50%));
    }
}
```

- [ ] **Step 3: Verify in the browser**

- Reload (cache-busted). Console errors: must be empty.
- `preview_eval`: `typeof document.startViewTransition` — note the result (`"function"` in Chromium-based preview browsers; if `"undefined"`, the fallback path is what gets exercised below — either is a valid environment, just note which).
- Click `.theme-toggle` (`preview_click` on `.theme-toggle`, or `preview_eval` dispatching a `click` `MouseEvent` with explicit `clientX`/`clientY` at the button's center so the coordinates feed `animateThemeToggle`). After the click, `preview_eval`: `document.documentElement.getAttribute('data-theme')` — expected: flipped from its value before the click.
- If `document.startViewTransition` exists: `preview_eval`: `document.documentElement.style.getPropertyValue('--theme-toggle-x')` — expected: a non-empty `"<number>px"` string, confirming the coordinates were captured before the transition started.
- Click `.theme-toggle` again — expected: flips back, `--theme-toggle-x`/`-y`/`-radius` update to the new click position.
- Code-inspection check: confirm the `if (!document.startViewTransition || prefersReduced) { toggleTheme(); return; }` fallback is present and precedes any call to `animateThemeToggle`.
- Screenshot before/after a toggle in both directions to confirm the end state (full page in the new theme) looks correct — the transition itself is a browser-compositor effect that a static screenshot after the fact won't capture, but the settled result must be correct.

- [ ] **Step 4: Commit**

```bash
git add assets/js/theme.js assets/css/styles.css
git commit -m "Adiciona transicao de circulo ao trocar de tema"
```

---

## Task 4: Terminal element in Hero

**Files:**
- Modify: `index.html` (terminal markup)
- Modify: `assets/css/styles.css` (`.hero-terminal` styles)
- Modify: `assets/js/i18n.js` (3 new keys × 4 languages)
- Modify: `assets/js/interactive-effects.js` (add `initTerminal`)

**Interfaces:**
- Consumes: `prefersReduced` from Task 1's `DOMContentLoaded` handler scope (does not need `canHover` — the terminal works the same on touch and desktop).
- Produces: nothing consumed by later tasks in this plan.

- [ ] **Step 1: Add the terminal markup to `index.html`**

Insert this block inside `.hero .container`, immediately after the closing `</div>` of `.cta` and before the closing `</div>` of `.container`:

```html
                <div class="cta">
                    <a class="btn primary" href="#projetos" data-i18n="hero.cta.projects">See projects</a>
                    <a class="btn outline" href="assets/cv/Gabriel-Viana-Nunes-CV.pdf" download
                        data-i18n="hero.cta.cv">Download CV</a>
                    <a class="btn outline" href="https://github.com/GabrielVianaNunes" target="_blank"
                        rel="noopener noreferrer">GitHub</a>
                </div>
                <div class="hero-terminal" aria-hidden="true">
                    <p class="hero-terminal-line"><span class="hero-terminal-prompt">guest@portfolio:~$</span> <span class="hero-terminal-cmd" data-cmd="whoami"></span></p>
                    <p class="hero-terminal-line hero-terminal-output is-pending" data-i18n="hero.terminal.whoami">Gabriel Nunes — Full-Stack Software Engineer</p>
                    <p class="hero-terminal-line"><span class="hero-terminal-prompt">guest@portfolio:~$</span> <span class="hero-terminal-cmd" data-cmd="cat stack.txt"></span></p>
                    <p class="hero-terminal-line hero-terminal-output is-pending" data-i18n="hero.terminal.stack">Java · Spring Boot · Angular · TypeScript · PostgreSQL</p>
                    <p class="hero-terminal-line"><span class="hero-terminal-prompt">guest@portfolio:~$</span> <span class="hero-terminal-cmd" data-cmd="./status.sh"></span><span class="hero-terminal-cursor" aria-hidden="true">_</span></p>
                    <p class="hero-terminal-line hero-terminal-output is-pending" data-i18n="hero.terminal.status">✓ available for remote &amp; international opportunities</p>
                </div>
```

(`aria-hidden="true"` on the whole block: this is a decorative echo of the Hero's badge/headline/lead/location, which are already accessible as real text — matches the existing `.section-parallax` blobs' accessibility treatment.)

- [ ] **Step 2: Add the `.hero-terminal` CSS**

Append to `assets/css/styles.css` (after the Task 3 view-transition rules):

```css
/* ========== Terminal do Hero ========== */
.hero-terminal {
    margin-top: 1.5rem;
    padding: 1rem 1.25rem;
    max-width: 46ch;
    border-radius: .75rem;
    border: 1px solid var(--border);
    background: var(--surface);
    font-family: var(--mono);
    font-size: .85rem;
}

.hero-terminal-line {
    margin: 0 0 .5rem;
    white-space: pre-wrap;
    word-break: break-word;
}

.hero-terminal-line:last-child {
    margin-bottom: 0;
}

.hero-terminal-prompt {
    color: var(--primary);
    margin-right: .4rem;
}

.hero-terminal-output {
    color: var(--muted);
}

.hero-terminal-output.is-pending {
    visibility: hidden;
}

.hero-terminal-cursor {
    display: inline-block;
    margin-left: .15rem;
    animation: hero-terminal-blink 1s steps(1) infinite;
}

@keyframes hero-terminal-blink {
    50% {
        opacity: 0;
    }
}
```

- [ ] **Step 3: Add the three i18n keys to all four languages in `assets/js/i18n.js`**

In the `en` block, after `'hero.cta.cv': 'Download CV',` and before `'about.title': 'About me',`, insert:

```js
            'hero.terminal.whoami': 'Gabriel Nunes — Full-Stack Software Engineer',
            'hero.terminal.stack': 'Java · Spring Boot · Angular · TypeScript · PostgreSQL',
            'hero.terminal.status': '✓ available for remote & international opportunities',
```

In the `pt` block, after `'hero.cta.cv': 'Baixar currículo',` and before `'about.title': 'Sobre mim',`, insert:

```js
            'hero.terminal.whoami': 'Gabriel Nunes — Engenheiro de Software Full Stack',
            'hero.terminal.stack': 'Java · Spring Boot · Angular · TypeScript · PostgreSQL',
            'hero.terminal.status': '✓ disponível para oportunidades remotas e internacionais',
```

In the `de` block, after `'hero.cta.cv': 'Lebenslauf herunterladen',` and before `'about.title': 'Über mich',`, insert:

```js
            'hero.terminal.whoami': 'Gabriel Nunes — Full-Stack-Softwareentwickler',
            'hero.terminal.stack': 'Java · Spring Boot · Angular · TypeScript · PostgreSQL',
            'hero.terminal.status': '✓ verfügbar für Remote- und internationale Möglichkeiten',
```

In the `es` block, after `'hero.cta.cv': 'Descargar CV',` and before `'about.title': 'Sobre mí',`, insert:

```js
            'hero.terminal.whoami': 'Gabriel Nunes — Ingeniero de Software Full Stack',
            'hero.terminal.stack': 'Java · Spring Boot · Angular · TypeScript · PostgreSQL',
            'hero.terminal.status': '✓ disponible para oportunidades remotas e internacionales',
```

- [ ] **Step 4: Add `initTerminal` to `assets/js/interactive-effects.js`**

Add this function inside the existing `DOMContentLoaded` handler (after `initCardTilt`'s definition), and call it right after `initCardTilt();`:

```js
        function typeText(el, text, charDelay, onDone) {
            var i = 0;
            el.textContent = '';
            var timer = setInterval(function () {
                i++;
                el.textContent = text.slice(0, i);
                if (i >= text.length) {
                    clearInterval(timer);
                    if (onDone) onDone();
                }
            }, charDelay);
        }

        function initTerminal() {
            var terminal = document.querySelector('.hero-terminal');
            if (!terminal) return;
            var cmds = terminal.querySelectorAll('.hero-terminal-cmd');
            var outputs = terminal.querySelectorAll('.hero-terminal-output');

            if (prefersReduced) {
                cmds.forEach(function (cmd) { cmd.textContent = cmd.getAttribute('data-cmd'); });
                outputs.forEach(function (out) { out.classList.remove('is-pending'); });
                return;
            }

            var pairs = [];
            for (var i = 0; i < cmds.length; i++) {
                pairs.push({ cmd: cmds[i], output: outputs[i] });
            }

            function runPair(index) {
                if (index >= pairs.length) return;
                var pair = pairs[index];
                typeText(pair.cmd, pair.cmd.getAttribute('data-cmd'), 45, function () {
                    setTimeout(function () {
                        pair.output.classList.remove('is-pending');
                        setTimeout(function () { runPair(index + 1); }, 400);
                    }, 200);
                });
            }

            runPair(0);
        }

        initMagneticButtons();
        initCardTilt();
        initTerminal();
```

(Replace the old two-line `initMagneticButtons(); initCardTilt();` call block from Task 2 with these three lines.)

- [ ] **Step 5: Verify in the browser**

- Reload (cache-busted). Console errors: must be empty.
- `preview_eval`: `document.querySelectorAll('.hero-terminal-cmd').length` — expected: `3`.
- Immediately after load: `preview_eval`: `document.querySelector('.hero-terminal-cmd').textContent` — expected: not yet the full `"whoami"` (typing in progress), or already there if the round-trip was slow — either is acceptable, this is just confirming the element exists and typing has started.
- Wait ~3s total (three commands × up to ~15 characters × 45ms, plus 600ms pause between each — comfortably under 3s), then `preview_eval`: `Array.from(document.querySelectorAll('.hero-terminal-cmd')).map(function(c){return c.textContent})` — expected: `["whoami", "cat stack.txt", "./status.sh"]`.
- Same check for outputs: `Array.from(document.querySelectorAll('.hero-terminal-output')).every(function(o){return !o.classList.contains('is-pending')})` — expected: `true`.
- `preview_eval`: confirm the output text matches the current language: `document.querySelectorAll('.hero-terminal-output')[0].textContent` — expected: matches `hero.terminal.whoami` for whatever language is active (default `en`: `"Gabriel Nunes — Full-Stack Software Engineer"`).
- Switch language via the `.lang-toggle` dropdown to `pt` (click `.lang-toggle`, then the `pt` `.lang-option`), then re-check `document.querySelectorAll('.hero-terminal-output')[0].textContent` — expected: updates instantly to `"Gabriel Nunes — Engenheiro de Software Full Stack"` (confirms the existing `data-i18n` mechanism picks up the terminal's output lines with no extra code, since language switching was not touched by this task).
- Code-inspection check: confirm the `if (prefersReduced) { ...; return; }` branch sets both `cmd.textContent` and removes `is-pending` from every output, before any `typeText`/`setTimeout` call.
- Screenshot the Hero at desktop width, once fully typed, to confirm the terminal block reads cleanly below the CTA row with no layout jump (compare against a screenshot taken immediately on load — the terminal's box should already occupy its final size in both).

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/styles.css assets/js/i18n.js assets/js/interactive-effects.js
git commit -m "Adiciona terminal decorativo com efeito de digitacao no Hero"
```

---

## Task 5: Final audit — reduced motion, touch guard, full regression

**Files:** none created — this task verifies the assembled feature and fixes anything it surfaces (fixes land in whichever file needs them).

**Interfaces:** consumes everything from Tasks 1–4.

- [ ] **Step 1: Reduced-motion full pass (code inspection)**

`prefers-reduced-motion` can't be toggled live in the Preview tool. Verify by reading the full shipped `assets/js/interactive-effects.js` and the modified `assets/js/theme.js`:
- Confirm `initMagneticButtons`, `initCardTilt` both `return` before any `gsap`/event-listener call when `prefersReduced` is `true`.
- Confirm `initTerminal`'s `prefersReduced` branch sets every command's final text and removes `is-pending` from every output, with no `typeText`/`setTimeout` call reachable in that branch.
- Confirm the theme-toggle click handler checks `prefersReduced` (freshly, at click time — not a stale module-scope constant, since the user could change their OS setting between page load and a later click) and falls back to a direct `toggleTheme()` call with no `startViewTransition`.

- [ ] **Step 2: Touch / coarse-pointer guard pass**

`(hover: hover) and (pointer: fine)` also can't be forced live in the Preview tool (`preview_resize` changes viewport dimensions, not pointer/hover capability — a desktop headless browser reports `hover: hover` and `pointer: fine` regardless of viewport width). Verify by code inspection: confirm `initMagneticButtons` and `initCardTilt` both check `canHover` (computed once from the matchMedia query) before doing anything, and that `initTerminal` does NOT check `canHover` (it must run identically on touch, per the design).

- [ ] **Step 3: Full regression pass**

With everything loaded at desktop width, using the Preview tool:
- Theme toggle: click it twice (there and back), confirm `data-theme` flips both times and the whole page (button colors, terminal border/prompt colors, card borders) recolors correctly with no console errors.
- Language dropdown: switch through `de`/`es`/`en`/`pt`, confirm the terminal's three output lines update correctly in each language (not just the one checked in Task 4), and that switching language doesn't restart the typing animation or re-hide already-revealed lines.
- Magnetic buttons + tilt cards: re-run the Task 1/Task 2 mousemove/mouseleave checks once more now that all four tasks are merged, to catch any interference between the effects (e.g. confirm hovering a `.btn` inside `.cta` doesn't trigger `.case-study`'s tilt, and vice versa — they're disjoint element sets, but verify the disjointness held after Task 4's markup changes).
- Mobile hamburger menu and active-nav-on-scroll: confirm both still function (neither was touched by this plan, but confirm no interference from the new script/CSS).
- Mobile pass: `preview_resize` to `mobile` (375×812), reload, confirm no horizontal scrollbar (`document.documentElement.scrollWidth <= document.documentElement.clientWidth`), confirm the terminal renders legibly and the typing sequence still completes (only the hover-driven effects are desktop-only; the terminal is not).
- Network tab: confirm zero `404`s.
- Console: confirm zero errors across the entire pass, at both viewport sizes, in both themes, in all four languages.

- [ ] **Step 4: Fix anything Steps 1–3 surfaced**

If any check fails, fix it directly in the relevant file and re-run the specific check that failed until it passes. Do not move on with a known failure.

- [ ] **Step 5: Update `PROJECT_STATUS.md`**

Add a new dated entry (mirroring the style of the existing "Sessão scroll storytelling" entry): magnetic buttons on all `.btn` CTAs, 3D tilt on Projects cards, a circle-reveal theme-toggle transition via the native View Transitions API, and a typewriter terminal block in the Hero with i18n'd output. Note that this completes all four items previously listed as non-goals in the 2026-07-08 round.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "Ajustes finais de auditoria dos efeitos interativos (reduced-motion, touch, regressao)"
```

(Only commit if Steps 4–5 produced changes beyond `PROJECT_STATUS.md` — the `PROJECT_STATUS.md` update always produces a change, so this commit always has at least that.)

---

## Reminder

Do not run `git push` for any task above — the user pushes when ready.
