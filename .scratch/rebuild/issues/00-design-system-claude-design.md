# 00 — Design system in Claude Design

Status: ready-for-human
Type: HITL
Source: `docs/plan.md`

## What to build

Moni runs `docs/design-brief.md` in Claude Design, starting from mood board A (`docs/design/mood-boards.html`) and the logo. The result becomes the design source of truth that every page issue builds from.

## Acceptance criteria

- [ ] Claude Design produced every deliverable listed in the brief (brand direction, logo usage + favicon set, colour/type/spacing tokens with light + dark values, contrast table, component specs, mobile + desktop page designs, social image template, "extending the system" rules, do/don't page)
- [ ] Guideline saved as `docs/design-system.md`; `tokens.css` and reference mockups saved under `docs/design/`
- [ ] Every text/background pair in the contrast table meets WCAG 2.2 AA in light and dark
- [ ] Moni & Dunny have approved the result
- [ ] `docs/plan.md` §7.3 points at `docs/design-system.md`

## Blocked by

None - can start immediately
