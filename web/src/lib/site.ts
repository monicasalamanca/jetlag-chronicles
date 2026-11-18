/** Canonical site origin (no trailing slash), used for canonicals, the sitemap and robots.txt. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://thejetlagchronicles.com").replace(/\/$/, "");

export const siteName = "The Jet Lag Chronicles";

/**
 * The site is only indexable once SITE_LIVE=true is set (at launch, issue 18). Before that, every page is
 * noindex and robots.txt disallows crawling.
 */
export const siteLive = process.env.SITE_LIVE === "true";
