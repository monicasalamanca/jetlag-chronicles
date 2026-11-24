import "server-only";
import { type ImageSize, markdownImageUrls } from "@/lib/markdown";
import { type ContinentGroup, type Country, type PlaceStoryRef, placesByContinent } from "@/lib/places";
import {
  allStoriesQuery,
  countriesQuery,
  LIFE_ABROAD_PREFIX,
  lifeAbroadQuery,
  type Media,
  moreStoriesQuery,
  placeStoryRefsQuery,
  type Post,
  storyCardsQuery,
  storyPath,
  storyQuery,
  type StoryCardPost,
} from "@/lib/posts";
import { strapiConfigured, strapiGet, StrapiError } from "@/lib/strapi/client";
import { ALL_TAG, modelTag } from "@/lib/strapi/tags";

// A story shows its country and author, so it depends on all three types.
const STORY_TAGS = [ALL_TAG, modelTag("post"), modelTag("country"), modelTag("author")];
// Section pages list stories and show countries; Life Abroad also has its own single type.
const SECTION_TAGS = [ALL_TAG, modelTag("post"), modelTag("country")];
const LIFE_ABROAD_TAGS = [ALL_TAG, modelTag("post"), modelTag("life-abroad")];

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

/** Every page of a paginated Strapi collection. */
async function allPages<T>(path: string, query: (page: number) => URLSearchParams, tags: string[]): Promise<T[]> {
  const items: T[] = [];
  for (let page = 1; ; page++) {
    const result = await strapiGet<Collection<T>>(path, query(page), tags);
    items.push(...result.data);
    if (page >= result.meta.pagination.pageCount) return items;
  }
}

const withCover = <T extends { coverPhoto: Media | null }>(p: T): T => ({ ...p, coverPhoto: media(p.coverPhoto) });
const withHero = (c: Country): Country => ({ ...c, heroPhoto: media(c.heroPhoto) });

/** Up to 3 other stories from the same country (or Life Abroad), newest first. */
export async function getMoreStories(post: Post): Promise<StoryCardPost[]> {
  const result = await strapiGet<Collection<StoryCardPost>>("posts", moreStoriesQuery(post), STORY_TAGS);
  return result.data.map(withCover);
}

/** /places: countries with at least one story, grouped by continent. */
export async function getPlaces(): Promise<ContinentGroup[]> {
  const [countries, stories] = await Promise.all([
    strapiGet<Collection<Country>>("countries", countriesQuery(), SECTION_TAGS),
    allPages<PlaceStoryRef>("posts", placeStoryRefsQuery, SECTION_TAGS),
  ]);
  return placesByContinent(countries.data.map(withHero), stories.map(withCover));
}

/** A country page: the country and its stories, newest first. Null (→ 404) when it has no published story. */
export async function getCountryPage(slug: string): Promise<{ country: Country; stories: StoryCardPost[] } | null> {
  const [countries, stories] = await Promise.all([
    strapiGet<Collection<Country>>("countries", countriesQuery(slug), SECTION_TAGS),
    allPages<StoryCardPost>("posts", (page) => storyCardsQuery({ country: slug }, page), SECTION_TAGS),
  ]);
  const country = countries.data[0];
  if (!country || stories.length === 0) return null;
  return { country: withHero(country), stories: stories.map(withCover) };
}

export type LifeAbroadPage = { intro: string | null; seoTitle: string | null; seoDescription: string | null };

/** /lifestyle: its intro (empty until the single type is published) and every Life Abroad story, newest first. */
export async function getLifeAbroadPage(): Promise<LifeAbroadPage & { stories: StoryCardPost[] }> {
  const [page, stories] = await Promise.all([
    strapiGet<{ data: LifeAbroadPage | null }>("life-abroad", lifeAbroadQuery(), LIFE_ABROAD_TAGS).catch((error) => {
      if (error instanceof StrapiError && error.status === 404) return { data: null }; // not published yet
      throw error;
    }),
    allPages<StoryCardPost>("posts", (p) => storyCardsQuery({ section: "life_abroad" }, p), LIFE_ABROAD_TAGS),
  ]);
  return {
    intro: page.data?.intro ?? null,
    seoTitle: page.data?.seoTitle ?? null,
    seoDescription: page.data?.seoDescription ?? null,
    stories: stories.map(withCover),
  };
}

/** Every /<place> page for generateStaticParams: countries with a story, and Life Abroad. */
export async function getSectionParams(): Promise<{ place: string }[]> {
  if (!strapiConfigured()) return [];
  const groups = await getPlaces();
  return [...groups.flatMap((g) => g.countries.map((c) => ({ place: c.href.slice(1) }))), { place: LIFE_ABROAD_PREFIX }];
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
