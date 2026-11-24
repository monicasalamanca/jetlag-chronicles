/**
 * Places (plan §4): countries grouped by continent, only countries with at least one published story.
 * Pure, so the grouping and the empty-country rule are tested without Strapi.
 */
import type { Media } from "@/lib/posts";

export type Continent = "asia" | "europe" | "africa" | "north_america" | "south_america" | "oceania";

/** Continent order on /places, and how each is written. */
export const CONTINENTS: { id: Continent; label: string }[] = [
  { id: "asia", label: "Asia" },
  { id: "europe", label: "Europe" },
  { id: "north_america", label: "North America" },
  { id: "south_america", label: "South America" },
  { id: "africa", label: "Africa" },
  { id: "oceania", label: "Oceania" },
];

export function continentLabel(id: Continent): string {
  return CONTINENTS.find((c) => c.id === id)?.label ?? id;
}

/** A country as Strapi returns it for Places and country pages. */
export type Country = {
  name: string;
  slug: string;
  continent: Continent;
  intro: string | null;
  heroPhoto: Media | null;
  heroAlt: string | null;
  heroCaption: string | null;
  heroCredit: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

/** The little we need per published place story to count and illustrate countries (newest first). */
export type PlaceStoryRef = { country: { slug: string } | null; coverPhoto: Media | null; coverAlt: string };

export type CountrySummary = { name: string; href: string; storyCount: number; photo: Media | null };
export type ContinentGroup = { id: Continent; label: string; storyCount: number; countries: CountrySummary[] };

export const storyCount = (n: number) => `${n} ${n === 1 ? "story" : "stories"}`;
export const countryCount = (n: number) => `${n} ${n === 1 ? "country" : "countries"}`;

/**
 * Countries with at least one story, under their continent. Countries with the most stories come first (then by
 * name); continents keep the CONTINENTS order and appear only when they have a country. The card photo is the
 * country's hero photo, or else the cover of its newest story.
 */
export function placesByContinent(countries: Country[], stories: PlaceStoryRef[]): ContinentGroup[] {
  const counts = new Map<string, number>();
  const newestCover = new Map<string, Media>();
  for (const s of stories) {
    if (!s.country) continue;
    counts.set(s.country.slug, (counts.get(s.country.slug) ?? 0) + 1);
    if (s.coverPhoto && !newestCover.has(s.country.slug)) newestCover.set(s.country.slug, s.coverPhoto);
  }
  return CONTINENTS.map(({ id, label }) => {
    const list = countries
      .filter((c) => c.continent === id && (counts.get(c.slug) ?? 0) > 0)
      .map((c) => ({
        name: c.name,
        href: `/${c.slug}`,
        storyCount: counts.get(c.slug) ?? 0,
        photo: c.heroPhoto ?? newestCover.get(c.slug) ?? null,
      }))
      .sort((a, b) => b.storyCount - a.storyCount || a.name.localeCompare(b.name));
    return { id, label, storyCount: list.reduce((n, c) => n + c.storyCount, 0), countries: list };
  }).filter((g) => g.countries.length > 0);
}

/** The photo at the top of a country page: its own hero, or the newest story's cover (with that story's alt). */
export function countryHero(
  country: Pick<Country, "heroPhoto" | "heroAlt" | "heroCaption" | "heroCredit">,
  newest: Pick<PlaceStoryRef, "coverPhoto" | "coverAlt"> | undefined,
): { photo: Media; alt: string; caption: string | null; credit: string | null } | null {
  if (country.heroPhoto) {
    return { photo: country.heroPhoto, alt: country.heroAlt ?? "", caption: country.heroCaption, credit: country.heroCredit };
  }
  if (newest?.coverPhoto) return { photo: newest.coverPhoto, alt: newest.coverAlt, caption: null, credit: null };
  return null;
}
