/**
 * Where a story lives (plan §5/§6) and how to ask Strapi for it. Pure, so the rules are testable without Strapi.
 *   section "place"       → /<country-slug>/<slug>
 *   section "life_abroad" → /lifestyle/<slug>
 *   section "reader_story"→ /reader-stories/<slug> (hidden until issue 14)
 */
export type Section = "place" | "life_abroad" | "reader_story";

/** An uploaded image, as Strapi returns it (url is absolute once loaded through content.ts). */
export type Media = { url: string; width: number | null; height: number | null };

export type Author = {
  name: string;
  slug: string;
  type: "team" | "guest";
  bio: string | null;
  link: string | null;
  photo: Media | null;
  photoAlt: string | null;
};

export type CountryRef = { name: string; slug: string };

export type Post = {
  documentId: string;
  title: string;
  slug: string;
  section: Section;
  summary: string;
  body: string;
  country: CountryRef | null;
  city: string | null;
  coverPhoto: Media | null;
  coverAlt: string;
  coverCaption: string | null;
  coverCredit: string | null;
  author: Author | null;
  /** ISO date (YYYY-MM-DD): the original publish date, kept for migrated posts. */
  publishedDate: string;
  updatedDate: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

/** What a story card needs (body only for the reading time). */
export type StoryCardPost = Pick<
  Post,
  "documentId" | "title" | "slug" | "section" | "summary" | "body" | "country" | "city" | "coverPhoto" | "coverAlt" | "publishedDate"
>;

export const LIFE_ABROAD_PREFIX = "lifestyle";
export const LIFE_ABROAD_LABEL = "Life Abroad";

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

/** The page a story belongs to: its country, or Life Abroad. Used by the breadcrumb and "More from". */
export function storyParent(post: Pick<Post, "section" | "country">): { label: string; href: string } | null {
  if (post.section === "place") return post.country ? { label: post.country.name, href: `/${post.country.slug}` } : null;
  if (post.section === "life_abroad") return { label: LIFE_ABROAD_LABEL, href: `/${LIFE_ABROAD_PREFIX}` };
  return null;
}

/** Eyebrow text: "Thailand · Bangkok", "Thailand", or "Life Abroad". Ink, never a link colour. */
export function storyEyebrow(post: Pick<Post, "section" | "country" | "city">): string {
  if (post.section === "life_abroad") return LIFE_ABROAD_LABEL;
  return [post.country?.name, post.city].filter(Boolean).join(" · ");
}

const MEDIA_FIELDS = ["url", "width", "height"];
const CARD_FIELDS = ["title", "slug", "section", "summary", "body", "city", "coverAlt", "publishedDate"];

/** fields[0]=… at the top level, or <prefix>[fields][0]=… for a populated relation. */
function setFields(q: URLSearchParams, prefix: string, fields: string[]) {
  const key = prefix ? `${prefix}[fields]` : "fields";
  fields.forEach((f, i) => q.set(`${key}[${i}]`, f));
}

/** Strapi REST query for the story at /<place>/<slug>, with everything the story page shows. */
export function storyQuery(place: string, slug: string): URLSearchParams {
  const q = new URLSearchParams();
  q.set("filters[slug][$eq]", slug);
  if (place === LIFE_ABROAD_PREFIX) {
    q.set("filters[section][$eq]", "life_abroad");
  } else {
    q.set("filters[section][$eq]", "place");
    q.set("filters[country][slug][$eq]", place);
  }
  setFields(q, "populate[country]", ["name", "slug"]);
  setFields(q, "populate[coverPhoto]", MEDIA_FIELDS);
  setFields(q, "populate[author]", ["name", "slug", "type", "bio", "link", "photoAlt"]);
  setFields(q, "populate[author][populate][photo]", MEDIA_FIELDS);
  q.set("pagination[pageSize]", "1");
  return q;
}

/** The 3 newest other stories from the same country (or Life Abroad) for "More from …". */
export function moreStoriesQuery(post: Pick<Post, "documentId" | "section" | "country">): URLSearchParams {
  const q = new URLSearchParams();
  q.set("filters[section][$eq]", post.section);
  if (post.section === "place" && post.country) q.set("filters[country][slug][$eq]", post.country.slug);
  q.set("filters[documentId][$ne]", post.documentId);
  setFields(q, "", CARD_FIELDS);
  setFields(q, "populate[country]", ["name", "slug"]);
  setFields(q, "populate[coverPhoto]", MEDIA_FIELDS);
  q.set("sort[0]", "publishedDate:desc");
  q.set("pagination[pageSize]", "3");
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

/** One page of story cards, newest first: a country's stories, or every Life Abroad story. */
export function storyCardsQuery(filter: { country: string } | { section: "life_abroad" }, page: number): URLSearchParams {
  const q = new URLSearchParams();
  if ("country" in filter) {
    q.set("filters[section][$eq]", "place");
    q.set("filters[country][slug][$eq]", filter.country);
  } else {
    q.set("filters[section][$eq]", filter.section);
  }
  setFields(q, "", CARD_FIELDS);
  setFields(q, "populate[country]", ["name", "slug"]);
  setFields(q, "populate[coverPhoto]", MEDIA_FIELDS);
  q.set("sort[0]", "publishedDate:desc");
  q.set("sort[1]", "title:asc");
  q.set("pagination[page]", String(page));
  q.set("pagination[pageSize]", "100");
  return q;
}

/** One page of every place story (country + cover only), newest first: counts and card photos for Places. */
export function placeStoryRefsQuery(page: number): URLSearchParams {
  const q = new URLSearchParams();
  q.set("filters[section][$eq]", "place");
  setFields(q, "", ["coverAlt", "publishedDate"]);
  setFields(q, "populate[country]", ["slug"]);
  setFields(q, "populate[coverPhoto]", MEDIA_FIELDS);
  q.set("sort[0]", "publishedDate:desc");
  q.set("pagination[page]", String(page));
  q.set("pagination[pageSize]", "100");
  return q;
}

const COUNTRY_FIELDS = ["name", "slug", "continent", "intro", "heroAlt", "heroCaption", "heroCredit", "seoTitle", "seoDescription"];

/** Countries (one by slug, or all), with their hero photo. */
export function countriesQuery(slug?: string): URLSearchParams {
  const q = new URLSearchParams();
  if (slug) q.set("filters[slug][$eq]", slug);
  setFields(q, "", COUNTRY_FIELDS);
  setFields(q, "populate[heroPhoto]", MEDIA_FIELDS);
  q.set("sort[0]", "name:asc");
  q.set("pagination[pageSize]", "100");
  return q;
}

/** The Life Abroad single type. */
export function lifeAbroadQuery(): URLSearchParams {
  const q = new URLSearchParams();
  setFields(q, "", ["intro", "seoTitle", "seoDescription"]);
  return q;
}
