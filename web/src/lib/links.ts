import { siteUrl } from "@/lib/site";

/** Hosts that are us: links to them are internal (made relative by the Markdown renderer). */
const OWN_HOSTS = new Set([new URL(siteUrl).host, "thejetlagchronicles.com", "www.thejetlagchronicles.com"]);

export function isExternal(href: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false;
  try {
    return !OWN_HOSTS.has(new URL(href).host.toLowerCase());
  } catch {
    return false;
  }
}

/** A link to our own site written as a full URL → a path ("https://thejetlagchronicles.com/about" → "/about"). */
export function internalPath(href: string): string | null {
  if (!/^https?:\/\//i.test(href) || isExternal(href)) return null;
  try {
    const url = new URL(href);
    return `${url.pathname}${url.search}${url.hash}` || "/";
  } catch {
    return null;
  }
}

export type LinkContext = {
  /** Who wrote the text the link sits in. Guest (reader) links are user-generated content. */
  authorType?: "team" | "guest";
  /** Toolkit item type: affiliate and sponsor links are paid. */
  kind?: "affiliate" | "sponsor" | "recommendation";
};

/**
 * The rel attribute for a link (plan §6.1, §10): paid links are "sponsored", guest links "ugc nofollow".
 * Internal links and our own editorial links get none.
 */
export function linkRel(href: string, context: LinkContext = {}): string | undefined {
  if (!isExternal(href)) return undefined;
  const rel: string[] = [];
  if (context.kind === "affiliate" || context.kind === "sponsor") rel.push("sponsored", "noopener");
  if (context.authorType === "guest") rel.push("ugc", "nofollow");
  return rel.length > 0 ? rel.join(" ") : undefined;
}
