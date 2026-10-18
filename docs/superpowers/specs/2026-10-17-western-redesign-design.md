# Western modern redesign — design

## Goal

The portfolio looks generic and does not show who Gabriel is. Give it a
modern-western identity ("Yellowstone" tone: a programmer who loves that world)
that talks to the GitHub profile overview without copying it. The site stays
professional, refined and "means business".

## Constraints

- No pixel art, no decorative SVG illustration, no jokes, nothing copied from the
  overview (no quotes, dynamic elements, gags).
- Content, the 4 languages, navigation, scroll effects, terminal and the theme
  toggle keep working. No JS changes except the `theme-color` values.
- Git flow: work on `feature/redesign-western`, PR to `develop`.

## Direction (chosen: "Ranch Noir")

### Palette (CSS variables only)
- Dark (default): bg `#14110e`, surface `#1d1814`, text `#ece3d3`, muted `#9a8f7e`,
  primary (brass) `#b8893f`, secondary (rust) `#8c4a2b`, border warm dark brown.
- Light ("day"): bg bone `#f4efe6`, text `#1d1814`, primary darkened brass
  (~`#8a5f1e`) for contrast, same rust. Both themes and the toggle stay.
- The blue glow behind sections becomes a very faint warm horizon light.
- Contrast pairs verified to WCAG AA in both themes.

### Typography
- Display (h1, h2, hero name): Rye, a decorative western slab chosen by the owner.
- Labels, nav, buttons, section tags: condensed uppercase, wide tracking (Oswald).
- Body: Inter. Mono (terminal, tags): JetBrains Mono. Fonts via Google Fonts.
- Section tags numbered ("01 · About") through CSS counters, no HTML/i18n changes.

### Components
- Corners 2–4px, 1px hairlines, brass primary button, outlined secondary.
- Chips, timeline, skills, project cards, language cards restyled with the tokens.
- Profile photo gets a warm CSS `filter`; the file is untouched.
- Hero terminal kept, restyled in the warm palette.

### Supporting assets
- Regenerate `favicon.png` and `og-image.png` in the new palette.

## Out of scope
Content rewrites, new sections, JS behavior changes, anything dynamic.

## Verification
Browser check on desktop and mobile, light and dark, all 4 languages; AA contrast
check; no console errors.
