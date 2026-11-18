# 03 — Design system in code: tokens, fonts, logo, header and footer

Status: ready-for-agent
Type: AFK
Source: `docs/plan.md`

## What to build

Turn the approved design system into code: `tokens.css` (light + dark via `prefers-color-scheme`), self-hosted fonts, the logo as a recolourable inline SVG component, favicon set, global/Markdown body styles, skip link, header with menu and footer. Every page now uses the real shell.

## Acceptance criteria

- [ ] `tokens.css` matches `docs/design-system.md`; components use tokens only (no hardcoded colours, fonts, spacing, radii, shadows)
- [ ] Fonts self-hosted woff2 via `next/font/local` (OFL licence committed); no request to Google
- [ ] Logo component uses `--logo-ink` / `--logo-accent`; full logo and ring mark variants; favicon set generated from the ring mark
- [ ] Header with menu Places · Life Abroad · Stories · About (mobile + desktop, current-page state, keyboard accessible)
- [ ] Footer: ring mark, obfuscated contact email, Instagram/YouTube/X, RSS, Privacy, © Moni & Dunny; Toolkit link only when that section is switched on
- [ ] Skip link, visible focus style, reduced-motion respected
- [ ] Light and dark both checked for AA contrast; component tests for header and footer

## Blocked by

- [00 — Design system in Claude Design](00-design-system-claude-design.md)
- [01 — Walking skeleton: one story renders from Strapi at its real URL](01-walking-skeleton.md)
