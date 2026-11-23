/**
 * Migration, step 1 of 2: read the live old Strapi, clean every post, write the report and the import file.
 * Never writes to Strapi (this is the dry run). Step 2 is cms/scripts/import-posts.js.
 *
 *   node scripts/migrate/run.ts                       # all posts
 *   node scripts/migrate/run.ts --exclude slug,slug   # leave some out
 *   OLD_STRAPI_URL=… node scripts/migrate/run.ts      # another source (default: the live old API)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { buildReport } from "./report.ts";
import { mapCountry, migratePost, type MigratedPost, type OldCountry, type OldPost, postPath, SITE_PAGES } from "./transform.ts";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SOURCE = (process.env.OLD_STRAPI_URL ?? "https://jetlag-be-production.up.railway.app").replace(/\/$/, "");
const OUT = path.join(import.meta.dirname, "out");

/** The plan's list (§5). Anything else live gets called out in the report. */
const PLANNED = new Set(
  `30-thailand-scams bangkok-condo-rental-guide bangkok-vs-kuala-lumpur-digital-nomads-guide chiang-mai-vs-bangkok-expat-guide
  cost-of-living-thailand dtv-visa-for-remote-workers is-thailand-still-worth-it ode-to-bangkok-love-letter-to-the-city
  phuket-expat-digital-nomad-guide thailand-dtv-vs-malaysia-de-rantau thailand-visa-border-run-guide
  de-rantau-malaysia-remote-work-visa kuala-lumpur-digital-nomad-city-guide mm2h-visa-guide-malaysia penang-digital-nomad-guide
  penang-vs-kuala-lumpur vietnam-cost-of-living-2026 vietnam-digital-nomad-hotspot-2026
  vietnam-visa-reality-for-digital-nomads-the-90-day-hack-border-runs-and-what-s-actually-legal where-to-live-in-vietnam
  2026-southeast-asia-index-rankings 2026-tax-arbitrage-execution-guide canadians-second-passports-exit-strategies
  digital-nomad-plateau-year-two easiest-digital-nomad-visas-2026 first-90-days-abroad-expat-field-manual
  interactive-brokers-digital-nomad-guide leaving-your-country-2026 lifestyle-design-done-waiting nomad-middle-class-financial-trap
  top-30-digital-nomad-questions-remote-work-guide why-digital-nomads-need-multiple-hubs why-you-shouldnt-live-work-and-bank-in-one-country`
    .split(/\s+/)
    .filter(Boolean),
);

async function get<T>(apiPath: string, query: Record<string, string>): Promise<T[]> {
  const items: T[] = [];
  for (let page = 1; ; page++) {
    const q = new URLSearchParams({ ...query, "pagination[page]": String(page), "pagination[pageSize]": "100" });
    const res = await fetch(`${SOURCE}/api/${apiPath}?${q}`);
    if (!res.ok) throw new Error(`Old Strapi ${res.status} for ${apiPath}`);
    const json = (await res.json()) as { data: T[]; meta: { pagination: { pageCount: number } } };
    items.push(...json.data);
    if (page >= json.meta.pagination.pageCount) return items;
  }
}

function arg(name: string): string[] {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? [] : (process.argv[i + 1] ?? "").split(",").filter(Boolean);
}

const exclude = new Set(arg("exclude"));
const oldPosts = (
  await get<OldPost>("blogs", {
    "populate[images]": "true",
    "populate[country][fields][0]": "name",
    "populate[country][fields][1]": "slug",
    "sort[0]": "publishedAt:asc",
  })
).filter((p) => !exclude.has(p.slug));
const oldCountries = await get<OldCountry>("countries", {});

const storyPaths = oldPosts.map(postPath).filter((p): p is string => p !== null);
const countries = oldCountries.map(mapCountry).filter((c) => oldPosts.some((p) => !p.lifestyle && p.country?.slug === c.slug));
const knownPaths = new Set([...SITE_PAGES, ...storyPaths, ...countries.map((c) => `/${c.slug}`)]);

const results = oldPosts.map((p) => migratePost(p, knownPaths));
const posts = results.filter((r): r is MigratedPost => r.path !== null);
const skipped = results.filter((r): r is { path: null; slug: string; flags: [] } => r.path === null);

const report = buildReport({
  generatedAt: new Date().toISOString().slice(0, 10),
  source: SOURCE,
  posts,
  skipped,
  notInPlan: posts.filter((p) => !PLANNED.has(p.post.slug)).map((p) => p.path),
  countries: countries.map((c) => c.name),
});

mkdirSync(OUT, { recursive: true });
writeFileSync(path.join(ROOT, "docs/migration-report.md"), report);
writeFileSync(path.join(OUT, "import.json"), JSON.stringify({ countries, posts: posts.map((p) => p.post) }, null, 2));
console.log(`${posts.length} posts, ${countries.length} countries, ${skipped.length} skipped.`);
console.log(`Report: docs/migration-report.md · Import file: scripts/migrate/out/import.json`);
