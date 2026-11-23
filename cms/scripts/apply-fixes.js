/**
 * Apply scripts/migrate/fixes.json (issue 06 decisions) to the imported posts.
 *
 *   npm run apply-fixes -- ../scripts/migrate/fixes.json --dry-run   # check every edit, write nothing
 *   npm run apply-fixes -- ../scripts/migrate/fixes.json             # local database (.env)
 *
 * Against Railway: set DATABASE_CLIENT=postgres and DATABASE_URL to the Postgres *public* URL, and add --confirm.
 *
 * - Every edit is an exact find-and-replace on a post's body (or its cover alt). All of them are checked against the
 *   current posts first; if any `find` is missing (or a text fix appears more than once), nothing is written.
 * - Re-running is safe: an edit already applied is skipped (its `with` is there and its `find` is gone).
 * - Each changed post is saved and published again. Photo-library records get the same alt text.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

if (fs.existsSync(path.join(__dirname, '../.env'))) process.loadEnvFile(path.join(__dirname, '../.env'));

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const dryRun = args.includes('--dry-run');
const confirmed = args.includes('--confirm');

const count = (text, find) => text.split(find).length - 1;

/** The post's new body and cover alt, or the problems that stop the run. */
function plan(post, fix) {
  const problems = [];
  let body = post.body ?? '';
  let edits = 0;
  for (const r of fix.replace ?? []) {
    const n = count(body, r.find);
    if (n === 0) {
      if (!body.includes(r.with)) problems.push(`not found: ${r.find.slice(0, 70)}`);
      continue; // already applied
    }
    if (r.why === 'text' && n !== 1) {
      problems.push(`found ${n} times (expected once): ${r.find.slice(0, 70)}`);
      continue;
    }
    body = body.split(r.find).join(r.with);
    edits += 1;
  }
  const coverAlt = fix.coverAlt && fix.coverAlt !== post.coverAlt ? fix.coverAlt : null;
  return { body, coverAlt, edits, problems };
}

async function main() {
  if (!file) throw new Error('Usage: npm run apply-fixes -- <fixes.json> [--dry-run] [--confirm]');
  const fixes = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));

  const client = process.env.DATABASE_CLIENT || 'sqlite';
  const host = (() => {
    try {
      return new URL(process.env.DATABASE_URL).host;
    } catch {
      return '(no DATABASE_URL)';
    }
  })();
  console.log(`Target: ${client === 'sqlite' ? 'local SQLite' : `${client} at ${host}`}${dryRun ? ' (dry run: nothing is written)' : ''}`);
  if (client !== 'sqlite' && !dryRun && !confirmed) throw new Error('Not a local database: add --confirm to write to it.');

  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'warn';
  const posts = app.documents('api::post.post');
  const summary = { posts: 0, edits: 0, coverAlts: 0, alreadyDone: 0, files: 0 };

  try {
    // 1. Check everything before writing anything.
    const work = [];
    const problems = [];
    for (const [slug, fix] of Object.entries(fixes.posts)) {
      const post = await posts.findFirst({ filters: { slug }, status: 'draft' });
      if (!post) {
        problems.push(`${slug}: post not found`);
        continue;
      }
      const p = plan(post, fix);
      problems.push(...p.problems.map((m) => `${slug}: ${m}`));
      if (p.edits === 0 && !p.coverAlt) summary.alreadyDone += 1;
      else work.push({ slug, post, ...p });
    }
    if (problems.length > 0) {
      for (const m of problems) console.error(`PROBLEM ${m}`);
      throw new Error(`${problems.length} problem(s): nothing was written.`);
    }

    // 2. Posts: save and publish again.
    for (const w of work) {
      console.log(`${w.slug}: ${w.edits} edit(s)${w.coverAlt ? ' + cover alt' : ''}${dryRun ? ' (dry run)' : ''}`);
      summary.posts += 1;
      summary.edits += w.edits;
      if (w.coverAlt) summary.coverAlts += 1;
      if (dryRun) continue;
      await posts.update({ documentId: w.post.documentId, data: { body: w.body, ...(w.coverAlt && { coverAlt: w.coverAlt }) } });
      await posts.publish({ documentId: w.post.documentId });
    }

    // 3. Photo-library records: the same descriptions.
    const files = app.documents('plugin::upload.file');
    for (const f of fixes.files ?? []) {
      const record = await files.findFirst({ filters: { url: f.url } });
      if (!record || record.alternativeText === f.alternativeText) continue;
      summary.files += 1;
      if (!dryRun) await files.update({ documentId: record.documentId, data: { alternativeText: f.alternativeText } });
    }
  } finally {
    await app.destroy();
    console.log(JSON.stringify(summary, null, 2));
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
