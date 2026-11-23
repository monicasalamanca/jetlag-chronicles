/**
 * Migration, step 2 of 2 (plan §14): import scripts/migrate/out/import.json into this Strapi.
 *
 *   npm run import-posts -- ../scripts/migrate/out/import.json --dry-run   # show what would happen
 *   npm run import-posts -- ../scripts/migrate/out/import.json             # local database (.env)
 *
 * Against Railway: set DATABASE_CLIENT=postgres and DATABASE_URL to the Postgres *public* URL, and add --confirm.
 *
 * - Upserts by slug: countries, the "Moni & Dunny" author, then every post, then publishes them. Re-runnable.
 *   Re-running overwrites a post's migrated fields, so use --only-new once editing has started.
 * - Photos are not re-uploaded: cover photos get media-library records pointing at the existing Cloudinary URLs.
 * - Publishing goes through the same rules as the admin panel (src/post-rules.ts).
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

// Read cms/.env first (without overriding variables set on the command line) so the target check below is right.
if (fs.existsSync(path.join(__dirname, '../.env'))) process.loadEnvFile(path.join(__dirname, '../.env'));

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const dryRun = args.includes('--dry-run');
const onlyNew = args.includes('--only-new');
const confirmed = args.includes('--confirm');

const TEAM = { name: 'Moni & Dunny', slug: 'moni-and-dunny', type: 'team' };

async function main() {
  if (!file) throw new Error('Usage: npm run import-posts -- <import.json> [--dry-run] [--only-new] [--confirm]');
  const data = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));

  const client = process.env.DATABASE_CLIENT || 'sqlite';
  const target = client === 'sqlite' ? 'local SQLite' : `${client} at ${hostOf(process.env.DATABASE_URL)}`;
  console.log(`Target: ${target}${dryRun ? ' (dry run: nothing is written)' : ''}`);
  if (client !== 'sqlite' && !dryRun && !confirmed) throw new Error('Not a local database: add --confirm to write to it.');

  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'warn';
  const docs = (uid) => app.documents(uid);
  const summary = { countries: 0, posts: { created: 0, updated: 0, skipped: 0 }, photos: 0, failed: [] };

  try {
    // Countries
    const countryIds = {};
    for (const c of data.countries) {
      const existing = await docs('api::country.country').findFirst({ filters: { slug: c.slug }, status: 'draft' });
      if (dryRun) {
        console.log(`country ${c.slug}: ${existing ? 'update' : 'create'}`);
        countryIds[c.slug] = existing?.documentId ?? `(new ${c.slug})`;
        continue;
      }
      const fields = { name: c.name, slug: c.slug, continent: c.continent, intro: c.intro };
      const doc = existing
        ? await docs('api::country.country').update({ documentId: existing.documentId, data: fields })
        : await docs('api::country.country').create({ data: fields });
      await docs('api::country.country').publish({ documentId: doc.documentId });
      countryIds[c.slug] = doc.documentId;
      summary.countries += 1;
    }

    // Author
    let author = await docs('api::author.author').findFirst({ filters: { slug: TEAM.slug } });
    if (!author && !dryRun) author = await docs('api::author.author').create({ data: TEAM });
    console.log(`author ${TEAM.slug}: ${author ? 'ready' : 'create'}`);

    // Posts
    for (const p of data.posts) {
      const label = p.section === 'life_abroad' ? `/lifestyle/${p.slug}` : `/${p.countrySlug}/${p.slug}`;
      const existing = await docs('api::post.post').findFirst({ filters: { slug: p.slug, section: p.section }, status: 'draft' });
      if (existing && onlyNew) {
        summary.posts.skipped += 1;
        continue;
      }
      if (dryRun) {
        console.log(`post ${label}: ${existing ? 'update' : 'create'} + publish`);
        continue;
      }
      try {
        const cover = await coverRecord(app, p.cover, p.coverAlt, summary);
        const fields = {
          title: p.title,
          slug: p.slug,
          section: p.section,
          summary: p.summary,
          body: p.body,
          coverPhoto: cover.id,
          coverAlt: p.coverAlt,
          publishedDate: p.publishedDate,
          seoTitle: p.seoTitle,
          seoDescription: p.seoDescription,
          author: { set: [{ documentId: author.documentId }] },
          country: p.countrySlug ? { set: [{ documentId: countryIds[p.countrySlug] }] } : { set: [] },
        };
        const doc = existing
          ? await docs('api::post.post').update({ documentId: existing.documentId, data: fields })
          : await docs('api::post.post').create({ data: fields });
        await docs('api::post.post').publish({ documentId: doc.documentId });
        summary.posts[existing ? 'updated' : 'created'] += 1;
        console.log(`post ${label}: ${existing ? 'updated' : 'created'}, published`);
      } catch (error) {
        summary.failed.push(`${label}: ${error.message}`);
        console.error(`post ${label}: FAILED ${error.message}`);
      }
    }
  } finally {
    await app.destroy();
  }

  console.log(JSON.stringify(summary, null, 2));
  if (summary.failed.length > 0) process.exitCode = 1;
}

/** A media-library record for a cover that already lives on Cloudinary (found by URL, or created). No upload. */
async function coverRecord(app, cover, alt, summary) {
  const files = app.documents('plugin::upload.file');
  const existing = await files.findFirst({ filters: { url: cover.url } });
  if (existing) return existing;
  summary.photos += 1;
  return files.create({
    data: {
      name: cover.name,
      alternativeText: alt,
      caption: cover.caption,
      width: cover.width,
      height: cover.height,
      formats: cover.formats,
      hash: cover.hash,
      ext: cover.ext,
      mime: cover.mime,
      size: cover.size,
      url: cover.url,
      provider: cover.provider || 'cloudinary',
      provider_metadata: cover.provider_metadata,
      folderPath: '/',
    },
  });
}

function hostOf(url) {
  try {
    return new URL(url).host;
  } catch {
    return '(no DATABASE_URL)';
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
