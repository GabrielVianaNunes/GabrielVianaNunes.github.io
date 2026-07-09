# Mobile Effects Design — Design Spec

**Date:** 2026-07-09
**Repo:** `portifolio-gabriel` (GitHub Pages: `GabrielVianaNunes/GabrielVianaNunes.github.io`)

## Goal

Add touch/mobile-native interaction effects so the site's motion polish reads
as intentional on a phone, not just on desktop. The two prior rounds
(scroll storytelling, interactive effects) mostly targeted desktop: several
effects are explicitly hover-gated (`(hover: hover) and (pointer: fine)`) or
viewport-gated (`max-width: 768px`) and simply don't run on touch devices,
which is where most visitors land first.

## Context: current mobile support (audited before this spec)

**Already works identically on mobile today** (no changes needed):
scroll progress bar, cascade reveals (Hero/About/Contact/Skills/Projects),
the Experience timeline draw-in, the Hero terminal typewriter (never
hover-gated), and the theme-toggle circle transition (click-driven, not
hover-driven — degrades gracefully to an instant toggle on browsers without
the View Transitions API, which is the correct existing fallback).

**Disabled on mobile today, addressed by this round:**
- Background parallax blobs — disabled below 768px viewport width
  (performance/jank concern, not an accessibility one).
- Magnetic buttons and 3D card tilt — both gated on continuous-hover
  capability, which doesn't exist on touch. (The 3D card tilt effect was
  removed entirely from the codebase on 2026-07-09, right before this spec,
  at the user's request — it is **not** being ported to mobile as a literal
  "same effect elsewhere." The gyroscope tilt in this spec is a new,
  independently-motivated mobile interaction for the same Projects cards,
  not a mirror of the removed desktop effect.)

## Non-goals (explicitly out of scope for this round)

- No visual/branding redesign — same tokens, same minimalist direction.
- No build tooling — plain HTML/CSS/JS only; any new dependency added only
  via CDN `<script>` tags (none are needed this round — everything uses
  already-loaded GSAP or native browser APIs).
- No swipe/carousel gestures for the Projects section — there are currently
  only two project entries (SENAI case study, Ultralino card) in a static
  grid; a swipe carousel would add complexity without a real payoff at this
  content volume. Revisit if the Projects section grows.
- No haptic vibration (`navigator.vibrate`) — considered and dropped: iOS
  Safari doesn't implement the Vibration API at all, so it would only ever
  fire on a subset of Android browsers, for comparatively little payoff.
- No changes to desktop-only effects from the prior two rounds (magnetic
  buttons stay desktop-only; parallax's desktop intensity is unchanged).

## Tech approach

- Reuses the two existing effect modules by responsibility, rather than
  creating a third file: pointer/touch-driven effects (gyroscope tilt, tap
  feedback's one-line iOS workaround) go in the existing
  **`assets/js/interactive-effects.js`**; the scroll-linked parallax
  adjustment goes in the existing **`assets/js/scroll-effects.js`**
  (modifying `initParallax`, which already owns that concern).
- The animated mobile menu is the **first change to `assets/js/main.js`**
  across all three effect rounds — `initMobileNav` already owns the
  hamburger-toggle logic this builds on, so the animation trigger belongs
  in the same function rather than a new, decoupled listener elsewhere.
- No new dependencies: gyroscope tilt uses the native
  `DeviceOrientationEvent` API (already available in every mobile browser
  that has the sensor; feature-detected, degrades to "effect doesn't
  appear" when absent) driven through GSAP's existing `quickTo` (same
  smoothing mechanism already used for magnetic buttons); tap feedback is
  CSS-only (`:active` + `transition`); the menu icon morph is CSS-only
  (reuses the existing `.is-open` class already toggled by `initMobileNav`);
  the menu item cascade uses a `gsap.timeline` the same way `revealGroup`
  already does elsewhere in the codebase.

## Features

### 1. Gyroscope tilt on Projects cards

New function `initGyroTilt()` in `interactive-effects.js`, active only when
`!canHover` (touch-primary device) and `!prefersReduced`. Targets the same
elements the old mouse-tilt used to (`#projetos .case-study`,
`#projetos .card`).

- **Android and other browsers that don't gate the sensor:** attaches a
  `deviceorientation` listener directly, no user interaction required.
- **iOS Safari (13+), which requires an explicit permission grant via
  `DeviceOrientationEvent.requestPermission()`, callable only from a user
  gesture:** a small button appears above the Projects section (only when
  `typeof DeviceOrientationEvent.requestPermission === 'function'` — i.e.
  only shown on the browsers that actually need it), labeled roughly
  "Enable tilt effect" (translated via the existing i18n dictionary,
  4 languages). Tapping it requests permission; if granted, the listener
  attaches and the button is removed from the DOM; if denied, the button is
  also removed (iOS doesn't allow re-prompting without a full page reload,
  so leaving a now-useless button visible would be worse than hiding it).
- **No sensor / API entirely absent** (most desktop browsers, older
  devices): neither the button nor the listener appears — silent, no error.
- Incoming `beta` (front-back tilt) and `gamma` (left-right tilt) values are
  mapped to `rotationX`/`rotationY` through the same `gsap.quickTo`
  smoothing pattern the old mouse-tilt used, clamped to the same subtle
  range the desktop version was tuned down to before removal (±2°) — this
  is a fresh implementation, not a resurrection of the removed code, but it
  reuses the same visual calibration since that's the last known
  "not too dramatic" value agreed on for this exact set of cards.

### 2. Tap feedback on buttons and Projects cards

Pure CSS: `.btn` and `#projetos .case-study, #projetos .card` get an
`:active` rule that scales down slightly (`transform: scale(0.96)`) with a
short `transition`, reverting on release. No JavaScript animation logic
needed. The one bit of JS this feature needs is a single no-op
`document.addEventListener('touchstart', function () {}, { passive: true })`
registered once — a well-known, minimal workaround for iOS Safari's default
behavior of never entering `:active` state on a plain tap unless some touch
listener exists in the document.

### 3. Parallax re-enabled on mobile, at reduced intensity

`initParallax` in `scroll-effects.js` currently returns early when
`isMobile` is true. This round removes that specific early-return condition
(reduced-motion still short-circuits it) and introduces a per-viewport
intensity: the existing desktop offset (~20% of the section's scroll
distance) drops to ~10% on mobile, keeping the blob's movement subtle
against touch-scroll's momentum/inertia instead of matching desktop 1:1.

### 4. Animated mobile menu

- **Icon morph (hamburger → X):** pure CSS, driven by the `.is-open` class
  `initMobileNav` already toggles today — no JS change needed for this
  part. The three `.nav-toggle-bar` spans rotate/translate into an X shape
  when `.is-open` is present, reverting when it's removed.
- **Menu item cascade on open:** `initMobileNav` (in `main.js`) gains a
  small `gsap.timeline` call, fired when the menu transitions to open,
  staggering each `.menu li`'s opacity/translateY in — the same visual
  language `revealGroup` already established elsewhere on the site, just
  triggered by a click instead of a scroll position. Closing reverts
  instantly (no reverse-cascade needed — the menu is about to be replaced
  by page content anyway).

## Accessibility & performance

- **`prefers-reduced-motion: reduce`**: gyroscope tilt never attaches its
  listener; mobile parallax stays off (same `prefersReduced` guard already
  in `initParallax`); the menu's item cascade is skipped, items appear at
  final state instantly; tap feedback's CSS transition is already
  neutralized by the site-wide reduced-motion rule in `styles.css` that
  zeroes all `transition-duration`s.
- **iOS permission button**: intentionally minimal and single-purpose —
  appears only on browsers that gate the sensor, disappears immediately
  after the user answers (granted or denied), and is never shown again in
  that session. No modal, no page-covering overlay — a small inline element
  near the Projects heading.
- **No new dependencies, no new CDN requests**: everything in this round
  uses already-loaded GSAP or native browser APIs.

## File changes

- `assets/js/interactive-effects.js` — add `initGyroTilt()` and the
  one-line iOS `:active` touchstart workaround; both called from the
  existing `DOMContentLoaded` handler alongside `initMagneticButtons()`/
  `initTerminal()`.
- `assets/js/scroll-effects.js` — modify `initParallax` to drop the
  `isMobile` early-return and use a per-viewport offset factor instead.
- `assets/js/main.js` — modify `initMobileNav` to add the GSAP cascade
  timeline on open.
- `assets/css/styles.css` — `:active` tap-feedback rules for `.btn` and the
  Projects cards; icon-morph rules for `.nav-toggle-bar` keyed off
  `.is-open`; a small style for the iOS gyroscope-permission button.
- `index.html` — add the iOS permission button markup (hidden by default,
  shown via JS feature detection) near the Projects section heading.
- `assets/js/i18n.js` — add the permission button's label as a new i18n key
  across all 4 languages.
