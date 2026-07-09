# Interactive Effects Design — Design Spec

**Date:** 2026-07-09
**Repo:** `portifolio-gabriel` (GitHub Pages: `GabrielVianaNunes/GabrielVianaNunes.github.io`)

## Goal

Implement the four effects explicitly deferred as non-goals in the
2026-07-08 scroll storytelling round: magnetic buttons, 3D card tilt, an
animated theme-toggle transition, and a terminal/code-typing element in the
Hero. This round is pointer/interaction-driven micro-polish, distinct from
the scroll-driven motion already shipped.

## Non-goals (explicitly out of scope for this round)

- No visual/branding redesign — same tokens, same minimalist direction
  (`docs/superpowers/specs/2026-07-06-portfolio-redesign-design.md` still
  governs colors/typography/layout).
- No changes to the scroll-driven effects shipped in the previous round
  (progress bar, parallax, cascade reveals, timeline draw-in) — this round
  only adds new, independent effects.
- No build tooling — stays plain HTML/CSS/JS, any new dependency added only
  via CDN `<script>` tags, same pattern already used for
  devicon/flag-icons/GSAP.
- No new fonts or icon sets — the terminal reuses the existing JetBrains
  Mono font already loaded for tags/labels.

## Tech approach

- **GSAP core** (already loaded via CDN from the previous round) provides
  `quickTo` for the magnetic-button and tilt follow animations. No new
  GSAP plugins are added.
- Magnetic buttons, card tilt, and the terminal typewriter are
  pointer/load-triggered (not scroll-triggered), so they live in a new,
  separate module, **`assets/js/interactive-effects.js`**, self-initializing
  on `DOMContentLoaded` like the existing modules. It does not modify
  `scroll-effects.js`, `main.js`, or `i18n.js`.
- The theme-toggle transition is a theme-toggling concern, not a new
  standalone effect, so it's added directly to the existing
  `assets/js/theme.js` (which already owns `toggleTheme`), using the
  browser-native **View Transitions API** (`document.startViewTransition`)
  — no GSAP, no manual DOM overlay, no new dependency. This API has no
  polyfill requirement: unsupported browsers simply run the existing
  instant toggle, which is an acceptable and expected progressive-
  enhancement fallback (mirrors the `if (!window.gsap || !window.ScrollTrigger) return;`
  guard pattern already established).

## Features

### 1. Magnetic buttons

Applies to every `.btn` element: the three Hero CTAs (`See projects`,
`Download CV`, `GitHub`) and the CV download button in the Contact/footer
area. On `mousemove` within a button's bounding box (plus a small
capture radius so the pull starts slightly before the cursor reaches the
edge), the button translates a few pixels toward the cursor using
`gsap.quickTo` for a smooth, physics-like follow; on `mouseleave` it
eases back to its resting position. Guarded by
`window.matchMedia('(hover: hover) and (pointer: fine)').matches` so it
never activates on touch devices (no continuous hover signal exists
there, and a stuck offset would look broken).

### 2. 3D card tilt

Applies to `#projetos .case-study` and `#projetos .card` (the SENAI case
study and the Ultralino card). On `mousemove` over a card, the card
rotates slightly on the X/Y axes based on cursor position relative to
the card's center (subtle range, a few degrees max, `perspective` applied
to the card's parent so the rotation reads as depth rather than a flat
skew), animated via `gsap.quickTo`/`gsap.to`. On `mouseleave`, it eases
back to flat. Same touch/hover guard as magnetic buttons — no tilt
without a continuously-tracked pointer.

### 3. Theme-toggle transition

On click of `.theme-toggle`, capture the click's viewport coordinates,
then call `document.startViewTransition(() => themeModule.toggleTheme())`
instead of calling `toggleTheme()` directly. New CSS targets
`::view-transition-new(root)` with a `clip-path: circle()` animation that
expands from the captured click point (exposed to CSS via inline custom
properties, e.g. `--theme-toggle-x`/`--theme-toggle-y` set on `<html>`
just before the transition starts) to a radius that covers the full
viewport diagonal — the classic "circle reveal" pattern. If
`document.startViewTransition` doesn't exist (Firefox, older Safari) or
`prefers-reduced-motion: reduce` is set, the code calls `toggleTheme()`
directly with no transition, identical to today's behavior.

### 4. Terminal element (Hero)

A new decorative block added inside `.hero .container`, directly after
the existing `.cta` row. Styled as a small terminal window (monospace
JetBrains Mono, a dark surface with the existing `--border` token, no new
colors) with a `guest@portfolio:~$ ` prompt. On page load, once (no
scroll trigger, no replay), it types out three command/output pairs at a
fixed per-character interval, implemented as a small custom
typewriter (`setInterval`/`requestAnimationFrame` character reveal) —
no new dependency needed for this:

```
$ whoami
Gabriel Nunes — Full-Stack Software Engineer

$ cat stack.txt
Java · Spring Boot · Angular · TypeScript · PostgreSQL

$ ./status.sh
✓ available for remote & international opportunities
```

Commands (`whoami`, `cat stack.txt`, `./status.sh`) are fixed in English
(universal terminal convention, not natural-language content). The three
output lines are new i18n dictionary keys
(`hero.terminal.whoami`, `hero.terminal.stack`, `hero.terminal.status`)
added to all four language files (PT/EN/DE/ES), translated the same way
every other Hero string already is. A blinking cursor (`_`) sits at the
end of the sequence once typing completes. Under
`prefers-reduced-motion: reduce`, the full final text renders immediately
with no per-character animation.

## Accessibility & performance

- **`prefers-reduced-motion: reduce`**: every effect in this round checks
  the same media query already used by `scroll-effects.js`. Magnetic
  buttons and tilt cards render with a resting-state guard so no
  transform is ever applied (not just "instant" — genuinely inert,
  since these are hover-continuous effects, not one-shot animations).
  The theme transition falls back to the instant toggle. The terminal
  shows its final text immediately with no typing animation.
- **Touch/coarse-pointer guard**: magnetic buttons and card tilt are
  both gated on `(hover: hover) and (pointer: fine)`, checked once on
  load (same convention as the `isMobile` check in `scroll-effects.js`).
  This is a hover-capability check, not a viewport-width check, so it
  correctly covers touch laptops and stays independent of screen size.
- **No layout shift**: magnetic buttons and tilt cards use `transform`
  only (translate/rotate), never affecting layout flow. The terminal
  block reserves its final height from first paint (via CSS `min-height`
  or by rendering all text invisibly first) so typing it in doesn't
  cause the page to grow underneath it.
- **View Transitions API cost**: essentially free when supported (native
  browser compositing, not a JS animation loop); zero cost when
  unsupported (falls straight through to the existing instant toggle).

## File changes

- `assets/js/interactive-effects.js` (new) — magnetic-button binding,
  card-tilt binding, terminal typewriter, all gated by the
  reduced-motion and hover/pointer-fine checks described above.
- `assets/js/theme.js` — wrap the `.theme-toggle` click handler's call to
  `toggleTheme()` in `document.startViewTransition` when supported and
  motion isn't reduced; capture and expose click coordinates as CSS
  custom properties before starting the transition.
- `assets/css/styles.css` — `::view-transition-*` rules and the
  `clip-path` circle-reveal keyframes; new `.hero-terminal` component
  styles (monospace block, prompt styling, blinking cursor); no changes
  to existing component styles beyond what's needed for the tilt cards'
  `perspective` context.
- `index.html` — add the new terminal markup block inside `.hero
  .container` after `.cta`; add the `interactive-effects.js` script tag,
  loaded `defer` after the existing scripts (order: `main.js`, `i18n.js`,
  `theme.js`, `gsap.min.js`, `ScrollTrigger.min.js`, `scroll-effects.js`,
  then `interactive-effects.js` last).
- `assets/js/i18n.js` — add `hero.terminal.whoami`,
  `hero.terminal.stack`, `hero.terminal.status` keys to all four
  language dictionaries (PT/EN/DE/ES).
