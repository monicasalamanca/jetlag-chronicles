# 01 — Walking skeleton: one story renders from Strapi at its real URL

Status: done (needs review)
Type: AFK
Source: `docs/plan.md`

## What to build

Set up the monorepo (`cms/` Strapi 5, `web/` Next.js 16 on the the-bio-hive setup, adapted per plan §8) and prove the whole path end to end: a minimal Post in local Strapi renders as an unstyled story page at `/thailand/<slug>`. Includes CI, the password gate and noindex-until-live.

## Acceptance criteria

- [x] `pnpm dev` in `cms/` and `web/` runs locally; README explains setup and env vars (`.env.example` in both)
- [x] Minimal Post type (title, slug, section, body) + Country (name, slug); i18n plugin enabled, English only
- [x] A published Post renders at `/<country>/<slug>` and `/lifestyle/<slug>`; unknown slugs return 404
- [x] Strapi data fetched server-side with a read-only token; pages are statically generated
- [x] Cloudinary image loader configured; Vercel image optimization off
- [x] `proxy.ts` password gate on when `SITE_USER` + `SITE_PASSWORD` are set; `robots` disallows all and pages are `noindex` unless `SITE_LIVE=true`
- [x] GitHub Actions CI runs typecheck, lint, Vitest and `next build`
- [x] A component test renders the story component to static HTML (pages load, components render)
- [x] No Vercel-only features used

## Blocked by

None - can start immediately

## Comments

**2026-11-18 (Claude):** Done locally, not committed.
- `cms/`: Strapi 5.61.0 (npm), SQLite locally / Postgres via `DATABASE_CLIENT=postgres` + `DATABASE_URL`. Cloudinary provider turns on when `CLOUDINARY_NAME` is set. i18n default `en`. Post (title, slug, section, body, country) and Country (name, slug); public API limited to find/findOne and needs the read-only token. Strapi Cloud plugin removed.
- `web/`: Next.js 16.4.5. One route `[place]/[slug]` serves `/<country>/<slug>` and `/lifestyle/<slug>`; wrong country/section → 404. Static via `generateStaticParams`; fetches tagged `posts` / `post:<slug>` for issue 11.
- Section enum values use underscores (`life_abroad`, `reader_story`); plan updated.
- Verified end to end against local Strapi: both sample stories prerendered and served 200, wrong combos 404, `noindex, nofollow` + canonical present, robots disallows all, gate 401 without and 200 with credentials. Web build also passes with no CMS (CI case).
- 18 Vitest tests (routing, queries, loader, sanitizing, component render, password gate).
- Not yet run: the GitHub Actions workflow itself (no repo/remote yet).
