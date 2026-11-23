import { describe, expect, it } from "vitest";
import { shareImageUrl } from "@/lib/cloudinary-loader";
import { isExternal, linkRel } from "@/lib/links";
import type { Post } from "@/lib/posts";
import { jsonLdScript, storyJsonLd, storyMetadata } from "@/lib/seo";

const post: Post = {
  documentId: "d1",
  title: "Leaving Your Country",
  slug: "leaving-your-country-2026",
  section: "life_abroad",
  summary: "We left. Here is what we learned.",
  body: "",
  country: null,
  city: null,
  coverPhoto: { url: "https://res.cloudinary.com/demo/image/upload/v1/leaving.jpg", width: 1600, height: 1200 },
  coverAlt: "Suitcases by a door",
  coverCaption: null,
  coverCredit: null,
  author: { name: "Moni & Dunny", slug: "moni-and-dunny", type: "team", bio: null, link: null, photo: null, photoAlt: null },
  publishedDate: "2025-06-01",
  updatedDate: null,
  seoTitle: null,
  seoDescription: null,
};

describe("story metadata", () => {
  it("uses the summary when there is no SEO description, and the story URL as canonical", () => {
    const m = storyMetadata(post);
    expect(m.title).toBe("Leaving Your Country");
    expect(m.description).toBe("We left. Here is what we learned.");
    expect(m.alternates?.canonical).toBe("/lifestyle/leaving-your-country-2026");
  });

  it("prefers the SEO title (as the full title) and description", () => {
    const m = storyMetadata({ ...post, seoTitle: "Leaving your country in 2026", seoDescription: "How we did it." });
    expect(m.title).toEqual({ absolute: "Leaving your country in 2026" });
    expect(m.description).toBe("How we did it.");
  });

  it("leaves the share image to opengraph-image.tsx (a config image would override nothing and confuse)", () => {
    const m = storyMetadata(post);
    expect(m.openGraph).not.toHaveProperty("images");
    expect(m.twitter).toEqual({ card: "summary_large_image", title: "Leaving Your Country", description: "We left. Here is what we learned." });
  });

  it("crops photos for sharing only when they are on Cloudinary", () => {
    expect(shareImageUrl("https://res.cloudinary.com/demo/image/upload/v1/leaving.jpg")).toBe(
      "https://res.cloudinary.com/demo/image/upload/c_fill,g_auto,w_1200,h_630,f_jpg,q_auto/v1/leaving.jpg",
    );
    expect(shareImageUrl("https://example.com/x.jpg")).toBe("https://example.com/x.jpg");
  });
});

describe("story JSON-LD", () => {
  it("is a BlogPosting by Moni and Dunny, modified = published when never updated, plus breadcrumbs", () => {
    const [blog, crumbs] = storyJsonLd(post);
    expect(blog["@type"]).toBe("BlogPosting");
    expect(blog.datePublished).toBe("2025-06-01");
    expect(blog.dateModified).toBe("2025-06-01");
    expect((blog.author as { name: string }[]).map((a) => a.name)).toEqual(["Moni", "Dunny"]);
    expect(crumbs["@type"]).toBe("BreadcrumbList");
    expect((crumbs.itemListElement as { name: string }[]).map((c) => c.name)).toEqual(["Home", "Life Abroad", "Leaving Your Country"]);
  });

  it("uses the Updated date as dateModified, and a guest's own name", () => {
    const [blog] = storyJsonLd({
      ...post,
      updatedDate: "2026-03-03",
      author: { ...post.author!, type: "guest", name: "Ana", link: "https://ana.example.com" },
    });
    expect(blog.dateModified).toBe("2026-03-03");
    expect(blog.author).toEqual([{ "@type": "Person", name: "Ana", url: "https://ana.example.com" }]);
  });

  it("cannot break out of its script tag", () => {
    expect(jsonLdScript({ headline: "</script><script>alert(1)</script>" })).not.toContain("</script>");
  });
});

describe("link rel rules", () => {
  it("adds nothing to internal links or our own editorial links", () => {
    expect(linkRel("/thailand")).toBeUndefined();
    expect(linkRel("https://thejetlagchronicles.com/about", { authorType: "guest" })).toBeUndefined();
    expect(linkRel("https://example.com", { authorType: "team" })).toBeUndefined();
    expect(isExternal("mailto:info@example.com")).toBe(false);
  });

  it("marks paid links sponsored and guest links ugc nofollow", () => {
    expect(linkRel("https://wise.com", { kind: "affiliate" })).toBe("sponsored noopener");
    expect(linkRel("https://wise.com", { kind: "sponsor" })).toBe("sponsored noopener");
    expect(linkRel("https://wise.com", { kind: "recommendation" })).toBeUndefined();
    expect(linkRel("https://ana.example.com", { authorType: "guest" })).toBe("ugc nofollow");
  });
});
