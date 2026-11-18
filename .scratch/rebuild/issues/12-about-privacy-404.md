# 12 — About, Privacy and 404 pages

Status: ready-for-agent
Type: AFK
Source: `docs/plan.md`

## What to build

Build `/about` (bios, photos, how to reach us), `/privacy` (plain text page template) and a friendly 404. Contact email is obfuscated everywhere.

## Acceptance criteria

- [ ] About and Privacy content come from Strapi single types
- [ ] `Person` JSON-LD for Moni and Dunny on About
- [ ] Contact email not present as plain text in the HTML source, but works for keyboard and screen-reader users
- [ ] 404 links to Home, Places and Stories and returns status 404
- [ ] Component tests for the email obfuscation

## Blocked by

- [03 — Design system in code: tokens, fonts, logo, header and footer](03-design-system-code.md)
