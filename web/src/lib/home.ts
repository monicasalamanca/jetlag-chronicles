/**
 * What the homepage shows (plan §7.1), as pure functions so the "no repeats" rules are tested without Strapi.
 * Order: featured newest story → Who we are → latest 6 → Where we've been → 3 Life Abroad stories.
 */
import type { ContinentGroup, CountrySummary } from "@/lib/places";
import type { Media } from "@/lib/posts";

export const LATEST_COUNT = 6;
// One full row of country cards on a wide screen (4 columns); "All places" has the rest.
export const COUNTRY_COUNT = 4;
export const LIFE_ABROAD_COUNT = 3;

/** The Home page single type in Strapi (every field optional until it is published). */
export type HomeContent = {
  whoWeAre: string | null;
  photo: Media | null;
  photoAlt: string | null;
  lifeAbroadIntro: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export const EMPTY_HOME: HomeContent = {
  whoWeAre: null,
  photo: null,
  photoAlt: null,
  lifeAbroadIntro: null,
  seoTitle: null,
  seoDescription: null,
};

type Keyed = { href: string };

/**
 * Splits the newest stories into the featured one and the next 6, then picks Life Abroad stories that are not
 * already on the page. Both lists come newest first and only hold listed sections (never Reader Stories).
 */
export function homeStories<T extends Keyed>(newest: T[], lifeAbroad: T[]): { featured: T | null; latest: T[]; lifeAbroad: T[] } {
  const [featured = null, ...rest] = newest;
  const latest = rest.slice(0, LATEST_COUNT);
  const shown = new Set([featured, ...latest].filter((s): s is T => s !== null).map((s) => s.href));
  return { featured, latest, lifeAbroad: lifeAbroad.filter((s) => !shown.has(s.href)).slice(0, LIFE_ABROAD_COUNT) };
}

/** "Where we’ve been": the 4 countries with the most stories, across continents (then by name). */
export function topCountries(groups: ContinentGroup[], count = COUNTRY_COUNT): CountrySummary[] {
  return groups
    .flatMap((g) => g.countries)
    .sort((a, b) => b.storyCount - a.storyCount || a.name.localeCompare(b.name))
    .slice(0, count);
}
