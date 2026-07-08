# Scroll Storytelling & Motion Design — Design Spec

**Date:** 2026-07-08
**Repo:** `portifolio-gabriel` (GitHub Pages: `GabrielVianaNunes/GabrielVianaNunes.github.io`)

## Goal

Layer sophisticated scroll-driven motion on top of the existing minimalist
portfolio (built in the 2026-07-06 redesign) so the site itself demonstrates
front-end skill — without changing the established visual language (colors,
typography, layout) or reopening earlier design decisions.

## Non-goals (explicitly out of scope for this round)

- No visual/branding redesign — same tokens, same minimalist direction
  (`docs/superpowers/specs/2026-07-06-portfolio-redesign-design.md` still
  governs colors/typography/layout).
- No magnetic buttons, 3D card tilts, or other micro-interaction polish.
- No animated theme-toggle transition (circular wipe, etc.).
- No terminal/code-typing interactive element.
- No build tooling — stays plain HTML/CSS/JS, GSAP added only via CDN
  `<script>` tags, same pattern already used for devicon/flag-icons.

Any of the above may become a follow-up round, brainstormed separately.

## Tech approach

- **GSAP core + ScrollTrigger plugin**, loaded via CDN (cdnjs), no bundler.
- All new logic lives in one new module, **`assets/js/scroll-effects.js`**,
  self-initializing on `DOMContentLoaded` like the existing three modules.
  It does not modify `theme.js`, `i18n.js`, or the mobile-nav/active-nav
  logic in `main.js`.
- The existing simple fade-up reveal system in `main.js`
  (`initScrollReveal`, keyed off `data-reveal` + `IntersectionObserver`) is
  **removed** and fully replaced by the new ScrollTrigger-based system —
  running two competing "reveal on scroll" mechanisms would fight each
  other and double the maintenance surface. `main.js` keeps
  `initMobileNav` and `initActiveNav`; `initScrollReveal` and the
  `[data-reveal]` CSS rules move to (and are superseded by) the new
  module's own opacity/transform handling via GSAP, so the `data-reveal`
  attribute is removed from `index.html` once nothing reads it anymore.

## Features

### 1. Scroll progress bar
A `2px`–`3px` fixed bar at the very top of the viewport (above or flush
with the sticky header), filled with `var(--primary)`, width driven by
overall page scroll percentage via a single `ScrollTrigger` bound to
`document.documentElement`. Always on except under reduced-motion (see
Accessibility), where it can still update instantly without animating
(it's a state indicator, not a decorative animation, so it's fine to keep
even under reduced motion, just without smoothing).

### 2. Staggered cascade reveals
Every section and every item-group gets a cascade-in animation (opacity
0→1, translateY ~16px→0) as it enters the viewport, using
`gsap.timeline` + `stagger` per group:
- Hero: badge → headline → lead → location → CTA row, staggered.
- About: the three paragraphs.
- Experience: each timeline item (see also #4 below for the connecting
  line).
- Skills: within each category (Backend, Frontend, Database, Tools, Other
  competencies), the `<li>` icons cascade in; each category heading
  triggers its own group independently as it scrolls into view. Soft
  Skills list items and language cards each cascade as their own group.
- Projects: the featured SENAI case study, then the Ultralino card; tags
  within each cascade in after their parent card.
- Contact: the contact list items.

Roughly 60–80ms stagger between siblings in a group — fast enough to not
feel like a wait, slow enough to read as intentional sequencing rather
than a glitch.

### 3. Parallax background layers (all major sections)
Each of Hero, About, Experience, Skills, Projects, and Contact gets one
absolutely-positioned decorative background element behind its content —
a large, soft, blurred radial-gradient blob using the existing
`--primary`/`--ring` tokens at low opacity (roughly 0.08–0.15), sized and
positioned per-section so it doesn't repeat identically down the page.
Each blob moves at a fraction of scroll speed relative to its section
(`ScrollTrigger` with `scrub`, target y-offset ~15–25% of the section's
own scroll distance) — enough to read as depth, subtle enough to stay out
of the way of text contrast (blobs sit behind content in stacking order,
`pointer-events: none`, `aria-hidden="true"`).

### 4. Timeline draw-in (Experience section)
The existing `.timeline` vertical line (`border-left` today) becomes an
absolutely-positioned element whose height animates from `0` to `100%` as
the user scrolls through the Experience section, via a `scrub`-linked
ScrollTrigger pinned to the section's own scroll range — so the line's
growth tracks scroll position directly rather than playing once. The
existing per-item cascade (marker + body fading in, from #2) stays and is
timed so each item's reveal roughly coincides with the line reaching it.

## Accessibility & performance

- **`prefers-reduced-motion: reduce`**: on load, if this media query
  matches, `scroll-effects.js` skips creating any `ScrollTrigger`-driven
  animation entirely — all cascade targets are set to their final visible
  state immediately (no stagger, no delay), no parallax transforms are
  applied, and the timeline line renders at full height immediately. The
  progress bar still tracks scroll (a functional indicator, not a
  decorative motion effect) but without any easing/smoothing applied to
  its width changes. This mirrors the existing site-wide reduced-motion
  contract from the 2026-07-06 redesign.
- **Parallax disabled below a `768px` viewport width**: checked once on
  load (matching the existing `@media (max-width: 800px)` mobile
  breakpoint convention in `styles.css`); the background blobs still
  render (static, no scroll-linked transform) so layout doesn't shift,
  they just don't move. Cascade reveals, the progress bar, and the
  timeline draw-in remain active on mobile — those are cheap and don't
  suffer from touch-scroll jank the way transform-per-scroll-tick
  parallax does.
- **No layout shift**: parallax blobs are `position: absolute`,
  `pointer-events: none`, and sized via CSS independent of content flow,
  so they never affect document height or reflow.
- **Script weight**: GSAP core + ScrollTrigger via CDN (cdnjs), loaded
  with `defer`, after the existing three script tags. No other new
  dependencies.

## File changes

- `index.html` — add two CDN `<script>` tags (GSAP core, ScrollTrigger)
  and the new `scroll-effects.js` tag, all `defer`, appended **after** the
  existing three script tags in this exact order: `main.js`, `i18n.js`,
  `theme.js` (unchanged), then `gsap.min.js`, then
  `ScrollTrigger.min.js`, then `scroll-effects.js` last (it depends on
  both GSAP globals already being defined); add the progress-bar
  element (empty `<div class="scroll-progress">` right after `<body>`
  opening, before the skip-link, so it's always on top); add one
  decorative background element per major section (empty `<div
  class="section-parallax" aria-hidden="true"></div>` as the first child
  of each section); remove now-unused `data-reveal` attributes.
- `assets/css/styles.css` — remove the old `[data-reveal]` /
  `[data-reveal].is-visible` rules (superseded); add `.scroll-progress`
  (fixed bar) and `.section-parallax` (absolute blob, blurred radial
  gradient, `pointer-events: none`) styles; change `.timeline` to position
  its vertical line as an absolutely-positioned pseudo-element or child
  `span` with animatable `height` instead of a static `border-left`.
- `assets/js/scroll-effects.js` (new) — GSAP/ScrollTrigger registration,
  reduced-motion and mobile-viewport checks, progress bar binding, per-
  group cascade setup for every section listed above, per-section
  parallax blob binding, timeline line scrub animation.
- `assets/js/main.js` — remove `initScrollReveal` (moved/superseded by the
  new module); `initMobileNav` and `initActiveNav` stay untouched.
