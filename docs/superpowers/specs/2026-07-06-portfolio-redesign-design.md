# Portfolio Redesign — Design Spec

**Date:** 2026-07-06
**Repo:** `portifolio-gabriel` (GitHub: `GabrielVianaNunes/gabrielviananunes`, GitHub Pages)

## Goal

Turn the current single-page, English-only, static portfolio into a modern,
recruiter-facing, multilingual (PT/EN/DE/ES), light/dark portfolio that gives
strong visibility to the ZEISS Germany internship, presents projects as case
studies, and keeps the "premium minimalist tech" feel of sites like
linear.app / vercel.com.

## Non-goals

- No build tooling / framework / SSG. Stays plain HTML + CSS + vanilla JS,
  deployable as-is via GitHub Pages.
- No backend, no contact form submission (mailto/links only).
- No CMS or external translation service — translations are hand-authored
  JS dictionaries.
- No case-study repo link for the SENAI project (none exists).
- No new profile photo in this pass (current `assets/img/profile.jpg` stays;
  the `<img>` markup must keep working once the file is swapped later).

## Real content to use

- Email: `gabrielnunes.service@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/gabriel-nunes-b8820a254`
- GitHub: `https://github.com/GabrielVianaNunes` (all project repo links use
  this user)
- CV file: copy `C:\Users\gabri\OneDrive\Área de Trabalho\Gabriel-Docs\Documentos_Tarefas\Currículos\Currículo Gabriel Viana Nunes.pdf`
  into `assets/cv/Gabriel-Viana-Nunes-CV.pdf` and link it from a "Download CV"
  button (hero + contact section).
- Location: Goiânia, Brazil — shown as a short line under the hero headline
  ("open to remote & international opportunities") and in the footer line.
- Timeline dates (Experience section):
  - SENAI FATESG · Software Engineering — started early 2023, expected
    completion end of 2026 (in progress).
  - ZEISS (Germany) · International Full-Stack Developer Internship —
    Oct 1, 2025 to ~Apr 1, 2026 (6 months, completed).

## Information architecture (section order)

1. Header/nav — logo "GN", nav links (About, Experience, Skills, Projects,
   Contact), language dropdown (flags: 🇧🇷/🇺🇸/🇩🇪/🇪🇸), light/dark toggle
   button, hamburger menu on mobile (nav now has one more item + two
   controls, so collapsing is required below ~800px).
2. Hero — stronger headline, a small highlight badge near the name (e.g.
   "Ex-intern at ZEISS Germany 🇩🇪"), location/remote line, lead paragraph,
   CTAs: "See projects", "Download CV", "GitHub".
3. About — shorter, more personal/impact-driven narrative (goals, what
   drives the work), not a re-list of the skills grid.
4. **Experience (new section)** — vertical timeline with the two entries
   above, ordered chronologically top-to-bottom (SENAI FATESG start in 2023
   first, then the ZEISS internship in its Oct 2025–Apr 2026 slot, both
   converging into "in progress" for the still-ongoing degree). ZEISS
   entry: high-level only (role, stack categories in general terms,
   international/corporate/agile environment, cross-cultural collaboration)
   — no confidential specifics of the internal system built.
5. Skills — regrouped into categories: Backend, Frontend, Database, Tools,
   Other competencies. Union of the new skill list and the pre-existing
   items (TypeScript, AWS Cloud Foundations, PrimeNG, Optical Metrology,
   Data Structures & Algorithms, Design Patterns) — nothing removed.
   Process automation is mentioned here (or in About) as a competency, not
   as a project card.
6. Projects (case studies) —
   - **Featured case:** SENAI Metrology Lab Management System. No repo
     link. Present as problem → solution → stack, more detailed than the
     others (permission hierarchy, service-order management, automatic PDF
     generation, PostgreSQL, Spring Boot backend).
   - **Secondary cases** (existing 3, same repo links, richer descriptions
     than today's one-liners): Library System (`biblioteca-jpa`), Contacts
     Agenda (`agenda-angular`), Vehicle Rental (`vehiclerental_api`), all
     under `github.com/GabrielVianaNunes/...`.
7. Contact — real email, real LinkedIn, GitHub, secondary "Download CV"
   button.
8. Footer — minimal, "© 2026 Gabriel Nunes · Goiânia, Brazil".

## Visual design system

- **Direction:** minimalist/technical (linear.app / vercel.com references) —
  neutral background, strong type hierarchy, generous whitespace, thin
  borders, no flashy gradients or glassmorphism.
- **Accent color:** electric blue — refine existing tokens
  `--primary`/`--ring` for stronger, more consistent contrast in both
  themes (light ~`#3B82F6`, dark ~`#60A5FA`), reused for links, buttons,
  timeline markers, focus rings.
- **Typography:** keep Inter for body/headings; add a lightweight monospace
  face (e.g. JetBrains Mono, Google Fonts) reserved for tags, skill pills,
  and small labels (case-study stack tags, timeline dates) to reinforce the
  "technical" feel.
- **Theme:** manual light/dark toggle (button in header), persisted in
  `localStorage`; on first visit with no stored preference, fall back to
  `prefers-color-scheme`. Both themes get calibrated shadows/borders, not
  just swapped background/text colors.

## i18n architecture

- Four languages: `pt`, `en`, `de`, `es`. English text lives directly in the
  HTML (source of truth for SEO/crawlers, `<html lang="en">` stays as the
  default markup language).
- `assets/js/i18n.js` holds one dictionary object keyed by language, each
  value keyed by a `data-i18n` id present on the corresponding HTML element
  (text, `alt`, `aria-label`, `placeholder` handled via `data-i18n-attr`).
- Language resolution order: `localStorage` saved choice → browser language
  (`navigator.language`, matched against pt/de/es) → English fallback.
- Header language control: compact button showing current flag, opens an
  accessible dropdown (button + listbox pattern, Escape/Arrow/Enter support)
  listing all four languages with flag + name.
- Switching language only swaps text content client-side; no URL/routing
  changes.

## Theme architecture

- `assets/js/theme.js`: reads/writes `localStorage['site-theme']`
  (`light`/`dark`), toggles a `data-theme` attribute on `<html>` that the
  CSS keys off of (replacing/augmenting the current
  `prefers-color-scheme`-only approach), updates the `theme-color` meta tag
  to match.
- Toggle button lives in the header, icon swaps (sun/moon), accessible
  label swaps via i18n.

## Accessibility, SEO, performance

- Keep skip-link, `aria-current` on active nav link, visible focus states.
- New language dropdown and mobile hamburger must be fully keyboard
  operable with correct ARIA roles/states.
- Add explicit `width`/`height` on the profile `<img>` to avoid layout
  shift; keep `loading="lazy"`.
- Meta description / OG tags stay in English (the indexable source
  language); no per-language meta swapping in this pass.
- No new heavy dependencies; keep existing CDNs (devicon, flag-icons,
  Google Fonts) and add only the monospace font.
- Scroll-reveal animations via `IntersectionObserver`, respecting the
  existing `prefers-reduced-motion` CSS block (already present, must keep
  working for the new animations too).

## File changes

- `index.html` — restructured sections, new Experience section, new
  header controls, `data-i18n` attributes throughout, updated real
  links/content.
- `assets/css/styles.css` — extended design tokens (accent, monospace
  font, `data-theme` support), new component styles: timeline, case-study
  cards, language dropdown, theme toggle, mobile nav.
- `assets/js/i18n.js` (new)
- `assets/js/theme.js` (new)
- `assets/js/main.js` (new) — bootstraps theme + i18n, scroll-reveal,
  active-nav-on-scroll, dropdown/mobile-menu interactions.
- `assets/cv/Gabriel-Viana-Nunes-CV.pdf` (new, copied from provided path).
