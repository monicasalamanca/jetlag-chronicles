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
