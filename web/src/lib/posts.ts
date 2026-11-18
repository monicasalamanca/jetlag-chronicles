/**
 * Where a story lives (plan §5/§6). Pure, so routing rules are testable without Strapi.
 *   section "place"       → /<country-slug>/<slug>
 *   section "life_abroad" → /lifestyle/<slug>
 *   section "reader_story"→ /reader-stories/<slug> (hidden until issue 14)
 */
export type Section = "place" | "life_abroad" | "reader_story";

export type Post = {
  documentId: string;
  title: string;
  slug: string;
  section: Section;
  body: string;
  country: { name: string; slug: string } | null;
};

export const LIFE_ABROAD_PREFIX = "lifestyle";

/** The story URL path for a post, or null if it can't be placed (a place story without a country). */
export function storyPath(post: Pick<Post, "slug" | "section" | "country">): string | null {
  switch (post.section) {
    case "place":
      return post.country ? `/${post.country.slug}/${post.slug}` : null;
    case "life_abroad":
      return `/${LIFE_ABROAD_PREFIX}/${post.slug}`;
    case "reader_story":
      return `/reader-stories/${post.slug}`;
  }
}

/** Strapi REST query for the story at /<place>/<slug>. */
export function storyQuery(place: string, slug: string): URLSearchParams {
  const q = new URLSearchParams();
  q.set("filters[slug][$eq]", slug);
  if (place === LIFE_ABROAD_PREFIX) {
    q.set("filters[section][$eq]", "life_abroad");
  } else {
    q.set("filters[section][$eq]", "place");
    q.set("filters[country][slug][$eq]", place);
  }
  q.set("populate[country][fields][0]", "name");
  q.set("populate[country][fields][1]", "slug");
  q.set("pagination[pageSize]", "1");
  return q;
}

/** Strapi REST query listing every published place + Life Abroad story (for static generation). */
export function allStoriesQuery(page: number): URLSearchParams {
  const q = new URLSearchParams();
  q.set("filters[section][$in][0]", "place");
  q.set("filters[section][$in][1]", "life_abroad");
  q.set("fields[0]", "slug");
  q.set("fields[1]", "section");
  q.set("populate[country][fields][0]", "slug");
  q.set("pagination[page]", String(page));
  q.set("pagination[pageSize]", "100");
  q.set("sort[0]", "slug:asc");
  return q;
}
