import "server-only";
import { allStoriesQuery, storyPath, storyQuery, type Post } from "@/lib/posts";
import { strapiConfigured, strapiGet } from "@/lib/strapi/client";
import { ALL_TAG, modelTag } from "@/lib/strapi/tags";

// A story shows its country, so it depends on both types.
const STORY_TAGS = [ALL_TAG, modelTag("post"), modelTag("country")];

type Collection<T> = { data: T[]; meta: { pagination: { page: number; pageCount: number } } };

export async function getStory(place: string, slug: string): Promise<Post | null> {
  const result = await strapiGet<Collection<Post>>("posts", storyQuery(place, slug), STORY_TAGS);
  return result.data[0] ?? null;
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
