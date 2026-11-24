import type { Metadata } from "next";
import { shareImageUrl } from "@/lib/cloudinary-loader";
import { type Post, storyParent, storyPath } from "@/lib/posts";
import { siteName, siteUrl, teamPeople } from "@/lib/site";

/** Meta description: the SEO description, or the summary (plan §10). */
export function storyDescription(post: Pick<Post, "seoDescription" | "summary">): string {
  return post.seoDescription?.trim() || post.summary;
}

export function storyMetadata(post: Post): Metadata {
  const path = storyPath(post) ?? undefined;
  const description = storyDescription(post);
  // The share image comes from app/[place]/[slug]/opengraph-image.tsx: Next adds og:image itself, and X falls
  // back to it (no twitter:image needed).
  return {
    // The layout adds " | The Jet Lag Chronicles"; seoTitle is the full ≤60-character title when set.
    title: post.seoTitle?.trim() ? { absolute: post.seoTitle.trim() } : post.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName,
      title: post.title,
      description,
      url: path,
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate ?? post.publishedDate,
      authors: post.author ? [post.author.name] : undefined,
    },
    twitter: { card: "summary_large_image", title: post.title, description },
  };
}

type JsonLd = Record<string, unknown>;

function authorsLd(post: Post): JsonLd[] {
  const author = post.author;
  if (!author) return [];
  if (author.type === "team") return teamPeople.map((p) => ({ "@type": "Person", name: p.name, url: p.url }));
  return [{ "@type": "Person", name: author.name, ...(author.link && { url: author.link }) }];
}

/** BlogPosting + BreadcrumbList for a story page. */
export function storyJsonLd(post: Post): JsonLd[] {
  const url = `${siteUrl}${storyPath(post) ?? ""}`;
  const parent = storyParent(post);
  const crumbs = [
    { name: "Home", item: `${siteUrl}/` },
    ...(parent ? [{ name: parent.label, item: `${siteUrl}${parent.href}` }] : []),
    { name: post.title, item: url },
  ];
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: storyDescription(post),
      url,
      mainEntityOfPage: url,
      datePublished: post.publishedDate,
      dateModified: post.updatedDate ?? post.publishedDate,
      ...(post.coverPhoto && { image: shareImageUrl(post.coverPhoto.url) }),
      author: authorsLd(post),
      publisher: { "@type": "Organization", name: siteName, url: siteUrl },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
    },
  ];
}

/** Safe to put inside <script type="application/ld+json"> (no "</script>" break-out). */
export function jsonLdScript(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** A meta description from Markdown (an intro): its first paragraph as plain text, cut at a word to ≤ max. */
export function descriptionFromMarkdown(markdown: string | null | undefined, max = 160): string | null {
  const first = (markdown ?? "").split(/\n\s*\n/).find((p) => p.trim()) ?? "";
  const text = first
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return null;
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "").replace(/[,;:–—-]$/, "")}…`;
}

export type SectionSeo = {
  /** The page name (h1), used for the title unless seoTitle is set. */
  name: string;
  seoTitle?: string | null;
  description: string;
  path: string;
  /** Share image: a photo from the page (Cloudinary crop applied here). */
  image?: { url: string; alt: string } | null;
};

/** Metadata for Places, a country page and Life Abroad. */
export function sectionMetadata({ name, seoTitle, description, path, image }: SectionSeo): Metadata {
  const images = image ? [{ url: shareImageUrl(image.url), width: 1200, height: 630, alt: image.alt }] : undefined;
  return {
    title: seoTitle?.trim() ? { absolute: seoTitle.trim() } : name,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName, title: name, description, url: path, images },
    twitter: { card: images ? "summary_large_image" : "summary", title: name, description, images: images?.map((i) => i.url) },
  };
}

/** CollectionPage (with its stories as an ItemList) + BreadcrumbList for a section page. */
export function collectionJsonLd({
  name,
  description,
  path,
  breadcrumb,
  stories,
}: {
  name: string;
  description: string;
  path: string;
  /** Pages above this one (Home is added first). */
  breadcrumb: { name: string; path: string }[];
  stories: { title: string; href: string }[];
}): JsonLd[] {
  const url = `${siteUrl}${path}`;
  const crumbs = [{ name: "Home", item: `${siteUrl}/` }, ...breadcrumb.map((c) => ({ name: c.name, item: `${siteUrl}${c.path}` })), { name, item: url }];
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name,
      description,
      url,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: stories.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${siteUrl}${s.href}`, name: s.title })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
    },
  ];
}
