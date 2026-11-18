# 07 — Places, country pages and Life Abroad

Status: ready-for-agent
Type: AFK
Source: `docs/plan.md`

## What to build

Build `/places` (countries grouped by continent, only countries with ≥1 story), country pages `/<country>` (intro + hero + stories newest first) and `/lifestyle` (Life Abroad intro + stories).

## Acceptance criteria

- [ ] Country page exists only when the country has ≥1 published story; otherwise 404
- [ ] Stories listed newest first using the standard story card
- [ ] Places groups by continent with country cards (photo + story count)
- [ ] Life Abroad intro comes from its Strapi single type
- [ ] Metadata, canonical and JSON-LD (`CollectionPage` + `BreadcrumbList`) on each
- [ ] Component tests for grouping and empty-country logic

## Blocked by

- [04 — Full story page with complete content model and SEO](04-story-page.md)
