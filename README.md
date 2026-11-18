# The Jet Lag Chronicles

Travel stories by Moni & Dunny: https://thejetlagchronicles.com

| Folder | What | Stack | Deploys to |
|---|---|---|---|
| `web/` | The website | Next.js 16, React 19, TypeScript, pnpm | Vercel |
| `cms/` | Where we write | Strapi 5, npm | Railway (Postgres + Cloudinary) |
| `docs/` | Plan, design brief, tracker notes | Markdown | — |
| `.scratch/rebuild/issues/` | Build tasks | Markdown | — |

Every decision lives in [`docs/plan.md`](docs/plan.md).

## Run it locally

Needs Node 22+ and pnpm 11.

```bash
# 1. CMS (SQLite locally, no database setup)
cd cms
cp .env.example .env        # then replace every "tobemodified" with a random value
npm install
npm run develop             # admin at http://localhost:1337/admin, create your admin user there

# 2. In the admin: Settings → API Tokens → create a "Read-only" token.

# 3. Website
cd ../web
cp .env.example .env.local  # set STRAPI_API_TOKEN to the token from step 2
pnpm install
pnpm dev                    # http://localhost:3000
```

Publish a Country and a Post in the admin, then open `/<country-slug>/<post-slug>` (or `/lifestyle/<slug>` for Life Abroad).

## Checks

```bash
cd web && pnpm typecheck && pnpm test && pnpm build
cd cms && npm run build
```

CI (`.github/workflows/ci.yml`) runs the same on every push and pull request. The web build works without a CMS (story pages then render on first request).
