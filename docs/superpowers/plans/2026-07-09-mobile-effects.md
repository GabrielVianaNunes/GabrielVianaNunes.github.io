# Mobile Effects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add touch/mobile-native interaction effects (gyroscope card tilt, tap feedback, re-enabled parallax at mobile intensity, an animated hamburger menu) so the site's motion polish is felt on phones, not just desktop.

**Architecture:** Reuses the existing per-concern modules rather than adding a new file: pointer/touch effects go in the existing `assets/js/interactive-effects.js`, the parallax intensity change goes in the existing `assets/js/scroll-effects.js` (`initParallax`), the menu animation goes in the existing `assets/js/main.js` (`initMobileNav`) — the first change to that file across all three effect rounds.

**Tech Stack:** Already-loaded GSAP 3.12.5 core (`gsap.quickTo`, `gsap.timeline`), native `DeviceOrientationEvent` API (no polyfill, feature-detected), plain CSS `:active`/`transition`, vanilla JS (ES2017, matches existing modules).

## Global Constraints

- No build tools, bundlers, or frameworks — plain HTML/CSS/JS only.
- No new dependencies, no new CDN requests — everything uses already-loaded GSAP or native browser APIs.
- No visual/branding redesign — reuse existing tokens (`--primary`, `--border`, `--surface`, `--text`, `--mono`, `--ring`).
- All animations must respect `prefers-reduced-motion: reduce`: gyroscope tilt never attaches its listener, mobile parallax stays off, the menu cascade is skipped (items appear at final state instantly). CSS-only transitions (tap feedback, icon morph) are already covered by the existing site-wide `@media (prefers-reduced-motion: reduce) { * { transition-duration: 0.001ms !important; ... } }` rule in `assets/css/styles.css` — no extra guard needed for those.
- Gyroscope tilt only activates when `!canHover` (touch-primary device, the same `matchMedia('(hover: hover) and (pointer: fine)')` check already used elsewhere) — it must never run alongside a mouse.
- No swipe/carousel gestures, no `navigator.vibrate` — explicitly out of scope per the spec.
- No `git push` — the user pushes when ready; this plan's tasks only commit locally.
- There is no automated test suite for this static site. Every task's verification step uses the Preview tool (browser-based checks), exactly as established in the prior plans. `prefers-reduced-motion`, `(hover: hover) and (pointer: fine)`, and iOS's `DeviceOrientationEvent.requestPermission` cannot be forced live in the Preview tool (a Chromium-based browser, which never exposes `requestPermission` — only WebKit does) — verify those by direct code inspection, the same limitation and method already used in prior audits. Synthetic `deviceorientation` events CAN be dispatched via `new DeviceOrientationEvent('deviceorientation', {...})` and are indistinguishable from real sensor events to the page's own listener, so the non-iOS code path (`attach()` without a permission gate) is fully testable live.

---

## Task 1: Hamburger icon morph (CSS only)

**Files:**
- Modify: `assets/css/styles.css`

**Interfaces:**
- Consumes: nothing — driven entirely by the `aria-expanded` attribute `assets/js/main.js`'s existing `initMobileNav` already sets on `.nav-toggle` (`toggle.setAttribute('aria-expanded', String(isOpen))`), so this task requires zero JS changes.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add a transition and morph rules to `.nav-toggle-bar`**

In `assets/css/styles.css`, modify:

```css
.nav-toggle-bar {
    display: block;
    width: 1.1rem;
    height: 2px;
    background: var(--text);
}
```

to:

```css
.nav-toggle-bar {
    display: block;
    width: 1.1rem;
    height: 2px;
    background: var(--text);
    transition: transform .25s ease, opacity .25s ease;
}

.nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
}

.nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(2) {
    opacity: 0;
}

.nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
}
```

- [ ] **Step 2: Verify in the browser**

Use the Preview tool (`preview_start` with server name `"portfolio"`).
- Reload. Console errors: must be empty.
- `preview_resize` to `mobile` (375×812) so `.nav-toggle` is visible (it's `display:none` above 800px).
- `preview_eval`: `document.querySelector('.nav-toggle').getAttribute('aria-expanded')` — expected: `"false"`.
- Click `.nav-toggle` (`preview_click`), then `preview_eval`: `document.querySelector('.nav-toggle').getAttribute('aria-expanded')` — expected: `"true"`.
- `preview_eval`: `getComputedStyle(document.querySelectorAll('.nav-toggle-bar')[1]).opacity` — expected: `"0"` (middle bar hidden).
- `preview_eval`: `getComputedStyle(document.querySelectorAll('.nav-toggle-bar')[0]).transform` — expected: not `"none"` (a rotation matrix).
- Click `.nav-toggle` again, confirm `aria-expanded` returns to `"false"` and the middle bar's opacity returns to `"1"`.
- Screenshot the open and closed hamburger icon states at mobile width to confirm it visually reads as an X when open.

- [ ] **Step 3: Commit**

```bash
git add assets/css/styles.css
git commit -m "Adiciona morph do icone hamburguer para X ao abrir o menu mobile"
```

---

## Task 2: Menu item cascade on open

**Files:**
- Modify: `assets/js/main.js`

**Interfaces:**
- Consumes: nothing from Task 1 (independent — Task 1 is CSS-only on the icon, this task animates the menu items).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add the cascade to `initMobileNav` in `assets/js/main.js`**

Replace:

```js
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
```

with:

```js
    function initMobileNav() {
        var toggle = document.querySelector('.nav-toggle');
        var menu = document.querySelector('.menu');
        if (!toggle || !menu) return;

        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var menuItems = menu.querySelectorAll('li');

        toggle.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));

            if (isOpen && window.gsap && !prefersReduced) {
                gsap.set(menuItems, { opacity: 0, y: -8 });
                gsap.to(menuItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.35,
                    ease: 'power2.out',
                    stagger: 0.05
                });
            }
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
```

- [ ] **Step 2: Verify in the browser**

- Reload with cache disabled (`preview_eval`: `fetch(location.href, {cache:'reload'}).then(()=>location.reload())`). Console errors: must be empty.
- `preview_resize` to `mobile` (375×812).
- `preview_eval`: `document.querySelectorAll('.menu li').length` — expected: `5` (About, Experience, Skills, Projects, Contact).
- Click `.nav-toggle`, wait ~500ms (5 items × 0.05s stagger + 0.35s duration settles well within that), then `preview_eval`: `Array.from(document.querySelectorAll('.menu li')).every(function(li){return getComputedStyle(li).opacity === "1"})` — expected: `true`.
- Screenshot the open menu at mobile width to confirm all 5 items are visible and normally styled (no stuck-invisible items).
- Click a menu link (e.g. "Projetos"), confirm the menu closes (`menu.classList.contains('is-open')` — expected: `false`) and the page navigates/scrolls to the section — this exercises the pre-existing close-on-link-click behavior, confirming this task didn't break it.
- Re-open the menu a second time (click `.nav-toggle` again) and confirm the cascade replays correctly (items go through opacity 0 → 1 again, not stuck at a stale state from the first open) — this is why `gsap.set` runs fresh on every open rather than only once.
- Code-inspection check: confirm the `if (isOpen && window.gsap && !prefersReduced)` guard means the cascade never runs on close, and never runs at all under reduced motion (items stay at whatever CSS already renders them at, i.e. immediately visible via the `display:none → flex` toggle with no opacity manipulation).

- [ ] **Step 3: Commit**

```bash
git add assets/js/main.js
git commit -m "Adiciona cascata de revelacao dos itens do menu mobile ao abrir"
```

---

## Task 3: Tap feedback on buttons and Projects cards

**Files:**
- Modify: `assets/css/styles.css`
- Modify: `assets/js/interactive-effects.js`

**Interfaces:**
- Consumes: nothing from Tasks 1–2 (independent).
- Produces: nothing consumed by later tasks in this plan, but this task's call-block edit to `interactive-effects.js` is the base Task 5 edits on top of (Task 5 also modifies the same call block).

- [ ] **Step 1: Add a transition and enhance `.btn:active` in `assets/css/styles.css`**

Modify:

```css
.btn {
    display: inline-block;
    padding: .7rem 1rem;
    border-radius: .75rem;
    border: 1px solid var(--border);
    font-weight: 600;
}
```

to:

```css
.btn {
    display: inline-block;
    padding: .7rem 1rem;
    border-radius: .75rem;
    border: 1px solid var(--border);
    font-weight: 600;
    transition: transform .15s ease;
}
```

And modify the existing active state:

```css
.btn:active {
    transform: translateY(1px);
}
```

to:

```css
.btn:active {
    transform: scale(0.96) translateY(1px);
}
```

(This is a pre-existing rule from the original site redesign — it already presses the button down 1px on click, just without an animated transition. This task keeps that exact behavior and adds a subtle scale on top of it, now smoothly animated via the `transition` added above.)

- [ ] **Step 2: Add tap feedback to the Projects cards**

Modify:

```css
.case-study {
    position: relative;
    margin-bottom: 2rem;
    padding: 1.5rem;
    border: 1px solid var(--border);
    border-radius: 1rem;
    background: var(--surface);
}
```

to:

```css
.case-study {
    position: relative;
    margin-bottom: 2rem;
    padding: 1.5rem;
    border: 1px solid var(--border);
    border-radius: 1rem;
    background: var(--surface);
    transition: transform .15s ease;
}
```

Modify:

```css
.card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 1rem;
    padding: 1rem;
}
```

to:

```css
.card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 1rem;
    padding: 1rem;
    transition: transform .15s ease;
}
```

Then append this new rule directly after the `.card h3` rule:

```css
.case-study:active,
.card:active {
    transform: scale(0.98);
}
```

- [ ] **Step 3: Add the iOS `:active`-on-tap workaround to `assets/js/interactive-effects.js`**

iOS Safari only enters the CSS `:active` state on a plain tap if some touch listener exists anywhere in the document — otherwise taps behave like simple clicks and `:active` never applies. Add this function inside the existing `DOMContentLoaded` handler (after `initMagneticButtons`'s definition, before `initTerminal`'s), and call it as the first line of the existing call block:

```js
        function initTouchActiveWorkaround() {
            document.addEventListener('touchstart', function () {}, { passive: true });
        }
```

Replace:

```js
        initMagneticButtons();
        initTerminal();
```

with:

```js
        initTouchActiveWorkaround();
        initMagneticButtons();
        initTerminal();
```

- [ ] **Step 4: Verify in the browser**

- Reload (cache-busted). Console errors: must be empty.
- `preview_resize` to `mobile` (375×812).
- `preview_eval`: `getComputedStyle(document.querySelector('.hero .btn.primary')).transition` — expected: contains `"transform"` (confirms the new transition is applied).
- Simulate a tap by dispatching `touchstart`/`touchend` (or `:active` via `preview_eval` adding/removing a class isn't representative — instead confirm the CSS rule exists and computes correctly): `preview_eval`: read the parsed stylesheet rule directly — `Array.from(document.styleSheets).some(function(sheet){try{return Array.from(sheet.cssRules).some(function(r){return r.selectorText === '.btn:active' && r.style.transform.indexOf('scale') !== -1;});}catch(e){return false;}})` — expected: `true` (confirms the `.btn:active` rule includes the scale, since jsdom-style `:active` pseudo-class matching can't be triggered by synthetic touch events in this environment).
- Same check for `.case-study:active, .card:active` containing `scale(0.98)`.
- `preview_eval`: confirm the touchstart workaround is registered by checking no console errors occur when dispatching a real `TouchEvent`-shaped event isn't necessary — the workaround's own correctness is confirmed by code inspection: `initTouchActiveWorkaround` calls `addEventListener('touchstart', ..., {passive:true})` with an empty handler, exactly the standard fix.
- Screenshot the Hero CTAs and a Projects card at mobile width to confirm nothing looks visually broken at rest.

- [ ] **Step 5: Commit**

```bash
git add assets/css/styles.css assets/js/interactive-effects.js
git commit -m "Adiciona feedback tatil (tap) aos botoes e cards de Projects"
```

---

## Task 4: Mobile parallax at reduced intensity

**Files:**
- Modify: `assets/js/scroll-effects.js`

**Interfaces:**
- Consumes: nothing from Tasks 1–3 (independent, different file).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Replace the mobile early-return in `initParallax` with a per-viewport intensity**

In `assets/js/scroll-effects.js`, modify:

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
```

to:

```js
        function initParallax() {
            if (prefersReduced) return;
            var offsetFactor = isMobile ? 0.1 : 0.2;
            document.querySelectorAll('.section-parallax').forEach(function (blob) {
                var section = blob.parentElement;
                if (!section) return;
                gsap.to(blob, {
                    y: function () { return section.offsetHeight * offsetFactor; },
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
```

- [ ] **Step 2: Verify in the browser**

- Reload (cache-busted). Console errors: must be empty.
- `preview_resize` to `mobile` (375×812), reload (the `isMobile` check runs once on load).
- `preview_eval`: `document.querySelectorAll('.section-parallax').length` — expected: `6`.
- `preview_eval`: `window.scrollTo(0, 800)` (first call, just scrolls).
- Separate `preview_eval`: `getComputedStyle(document.querySelectorAll('.section-parallax')[1]).transform` — expected: not `"none"` (parallax now active on mobile, unlike before this task).
- `preview_resize` to `desktop`, reload, repeat the same scroll+transform check on the same blob — expected: also not `"none"` (desktop parallax still works, unaffected by this change).
- Code-inspection check: confirm `offsetFactor` is `0.1` when `isMobile` and `0.2` otherwise — this can also be checked by comparing the actual translate distance at the same scroll position between the two `preview_resize` runs above: parse the `matrix(...)` or `matrix3d(...)` translateY component from each transform string and confirm the mobile one is roughly half the desktop one for an equivalent scroll offset into the same section (exact equality isn't expected since scroll position/section height differ slightly between viewports, but the mobile value should be clearly smaller, not equal or larger).
- Confirm no horizontal scrollbar appears on mobile with parallax now active: `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.

- [ ] **Step 3: Commit**

```bash
git add assets/js/scroll-effects.js
git commit -m "Reativa parallax no mobile com intensidade reduzida (10% vs 20% no desktop)"
```

---

## Task 5: Gyroscope tilt on Projects cards

**Files:**
- Modify: `index.html` (permission button markup)
- Modify: `assets/css/styles.css` (button styling)
- Modify: `assets/js/i18n.js` (1 new key × 4 languages)
- Modify: `assets/js/interactive-effects.js` (add `initGyroTilt`)

**Interfaces:**
- Consumes: `prefersReduced`, `canHover` from the module-scope consts already declared in `interactive-effects.js`'s `DOMContentLoaded` handler. Consumes Task 3's call-block state (`initTouchActiveWorkaround(); initMagneticButtons(); initTerminal();`) as the base for this task's own call-block edit.
- Produces: nothing consumed by later tasks in this plan.

- [ ] **Step 1: Add the permission-button markup to `index.html`**

In the `#projetos` section, right after the `<h2>` and before the case-study article:

```html
                <h2 data-i18n="projects.title">Projects</h2>

                <article class="case-study case-study--featured">
```

becomes:

```html
                <h2 data-i18n="projects.title">Projects</h2>
                <button type="button" class="gyro-permission-btn" hidden data-i18n="projects.gyroPermission">Enable tilt effect</button>

                <article class="case-study case-study--featured">
```

- [ ] **Step 2: Add the button's CSS to `assets/css/styles.css`**

Append after the `.tags`/`html[data-theme="dark"] .tags li` rules (end of the "Projetos" section of the stylesheet):

```css
.gyro-permission-btn {
    display: inline-block;
    margin: 0 0 1rem;
    padding: .4rem .8rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--primary);
    font-family: var(--mono);
    font-size: .8rem;
    cursor: pointer;
    transition: transform .15s ease;
}

.gyro-permission-btn:active {
    transform: scale(0.96);
}
```

- [ ] **Step 3: Add the `projects.gyroPermission` i18n key to all 4 languages in `assets/js/i18n.js`**

In the `en` block, right after `'projects.title': 'Projects',`, insert:

```js
            'projects.gyroPermission': 'Enable tilt effect',
```

In the `pt` block, right after `'projects.title': 'Projetos',`, insert:

```js
            'projects.gyroPermission': 'Ativar efeito de inclinação',
```

In the `de` block, right after `'projects.title': 'Projekte',`, insert:

```js
            'projects.gyroPermission': 'Neige-Effekt aktivieren',
```

In the `es` block, right after `'projects.title': 'Proyectos',`, insert:

```js
            'projects.gyroPermission': 'Activar efecto de inclinación',
```

- [ ] **Step 4: Add `initGyroTilt` to `assets/js/interactive-effects.js`**

Add this function inside the existing `DOMContentLoaded` handler (after `initTerminal`'s definition), and call it as the last line of the existing call block:

```js
        function initGyroTilt() {
            if (!window.gsap || canHover || prefersReduced) return;
            if (!('DeviceOrientationEvent' in window)) return;
            var cards = document.querySelectorAll('#projetos .case-study, #projetos .card');
            if (!cards.length) return;

            var maxTilt = 2;
            var tweens = [];
            cards.forEach(function (card) {
                gsap.set(card, { transformPerspective: 800, transformStyle: 'preserve-3d' });
                tweens.push({
                    rotateXTo: gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3' }),
                    rotateYTo: gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3' })
                });
            });

            var baseline = null;

            function handleOrientation(e) {
                if (e.beta === null || e.gamma === null) return;
                if (!baseline) {
                    baseline = { beta: e.beta, gamma: e.gamma };
                    return;
                }
                var deltaBeta = Math.max(-45, Math.min(45, e.beta - baseline.beta));
                var deltaGamma = Math.max(-45, Math.min(45, e.gamma - baseline.gamma));
                tweens.forEach(function (t) {
                    t.rotateYTo((deltaGamma / 45) * maxTilt);
                    t.rotateXTo(-(deltaBeta / 45) * maxTilt);
                });
            }

            function attach() {
                window.addEventListener('deviceorientation', handleOrientation);
            }

            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                var btn = document.querySelector('.gyro-permission-btn');
                if (!btn) return;
                btn.hidden = false;
                btn.addEventListener('click', function () {
                    DeviceOrientationEvent.requestPermission().then(function (state) {
                        if (state === 'granted') attach();
                        btn.remove();
                    }).catch(function () {
                        btn.remove();
                    });
                });
            } else {
                attach();
            }
        }

        initTouchActiveWorkaround();
        initMagneticButtons();
        initTerminal();
        initGyroTilt();
```

(Replace Task 3's `initTouchActiveWorkaround(); initMagneticButtons(); initTerminal();` three-line call block with this four-line block.)

- [ ] **Step 5: Verify in the browser**

- Reload (cache-busted). Console errors: must be empty.
- `preview_eval`: `document.querySelector('.gyro-permission-btn').hidden` — expected: `true` (Chromium-based Preview browsers don't implement `DeviceOrientationEvent.requestPermission`, so the button stays hidden and the code takes the direct-`attach()` path — this is the Android/non-gated-browser path, and it's the one this environment can fully exercise).
- `preview_eval`: `typeof DeviceOrientationEvent.requestPermission` — expected: `"undefined"` in this environment (confirms which code path was just exercised; if a future Preview environment changes to WebKit-based and this comes back `"function"`, the button-visible path is what to check instead).
- Scroll to Projects (`preview_eval`: `document.querySelector('#projetos').scrollIntoView()`).
- Dispatch a first synthetic orientation event to establish the baseline: `preview_eval`: `window.dispatchEvent(new DeviceOrientationEvent('deviceorientation', { beta: 50, gamma: 0 }))`.
- `preview_eval`: `getComputedStyle(document.querySelector('#projetos .case-study')).transform` — expected: still identity/no visible rotation (this first event only sets the baseline, per the code's `if (!baseline) { baseline = ...; return; }` branch).
- Dispatch a second synthetic event with a shifted angle: `preview_eval`: `window.dispatchEvent(new DeviceOrientationEvent('deviceorientation', { beta: 70, gamma: 20 }))` (a +20 beta delta, +20 gamma delta from the baseline).
- Separate `preview_eval` (round-trip gives the `quickTo` tween time to tick): `getComputedStyle(document.querySelector('#projetos .case-study')).transform` — expected: a `matrix3d(...)` with a real rotation component (not identity).
- Dispatch a third event back at the baseline values (`beta: 50, gamma: 0`), then check the transform again — expected: eases back toward the identity/no-rotation matrix.
- `preview_resize` to `mobile` (375×812) if not already, and confirm the same behavior holds (this effect is mobile-only by design, gated on `!canHover`, so it should NOT be reachable at desktop width with a mouse-capable browser — but note `canHover` is a hover/pointer-capability check, not a viewport-width check, so resizing alone in this headless environment won't toggle `canHover`; this is a code-inspection-only distinction, already covered by prior rounds' audits).
- Code-inspection check: confirm `initGyroTilt`'s guard (`if (!window.gsap || canHover || prefersReduced) return;`) is the first line, and confirm the iOS branch (`typeof DeviceOrientationEvent.requestPermission === 'function'`) shows the button and only calls `attach()` inside the click handler's `.then(function (state) { if (state === 'granted') attach(); ...})` — never unconditionally.
- Screenshot the Projects section heading area to confirm the (hidden) permission button doesn't affect layout when absent.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/styles.css assets/js/i18n.js assets/js/interactive-effects.js
git commit -m "Adiciona tilt por giroscopio nos cards de Projects para dispositivos touch"
```

---

## Task 6: Final audit — reduced motion, guards, full regression

**Files:** none created — this task verifies the assembled feature and fixes anything it surfaces (fixes land in whichever file needs them).

**Interfaces:** consumes everything from Tasks 1–5.

- [ ] **Step 1: Reduced-motion full pass (code inspection)**

Read the full shipped `assets/js/main.js`, `assets/js/interactive-effects.js`, and `assets/js/scroll-effects.js`. Confirm:
- `initMobileNav`'s cascade only runs inside `if (isOpen && window.gsap && !prefersReduced)`.
- `initGyroTilt` returns before attaching any listener when `prefersReduced` is true.
- `initParallax` still returns immediately when `prefersReduced` is true (unchanged from before this plan, just confirm Task 4's edit didn't accidentally drop this check).
- Icon morph and tap-feedback CSS transitions are covered by the existing blanket `@media (prefers-reduced-motion: reduce)` rule — confirm that rule is still intact and unmodified in `assets/css/styles.css`.

- [ ] **Step 2: Touch/hover guard pass (code inspection)**

- Confirm `initGyroTilt` checks `canHover` and returns early when `canHover` is `true` (must never run on a mouse-capable device).
- Confirm `initTouchActiveWorkaround` and the CSS `:active` rules have no guard at all (correct — tap feedback should work on every device that can tap, touch or otherwise, and `:active` is inert on devices that never trigger it).

- [ ] **Step 3: Full regression pass**

Using the Preview tool, at both `mobile` (375×812) and `desktop` (1280×800) widths where relevant:
- Theme toggle, language dropdown (all 4 languages), Hero terminal, magnetic buttons (desktop only), progress bar, cascade reveals, Experience timeline — re-verify each still works with no console errors, confirming none of this plan's five tasks introduced a regression in previously-shipped effects.
- Mobile menu: open/close multiple times in a row, confirm the icon morph and item cascade both replay correctly every time, and that clicking a link still closes the menu and scrolls to the right section.
- Tap feedback: confirm the `.btn:active` and `.case-study:active`/`.card:active` CSS rules are present and unbroken (re-run Task 3's stylesheet-rule check).
- Parallax: confirm it's active at both mobile and desktop widths now, at the two different intensities (re-run Task 4's transform-comparison check).
- Gyroscope tilt: confirm the Android/non-gated code path still attaches and responds to synthetic `deviceorientation` events (re-run Task 5's dispatch check).
- Network: confirm zero `404`s. Console: confirm zero errors across the entire pass.

- [ ] **Step 4: Fix anything Steps 1–3 surfaced**

If any check fails, fix it directly in the relevant file and re-run the specific failing check until it passes. Do not move on with a known failure.

- [ ] **Step 5: Update `PROJECT_STATUS.md`**

Add a new dated entry (mirroring the style of the existing "Sessão efeitos interativos" entry): hamburger icon morph, animated menu item cascade, tap feedback on buttons/Projects cards, mobile parallax re-enabled at half intensity, gyroscope tilt on Projects cards for touch devices (with the iOS permission-button flow). Note that the desktop 3D card tilt effect was removed earlier in this same day's work and is not being restored — the gyroscope tilt is a new, independent mobile interaction, not a port of the removed one.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "Ajustes finais de auditoria dos efeitos mobile (reduced-motion, guards, regressao)"
```

(Only commit if Steps 4–5 produced changes beyond `PROJECT_STATUS.md` — the `PROJECT_STATUS.md` update always produces a change, so this commit always has at least that.)

---

## Reminder

Do not run `git push` for any task above — the user pushes when ready.
