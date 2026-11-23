// node --test scripts/migrate/   (Node 24 runs the TypeScript directly)
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildReport } from "./report.ts";
import {
  altFromFilename,
  bodyPhotoRecord,
  bodyPhotoUrls,
  cloudinaryInfoUrl,
  findCtaLines,
  findLinkProblems,
  fixImageAlts,
  mapCountry,
  type MigratedPost,
  migratePost,
  oddAfterRemoval,
  relativizeOwnLinks,
  type OldPost,
  removeLeadingCover,
  removeShortcodes,
  shortenSummary,
  stripAffiliateLinks,
} from "./transform.ts";

// Real lines from the old posts.
const KLOOK_LINE =
  "You’re tired, crammed in economy, and just want to [survive the flight](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1233308&k_site=https%3A%2F%2Fwww.klook.com%2Fairport-transfers%2F). That’s when a guy helps himself to your overhead stash.";
const WISE_LINE =
  "For those just needing the best rates for QR scanning and local transfers under the new Thai licenses, [grab the app here.](https://wise.prf.hn/click/camref:1101l5F7LZ)";
const CTA_SHORTCODE =
  '[CTA type="A" title="Do you prefer beaches over city streets? We have you covered" link="/home" button="Download our free Thai Island guide" isSubscribeModal="true"]';
const COVER = "https://res.cloudinary.com/jetlagchronicles/image/upload/v1745702443/IMG_7671_3063cc993e.jpg";

describe("affiliate links", () => {
  it("removes Klook and Wise links but keeps their text", () => {
    const { markdown, changes } = stripAffiliateLinks(`${KLOOK_LINE}\n\n${WISE_LINE}`);
    assert.ok(!markdown.includes("klook.com"));
    assert.ok(!markdown.includes("prf.hn"));
    assert.ok(markdown.includes("just want to survive the flight. That’s when"));
    assert.ok(markdown.includes("local transfers under the new Thai licenses, grab the app here."));
    assert.equal(changes.length, 2);
    assert.equal(changes[0].detail, 'affiliate.klook.com: "survive the flight"');
    assert.equal(changes[0].before, KLOOK_LINE);
    assert.ok(changes[0].after!.includes("want to survive the flight. That’s"));
  });

  it("leaves ordinary links alone", () => {
    const md = "See the [Thai e-Visa site](https://www.thaievisa.go.th) and [our guide](/thailand/dtv-visa-for-remote-workers).";
    assert.deepEqual(stripAffiliateLinks(md), { markdown: md, changes: [] });
  });

  it("flags sentences that read oddly once the link is gone", () => {
    const { changes } = stripAffiliateLinks(`${KLOOK_LINE}\n\n${WISE_LINE}`);
    const flags = oddAfterRemoval(changes);
    assert.equal(flags.length, 1);
    assert.equal(flags[0].kind, "reword");
    assert.ok(flags[0].context!.endsWith("grab the app here."));
  });
});

describe("old-site leftovers", () => {
  it("removes the [CTA …] newsletter/download shortcode and records what it said", () => {
    const { markdown, changes } = removeShortcodes(`Before.\n\n${CTA_SHORTCODE}\n\nAfter.`);
    assert.equal(markdown, "Before.\n\n\nAfter.");
    assert.equal(changes[0].kind, "cta-box-removed");
    assert.ok(changes[0].detail.includes('button "Download our free Thai Island guide"'));
  });

  it("removes the cover photo repeated at the top of the body, with the rule after it", () => {
    const md = `![IMG_7671.JPG](${COVER})\n\n---\n\nThe dreaded Thailand visa maze.`;
    assert.deepEqual(removeLeadingCover(md, COVER), { markdown: "The dreaded Thailand visa maze.", removed: true });
    const other = `![Sky](https://res.cloudinary.com/x/image/upload/v1/sky.jpg)\n\nDear Bangkok,`;
    assert.equal(removeLeadingCover(other, COVER).removed, false);
  });

  it("flags call-to-action wording but not ordinary uses of the words", () => {
    assert.equal(findCtaLines("Subscribe to our newsletter for more.").length, 1);
    assert.equal(findCtaLines("Download our free Thai Island guide").length, 1);
    assert.equal(findCtaLines("Sign up for our newsletter.").length, 1);
    assert.equal(findCtaLines("Internet: Averages 90–110 Mbps download, fiber widely available.").length, 0);
    assert.equal(findCtaLines("The tourist core can feel like a package holiday you didn’t sign up for.").length, 0);
    assert.equal(findCtaLines("Download the native real estate apps.").length, 0);
  });
});

describe("alt text", () => {
  it("turns file names into readable placeholders", () => {
    assert.equal(altFromFilename("Bangkok, City sky view.jpg"), "Bangkok, City sky view");
    assert.equal(altFromFilename(COVER), "IMG 7671");
    assert.equal(altFromFilename("https://res.cloudinary.com/j/image/upload/v1/Bangkok_nightlife_man_and_tuktuk_6383b9be0e.jpg"), "Bangkok nightlife man and tuktuk");
  });

  it("fixes file-name and empty alts, keeps real ones", () => {
    const md = "![Malaysia_KL_Bukit Bintang.jpg](https://x/a.jpg)\n\n![](https://x/Penang_street_0123456789.jpg \"Caption\")\n\n![A cat on a step](https://x/c.jpg)";
    const { markdown, fixed } = fixImageAlts(md);
    assert.equal(fixed, 2);
    assert.ok(markdown.includes("![Malaysia KL Bukit Bintang](https://x/a.jpg)"));
    assert.ok(markdown.includes('![Penang street](https://x/Penang_street_0123456789.jpg "Caption")'));
    assert.ok(markdown.includes("![A cat on a step](https://x/c.jpg)"));
  });
});

describe("links", () => {
  const known = new Set(["/", "/malaysia/mm2h-visa-guide-malaysia", "/thailand"]);

  it("flags links without https (they open a page on our own site)", () => {
    const flags = findLinkProblems("Apply at [arrival.gov.kh](arrival.gov.kh). [www.tigermuaythai.com](link)", known);
    assert.deepEqual(flags.map((f) => f.kind), ["broken-link", "broken-link"]);
  });

  it("flags full links to our own site, www links, missing pages and /guides", () => {
    const kinds = (md: string) => findLinkProblems(md, known).map((f) => f.kind);
    assert.deepEqual(kinds("[MM2H](https://thejetlagchronicles.com/malaysia/mm2h-visa-guide-malaysia)"), []);
    assert.deepEqual(kinds("[MM2H](https://www.thejetlagchronicles.com/malaysia/mm2h-visa-guide-malaysia)"), ["www-link"]);
    assert.deepEqual(kinds("[gone](https://thejetlagchronicles.com/japan/old-post)"), ["broken-link"]);
    assert.deepEqual(kinds("[guides](/guides/thailand) [free](/free/x)"), ["removed-page", "removed-page"]);
    assert.deepEqual(kinds("[ok](/thailand) [ext](https://wise.com) [mail](mailto:a@b.c) [top](#faq)"), []);
  });
});

describe("own links", () => {
  it("turns full links to our site into paths", () => {
    const { markdown, changes } = relativizeOwnLinks(
      "Read the [full article here](https://thejetlagchronicles.com/thailand/bangkok-condo-rental-guide) or [Wise](https://wise.com).",
    );
    assert.equal(markdown, "Read the [full article here](/thailand/bangkok-condo-rental-guide) or [Wise](https://wise.com).");
    assert.equal(changes.length, 1);
  });
});

describe("summary and countries", () => {
  it("shortens long summaries at a sentence when it can", () => {
    const long = `${"Taxes are a game of where you sleep. ".repeat(4)}And this sentence pushes us well past the two hundred character limit for summaries.`;
    const short = shortenSummary(long);
    assert.ok(short.length <= 200);
    assert.ok(short.endsWith("sleep."));
    assert.equal(shortenSummary("Short and sweet."), "Short and sweet.");
  });

  it("maps old country names and continents", () => {
    assert.deepEqual(mapCountry({ name: "thailand", slug: "thailand", continent: "asia", intro: " Hi " }), {
      name: "Thailand",
      slug: "thailand",
      continent: "asia",
      intro: "Hi",
    });
    assert.equal(mapCountry({ name: "colombia", slug: "colombia", continent: "south america", intro: null }).continent, "south_america");
  });
});

describe("a whole post", () => {
  const old: OldPost = {
    slug: "30-thailand-scams",
    title: "30 Thailand Scams",
    description: "The tuk-tuk detour and the closed temple.",
    content: `![IMG_7671.JPG](${COVER})\n\n---\n\n${KLOOK_LINE}\n\n${CTA_SHORTCODE}\n\n![Apple phone.JPG](https://x/apple.jpg)`,
    images: [{ url: COVER, alternativeText: null, caption: null, width: 640, height: 480, name: "IMG_7671.JPG" }],
    lifestyle: false,
    country: { name: "thailand", slug: "thailand" },
    seoTitle: null,
    seoDescription: null,
    publishedAt: "2025-09-20T01:31:26.648Z",
    createdAt: "2025-07-07T10:00:00.000Z",
  };

  it("maps to the new model and records every change and flag", () => {
    const result = migratePost(old, new Set(["/"])) as MigratedPost;
    assert.equal(result.path, "/thailand/30-thailand-scams");
    assert.equal(result.post.section, "place");
    assert.equal(result.post.countrySlug, "thailand");
    assert.equal(result.post.publishedDate, "2025-09-20");
    assert.equal(result.post.coverAlt, "IMG 7671");
    assert.ok(!result.post.body.includes("klook") && !result.post.body.includes("[CTA") && !result.post.body.startsWith("!["));
    assert.ok(result.post.body.includes("![Apple phone](https://x/apple.jpg)"));
    assert.deepEqual(
      result.changes.map((c) => c.kind),
      ["cover-repeat-removed", "cta-box-removed", "affiliate-link-removed"],
    );
    assert.deepEqual([...new Set(result.flags.map((f) => f.kind))].sort(), ["alt-text", "date"]);
  });

  it("puts Life Abroad posts under /lifestyle without a country", () => {
    const result = migratePost({ ...old, lifestyle: true, country: null }, new Set()) as MigratedPost;
    assert.equal(result.path, "/lifestyle/30-thailand-scams");
    assert.equal(result.post.countrySlug, null);
  });

  it("skips a place story with no country", () => {
    assert.equal(migratePost({ ...old, country: null }, new Set()).path, null);
  });

  it("writes a report with before/after for each removed link and the decisions list", () => {
    const post = migratePost(old, new Set(["/"])) as MigratedPost;
    const report = buildReport({
      generatedAt: "2026-11-22",
      source: "test",
      posts: [post],
      skipped: [],
      notInPlan: ["/colombia/ode-to-bogota"],
      countries: ["Thailand"],
    });
    assert.ok(report.includes("**1 affiliate links removed** (1 Klook, 0 Wise)"));
    assert.ok(report.includes("### /thailand/30-thailand-scams"));
    assert.ok(report.includes("  - before: `You’re tired"));
    assert.ok(report.includes("`/colombia/ode-to-bogota`"));
  });
});

describe("body photos", () => {
  const SKY = "https://res.cloudinary.com/jetlagchronicles/image/upload/v1745702443/Bangkok_City_sky_view_aa0076be06.jpg";

  it("lists each photo in a body once, with its alt text", () => {
    const md = `![Sky](${SKY})\n\nText ![](https://x/y.png "Cap")\n\n![Again](${SKY})\n\n[not a photo](https://x/z.jpg)`;
    assert.deepEqual(bodyPhotoUrls(md), [
      { url: SKY, alt: "Sky" },
      { url: "https://x/y.png", alt: "" },
    ]);
  });

  it("asks Cloudinary for the size, and skips photos hosted elsewhere", () => {
    assert.equal(
      cloudinaryInfoUrl(SKY),
      "https://res.cloudinary.com/jetlagchronicles/image/upload/fl_getinfo/v1745702443/Bangkok_City_sky_view_aa0076be06.jpg",
    );
    assert.equal(cloudinaryInfoUrl("https://example.com/a.jpg"), null);
  });

  it("builds a media-library record pointing at the existing photo", () => {
    assert.deepEqual(bodyPhotoRecord(SKY, "Bangkok, City sky view", { width: 640, height: 427, bytes: 60162, format: "jpg" }), {
      url: SKY,
      name: "Bangkok_City_sky_view_aa0076be06.jpg",
      alternativeText: "Bangkok, City sky view",
      width: 640,
      height: 427,
      hash: "Bangkok_City_sky_view_aa0076be06",
      ext: ".jpg",
      mime: "image/jpeg",
      size: 58.75,
      provider: "cloudinary",
      provider_metadata: { public_id: "Bangkok_City_sky_view_aa0076be06", resource_type: "image" },
    });
  });
});
