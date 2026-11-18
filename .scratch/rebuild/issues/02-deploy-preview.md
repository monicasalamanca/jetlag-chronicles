# 02 — Put it online: Railway Strapi + password-protected Vercel preview

Status: ready-for-human
Type: HITL
Source: `docs/plan.md`

## What to build

Deploy the new Strapi to Railway (new Postgres, same Cloudinary account) and the web app to a new Vercel project behind the password gate. Needs Moni to log into Railway, Vercel, Cloudinary and GitHub.

## Acceptance criteria

- [ ] Strapi runs on Railway with a new Postgres DB and the Cloudinary upload provider (same account as today)
- [ ] Strapi admin accounts for Moni and Dunny with unique passwords
- [ ] Read-only API token created and stored in Vercel env vars
- [ ] Vercel project deploys `web/` from the repo; preview requires the password; `SITE_LIVE` unset (noindex)
- [ ] Old Railway Strapi and old Vercel project untouched
- [ ] Env vars and service URLs documented (no secrets committed)

## Blocked by

- [01 — Walking skeleton: one story renders from Strapi at its real URL](01-walking-skeleton.md)
