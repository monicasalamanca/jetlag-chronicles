# 09 — All stories, RSS, sitemap and robots

Status: ready-for-agent
Type: AFK
Source: `docs/plan.md`

## What to build

Build `/stories` (all published stories, newest first, paginated), `/rss.xml`, `/sitemap.xml` (with lastmod) and `robots.txt`.

## Acceptance criteria

- [ ] Pagination with crawlable links and correct canonicals per page
- [ ] RSS valid (W3C validator) with full titles, summaries, dates and links
- [ ] Sitemap includes only published, visible pages; excludes hidden sections and drafts
- [ ] `robots.txt` points to the sitemap and blocks all while `SITE_LIVE` is not true
- [ ] Tests for sitemap/RSS inclusion rules

## Blocked by

- [04 — Full story page with complete content model and SEO](04-story-page.md)
