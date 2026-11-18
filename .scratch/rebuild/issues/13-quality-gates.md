# 13 — Quality gates in CI: Lighthouse and accessibility

Status: ready-for-agent
Type: AFK
Source: `docs/plan.md`

## What to build

Add Lighthouse CI and axe checks so every change is held to plan §9.

## Acceptance criteria

- [ ] Lighthouse CI on Home, a country page and a story page: SEO 100, Accessibility 100, Best Practices 100, Performance ≥ 95 (mobile)
- [ ] axe finds no violations on every page template, in light and dark
- [ ] CI fails when a target is missed
- [ ] Check that no third-party request happens on load except Cloudinary and the Cloudflare analytics beacon

## Blocked by

- [08 — Homepage](08-homepage.md)
