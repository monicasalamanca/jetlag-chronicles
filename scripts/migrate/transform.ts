/**
 * Pure rules for moving the old posts into the new model (plan §14). No I/O here, so every rule is tested.
 * Runs on Node 24 directly (type stripping): no enums, no parameter properties, `.ts` import paths.
 */

export type OldImage = {
  url: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  name?: string;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  provider?: string;
  provider_metadata?: unknown;
};

export type OldPost = {
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  images: OldImage[] | null;
  lifestyle: boolean | null;
  country: { name: string; slug: string } | null;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string;
  createdAt: string;
};

export type OldCountry = { name: string; slug: string; continent: string | null; intro: string | null };

export type Continent = "asia" | "europe" | "africa" | "north_america" | "south_america" | "oceania";

export type NewCountry = { name: string; slug: string; continent: Continent; intro: string | null };

export type NewPost = {
  title: string;
  slug: string;
  section: "place" | "life_abroad";
  summary: string;
  body: string;
  countrySlug: string | null;
  cover: OldImage;
  coverAlt: string;
  publishedDate: string;
  seoTitle: string | null;
  seoDescription: string | null;
};

/** Something changed automatically; listed in the report with before/after. */
export type Change = { kind: string; detail: string; before?: string; after?: string };
/** Something a human has to look at (issue 06). */
export type Flag = { kind: string; detail: string; context?: string };

export type MigratedPost = { path: string; post: NewPost; changes: Change[]; flags: Flag[] };

export const AFFILIATE_HOSTS = ["affiliate.klook.com", "wise.prf.hn"];
export const SUMMARY_MAX = 200;
export const SEO_TITLE_MAX = 60;
export const SEO_DESCRIPTION_MAX = 160;

const OWN_HOSTS = ["thejetlagchronicles.com", "www.thejetlagchronicles.com"];

/** Old country names are lowercase ("thailand"); continents use spaces ("south america"). */
export function mapCountry(old: OldCountry): NewCountry {
  const continents: Record<string, Continent> = {
    asia: "asia",
    europe: "europe",
    africa: "africa",
    "north america": "north_america",
    "south america": "south_america",
    "australia (oceania)": "oceania",
  };
  const name = old.name
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return { name, slug: old.slug, continent: continents[(old.continent ?? "").toLowerCase()] ?? "asia", intro: old.intro?.trim() || null };
}

function hostOf(url: string): string | null {
  try {
    return new URL(url).host.toLowerCase();
  } catch {
    return null;
  }
}

const isAffiliate = (url: string) => AFFILIATE_HOSTS.includes(hostOf(url) ?? "");

/** The line a match sits in, trimmed, for the report. */
function lineAround(text: string, index: number): string {
  const start = text.lastIndexOf("\n", index) + 1;
  const end = text.indexOf("\n", index);
  return text.slice(start, end === -1 ? undefined : end).trim();
}

/** Markdown links that are not images: [text](url "title"). */
const LINK = /(?<!!)\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g;

/**
 * Removes affiliate links but keeps their text: "[book on Klook](https://affiliate.klook.com/…)" → "book on Klook".
 * Each removal is a change with the line before and after.
 */
export function stripAffiliateLinks(markdown: string): { markdown: string; changes: Change[] } {
  const changes: Change[] = [];
  const out = markdown.replace(LINK, (match, text: string, url: string, offset: number) => {
    if (!isAffiliate(url)) return match;
    const before = lineAround(markdown, offset);
    changes.push({ kind: "affiliate-link-removed", detail: `${hostOf(url)}: "${text}"`, before });
    return text;
  });
  // Fill in the "after" lines now that every link on the line is gone.
  for (const change of changes) {
    const kept = change.before!.replace(LINK, (m, text: string, url: string) => (isAffiliate(url) ? text : m));
    change.after = kept;
  }
  return { markdown: out, changes };
}

/**
 * The old site turned "[CTA type=… title=… button=… isSubscribeModal=…]" into newsletter / download boxes. The new
 * site has none (plan §7.2), so the shortcode line goes; its title and button text are kept in the report.
 */
export function removeShortcodes(markdown: string): { markdown: string; changes: Change[] } {
  const changes: Change[] = [];
  const out = markdown.replace(/^[ \t]*\[CTA\s[^\]\n]*\][ \t]*(?:\n|$)/gm, (match) => {
    const attrs = Object.fromEntries([...match.matchAll(/(\w+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
    changes.push({
      kind: "cta-box-removed",
      detail: `Newsletter/download box removed: "${attrs.title ?? ""}" (button "${attrs.button ?? ""}").`,
      before: match.trim(),
    });
    return "";
  });
  return { markdown: out, changes };
}

/** Words that read oddly once the link is gone ("click here now", "grab the app here"). */
const ODD_WITHOUT_LINK = /\b(click|tap|here|sign up|grab|get it|check (it|them) out|book (it|now)|use (this|my) link)\b/i;

export function oddAfterRemoval(changes: Change[]): Flag[] {
  return changes
    .filter((c) => c.after && ODD_WITHOUT_LINK.test(c.after))
    .map((c) => ({ kind: "reword", detail: "Reads oddly without its link; reword lightly.", context: c.after }));
}

/** "Bangkok_City_sky_view_aa0076be06.jpg" or "Bangkok, City sky view.jpg" → "Bangkok, City sky view". */
export function altFromFilename(nameOrUrl: string): string {
  const file = decodeURIComponent(nameOrUrl.split("/").pop() ?? "");
  return file
    .replace(/\.(jpe?g|png|webp|gif|avif)$/i, "")
    .replace(/_[0-9a-f]{10}$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const looksLikeFilename = (alt: string) => /\.(jpe?g|png|webp|gif|avif)\s*$/i.test(alt) || /_[0-9a-f]{10}\b/i.test(alt);

const IMAGE = /!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?((?:\s+"[^"]*")?)\s*\)/g;

/**
 * Body photo alt text: file names become readable placeholders ("Bangkok, City sky view.jpg" → "Bangkok, City
 * sky view"), empty alts get one from the file name. Every placeholder is flagged for a real description.
 */
export function fixImageAlts(markdown: string): { markdown: string; fixed: number } {
  let fixed = 0;
  const out = markdown.replace(IMAGE, (match, alt: string, url: string, title: string) => {
    if (alt.trim() && !looksLikeFilename(alt)) return match;
    fixed += 1;
    const placeholder = altFromFilename(alt.trim() || url) || "Photo";
    return `![${placeholder.replace(/[[\]]/g, "")}](${url}${title})`;
  });
  return { markdown: out, fixed };
}

/** The old site showed images[0] above the body and many bodies repeat it first (often followed by ---). */
export function removeLeadingCover(markdown: string, coverUrl: string): { markdown: string; removed: boolean } {
  const match = /^\s*!\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)[ \t]*(?:\n\s*(?:-{3,}|\*{3,}|_{3,})[ \t]*(?=\n|$))?\s*/.exec(markdown);
  if (!match || match[1] !== coverUrl) return { markdown, removed: false };
  return { markdown: markdown.slice(match[0].length), removed: true };
}

/** Shortens to the last full sentence within max (or the last word, with an ellipsis). */
export function shortenSummary(text: string, max = SUMMARY_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const sentence = cut.match(/^.*[.!?](?=\s|$)/);
  if (sentence && sentence[0].length >= max * 0.5) return sentence[0];
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s]+$/, "")}…`;
}

const CTA = /\b(newsletter|subscribe|download (our|my|this|a free|the free)|free (guide|checklist|download|pdf|e-?book)|sign up (for|to) (our|my|the (newsletter|list))|join (our|my) (list|newsletter|community)|mailing list)\b/i;

/** Lines with newsletter / subscribe / download / sign-up wording: the old site's calls to action (plan §14.5). */
export function findCtaLines(markdown: string): Flag[] {
  return markdown
    .split("\n")
    .filter((line) => CTA.test(line))
    .map((line) => ({ kind: "cta", detail: "Call-to-action wording: keep, reword or remove.", context: line.trim().slice(0, 300) }));
}

/**
 * Link problems (plan §14.5–6): links to /guides or /free (gone), old-domain or www links, internal links to
 * pages that won't exist, and links without a scheme ("arrival.gov.kh" is read as a relative path).
 */
/** Full links to our own site → paths ("https://thejetlagchronicles.com/x" → "/x"), so they survive a domain move. */
export function relativizeOwnLinks(markdown: string): { markdown: string; changes: Change[] } {
  const changes: Change[] = [];
  const out = markdown.replace(LINK, (match, text: string, url: string) => {
    const host = hostOf(url);
    if (!host || !OWN_HOSTS.includes(host)) return match;
    const u = new URL(url);
    const target = (u.pathname.replace(/\/+$/, "") || "/") + u.search + u.hash;
    changes.push({ kind: "own-link-made-relative", detail: `${url} → ${target}` });
    return match.replace(url, target);
  });
  return { markdown: out, changes };
}

export function findLinkProblems(markdown: string, knownPaths: ReadonlySet<string>): Flag[] {
  const flags: Flag[] = [];
  for (const m of markdown.matchAll(LINK)) {
    const [, text, url] = m;
    const context = lineAround(markdown, m.index ?? 0).slice(0, 300);
    if (url.startsWith("#") || url.startsWith("mailto:")) continue;
    const host = hostOf(url);
    if (host && !OWN_HOSTS.includes(host)) continue;
    let path = url;
    if (host) {
      if (host.startsWith("www.")) flags.push({ kind: "www-link", detail: `Link to the www address: ${url}`, context });
      path = new URL(url).pathname;
    } else if (!url.startsWith("/")) {
      flags.push({ kind: "broken-link", detail: `"${text}" links to "${url}" (no https://, so it opens a page on our site).`, context });
      continue;
    }
    const clean = path.replace(/\/+$/, "") || "/";
    if (/^\/(guides|free)(\/|$)/.test(clean)) flags.push({ kind: "removed-page", detail: `Links to ${clean}, which won't exist.`, context });
    else if (!knownPaths.has(clean)) flags.push({ kind: "broken-link", detail: `Internal link to ${clean}, which won't exist.`, context });
  }
  return flags;
}

/** Pages the new site has besides stories (plan §3). */
export const SITE_PAGES = ["/", "/places", "/lifestyle", "/stories", "/about", "/privacy", "/rss.xml"];

export function postPath(old: Pick<OldPost, "slug" | "lifestyle" | "country">): string | null {
  if (old.lifestyle) return `/lifestyle/${old.slug}`;
  return old.country ? `/${old.country.slug}/${old.slug}` : null;
}

/** Old post → new post, with every automatic change and every flag for the report. */
export function migratePost(old: OldPost, knownPaths: ReadonlySet<string>): MigratedPost | { path: null; slug: string; flags: Flag[] } {
  const path = postPath(old);
  if (!path) return { path: null, slug: old.slug, flags: [{ kind: "no-country", detail: "Place story without a country: not imported." }] };
  const changes: Change[] = [];
  const flags: Flag[] = [];

  const cover = old.images?.[0];
  if (!cover) return { path: null, slug: old.slug, flags: [{ kind: "no-cover", detail: "No photo to use as the cover: not imported." }] };

  let body = old.content ?? "";
  const lead = removeLeadingCover(body, cover.url);
  if (lead.removed) changes.push({ kind: "cover-repeat-removed", detail: "Removed the cover photo repeated at the top of the body." });
  body = lead.markdown;

  const shortcodes = removeShortcodes(body);
  body = shortcodes.markdown;
  changes.push(...shortcodes.changes);

  const stripped = stripAffiliateLinks(body);
  body = stripped.markdown;
  changes.push(...stripped.changes);
  flags.push(...oddAfterRemoval(stripped.changes));

  const own = relativizeOwnLinks(body);
  body = own.markdown;
  changes.push(...own.changes);

  const alts = fixImageAlts(body);
  body = alts.markdown;
  if (alts.fixed > 0) flags.push({ kind: "alt-text", detail: `${alts.fixed} body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.` });

  let coverAlt = (cover.alternativeText ?? cover.caption ?? "").trim();
  if (!coverAlt || looksLikeFilename(coverAlt)) {
    coverAlt = altFromFilename(coverAlt || cover.name || cover.url) || old.title;
    flags.push({ kind: "alt-text", detail: `Cover photo had no alt text; placeholder "${coverAlt}". Write a real description.` });
  }

  let summary = (old.description ?? "").trim();
  if (!summary) {
    summary = shortenSummary(old.title);
    flags.push({ kind: "summary", detail: "No description; used the title as the summary. Write one." });
  } else if (summary.length > SUMMARY_MAX) {
    const short = shortenSummary(summary);
    changes.push({ kind: "summary-shortened", detail: `Summary over ${SUMMARY_MAX} characters.`, before: summary, after: short });
    flags.push({ kind: "summary", detail: "Summary was shortened automatically; check it reads well.", context: short });
    summary = short;
  }

  const seoTitle = old.seoTitle?.trim() || null;
  const seoDescription = old.seoDescription?.trim() || null;
  if (seoTitle && seoTitle.length > SEO_TITLE_MAX) flags.push({ kind: "seo", detail: `SEO title is ${seoTitle.length} characters (max ${SEO_TITLE_MAX}); dropped.`, context: seoTitle });
  if (seoDescription && seoDescription.length > SEO_DESCRIPTION_MAX) flags.push({ kind: "seo", detail: `SEO description is ${seoDescription.length} characters (max ${SEO_DESCRIPTION_MAX}); dropped.`, context: seoDescription });

  flags.push(...findCtaLines(body), ...findLinkProblems(body, knownPaths));
  if (/\b(klook|wise)\b/i.test(old.title)) {
    flags.push({ kind: "partner-post", detail: "The post is built around an affiliate partner. Keep it (links removed), rewrite it, or drop it with a redirect." });
  }

  const published = old.publishedAt.slice(0, 10);
  const created = old.createdAt.slice(0, 10);
  const daysApart = (Date.parse(published) - Date.parse(created)) / 86_400_000;
  if (daysApart > 30) {
    flags.push({
      kind: "date",
      detail: `Published ${published} but first written ${created} (looks like a later re-publish). Keep ${published} (what Google has seen) or change it.`,
    });
  }

  return {
    path,
    changes,
    flags,
    post: {
      title: old.title.trim(),
      slug: old.slug,
      section: old.lifestyle ? "life_abroad" : "place",
      summary,
      body: body.trim(),
      countrySlug: old.lifestyle ? null : (old.country?.slug ?? null),
      cover,
      coverAlt,
      publishedDate: published,
      seoTitle: seoTitle && seoTitle.length <= SEO_TITLE_MAX ? seoTitle : null,
      seoDescription: seoDescription && seoDescription.length <= SEO_DESCRIPTION_MAX ? seoDescription : null,
    },
  };
}

/* ---------- Body photos ----------
 * Only covers were linked to posts on the old site; photos inside the text were pasted in as Markdown.
 * The new site reads photo sizes from the media library (no layout jump, wide/portrait figures), so each
 * body photo gets a media-library record pointing at its existing Cloudinary URL. Sizes come from
 * Cloudinary's public fl_getinfo, which needs no credentials.
 */

export type PhotoInfo = { width: number; height: number; bytes: number; format: string };

export type BodyPhoto = {
  url: string;
  name: string;
  alternativeText: string | null;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  /** In KB, as Strapi stores it. */
  size: number;
  provider: "cloudinary";
  provider_metadata: { public_id: string; resource_type: "image" };
};

/** Every photo in a Markdown body, first alt text wins. */
export function bodyPhotoUrls(markdown: string): { url: string; alt: string }[] {
  const seen = new Map<string, string>();
  for (const m of markdown.matchAll(IMAGE)) if (!seen.has(m[2])) seen.set(m[2], m[1].trim());
  return [...seen].map(([url, alt]) => ({ url, alt }));
}

const CLOUDINARY_UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/;

/** Cloudinary's JSON size report for a photo, or null when the photo isn't on Cloudinary. */
export function cloudinaryInfoUrl(url: string): string | null {
  const m = CLOUDINARY_UPLOAD.exec(url);
  return m ? `${m[1]}fl_getinfo/${m[2]}` : null;
}

const MIME: Record<string, string> = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", avif: "image/avif" };

/** A media-library record for a body photo that already lives on Cloudinary. */
export function bodyPhotoRecord(url: string, alt: string, info: PhotoInfo): BodyPhoto {
  const file = decodeURIComponent(url.split("/").pop() ?? url);
  const dot = file.lastIndexOf(".");
  const hash = dot > 0 ? file.slice(0, dot) : file;
  const ext = (dot > 0 ? file.slice(dot) : `.${info.format}`).toLowerCase();
  const publicId = (CLOUDINARY_UPLOAD.exec(url)?.[2] ?? file).replace(/^v\d+\//, "").replace(/\.[a-z0-9]+$/i, "");
  return {
    url,
    name: file,
    alternativeText: alt || null,
    width: info.width,
    height: info.height,
    hash,
    ext,
    mime: MIME[ext.slice(1)] ?? `image/${info.format}`,
    size: Math.round(info.bytes / 10.24) / 100,
    provider: "cloudinary",
    provider_metadata: { public_id: publicId, resource_type: "image" },
  };
}
