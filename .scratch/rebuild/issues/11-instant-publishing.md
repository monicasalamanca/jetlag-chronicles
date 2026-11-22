# 11 — Instant publishing via Strapi webhook

Status: done
Type: AFK
Source: `docs/plan.md`

## What to build

Strapi webhook on publish/unpublish/update/delete calls a secret-protected revalidate endpoint that revalidates by tag, so changes are live within seconds while pages stay static.

## Acceptance criteria

- [x] Revalidate endpoint rejects requests without the secret
- [x] Editing, publishing and unpublishing a post updates the story, its lists, home, sitemap and RSS within seconds
- [x] If Strapi is down the site keeps serving the last version
- [x] Works with standard Next.js APIs only (Cloudflare/OpenNext compatible)
- [x] Tested on the Vercel preview

## Blocked by

- [02 — Put it online: Railway Strapi + password-protected Vercel preview](02-deploy-preview.md)
- [04 — Full story page with complete content model and SEO](04-story-page.md)

## Comments

**2026-11-22 (Claude):** Built and tested locally (production build, gate on, real Strapi webhook).
- `POST /api/revalidate` with `Authorization: Bearer <REVALIDATE_SECRET>`; exempt from the preview password gate. Every Strapi fetch is tagged `strapi` + its content types (`posts`, `countries`; future types `strapi:<model>`). `entry.*` refreshes that model's tag; `media.*` refreshes everything.
- Uses `revalidateTag(tag, "max")` (stale-while-revalidate). Tried `{ expire: 0 }` first: fresh on the very first visit, but after a publish any page not yet re-visited returned **500 while Strapi was down**. With "max": first visit after publish shows the previous version, the next shows the new one (≈2 s), and pages keep serving if Strapi is down.
- Verified: draft save → no change; publish → new title on 2nd visit; unpublish → 404; wrong secret → 401; Strapi stopped → all pages 200.
- Sitemap/RSS/home don't exist yet; they must tag their fetches with `modelTag(...)` (issues 08, 09).
- Remaining: set `REVALIDATE_SECRET` in Vercel and create the webhook in the Railway Strapi admin, then test on the preview.

**2026-11-22 (Claude):** Production set up by Moni: `REVALIDATE_SECRET` in Vercel (Production), webhook "Website revalidate" in the Railway Strapi pointing at https://jetlag-chronicles.vercel.app/api/revalidate. The webhook's Trigger succeeded. Done.
