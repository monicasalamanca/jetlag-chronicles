# 05 — Migration script: import the 33 posts and write the report

Status: ready-for-agent
Type: AFK
Source: `docs/plan.md`

## What to build

One-time, re-runnable script (`scripts/migrate/`) that pulls all 33 posts from the live old Strapi API, maps them to the new model (plan §14), removes the 22 Klook/Wise affiliate links while keeping the text, flags anything needing a human, imports into the new Strapi and writes `docs/migration-report.md`.

## Acceptance criteria

- [ ] Reads from the live old API, not `jetlag_prod.sql`; upserts by slug so it can be re-run
- [ ] All 33 posts imported as published with original dates; author "Moni & Dunny"; Countries Thailand, Malaysia, Vietnam created
- [ ] Cover = old `images[0]`; Cloudinary URLs unchanged
- [ ] All 22 affiliate links removed (17 `affiliate.klook.com`, 5 `wise.prf.hn`); link text kept; each change listed in the report with before/after
- [ ] Report flags: newsletter/subscribe/download CTA text, links to `/guides` or `/free`, missing alt text, `www`/old-domain links, broken internal links
- [ ] Tests cover the affiliate-stripping and flagging functions with real examples
- [ ] Dry-run mode prints the report without writing to Strapi

## Blocked by

- [04 — Full story page with complete content model and SEO](04-story-page.md)
