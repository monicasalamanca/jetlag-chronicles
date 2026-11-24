import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CountryCard } from "@/components/cards/CountryCard";
import type { StoryCardProps } from "@/components/cards/StoryCard";
import { CountryPage } from "@/components/sections/CountryPage";
import { LifeAbroadPage } from "@/components/sections/LifeAbroadPage";
import { PlacesPage } from "@/components/sections/PlacesPage";
import { renderIntro } from "@/lib/markdown";
import { type Country, countryHero, type PlaceStoryRef, placesByContinent, storyCount } from "@/lib/places";
import { countriesQuery, placeStoryRefsQuery, storyCardsQuery } from "@/lib/posts";
import { collectionJsonLd, descriptionFromMarkdown, sectionMetadata } from "@/lib/seo";

const photo = (name: string) => ({ url: `https://res.cloudinary.com/demo/image/upload/v1/${name}.jpg`, width: 1600, height: 1200 });

const country = (slug: string, name: string, continent: Country["continent"], extra: Partial<Country> = {}): Country => ({
  name,
  slug,
  continent,
  intro: null,
  heroPhoto: null,
  heroAlt: null,
  heroCaption: null,
  heroCredit: null,
  seoTitle: null,
  seoDescription: null,
  ...extra,
});

const story = (slug: string | null, cover?: string): PlaceStoryRef => ({
  country: slug ? { slug } : null,
  coverPhoto: cover ? photo(cover) : null,
  coverAlt: `${cover} alt`,
});

const countries = [
  country("thailand", "Thailand", "asia"),
  country("malaysia", "Malaysia", "asia", { heroPhoto: photo("penang-hero") }),
  country("vietnam", "Vietnam", "asia"),
  country("colombia", "Colombia", "south_america"),
  country("japan", "Japan", "asia"),
  country("france", "France", "europe"),
];
// Newest first, as Strapi returns them.
const stories = [
  story("thailand", "bkk-newest"),
  story("colombia", "bogota"),
  story("malaysia", "kl"),
  story("thailand", "bkk-older"),
  story("vietnam", "hanoi"),
  story("thailand"),
  story(null, "orphan"),
];

describe("places grouping", () => {
  const groups = placesByContinent(countries, stories);

  it("leaves out countries (and continents) without a published story", () => {
    const names = groups.flatMap((g) => g.countries.map((c) => c.name));
    expect(names).not.toContain("Japan");
    expect(names).not.toContain("France");
    expect(groups.map((g) => g.id)).toEqual(["asia", "south_america"]);
  });

  it("puts countries with the most stories first, and counts per continent", () => {
    expect(groups[0]).toMatchObject({ label: "Asia", storyCount: 5 });
    expect(groups[0].countries.map((c) => [c.name, c.storyCount])).toEqual([
      ["Thailand", 3],
      ["Malaysia", 1],
      ["Vietnam", 1],
    ]);
    expect(groups[1]).toMatchObject({ label: "South America", storyCount: 1 });
  });

  it("uses the country's hero photo, or else its newest story's cover", () => {
    const [thailand, malaysia] = groups[0].countries;
    expect(thailand.photo?.url).toContain("bkk-newest");
    expect(malaysia.photo?.url).toContain("penang-hero");
    expect(thailand.href).toBe("/thailand");
  });

  it("has nothing to show when there are no stories", () => {
    expect(placesByContinent(countries, [])).toEqual([]);
  });

  it("picks the hero for a country page the same way, with the right alt text", () => {
    expect(countryHero(countries[0], story("thailand", "bkk-newest"))).toMatchObject({ alt: "bkk-newest alt", caption: null });
    expect(
      countryHero({ ...countries[1], heroAlt: "A blue mansion", heroCaption: "George Town", heroCredit: "Moni" }, story("malaysia", "kl")),
    ).toMatchObject({ alt: "A blue mansion", caption: "George Town", credit: "Moni" });
    expect(countryHero(countries[0], undefined)).toBeNull();
  });

  it("counts in words", () => {
    expect(storyCount(1)).toBe("1 story");
    expect(storyCount(11)).toBe("11 stories");
  });
});

describe("Strapi queries", () => {
  it("lists a country's stories newest first, and Life Abroad by section", () => {
    const q = storyCardsQuery({ country: "thailand" }, 2);
    expect(q.get("filters[section][$eq]")).toBe("place");
    expect(q.get("filters[country][slug][$eq]")).toBe("thailand");
    expect(q.get("sort[0]")).toBe("publishedDate:desc");
    expect(q.get("pagination[page]")).toBe("2");
    expect([...q.entries()].filter(([k]) => k.startsWith("fields")).map(([, v]) => v)).toContain("coverAlt");
    const la = storyCardsQuery({ section: "life_abroad" }, 1);
    expect(la.get("filters[section][$eq]")).toBe("life_abroad");
    expect(la.has("filters[country][slug][$eq]")).toBe(false);
  });

  it("asks for just a country's slug and cover for every place story", () => {
    const q = placeStoryRefsQuery(1);
    expect(q.get("populate[country][fields][0]")).toBe("slug");
    expect(q.get("populate[coverPhoto][fields][0]")).toBe("url");
    expect(countriesQuery("thailand").get("filters[slug][$eq]")).toBe("thailand");
    expect(countriesQuery().has("filters[slug][$eq]")).toBe(false);
  });
});

const card = (n: number): StoryCardProps => ({
  href: `/lifestyle/story-${n}`,
  title: `Story ${n}`,
  eyebrow: "Life Abroad",
  summary: "Summary.",
  image: null,
  publishedDate: "2026-01-0" + n,
  readingMinutes: 5,
});

describe("section pages", () => {
  it("renders a country card as one link that reads 'Thailand, 3 stories'", () => {
    const html = renderToStaticMarkup(<CountryCard name="Thailand" href="/thailand" storyCount={3} photo={null} />);
    expect(html).toContain('<a class="country-card__link" href="/thailand">Thailand<span class="sr-only">, </span><span class="country-card__count">3 stories</span></a>');
    expect(html.match(/<a /g)).toHaveLength(1);
  });

  it("renders Places with a heading and count per continent", async () => {
    const html = renderToStaticMarkup(<PlacesPage introHtml={await renderIntro("Everywhere we've lived.")} groups={placesByContinent(countries, stories)} />);
    expect(html).toContain('<h1 class="t-h1" id="si-h">Places</h1>');
    expect(html).toContain('<h2 class="t-h3">Asia</h2><span class="continent__count">3 countries · 5 stories</span>');
    expect(html).toContain('<p class="t-lead">Everywhere we');
  });

  it("renders a country page with breadcrumb, eyebrow, hero and every story", () => {
    const html = renderToStaticMarkup(
      <CountryPage
        name="Thailand"
        eyebrow="Asia · 2 stories"
        introHtml='<p class="t-lead">Hello.</p>'
        photo={{ photo: photo("bkk"), alt: "Bangkok at dusk", caption: "From the 32nd floor", credit: "Moni" }}
        stories={[card(1), card(2)]}
      />,
    );
    expect(html).toContain('<a href="/places">Places</a>');
    expect(html).toContain('<span aria-current="page">Thailand</span>');
    expect(html).toContain('<p class="eyebrow">Asia · 2 stories</p>');
    expect(html).toContain('alt="Bangkok at dusk"');
    expect(html).toContain('<p class="figcap">From the 32nd floor<span class="credit">Photo: Moni</span></p>');
    expect(html).toContain("All Thailand stories");
    expect(html.match(/class="story-card"/g)).toHaveLength(2);
  });

  it("features the newest Life Abroad story and lists the rest", () => {
    const html = renderToStaticMarkup(<LifeAbroadPage introHtml="" stories={[card(1), card(2), card(3)]} />);
    expect(html).toContain('<p class="eyebrow">3 stories</p>');
    expect(html).toContain('class="story-card story-card--featured"');
    expect(html).toMatch(/story-card--featured[\s\S]*<h2 class="story-card__title"><a class="story-card__link" href="\/lifestyle\/story-1">/);
    expect(html.match(/class="story-card"/g)).toHaveLength(2);
  });
});

describe("section SEO", () => {
  it("makes a description from an intro's first paragraph, cut at a word", () => {
    expect(descriptionFromMarkdown("From **Bangkok** to [Chiang Mai](/thailand).\n\nSecond paragraph.")).toBe("From Bangkok to Chiang Mai.");
    const long = descriptionFromMarkdown("word ".repeat(60));
    expect(long!.length).toBeLessThanOrEqual(160);
    expect(long!.endsWith("word…")).toBe(true);
    expect(descriptionFromMarkdown("")).toBeNull();
  });

  it("gives section pages a canonical, a description and a share image", () => {
    const m = sectionMetadata({
      name: "Thailand",
      description: "Our stories from Thailand.",
      path: "/thailand",
      image: { url: photo("bkk").url, alt: "Bangkok" },
    });
    expect(m.title).toBe("Thailand");
    expect(m.alternates?.canonical).toBe("/thailand");
    expect((m.openGraph?.images as { url: string }[])[0].url).toContain("c_fill,g_auto,w_1200,h_630");
    expect(sectionMetadata({ name: "Life Abroad", seoTitle: "Living abroad, honestly", description: "x", path: "/lifestyle" }).title).toEqual({
      absolute: "Living abroad, honestly",
    });
  });

  it("is a CollectionPage of its stories plus breadcrumbs", () => {
    const [page, crumbs] = collectionJsonLd({
      name: "Thailand",
      description: "Stories.",
      path: "/thailand",
      breadcrumb: [{ name: "Places", path: "/places" }],
      stories: [{ title: "Ode to Bangkok", href: "/thailand/ode" }],
    });
    expect(page["@type"]).toBe("CollectionPage");
    expect((page.mainEntity as { itemListElement: { url: string }[] }).itemListElement[0].url).toBe("https://thejetlagchronicles.com/thailand/ode");
    expect((crumbs.itemListElement as { name: string }[]).map((c) => c.name)).toEqual(["Home", "Places", "Thailand"]);
  });
});
