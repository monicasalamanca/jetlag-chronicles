# 18 — Launch: switch the domain and follow up

Status: ready-for-human
Type: HITL
Source: `docs/plan.md`

## What to build

Run the launch checklist in plan §15, point the domain at the new site, and do the 30-day follow-ups.

## Acceptance criteria

- [ ] Every item in the plan §15 checklist ticked
- [ ] Old-URL verification (issue 10) passes against the preview, then against production
- [ ] Domain switched in one step; rollback steps written down before switching
- [ ] `SITE_LIVE=true`, password gate removed; sitemap submitted in Search Console; top pages checked with URL Inspection
- [ ] After 30 days: DMARC → quarantine (then reject); old Strapi DB backed up; old Railway Strapi and old Vercel project shut down; `jetlag-fe` and `jetlag-be` archived

## Blocked by

- [00 — Design system in Claude Design](00-design-system-claude-design.md)
- [01 — Walking skeleton: one story renders from Strapi at its real URL](01-walking-skeleton.md)
- [02 — Put it online: Railway Strapi + password-protected Vercel preview](02-deploy-preview.md)
- [03 — Design system in code: tokens, fonts, logo, header and footer](03-design-system-code.md)
- [04 — Full story page with complete content model and SEO](04-story-page.md)
- [05 — Migration script: import the 33 posts and write the report](05-migration-script.md)
- [06 — Review the migration report](06-migration-review.md)
- [07 — Places, country pages and Life Abroad](07-section-pages.md)
- [08 — Homepage](08-homepage.md)
- [09 — All stories, RSS, sitemap and robots](09-stories-feeds.md)
- [10 — Redirects and old-URL verification test](10-redirects.md)
- [11 — Instant publishing via Strapi webhook](11-instant-publishing.md)
- [12 — About, Privacy and 404 pages](12-about-privacy-404.md)
- [13 — Quality gates in CI: Lighthouse and accessibility](13-quality-gates.md)
- [14 — Reader Stories (built, hidden)](14-reader-stories-hidden.md)
- [15 — Our Travel Toolkit (built, hidden)](15-toolkit-hidden.md)
- [16 — Draft all new copy as Strapi drafts](16-draft-copy.md)
- [17 — Accounts, email and analytics setup](17-accounts-email-analytics.md)
