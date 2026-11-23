import type { Flag, MigratedPost } from "./transform.ts";

export type Skipped = { slug: string; flags: Flag[] };

export type ReportInput = {
  generatedAt: string;
  source: string;
  posts: MigratedPost[];
  skipped: Skipped[];
  /** Posts the plan's list of 33 didn't know about. */
  notInPlan: string[];
  countries: string[];
};

const quote = (s: string) => s.replace(/\s+/g, " ").replace(/\|/g, "\\|").trim();
const code = (s: string) => "`" + quote(s).replace(/`/g, "'") + "`";

/** docs/migration-report.md: what changed in every post, and every decision left for a human (issue 06). */
export function buildReport(input: ReportInput): string {
  const { posts } = input;
  const removed = posts.flatMap((p) => p.changes.filter((c) => c.kind === "affiliate-link-removed"));
  const byHost = (h: string) => removed.filter((c) => c.detail.startsWith(h)).length;
  const flagCount = posts.reduce((n, p) => n + p.flags.length, 0);
  const decisions = posts.filter((p) => p.flags.some((f) => f.kind !== "alt-text"));

  const out: string[] = [];
  out.push("# Migration report", "");
  out.push(`Generated ${input.generatedAt} from ${input.source} by \`scripts/migrate\`. Re-running the script rewrites this file.`, "", "**Decisions taken (issue 06) are recorded in `docs/migration-decisions.md`** and applied by `cms/scripts/apply-fixes.js`.", "");
  out.push("## Summary", "");
  out.push(`- **${posts.length} posts** ready to import (${posts.filter((p) => p.post.section === "place").length} place, ${posts.filter((p) => p.post.section === "life_abroad").length} Life Abroad), all credited to Moni & Dunny, original publish dates kept.`);
  out.push(`- **Countries:** ${input.countries.join(", ")}.`);
  out.push(`- **${removed.length} affiliate links removed** (${byHost("affiliate.klook.com")} Klook, ${byHost("wise.prf.hn")} Wise); the link text is kept.`);
  out.push(`- **${flagCount} flags** in ${posts.filter((p) => p.flags.length > 0).length} posts; ${decisions.length} posts need more than alt text.`);
  if (input.skipped.length > 0) out.push(`- **Not imported:** ${input.skipped.map((s) => `${s.slug} (${s.flags.map((f) => f.detail).join(" ")})`).join("; ")}.`);
  out.push("");

  out.push("## Decisions for Moni & Dunny", "");
  if (input.notInPlan.length > 0) {
    out.push(
      `- [ ] **${input.notInPlan.length} live posts the plan's list of 33 didn't include.** They are published, indexable and return 200 on the current site (they're only missing from its sitemap), so they're imported to keep their URLs. Remove any you don't want before launch (then add a redirect):`,
    );
    for (const p of input.notInPlan) out.push(`  - \`${p}\``);
  }
  for (const p of posts.filter((x) => x.flags.some((f) => f.kind === "partner-post"))) {
    out.push(`- [ ] **${p.path}** is built around an affiliate partner (its links are removed). Keep, rewrite or drop it?`);
  }
    out.push("- [ ] **Alt text:** every cover and most body photos had a file name as alt text. Placeholders were generated; replace them with real descriptions (listed per post below).");
  out.push("- [ ] Go through each post below with flags other than alt text and tick it off.", "");

  out.push("## Posts", "");
  for (const p of [...posts].sort((a, b) => a.path.localeCompare(b.path))) {
    out.push(`### ${p.path}`, "");
    out.push(`**${quote(p.post.title)}** · published ${p.post.publishedDate}`, "");
    if (p.changes.length === 0 && p.flags.length === 0) {
      out.push("No changes, no flags.", "");
      continue;
    }
    if (p.changes.length > 0) {
      out.push("Changes made:", "");
      for (const c of p.changes) {
        out.push(`- ${c.kind}: ${quote(c.detail)}`);
        if (c.before !== undefined) out.push(`  - before: ${code(c.before)}`);
        if (c.after !== undefined) out.push(`  - after: ${code(c.after)}`);
      }
      out.push("");
    }
    if (p.flags.length > 0) {
      out.push("To check:", "");
      for (const f of p.flags) out.push(`- [ ] **${f.kind}:** ${quote(f.detail)}${f.context ? `\n  - ${code(f.context)}` : ""}`);
      out.push("");
    }
  }
  return out.join("\n").trimEnd() + "\n";
}
