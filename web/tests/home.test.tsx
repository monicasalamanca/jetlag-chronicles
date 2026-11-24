import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { StoryCardProps } from "@/components/cards/StoryCard";
import { HomePage, type HomePageProps } from "@/components/home/HomePage";
import { homeStories, topCountries } from "@/lib/home";
import type { ContinentGroup } from "@/lib/places";
import { homeQuery, latestStoriesQuery } from "@/lib/posts";
import { homeJsonLd } from "@/lib/seo";

const photo = (name: string) => ({ url: `https://res.cloudinary.com/demo/image/upload/v1/${name}.jpg`, width: 1600, height: 1000 });

const card = (n: number, section = "thailand"): StoryCardProps => ({
  href: `/${section}/story-${n}`,
  title: `Story ${n}`,
  eyebrow: section === "lifestyle" ? "Life Abroad" : "Thailand",
  summary: `Summary ${n}.`,
  image: photo(`p${n}`),
  publishedDate: `2026-01-${String(30 - n).padStart(2, "0")}`,
  readingMinutes: 5,
});

describe("homepage stories", () => {
  // Newest first: 1 is the newest. Stories 3 and 5 are Life Abroad and also show up in the Life Abroad list.
  const newest = [1, 2, 3, 4, 5, 6, 7].map((n) => card(n, n === 3 || n === 5 ? "lifestyle" : "thailand"));
  const lifeAbroad = [3, 5, 8, 9, 10].map((n) => card(n, "lifestyle"));
  const { featured, latest, lifeAbroad: la } = homeStories(newest, lifeAbroad);

  it("features the newest story and never repeats it in the latest 6", () => {
    expect(featured?.title).toBe("Story 1");
    expect(latest.map((s) => s.title)).toEqual(["Story 2", "Story 3", "Story 4", "Story 5", "Story 6", "Story 7"]);
  });

  it("picks 3 Life Abroad stories that are not already on the page", () => {
    expect(la.map((s) => s.title)).toEqual(["Story 8", "Story 9", "Story 10"]);
  });

  it("copes with a nearly empty site", () => {
    expect(homeStories([card(1)], [])).toEqual({ featured: card(1), latest: [], lifeAbroad: [] });
    expect(homeStories([], [])).toEqual({ featured: null, latest: [], lifeAbroad: [] });
  });

  it("shows the 4 countries with the most stories, across continents", () => {
    const c = (name: string, storyCount: number) => ({ name, href: `/${name.toLowerCase()}`, storyCount, photo: null });
    const groups: ContinentGroup[] = [
      { id: "asia", label: "Asia", storyCount: 0, countries: [c("Thailand", 11), c("Malaysia", 5), c("Japan", 1), c("Vietnam", 4), c("Cambodia", 1)] },
      { id: "south_america", label: "South America", storyCount: 0, countries: [c("Colombia", 4), c("Peru", 1)] },
    ];
    expect(topCountries(groups).map((x) => x.name)).toEqual(["Thailand", "Malaysia", "Colombia", "Vietnam"]);
  });

  it("asks Strapi for listed sections only: Reader Stories never reach the homepage", () => {
    const q = latestStoriesQuery(7);
    expect(q.getAll("filters[section][$in][0]").concat(q.getAll("filters[section][$in][1]"))).toEqual(["place", "life_abroad"]);
    expect([...q.values()]).not.toContain("reader_story");
    expect(q.get("sort[0]")).toBe("publishedDate:desc");
    expect(q.get("pagination[pageSize]")).toBe("7");
    expect(latestStoriesQuery(10, "life_abroad").get("filters[section][$eq]")).toBe("life_abroad");
    expect(homeQuery().get("populate[photo][fields][0]")).toBe("url");
  });
});

const props: HomePageProps = {
  featured: card(1),
  whoWeAreHtml: '<p class="t-lead">We’re Moni &amp; Dunny.</p>',
  photo: { photo: photo("us"), alt: "Moni and Dunny on a ferry" },
  latest: [2, 3, 4, 5, 6, 7].map((n) => card(n)),
  countries: [{ name: "Thailand", href: "/thailand", storyCount: 11, photo: photo("bkk") }],
  lifeAbroadIntro: "Visas, money and moving.",
  lifeAbroad: [8, 9, 10].map((n) => card(n, "lifestyle")),
};

describe("homepage", () => {
  const html = renderToStaticMarkup(<HomePage {...props} />);

  it("has its sections in the plan's order", () => {
    const order = ["story-card--featured", 'id="who-h"', 'id="latest-h"', 'id="where-h"', 'id="life-h"'].map((s) => html.indexOf(s));
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("makes the featured story the h1 and its photo the prioritised LCP image", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toMatch(/story-card--featured[\s\S]*?<img[^>]*fetchPriority="high"[\s\S]*?<h1 class="story-card__title"><a class="story-card__link" href="\/thailand\/story-1">/);
    // Only the featured image is eager; every other photo is lazy.
    expect(html.match(/<img/g)).toHaveLength(12);
    expect(html.match(/loading="lazy"/g)).toHaveLength(11);
    // Width and height on every image, so nothing shifts as photos load.
    expect(html.match(/<img(?![^>]*width=)[^>]*>/g)).toBeNull();
  });

  it("shows 6 latest cards, the country cards and 3 compact Life Abroad cards", () => {
    expect(html.match(/class="story-card"/g)).toHaveLength(6);
    expect(html.match(/class="country-card"/g)).toHaveLength(1);
    expect(html.match(/story-card story-card--compact/g)).toHaveLength(3);
    expect(html).toContain('<p class="t-lead home__life-intro">Visas, money and moving.</p>');
    expect(html).toContain('alt="Moni and Dunny on a ferry"');
    for (const href of ["/about", "/stories", "/places", "/lifestyle"]) expect(html).toContain(`class="link-more" href="${href}"`);
  });

  it("never links to hidden sections", () => {
    expect(html).not.toContain("/reader-stories");
    expect(html).not.toContain("/toolkit");
  });

  it("leaves out empty sections and keeps an h1 on an empty site", () => {
    const empty = renderToStaticMarkup(
      <HomePage {...props} featured={null} photo={null} latest={[]} countries={[]} lifeAbroad={[]} />,
    );
    expect(empty).toContain('<h1 class="sr-only">The Jet Lag Chronicles</h1>');
    expect(empty).toContain('id="who-h"');
    expect(empty).toContain('class="photo-placeholder"');
    for (const id of ["latest-h", "where-h", "life-h"]) expect(empty).not.toContain(id);
  });
});

describe("homepage JSON-LD", () => {
  it("is a WebSite by two Persons", () => {
    const [site, moni, dunny] = homeJsonLd("Our stories.");
    expect(site).toMatchObject({ "@type": "WebSite", name: "The Jet Lag Chronicles", url: "https://thejetlagchronicles.com/", description: "Our stories." });
    expect([moni, dunny].map((p) => [p["@type"], p.name])).toEqual([
      ["Person", "Moni"],
      ["Person", "Dunny"],
    ]);
    expect(site.author).toEqual([{ "@id": moni["@id"] }, { "@id": dunny["@id"] }]);
  });
});
