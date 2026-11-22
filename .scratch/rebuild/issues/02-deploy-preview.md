# 02 — Put it online: Railway Strapi + password-protected Vercel preview

Status: done
Type: HITL
Source: `docs/plan.md`

## What to build

Deploy the new Strapi to Railway (new Postgres, same Cloudinary account) and the web app to a new Vercel project behind the password gate. Needs Moni to log into Railway, Vercel, Cloudinary and GitHub.

## Acceptance criteria

- [x] Strapi runs on Railway with a new Postgres DB and the Cloudinary upload provider (same account as today)
- [x] Strapi admin accounts for Moni and Dunny with unique passwords
- [x] Read-only API token created and stored in Vercel env vars
- [x] Vercel project deploys `web/` from the repo; preview requires the password; `SITE_LIVE` unset (noindex)
- [x] Old Railway Strapi and old Vercel project untouched
- [x] Env vars and service URLs documented (no secrets committed)

## Blocked by

- [01 — Walking skeleton: one story renders from Strapi at its real URL](01-walking-skeleton.md)

## Comments

**2026-11-22 (Claude):** Done.
- Railway project `jetlag-chronicles`: Postgres + Strapi from `cms/` (`cms/railway.json`), Cloudinary via a new API key `jetlag-chronicles-cms`, `PORT=1337`, `PUBLIC_URL` + `IS_PROXIED=true`. Admins: Moni (personal email), Dunny invited. Read-only token `web-read`.
- Vercel project `jetlag-chronicles` (root `web/`): https://jetlag-chronicles.vercel.app. `STRAPI_URL`, `STRAPI_API_TOKEN`, `SITE_USER`, `SITE_PASSWORD` set; `SITE_LIVE` unset. Custom domain not added (issue 18).
- Verified: every path (pages, robots.txt, /_next assets) returns 401 with the pre-launch realm; wrong credentials refused.
- Fixes found while deploying: PR #2 (missing `pg` driver), PR #3 (duplicate @strapi/admin 5.63 broke API Tokens page; all @strapi pinned to 5.61.0 via overrides).
- Old Railway Strapi and old Vercel project untouched.
