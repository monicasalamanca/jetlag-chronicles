# 03 — Design system in code: tokens, fonts, logo, header and footer

Status: done
Type: AFK
Source: `docs/plan.md`

## What to build

Turn the approved design system into code: `tokens.css` (light + dark via `prefers-color-scheme`), self-hosted fonts, the logo as a recolourable inline SVG component, favicon set, global/Markdown body styles, skip link, header with menu and footer. Every page now uses the real shell.

## Acceptance criteria

- [x] `tokens.css` matches `docs/design-system.md`; components use tokens only (no hardcoded colours, fonts, spacing, radii, shadows)
- [x] Fonts self-hosted woff2 via `next/font/local` (OFL licence committed); no request to Google
- [x] Logo component uses `--logo-ink` / `--logo-accent`; full logo and ring mark variants; favicon set generated from the ring mark
- [x] Header with menu Places · Life Abroad · Stories · About (mobile + desktop, current-page state, keyboard accessible)
- [x] Footer: ring mark, obfuscated contact email, Instagram/YouTube/X, RSS, Privacy, © Moni & Dunny; Toolkit link only when that section is switched on
- [x] Skip link, visible focus style, reduced-motion respected
- [x] Light and dark both checked for AA contrast; component tests for header and footer

## Blocked by

- [00 — Design system in Claude Design](00-design-system-claude-design.md)
- [01 — Walking skeleton: one story renders from Strapi at its real URL](01-walking-skeleton.md)

## Comments

**2026-11-22 (Claude):** Built from the Claude Design bundle.
- `web/src/styles/`: `tokens.css`, `components.css`, `story.css` copied from `docs/design/css/` (font tokens point at next/font; menu marks a section with `aria-current="true"` too) plus `base.css` (page shell). The body is the `ctx` container the components query.
- Fonts: five woff2 subsets (Latin incl. Spanish accents and curly quotes, ~90 KB) via `next/font/local`, `src/fonts/OFL.md`. No Google request.
- Logo: `components/brand/Logo` (full + ring), generated from the brand SVGs with metadata stripped and ids prefixed so both can share a page. Favicon SVG/32/180 + 512 manifest icon.
- Header: logo link, desktop nav, no-JS `<details>` menu on phones (closes after navigation). Footer: ring mark, socials in text, email assembled in the browser (never in the HTML), RSS, Privacy, Toolkit only with `TOOLKIT_LIVE=true`.
- Markdown tables now sit in a focusable `.table-wrap` so a wide table never makes the page scroll sideways.
- Tests: header, footer, logo, and a tokens-only check (no hard-coded colours, no undefined tokens, every colour has a dark value). Checked in Chrome at 320/390/1280, light and dark.
- Story, home and 404 only got the shell here; their designed layouts are issues 04, 08 and 12.
