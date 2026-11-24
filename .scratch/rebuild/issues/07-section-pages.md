# 07 — Places, country pages and Life Abroad

Status: done
Type: AFK
Source: `docs/plan.md`

## What to build

Build `/places` (countries grouped by continent, only countries with ≥1 story), country pages `/<country>` (intro + hero + stories newest first) and `/lifestyle` (Life Abroad intro + stories).

## Acceptance criteria

- [x] Country page exists only when the country has ≥1 published story; otherwise 404
- [x] Stories listed newest first using the standard story card
- [x] Places groups by continent with country cards (photo + story count)
- [x] Life Abroad intro comes from its Strapi single type
- [x] Metadata, canonical and JSON-LD (`CollectionPage` + `BreadcrumbList`) on each
- [x] Component tests for grouping and empty-country logic

## Blocked by

- [04 — Full story page with complete content model and SEO](04-story-page.md)
