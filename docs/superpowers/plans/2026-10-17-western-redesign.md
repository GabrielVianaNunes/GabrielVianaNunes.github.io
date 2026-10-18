# Western Modern Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the portfolio with the "Ranch Noir" modern-western identity without changing content, behavior or JS.

**Architecture:** The site already routes colors through CSS variables in `assets/css/styles.css`. We swap the tokens, add display/label fonts, then restyle components (radius, buttons, chips, cards, hero terminal, section tags) and regenerate the two raster assets.

**Tech Stack:** Static HTML/CSS/JS, Google Fonts, Python + Pillow (assets only).

## Global Constraints

- No pixel art, no decorative SVG illustration, nothing copied from the GitHub overview.
- Content, the 4 languages, navigation, scroll effects, hero terminal and theme toggle keep working; no JS changes except the `theme-color` values in `assets/js/theme.js` and `index.html`.
- Dark is the default look; light ("day") stays available through the existing toggle.
- Dark tokens: bg `#14110e`, surface `#1d1814`, text `#ece3d3`, muted `#9a8f7e`, primary (brass) `#b8893f`, rust `#8c4a2b`.
- Light tokens: bg `#f4efe6`, text `#1d1814`, primary darkened brass (~`#8a5f1e`), same rust.
- Text/background pairs meet WCAG AA (4.5:1 body, 3:1 large) in both themes.
- Work on `feature/redesign-western`; PR to `develop`.

---

### Task 1: Tokens, fonts and base typography

**Files:**
- Modify: `index.html` (font `<link>`s near line 26-28, `theme-color` meta line 13)
- Modify: `assets/css/styles.css:1-62` (tokens, body, links)
- Modify: `assets/js/theme.js` (the two `theme-color` strings)

**Interfaces:**
- Produces: variables `--font-display`, `--font-label`, `--rust`, plus re-valued `--bg --text --muted --surface --border --primary --ring`. Later tasks use these names.

- [ ] **Step 1: Specimen check.** Open a throwaway HTML in the scratchpad rendering "Gabriel Nunes" and an h2 in Bevan, Alfa Slab One and Zilla Slab 700 on `#14110e`; take a screenshot and pick the display font (default Bevan). Record the choice.
- [ ] **Step 2: Swap Google Fonts links** in `index.html` for the chosen display font + `Oswald:wght@500;600` (keep Inter and JetBrains Mono).
- [ ] **Step 3: Replace tokens** in `styles.css`:

```css
:root {
    --bg: #f4efe6; --text: #1d1814; --muted: #6e5e4f; --surface: #ebe3d4;
    --border: #d8ccb8; --primary: #8a5f1e; --ring: #c9a566; --rust: #8c4a2b;
    --accent: var(--primary);
    --font-display: "Rye", Georgia, serif;
    --font-label: "Oswald", "Arial Narrow", sans-serif;
    --mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
html[data-theme="dark"] {
    --bg: #14110e; --text: #ece3d3; --muted: #9a8f7e; --surface: #1d1814;
    --border: #2e2620; --primary: #b8893f; --ring: #6b4f22; --rust: #8c4a2b;
}
```
- [ ] **Step 4: Base type.** `h1,h2` use `var(--font-display)`; `h3` stays Inter 600. Update `theme-color` to `#14110e` (dark) / `#f4efe6` (light) in `theme.js` and `index.html`.
- [ ] **Step 5: Verify** with `preview_start` that both themes load, no console errors. Commit `feat: western palette tokens and fonts`.

### Task 2: Components and section tags

**Files:**
- Modify: `assets/css/styles.css` (header, hero, `.btn`, `.badge`, `.tags li`, `.card`, `.case-study`, timeline, skills, `.lang-card`, `.section-parallax::before`, terminal block, `.with-accent`)

**Interfaces:**
- Consumes: Task 1 variables.

- [ ] **Step 1: Radius and borders.** Replace `1rem`/`.75rem`/`999px` radii on cards, buttons, chips, badge with `3px`; keep 1px hairlines.
- [ ] **Step 2: Buttons.** `.btn` uses `font-family: var(--font-label); text-transform: uppercase; letter-spacing: .08em`; `.btn.primary` background `var(--primary)`, text `var(--bg)`.
- [ ] **Step 3: Section tags.** Add a CSS counter on `main` incremented per `.section h2`, rendering `counter(sec, decimal-leading-zero) " ·"` in a `::before` using `var(--font-label)`, small, tracked, `color: var(--primary)`. The hero is not counted.
- [ ] **Step 4: Glow.** `.section-parallax::before` gradient from `var(--primary)` at opacity `.08`.
- [ ] **Step 5: Terminal** colors to tokens (`--primary` for prompt, `--muted` for output); remove any leftover blue literals.
- [ ] **Step 6: Replace remaining hardcoded blues/whites** (`grep -n "#[0-9a-fA-F]\{3,6\}\|rgba\?(" styles.css`) with tokens; `.tags li` uses `var(--surface)`.
- [ ] **Step 7: Profile photo.** Add `filter: sepia(.18) saturate(.9) contrast(1.03)` to the profile image selector found in `index.html`.
- [ ] **Step 8: Verify** each section in dark and light at 1280px and 375px (resize_window), console clean. Commit `feat: western component styling`.

### Task 3: Raster assets

**Files:**
- Modify: `assets/img/favicon.png`, `assets/img/og-image.png` (locate real paths with `grep -n "favicon\|og-image" index.html`)

- [ ] **Step 1:** With Pillow, regenerate the GN monogram favicon (brass on `#14110e`) and the og-image (1200x630, name in the display font, role line, brass rule) in the new palette; keep the existing filenames and dimensions.
- [ ] **Step 2:** Open both images and confirm they render; commit `feat: western favicon and og image`.

### Task 4: Verification and PR

- [ ] **Step 1:** Contrast check script for the token pairs in both themes (relative luminance), all >= AA.
- [ ] **Step 2:** In the browser, switch all 4 languages and both themes, trigger theme toggle, scroll through all sections; confirm no console errors and no layout overflow at 375px.
- [ ] **Step 3:** Push `feature/redesign-western` and open the PR to `develop` with screenshots described in the body.
