# 11 — Instant publishing via Strapi webhook

Status: ready-for-agent
Type: AFK
Source: `docs/plan.md`

## What to build

Strapi webhook on publish/unpublish/update/delete calls a secret-protected revalidate endpoint that revalidates by tag, so changes are live within seconds while pages stay static.

## Acceptance criteria

- [ ] Revalidate endpoint rejects requests without the secret
- [ ] Editing, publishing and unpublishing a post updates the story, its lists, home, sitemap and RSS within seconds
- [ ] If Strapi is down the site keeps serving the last version
- [ ] Works with standard Next.js APIs only (Cloudflare/OpenNext compatible)
- [ ] Tested on the Vercel preview

## Blocked by

- [02 — Put it online: Railway Strapi + password-protected Vercel preview](02-deploy-preview.md)
- [04 — Full story page with complete content model and SEO](04-story-page.md)
