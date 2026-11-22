# CLAUDE.md — The Jet Lag Chronicles

Non-monetized travel-story blog by Moni & Dunny (thejetlagchronicles.com). Rebuild of `../jetlag-fe` + `../jetlag-be`, keeping the 33 posts at their current URLs.

- Plan and every locked decision: `docs/plan.md` (read it before changing routes, the content model, SEO or redirects)
- Design: `docs/design-brief.md` → `docs/design-system.md` once Claude Design delivers (issue 00)
- Work items: `.scratch/rebuild/issues/` (local markdown tracker, see `docs/agents/issue-tracker.md`)

## Layout

```
cms/   Strapi 5 (npm). Content types in src/api/<type>/content-types/<type>/schema.json. Public API is read-only (find/findOne).
web/   Next.js 16 App Router (pnpm). Based on the-bio-hive setup.
  src/app/[place]/[slug]   every story: /<country>/<slug> and /lifestyle/<slug>
  src/lib/posts.ts         pure URL + Strapi query rules (tested)
  src/lib/content.ts       server-only data loading (Strapi, cached + tagged for webhook revalidation)
  src/lib/strapi/client.ts the only place that calls Strapi
  src/components/          presentational, data comes in as props (tested with renderToStaticMarkup)
  tests/                   Vitest
```

## Commands

| Where | Command | What |
|---|---|---|
| `web/` | `pnpm dev` / `pnpm build` | dev server / production build |
| `web/` | `pnpm test` / `pnpm typecheck` | Vitest / tsc |
| `cms/` | `npm run develop` / `npm run build` | Strapi with admin / build admin + TS |

## Rules

- **Story URLs never change.** `/<country>/<slug>` and `/lifestyle/<slug>` (section `place` / `life_abroad`). `storyPath()` in `src/lib/posts.ts` is the single source of truth.
- **Pages load, components render.** Pages fetch and pass plain props to synchronous components.
- **Tokens only** (after issue 03): components never hardcode colours, fonts, spacing, radii or shadows.
- **Portable hosting:** no Vercel-only features. Images go through the Cloudinary loader (`src/lib/cloudinary-loader.ts`); Vercel image optimization stays off.
- **No third-party scripts or cookies.** Fonts are self-hosted via `next/font/local`. Ask before adding any third-party request.
- **Markdown is sanitized**; raw HTML in post bodies is never rendered.
- **Pre-launch:** `SITE_LIVE` unset = noindex + robots disallow; `SITE_USER` + `SITE_PASSWORD` = password gate (`src/proxy.ts`).
- **Strapi versions move together.** Every `@strapi/*` package and the `overrides` block in `cms/package.json` must be the same exact version (mixed versions break the admin panel, e.g. API Tokens). Upgrade them all at once.
- Strapi secrets and tokens live only in `.env` files and the host's env vars. Never commit them.
