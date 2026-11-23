# 05 — Migration script: import the posts and write the report

Status: built, production import pending (Moni)
Type: AFK
Source: `docs/plan.md`

## What to build

One-time, re-runnable script (`scripts/migrate/`) that pulls all 33 posts from the live old Strapi API, maps them to the new model (plan §14), removes the 22 Klook/Wise affiliate links while keeping the text, flags anything needing a human, imports into the new Strapi and writes `docs/migration-report.md`.

## Acceptance criteria

- [x] Reads from the live old API, not `jetlag_prod.sql`; upserts by slug so it can be re-run
- [x] All posts imported as published with original dates; author "Moni & Dunny"; countries created (41 posts and 6 countries, not 33 and 3: see the comment)
- [x] Cover = old `images[0]`; Cloudinary URLs unchanged
- [x] All affiliate links removed (25: 17 `affiliate.klook.com`, 8 `wise.prf.hn`); link text kept; each change listed in the report with before/after
- [x] Report flags: newsletter/subscribe/download CTA text, links to `/guides` or `/free`, missing alt text, `www`/old-domain links, broken internal links
- [x] Tests cover the affiliate-stripping and flagging functions with real examples
- [x] Dry-run mode prints the report without writing to Strapi

## Blocked by

- [04 — Full story page with complete content model and SEO](04-story-page.md)

## Comments

**2026-11-22 (Claude):** Built and run against a local Strapi.
- **41 live posts, not 33.** The 8 extra (4 Colombia, Japan, Cambodia, one Vietnam, one Thailand) are published and indexable on the current site (200, `index, follow`), just missing from its sitemap. Migrated so no live URL breaks; decision listed in the report (issue 06). Plan §5 and §11 updated (no `/japan`, `/colombia`, `/cambodia` → `/places` redirects).
- **25 affiliate links** (17 Klook, 8 Wise): the extra 3 are in the Wise Thailand post, flagged as a partner post.
- Also found: 8 `[CTA …]` newsletter/download shortcodes (removed, listed), the cover repeated at the top of 39 bodies (removed), 3 full links to our own domain (made relative), 2 links without `https://`, file names as alt text almost everywhere (placeholders + flags), 2 summaries over 200 characters (shortened + flagged), 8 posts whose publish date is a later re-publish (flagged).
- The old site turned single line breaks into breaks (187 places rely on it), so the web renderer now does too (`remark-breaks`).
- Step 1: `node scripts/migrate/run.ts` (dry run: report + `scripts/migrate/out/import.json`, never writes to Strapi). Step 2: `cd cms && npm run import-posts -- ../scripts/migrate/out/import.json [--dry-run] [--only-new]`. Photos aren't re-uploaded: cover records point at the existing Cloudinary URLs. Upserts by slug; a second run updated 41, created 0, no duplicate photos.
- Locally: all 41 URLs return 200 on the new site; production build passes the alt-text check.
- **Remaining:** run step 2 against the Railway database (walkthrough with Moni). The Railway webhook will refresh the Vercel pages as posts publish.
