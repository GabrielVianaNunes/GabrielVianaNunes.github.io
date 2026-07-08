# Scroll Storytelling & Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Layer GSAP/ScrollTrigger-driven scroll animations (progress bar, per-section parallax, staggered cascade reveals, a scroll-linked timeline draw-in) onto the existing minimalist portfolio, replacing the old simple fade-in system, without changing colors/typography/layout.

**Architecture:** All new behavior lives in one new self-initializing module, `assets/js/scroll-effects.js`, loaded after the existing three scripts and after GSAP/ScrollTrigger (both via CDN `<script>` tags, no bundler). The old `data-reveal` + `IntersectionObserver` fade system in `main.js`/`styles.css`/`index.html` is removed outright — the new module supersedes it via direct CSS-selector targeting, no attribute needed.

**Tech Stack:** GSAP 3.12.5 core + ScrollTrigger plugin (CDN, jsdelivr), vanilla JS (ES2017, matches existing modules' style), plain CSS.

## Global Constraints

- No build tools, bundlers, or frameworks — plain HTML/CSS/JS only, GSAP added via CDN `<script>` tags exactly like the existing devicon/flag-icons links.
- No visual/branding redesign — reuse existing tokens (`--primary`, `--ring`, `--border`, `--bg`, `--surface`, `--muted`) and layout; this plan only adds motion.
- Out of scope (do not build): magnetic buttons, 3D card tilts, animated theme-toggle transition, terminal/code-typing element. These may become a separate future plan.
- All animations must respect `prefers-reduced-motion: reduce` — skip all GSAP-driven motion, show final visible state immediately. The progress bar keeps functioning (no easing) since it's a state indicator, not decorative.
- Parallax is disabled below a `768px` viewport width (checked once on load) — cascade reveals, the progress bar, and the timeline draw-in stay active on mobile.
- No `git push` — the user pushes when ready; this plan's tasks only commit locally.
- There is no automated test suite for this static site. Every task's verification step uses the Preview tool (browser-based checks: screenshot, console logs, `preview_eval` DOM/computed-style assertions) exactly as established in the prior redesign plan (`docs/superpowers/plans/2026-07-06-portfolio-redesign.md`).

---

## Task 1: Foundation — GSAP/ScrollTrigger scripts, module skeleton, progress bar, remove old reveal system

**Files:**
- Modify: `index.html` (script tags, add progress-bar element)
- Modify: `assets/css/styles.css` (remove `[data-reveal]` rules, add `.scroll-progress`)
- Modify: `assets/js/main.js` (remove `initScrollReveal`)
- Create: `assets/js/scroll-effects.js`

**Interfaces:**
- Produces: `assets/js/scroll-effects.js` IIFE that self-initializes on `DOMContentLoaded`, guarded by `if (!window.gsap || !window.ScrollTrigger) return;` at the top of the handler. Exposes module-scope `prefersReduced` (boolean) and `isMobile` (boolean) constants that Tasks 2–7 read when adding their own init functions inside this same file. Later tasks add new `function initX() {...}` blocks and a matching call inside the existing `DOMContentLoaded` listener — they do not create a second listener.

- [ ] **Step 1: Remove the old `data-reveal` attributes from `index.html`**

There are 6 occurrences. Remove `data-reveal` from all of them (keep every other attribute/class unchanged):
- Line ~152: `<li class="timeline-item" data-reveal>` → `<li class="timeline-item">`
- Line ~164: `<li class="timeline-item" data-reveal>` → `<li class="timeline-item">`
- Line ~177: `<li class="timeline-item" data-reveal>` → `<li class="timeline-item">`
- Line ~191: `<li class="timeline-item timeline-item--featured" data-reveal>` → `<li class="timeline-item timeline-item--featured">`
- Line ~427: `<article class="case-study case-study--featured" data-reveal>` → `<article class="case-study case-study--featured">`
- Line ~462: `<article class="card" data-reveal>` → `<article class="card">`

- [ ] **Step 2: Remove `initScrollReveal` from `assets/js/main.js`**

Replace the full file content with:

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
        initActiveNav();
    });
})();
```

- [ ] **Step 3: Remove the `[data-reveal]` CSS rules from `assets/css/styles.css`**

Delete this block entirely:

```css
/* ========== Scroll reveal ========== */
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

- [ ] **Step 4: Add the progress-bar CSS**

Add this in its place (same location, so the section comment still marks this area of the file):

```css
/* ========== Scroll effects ========== */
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--primary);
    z-index: 50;
    pointer-events: none;
}
```

- [ ] **Step 5: Add the progress-bar element to `index.html`**

Right after the opening `<body>` tag, before the skip-link:

```html
<body>
    <div class="scroll-progress" aria-hidden="true"></div>
    <a class="skip-link" href="#conteudo" data-i18n="skip.link">Skip to content</a>
```

- [ ] **Step 6: Add the GSAP/ScrollTrigger CDN scripts and the new module script tag**

Replace the existing three script tags at the bottom of `index.html`:

```html
    <script src="assets/js/main.js" defer></script>
    <script src="assets/js/i18n.js" defer></script>
    <script src="assets/js/theme.js" defer></script>
```

with:

```html
    <script src="assets/js/main.js" defer></script>
    <script src="assets/js/i18n.js" defer></script>
    <script src="assets/js/theme.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
    <script src="assets/js/scroll-effects.js" defer></script>
```

- [ ] **Step 7: Create `assets/js/scroll-effects.js`**

```js
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        if (!window.gsap || !window.ScrollTrigger) return;
        gsap.registerPlugin(ScrollTrigger);

        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var isMobile = window.matchMedia('(max-width: 768px)').matches;

        function initProgressBar() {
            var bar = document.querySelector('.scroll-progress');
            if (!bar) return;
            ScrollTrigger.create({
                trigger: document.documentElement,
                start: 'top top',
                end: 'bottom bottom',
                onUpdate: function (self) {
                    bar.style.width = (self.progress * 100) + '%';
                }
            });
        }

        initProgressBar();
    });
})();
```

- [ ] **Step 8: Verify in the browser**

Use the Preview tool (`preview_start` with server name `"portfolio"`).
- Reload the page. Check console logs (errors only): must be empty (confirms GSAP/ScrollTrigger loaded and `gsap.registerPlugin` didn't throw).
- `preview_eval`: `window.scrollTo(0, document.body.scrollHeight / 2)` (first call, just scrolls).
- `preview_eval`: `document.querySelector('.scroll-progress').style.width` (second, separate call — the round-trip between calls gives ScrollTrigger's ticker time to fire) — expected: a non-zero, non-`"0%"` percentage, roughly around `"50%"`.
- `preview_eval`: `window.scrollTo(0, 0)` to reset, then a separate `preview_eval` confirming `.scroll-progress` width returns to `"0%"`.
- Confirm the old fade-in classes are gone: `preview_eval`: `document.querySelectorAll('[data-reveal]').length` — expected: `0`.
- Confirm the site otherwise still works: sections are all visible immediately (no more fade-in, which is expected — that system was just removed and the cascade replacement isn't built until Task 3+), theme toggle and language dropdown still function (click each, confirm they still work — this proves `main.js`'s edit didn't break anything).

- [ ] **Step 9: Commit**

```bash
git add index.html assets/css/styles.css assets/js/main.js assets/js/scroll-effects.js
git commit -m "Adiciona GSAP/ScrollTrigger, barra de progresso e remove sistema antigo de fade-in"
```

---

## Task 2: Parallax background layers

**Files:**
- Modify: `index.html` (add `.section-parallax` div as first child of `.hero` and each `.section`)
- Modify: `assets/css/styles.css` (`.section`/`.hero`/`.container` positioning, `.section-parallax` styles)
- Modify: `assets/js/scroll-effects.js` (add `initParallax`)

**Interfaces:**
- Consumes: `prefersReduced`, `isMobile` from Task 1's `DOMContentLoaded` handler scope.
- Produces: `.section-parallax` markup/class contract that this task's own `initParallax` reads — no other task depends on this.

- [ ] **Step 1: Add `position: relative` to `.section`, `.hero`, and `.container`**

In `assets/css/styles.css`, modify:

```css
.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1rem;
}
```
to:
```css
.container {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1rem;
}
```

And modify:
```css
.section {
    padding: 3rem 0;
}
```
to:
```css
.section {
    position: relative;
    padding: 3rem 0;
}
```

And modify:
```css
.hero {
    padding: 4rem 0 3rem;
    background: linear-gradient(180deg, var(--surface), transparent);
    border-bottom: 1px solid var(--border);
}
```
to:
```css
.hero {
    position: relative;
    padding: 4rem 0 3rem;
    background: linear-gradient(180deg, var(--surface), transparent);
    border-bottom: 1px solid var(--border);
}
```

- [ ] **Step 2: Add the `.section-parallax` CSS**

Append to `assets/css/styles.css` (after the `.scroll-progress` rule added in Task 1):

```css
.section-parallax {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
}

.section-parallax::before {
    content: "";
    position: absolute;
    top: 10%;
    right: -10%;
    width: 480px;
    height: 480px;
    max-width: 60vw;
    max-height: 60vw;
    border-radius: 50%;
    background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
    opacity: .12;
    filter: blur(60px);
}
```

- [ ] **Step 3: Add the `.section-parallax` element to each section in `index.html`**

Add `<div class="section-parallax" aria-hidden="true"></div>` as the **first** child inside `.hero` and inside each `<section class="section">` (i.e. right after the opening tag, before `<div class="container">`). There are 6 sections total: `.hero`, `#sobre`, `#experiencia`, `#habilidades`, `#projetos`, `#contato`.

For example, the hero opening changes from:
```html
        <section class="hero">
            <div class="container">
```
to:
```html
        <section class="hero">
            <div class="section-parallax" aria-hidden="true"></div>
            <div class="container">
```

Apply the same pattern (insert the `.section-parallax` div as the first child, immediately after the section's own opening tag and before its `.container`) to `#sobre`, `#experiencia`, `#habilidades`, `#projetos`, and `#contato`.

- [ ] **Step 4: Add `initParallax` to `assets/js/scroll-effects.js`**

Add this function inside the existing `DOMContentLoaded` handler (after `initProgressBar`'s definition, before the `initProgressBar();` call line), and call it right after `initProgressBar();`:

```js
        function initParallax() {
            if (prefersReduced || isMobile) return;
            document.querySelectorAll('.section-parallax').forEach(function (blob) {
                var section = blob.parentElement;
                if (!section) return;
                gsap.to(blob, {
                    y: function () { return section.offsetHeight * 0.2; },
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });
        }

        initProgressBar();
        initParallax();
```

(Replace the old lone `initProgressBar();` call line with these two lines.)

- [ ] **Step 5: Verify in the browser**

- Reload. Console errors: must be empty.
- `preview_eval`: `document.querySelectorAll('.section-parallax').length` — expected: `6`.
- Resize to desktop width (`preview_resize` preset `"desktop"`). Scroll down partway (`preview_eval`: `window.scrollTo(0, 800)`), then read a blob's computed transform: `preview_eval`: `getComputedStyle(document.querySelectorAll('.section-parallax')[1]).transform` — expected: not `"none"` (confirms GSAP is applying a translate).
- Resize to mobile (`preview_resize` preset `"mobile"`), reload the page (parallax mobile-check runs once on load), scroll down, and confirm the same blob's transform stays `"none"` (parallax correctly disabled below 768px). Confirm no horizontal scrollbar appears on mobile (the blobs must not cause overflow — `document.documentElement.scrollWidth <= document.documentElement.clientWidth`).
- Screenshot at desktop width on both themes (toggle `.theme-toggle`) to confirm the blobs read as a subtle, on-brand depth effect, not a distracting blob.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/styles.css assets/js/scroll-effects.js
git commit -m "Adiciona parallax sutil de fundo em todas as secoes principais"
```

---

## Task 3: Cascade reveal helper + Hero

**Files:**
- Modify: `assets/js/scroll-effects.js` (add `revealGroup` helper + call for Hero)

**Interfaces:**
- Consumes: `prefersReduced` from Task 1.
- Produces: `revealGroup(container, itemSelector, staggerAmount)` — a reusable function in `scroll-effects.js`'s module scope. Tasks 4 and 5 call this exact function (same name, same 3 parameters, same behavior) for their own sections; they do not redefine it.

- [ ] **Step 1: Add the `revealGroup` helper and the Hero call**

Add this function inside the `DOMContentLoaded` handler (after `initParallax`'s definition), and call it once for the Hero group right after the `initParallax();` line:

```js
        function revealGroup(container, itemSelector, staggerAmount) {
            if (!container) return;
            var items = container.querySelectorAll(itemSelector);
            if (!items.length) return;
            if (prefersReduced) {
                items.forEach(function (el) { el.style.opacity = 1; });
                return;
            }
            gsap.set(items, { opacity: 0, y: 16 });
            gsap.to(items, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                stagger: staggerAmount || 0.07,
                scrollTrigger: {
                    trigger: container,
                    start: 'top 85%',
                    once: true
                }
            });
        }

        initProgressBar();
        initParallax();
        revealGroup(document.querySelector('.hero .container'), '.badge, h1, .lead, .location, .cta', 0.1);
```

(Replace the old `initProgressBar(); initParallax();` two-line call block from Task 2 with these three lines.)

- [ ] **Step 2: Verify in the browser**

- Reload with cache disabled (`preview_eval`: `location.href = '/?cb=' + Date.now()`, since this session's server has shown stale-cache behavior before — see prior task reports if unsure).
- Console errors: must be empty.
- `preview_eval` immediately after load: `getComputedStyle(document.querySelector('.hero .badge')).opacity` — expected: `"0"` (hasn't scrolled into trigger range yet is not applicable since Hero is above the fold at load — instead expected: starts at `"0"` then check again after a short delay since Hero's own top is within the first 85% of viewport at load, so the animation should fire almost immediately). Wait ~700ms (`preview_eval` a second time after a `setTimeout`), then confirm `getComputedStyle(document.querySelector('.hero .badge')).opacity` is `"1"` and the headline `getComputedStyle(document.querySelector('.hero h1')).opacity` is also `"1"`.
- Confirm stagger ordering: the badge should reach opacity 1 at an earlier timestamp than the CTA row, but this is hard to assert precisely via `preview_eval` — instead just confirm both are visible by 1 second after load, and screenshot the Hero to visually confirm badge/headline/lead/location/buttons are all shown normally (no stuck-invisible elements).

- [ ] **Step 3: Commit**

```bash
git add assets/js/scroll-effects.js
git commit -m "Adiciona helper de cascata (revealGroup) e aplica no Hero"
```

---

## Task 4: Cascade — About and Contact

**Files:**
- Modify: `assets/js/scroll-effects.js`

**Interfaces:**
- Consumes: `revealGroup(container, itemSelector, staggerAmount)` from Task 3.

- [ ] **Step 1: Add the About and Contact `revealGroup` calls**

Add these two lines right after the Hero `revealGroup` call from Task 3:

```js
        revealGroup(document.querySelector('#sobre .container > div:first-child'), 'p', 0.08);
        revealGroup(document.querySelector('.contact'), 'li', 0.07);
```

- [ ] **Step 2: Verify in the browser**

- Reload (cache-busted as in Task 3). Console errors: must be empty.
- Scroll to About (`preview_eval`: `document.querySelector('#sobre').scrollIntoView()`), wait ~500ms, then confirm all 3 paragraphs are visible: `preview_eval`: `Array.from(document.querySelectorAll('#sobre .container > div:first-child p')).map(function(p){return getComputedStyle(p).opacity})` — expected: `["1","1","1"]`. Confirm the portrait `<figure>` is unaffected (still visible, no opacity applied to it — it was never targeted).
- Scroll to Contact (`preview_eval`: `document.querySelector('#contato').scrollIntoView()`), wait ~500ms, confirm: `preview_eval`: `Array.from(document.querySelectorAll('.contact li')).map(function(li){return getComputedStyle(li).opacity})` — expected: all `"1"`.
- Screenshot both sections to visually confirm nothing looks broken or stuck invisible.

- [ ] **Step 3: Commit**

```bash
git add assets/js/scroll-effects.js
git commit -m "Aplica cascata de revelacao nas secoes About e Contato"
```

---

## Task 5: Cascade — Skills (categories, soft skills, languages)

**Files:**
- Modify: `assets/js/scroll-effects.js`

**Interfaces:**
- Consumes: `revealGroup(container, itemSelector, staggerAmount)` from Task 3.

- [ ] **Step 1: Add the Skills-section `revealGroup` calls**

Add these lines right after the Contact `revealGroup` call from Task 4:

```js
        document.querySelectorAll('#habilidades .skills-icons').forEach(function (ul) {
            revealGroup(ul, 'li', 0.05);
        });
        revealGroup(document.querySelector('.skills-soft'), 'li', 0.06);
        revealGroup(document.querySelector('.lang-grid'), '.lang-card', 0.08);
```

- [ ] **Step 2: Verify in the browser**

- Reload (cache-busted). Console errors: must be empty.
- Scroll to Skills (`preview_eval`: `document.querySelector('#habilidades').scrollIntoView()`), wait ~500ms.
- `preview_eval`: `document.querySelectorAll('#habilidades .skills-icons').length` — expected: `5` (Backend, Frontend, Database, Tools, Other competencies) — confirms each category is being targeted as its own group.
- `preview_eval`: check one category's items are all visible: `Array.from(document.querySelectorAll('#habilidades .skills-icons')[0].querySelectorAll('li')).every(function(li){return getComputedStyle(li).opacity === "1"})` — expected: `true`.
- Scroll further to reach Soft Skills and Languages (`preview_eval`: `document.querySelector('.lang-grid').scrollIntoView()`), wait ~500ms, confirm: `Array.from(document.querySelectorAll('.lang-grid .lang-card')).every(function(c){return getComputedStyle(c).opacity === "1"})` — expected: `true`. Same check for `.skills-soft li`.
- Screenshot the full Skills section to confirm visually nothing is stuck invisible and the categories still look organized (this section has the most items — verify there's no overwhelming flicker or layout shift).

- [ ] **Step 3: Commit**

```bash
git add assets/js/scroll-effects.js
git commit -m "Aplica cascata de revelacao na secao Skills (categorias, soft skills, idiomas)"
```

---

## Task 6: Cascade — Projects (case study + card, tags follow)

**Files:**
- Modify: `assets/js/scroll-effects.js`

**Interfaces:**
- Consumes: `prefersReduced` from Task 1. Does NOT use `revealGroup` — this needs a nested two-stage timeline (card reveals, then its tags), which `revealGroup` doesn't support.

- [ ] **Step 1: Add the Projects reveal logic**

Add this function and its call, right after the Skills `revealGroup` calls from Task 5:

```js
        function initProjectCards() {
            document.querySelectorAll('#projetos .case-study, #projetos .card').forEach(function (card) {
                var tags = card.querySelectorAll('.tags li');
                if (prefersReduced) {
                    card.style.opacity = 1;
                    tags.forEach(function (t) { t.style.opacity = 1; });
                    return;
                }
                gsap.set(card, { opacity: 0, y: 16 });
                gsap.set(tags, { opacity: 0, y: 8 });
                var tl = gsap.timeline({
                    scrollTrigger: { trigger: card, start: 'top 85%', once: true }
                });
                tl.to(card, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
                if (tags.length) {
                    tl.to(tags, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, '-=0.2');
                }
            });
        }

        initProjectCards();
```

- [ ] **Step 2: Verify in the browser**

- Reload (cache-busted). Console errors: must be empty.
- Scroll to Projects (`preview_eval`: `document.querySelector('#projetos').scrollIntoView()`), wait ~800ms (nested timeline takes slightly longer).
- `preview_eval`: `getComputedStyle(document.querySelector('#projetos .case-study')).opacity` — expected: `"1"`.
- `preview_eval`: `Array.from(document.querySelector('#projetos .case-study').querySelectorAll('.tags li')).every(function(t){return getComputedStyle(t).opacity === "1"})` — expected: `true`.
- Same two checks for `#projetos .card` (the Ultralino card) and its `.tags li`.
- Screenshot to confirm both cards and their tag pills are fully visible, no partial/stuck-fading elements.

- [ ] **Step 3: Commit**

```bash
git add assets/js/scroll-effects.js
git commit -m "Adiciona cascata de revelacao nos cards de Projects com tags em sequencia"
```

---

## Task 7: Experience — per-item reveal + timeline line draw-in

**Files:**
- Modify: `index.html` (add `.timeline-line` element inside `.timeline`)
- Modify: `assets/css/styles.css` (`.timeline` no longer uses `border-left`; new `.timeline-line` styles)
- Modify: `assets/js/scroll-effects.js` (per-item reveal + line scrub animation)

**Interfaces:**
- Consumes: `prefersReduced` from Task 1.
- Produces: nothing consumed by later tasks (this is the last content task before the final audit).

- [ ] **Step 1: Add the `.timeline-line` element to `index.html`**

By this point, Task 1 Step 1 has already removed `data-reveal` from every `.timeline-item`, so the Experience section's timeline currently opens like this:

```html
                <ol class="timeline" role="list">
                    <li class="timeline-item">
```

Add the line element as the `<ol>`'s first child, right before the first `<li>`:

```html
                <ol class="timeline" role="list">
                    <span class="timeline-line" aria-hidden="true"></span>
                    <li class="timeline-item">
```

- [ ] **Step 2: Update the `.timeline` and add `.timeline-line` CSS**

In `assets/css/styles.css`, modify:

```css
.timeline {
    position: relative;
    list-style: none;
    margin: 2rem 0 0;
    padding: 0 0 0 1.5rem;
    border-left: 2px solid var(--border);
}
```

to (remove `border-left`, it's replaced by the new element):

```css
.timeline {
    position: relative;
    list-style: none;
    margin: 2rem 0 0;
    padding: 0 0 0 1.5rem;
}
```

Then add the new rule right after it:

```css
.timeline-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 0%;
    background: var(--border);
}
```

- [ ] **Step 3: Add per-item reveal and the line scrub animation to `scroll-effects.js`**

Add this function and its call, right after `initProjectCards();` from Task 6:

```js
        function initTimeline() {
            document.querySelectorAll('.timeline-item').forEach(function (item) {
                if (prefersReduced) {
                    item.style.opacity = 1;
                    return;
                }
                gsap.set(item, { opacity: 0, y: 16 });
                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: item, start: 'top 85%', once: true }
                });
            });

            var timeline = document.querySelector('.timeline');
            var line = document.querySelector('.timeline-line');
            if (!timeline || !line) return;
            if (prefersReduced) {
                line.style.height = '100%';
                return;
            }
            gsap.fromTo(line, { height: '0%' }, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: timeline,
                    start: 'top 70%',
                    end: 'bottom 60%',
                    scrub: true
                }
            });
        }

        initTimeline();
```

- [ ] **Step 4: Verify in the browser**

- Reload (cache-busted). Console errors: must be empty.
- `preview_eval`: `document.querySelector('.timeline-line')` — expected: not `null`.
- Scroll to Experience (`preview_eval`: `document.querySelector('#experiencia').scrollIntoView()`), wait ~500ms, confirm all 4 items visible: `Array.from(document.querySelectorAll('.timeline-item')).every(function(i){return getComputedStyle(i).opacity === "1"})` — expected: `true`.
- Check the line grows with scroll: `preview_eval`: `document.querySelector('.timeline-line').style.height` at the top of the section vs. after scrolling further down within the section (`preview_eval`: `window.scrollBy(0, 300)`, wait, re-check) — expected: the height percentage increases between the two reads.
- Toggle to dark theme and screenshot the Experience section to confirm the line and markers still look correct (line color `var(--border)` should adapt automatically via the existing token system).

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/js/scroll-effects.js
git commit -m "Adiciona revelacao por item e linha da timeline se desenhando ao rolar"
```

---

## Task 8: Final audit — reduced motion, mobile, full regression

**Files:** none created — this task verifies the assembled feature and fixes anything it surfaces (fixes land in whichever file needs them).

**Interfaces:** consumes everything from Tasks 1–7.

- [ ] **Step 1: Reduced-motion full pass**

Use the Preview tool. `prefers-reduced-motion` can't be toggled via `preview_resize`, so simulate it by checking the code path directly: `preview_eval`: temporarily override the matchMedia result isn't possible post-load (the check runs once at `DOMContentLoaded`), so instead reload with the emulated media feature if the Preview tool supports it, OR verify by code inspection: confirm every function added in Tasks 2–7 (`initParallax`, `revealGroup`, the Projects/Timeline functions) has its `if (prefersReduced) { ...set final visible state...; return; }` guard present and that no animation path is reachable when `prefersReduced` is `true`. Cross-check each guard sets `opacity: 1` (and for the timeline line, `height: '100%'`) with no leftover `transform`/`y` offset stuck mid-animation.

- [ ] **Step 2: Mobile pass**

`preview_resize` to `mobile` (375×812). Reload. Confirm:
- No horizontal scrollbar anywhere on the page (`document.documentElement.scrollWidth <= document.documentElement.clientWidth` at several scroll positions: top, middle, bottom).
- Parallax blobs present in DOM but with `transform: none` throughout scrolling (mobile-disabled, per Task 2).
- Cascade reveals, progress bar, and timeline line still animate normally on mobile (these stay active per the spec).
- Screenshot the Hero, Skills, and Experience sections at mobile width.

- [ ] **Step 3: Full regression pass**

With everything loaded at desktop width:
- Theme toggle: click it, confirm the whole page (including parallax blob colors, which use `var(--primary)`/`var(--border)`) adapts correctly to dark mode with no visual glitches.
- Language dropdown: switch to each of `de`/`es`/`en`/`pt` in turn, confirm text content still updates correctly (i18n untouched by this plan, but confirm no interference from the new scripts) and that switching language doesn't re-trigger or break any already-completed reveal animations (elements should stay visible, not flicker back to hidden).
- Mobile hamburger menu: open and close it, confirm still functions (Task 1 rewrote `main.js` — confirm `initMobileNav` truly wasn't altered in behavior).
- Active-nav-on-scroll: scroll through the whole page, confirm the nav still highlights the current section (Task 1 kept `initActiveNav` — confirm it still works end to end).
- Network tab: confirm the GSAP and ScrollTrigger CDN requests both return `200`, and there are no `404`s anywhere else.
- Console: confirm zero errors across this entire pass, at both viewport sizes and in both themes.

- [ ] **Step 4: Fix anything Steps 1–3 surfaced**

If any check fails, fix it directly in the relevant file and re-run the specific check that failed until it passes. Do not move on with a known failure.

- [ ] **Step 5: Update `PROJECT_STATUS.md`**

Add a new dated entry summarizing this feature (mirror the style of the existing "Sessão de reforma completa" entries): GSAP/ScrollTrigger added via CDN, old `data-reveal` fade system removed and replaced, progress bar, per-section parallax (desktop only), staggered cascade reveals across every section, Experience timeline line draw-in effect. Note the explicit non-goals from the spec (no magnetic buttons/3D tilts/theme-toggle transition/terminal element) so a future session doesn't assume they're already done.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "Ajustes finais de auditoria do scroll storytelling (reduced-motion, mobile, regressao)"
```

(Only commit if Steps 4–5 produced changes beyond `PROJECT_STATUS.md` — the `PROJECT_STATUS.md` update always produces a change, so this commit always has at least that.)

---

## Reminder

Do not run `git push` for any task above — the user pushes when ready.
