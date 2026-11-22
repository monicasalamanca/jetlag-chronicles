import "server-only";
import { type ImageSize, markdownImageUrls } from "@/lib/markdown";
import {
  allStoriesQuery,
  type Media,
  moreStoriesQuery,
  type Post,
  storyPath,
  storyQuery,
  type StoryCardPost,
} from "@/lib/posts";
import { strapiConfigured, strapiGet, StrapiError } from "@/lib/strapi/client";
import { ALL_TAG, modelTag } from "@/lib/strapi/tags";

// A story shows its country and author, so it depends on all three types.
const STORY_TAGS = [ALL_TAG, modelTag("post"), modelTag("country"), modelTag("author")];

type Collection<T> = { data: T[]; meta: { pagination: { page: number; pageCount: number } } };

/** Local Strapi stores uploads at /uploads/…; Cloudinary URLs are already absolute. */
export function absoluteUrl(url: string): string {
  if (!url.startsWith("/")) return url;
  return `${(process.env.STRAPI_URL ?? "").replace(/\/$/, "")}${url}`;
}

function media(m: Media | null | undefined): Media | null {
  return m?.url ? { url: absoluteUrl(m.url), width: m.width ?? null, height: m.height ?? null } : null;
}

export async function getStory(place: string, slug: string): Promise<Post | null> {
  const result = await strapiGet<Collection<Post>>("posts", storyQuery(place, slug), STORY_TAGS);
  const post = result.data[0];
  if (!post) return null;
  return {
    ...post,
    coverPhoto: media(post.coverPhoto),
    author: post.author ? { ...post.author, photo: media(post.author.photo) } : null,
  };
}

/** Up to 3 other stories from the same country (or Life Abroad), newest first. */
export async function getMoreStories(post: Post): Promise<StoryCardPost[]> {
  const result = await strapiGet<Collection<StoryCardPost>>("posts", moreStoriesQuery(post), STORY_TAGS);
  return result.data.map((p) => ({ ...p, coverPhoto: media(p.coverPhoto) }));
}

/**
 * Sizes of the photos in a story body, from Strapi's media library, so figures get width/height (no layout
 * shift). Photos not found there (or a token without media access) simply render without a size.
 */
export async function getImageSizes(markdown: string): Promise<Map<string, ImageSize>> {
  const urls = markdownImageUrls(markdown);
  const sizes = new Map<string, ImageSize>();
  if (urls.length === 0) return sizes;
  const q = new URLSearchParams();
  urls.forEach((url, i) => q.set(`filters[url][$in][${i}]`, url));
  q.set("fields[0]", "url");
  q.set("fields[1]", "width");
  q.set("fields[2]", "height");
  try {
    const files = await strapiGet<{ url: string; width: number | null; height: number | null }[]>("upload/files", q, [ALL_TAG]);
    for (const f of files) if (f.width && f.height) sizes.set(f.url, { width: f.width, height: f.height });
  } catch (error) {
    if (!(error instanceof StrapiError)) throw error;
  }
  return sizes;
}

/** Every story's { place, slug } for generateStaticParams. Empty when no CMS is configured (e.g. CI). */
export async function getStoryParams(): Promise<{ place: string; slug: string }[]> {
  if (!strapiConfigured()) {
    console.warn("STRAPI_URL not set: building without story pages (they render on first request instead).");
    return [];
  }
  const params: { place: string; slug: string }[] = [];
  for (let page = 1; ; page++) {
    const result = await strapiGet<Collection<Pick<Post, "slug" | "section" | "country">>>("posts", allStoriesQuery(page), STORY_TAGS);
    for (const post of result.data) {
      const path = storyPath(post);
      if (!path) continue;
      const [, place, slug] = path.split("/");
      params.push({ place, slug });
    }
    if (page >= result.meta.pagination.pageCount) break;
  }
  return params;
}
