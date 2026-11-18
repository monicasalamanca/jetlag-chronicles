import { describe, expect, it } from "vitest";
import { allStoriesQuery, storyPath, storyQuery } from "@/lib/posts";

const thailand = { name: "Thailand", slug: "thailand" };

describe("story URLs (old URLs must not change)", () => {
  it("puts place stories under their country", () => {
    expect(storyPath({ slug: "30-thailand-scams", section: "place", country: thailand })).toBe("/thailand/30-thailand-scams");
  });

  it("puts Life Abroad stories under /lifestyle", () => {
    expect(storyPath({ slug: "leaving-your-country-2026", section: "life_abroad", country: null })).toBe("/lifestyle/leaving-your-country-2026");
  });

  it("puts reader stories under /reader-stories", () => {
    expect(storyPath({ slug: "lost-in-hanoi", section: "reader_story", country: null })).toBe("/reader-stories/lost-in-hanoi");
  });

  it("can't place a place story with no country", () => {
    expect(storyPath({ slug: "orphan", section: "place", country: null })).toBeNull();
  });
});

describe("Strapi queries", () => {
  it("looks up a country story by section, country and slug", () => {
    const q = storyQuery("thailand", "30-thailand-scams");
    expect(q.get("filters[slug][$eq]")).toBe("30-thailand-scams");
    expect(q.get("filters[section][$eq]")).toBe("place");
    expect(q.get("filters[country][slug][$eq]")).toBe("thailand");
  });

  it("looks up a Life Abroad story without a country filter", () => {
    const q = storyQuery("lifestyle", "leaving-your-country-2026");
    expect(q.get("filters[section][$eq]")).toBe("life_abroad");
    expect(q.has("filters[country][slug][$eq]")).toBe(false);
  });

  it("lists only place and Life Abroad stories (reader stories stay hidden)", () => {
    const q = allStoriesQuery(2);
    expect(q.getAll("filters[section][$in][0]")).toEqual(["place"]);
    expect(q.getAll("filters[section][$in][1]")).toEqual(["life_abroad"]);
    expect(q.get("pagination[page]")).toBe("2");
  });
});
