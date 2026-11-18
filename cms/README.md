# CMS (Strapi 5)

Where Moni & Dunny write. Setup and commands: see the [root README](../README.md). Decisions: [`docs/plan.md`](../docs/plan.md) §6, §8, §12.

- Local: SQLite (`.tmp/data.db`), uploads on disk.
- Railway: `DATABASE_CLIENT=postgres` + `DATABASE_URL`, and `CLOUDINARY_NAME` / `CLOUDINARY_KEY` / `CLOUDINARY_SECRET` (see `.env.example`).
- The public API is read-only (find/findOne) and needs a read-only API token.
