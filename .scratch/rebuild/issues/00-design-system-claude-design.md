# 00 — Design system in Claude Design

Status: done
Type: HITL
Source: `docs/plan.md`

## What to build

Moni runs `docs/design-brief.md` in Claude Design, starting from mood board A (`docs/design/mood-boards.html`) and the logo. The result becomes the design source of truth that every page issue builds from.

## Acceptance criteria

- [x] Claude Design produced every deliverable listed in the brief (brand direction, logo usage + favicon set, colour/type/spacing tokens with light + dark values, contrast table, component specs, mobile + desktop page designs, social image template, "extending the system" rules, do/don't page)
- [x] Guideline saved as `docs/design-system.md`; `tokens.css` and reference mockups saved under `docs/design/`
- [x] Every text/background pair in the contrast table meets WCAG 2.2 AA in light and dark
- [x] Moni & Dunny have approved the result
- [x] `docs/plan.md` §7.3 points at `docs/design-system.md`

## Blocked by

None - can start immediately

## Comments

**2026-11-22 (Claude):** All three rounds delivered and saved: `docs/design-system.md`, `docs/design/` (foundations, components, pages gallery + 12 pages, social templates, brand files, fonts). Answers to the 8 round-1 questions applied (ink eyebrows, clay only for Reader Stories, 4:5 country cards, 2:1 covers on desktop, cool dark mode, credit only when filled in, no monospace, logo ink #2E3A4B). Contrast re-checked independently: every pair passes AA, lowest 4.67:1. Small doc mismatches fixed (focus offset 3px, real radius token names). Moni approved and asked to build it (issue 03).
