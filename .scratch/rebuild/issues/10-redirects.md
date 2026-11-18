# 10 — Redirects and old-URL verification test

Status: ready-for-agent
Type: AFK
Source: `docs/plan.md`

## What to build

Add every 301 in plan §11 (including legacy slug redirects from `jetlag-fe/next.config.ts`, pointed straight at final URLs) and a test that checks every URL in a saved copy of the old sitemap.

## Acceptance criteria

- [ ] Old sitemap saved in the repo as a fixture
- [ ] Every old URL returns 200 or exactly one 301 to a 200 (no chains, no 404s)
- [ ] Non-www, HTTPS, no trailing slash, lowercase enforced
- [ ] Test runs in CI against a build, and as a script against any deployed URL (used again at launch)

## Blocked by

- [05 — Migration script: import the 33 posts and write the report](05-migration-script.md)
- [07 — Places, country pages and Life Abroad](07-section-pages.md)
