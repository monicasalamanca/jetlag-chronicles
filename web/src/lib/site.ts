/** Canonical site origin (no trailing slash), used for canonicals, the sitemap and robots.txt. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://thejetlagchronicles.com").replace(/\/$/, "");

export const siteName = "The Jet Lag Chronicles";

/**
 * The site is only indexable once SITE_LIVE=true is set (at launch, issue 18). Before that, every page is
 * noindex and robots.txt disallows crawling.
 */
export const siteLive = process.env.SITE_LIVE === "true";

/** Main menu (plan §3). Life Abroad keeps its old URL, /lifestyle. */
export const navItems = [
  { label: "Places", href: "/places" },
  { label: "Life Abroad", href: "/lifestyle" },
  { label: "Stories", href: "/stories" },
  { label: "About", href: "/about" },
] as const;

/** Social profiles, named in text in the footer (no icon-only links). */
export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/thejetlaggers_ig" },
  { label: "YouTube", href: "https://www.youtube.com/@TheJetLaggers_yt" },
  { label: "X", href: "https://x.com/thejetLaggers_X" },
] as const;

/**
 * Contact address, stored in parts so it never appears as plain text in the HTML (plan §12). The browser
 * assembles it (see ContactEmail).
 */
export const contactEmail = { user: "info", domain: "thejetlagchronicles.com" } as const;

/** Our Travel Toolkit is built but hidden (plan §6.4) until TOOLKIT_LIVE=true. */
export const toolkitLive = process.env.TOOLKIT_LIVE === "true";
