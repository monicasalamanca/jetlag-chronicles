import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AuthorBox } from "@/components/story/AuthorBox";
import { Byline } from "@/components/story/Byline";
import { StoryPage } from "@/components/story/StoryPage";
import { TableOfContents } from "@/components/story/TableOfContents";
import { formatDate } from "@/lib/dates";
import { renderMarkdown, renderStory, splitCaption } from "@/lib/markdown";
import type { Author, Post } from "@/lib/posts";

const team: Author = { name: "Moni & Dunny", slug: "moni-and-dunny", type: "team", bio: "We moved abroad.", link: null, photo: null, photoAlt: null };
const guest: Author = { name: "Ana", slug: "ana", type: "guest", bio: "Ana travels slowly.", link: "https://ana.example.com", photo: null, photoAlt: null };

const post: Post = {
  documentId: "d1",
  title: "30 Thailand Scams",
  slug: "30-thailand-scams",
  section: "place",
  summary: "The tuk-tuk detour and the closed temple.",
  body: "",
  country: { name: "Thailand", slug: "thailand" },
  city: null,
  coverPhoto: { url: "https://res.cloudinary.com/demo/image/upload/v1/cover.jpg", width: 1600, height: 1200 },
  coverAlt: "A tuk-tuk at night",
  coverCaption: null,
  coverCredit: null,
  author: team,
  publishedDate: "2025-04-12",
  updatedDate: null,
  seoTitle: null,
  seoDescription: null,
};

const sections = (n: number) => Array.from({ length: n }, (_, i) => `## Part ${i + 1}\n\nText.`).join("\n\n");

describe("story Markdown", () => {
  it("drops raw HTML and scripts", async () => {
    const html = await renderMarkdown('Hi <script>alert(1)</script> <img src=x onerror="alert(1)">\n\n[x](javascript:alert(1))');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("javascript:");
  });

  it("gives headings ids and lists the H2 sections, with unique ids", async () => {
    const story = await renderStory("## Getting a visa\n\n### Paperwork\n\n## Getting a visa\n\n## ¿Cuánto cuesta?");
    expect(story.html).toContain('<h2 id="getting-a-visa">Getting a visa</h2>');
    expect(story.html).toContain('<h3 id="paperwork">');
    expect(story.headings).toEqual([
      { id: "getting-a-visa", text: "Getting a visa" },
      { id: "getting-a-visa-2", text: "Getting a visa" },
      { id: "cuanto-cuesta", text: "¿Cuánto cuesta?" },
    ]);
  });

  it("turns a photo on its own line into a figure, with caption and credit from its title", async () => {
    const sizes = new Map([["https://res.cloudinary.com/demo/image/upload/v1/market.jpg", { width: 1400, height: 800 }]]);
    const { html } = await renderStory(
      '![A crowded night market](https://res.cloudinary.com/demo/image/upload/v1/market.jpg "Two streets from our building | Photo: Dunny")',
      { imageSizes: sizes },
    );
    expect(html).toMatch(/^<figure class="wide"><img src="https:\/\/res\.cloudinary\.com\/demo\/image\/upload\/f_auto,q_auto,w_1200,c_limit\/v1\/market\.jpg"/);
    expect(html).toContain('srcset="https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_480,c_limit/v1/market.jpg 480w');
    expect(html).toContain('alt="A crowded night market" width="1400" height="800" loading="lazy"');
    expect(html).toContain('<figcaption>Two streets from our building<span class="credit">Photo: Dunny</span></figcaption>');
    expect(html).not.toContain("title=");
  });

  it("keeps portrait photos narrow and leaves out the caption when there is no title", async () => {
    const sizes = new Map([["/uploads/train.jpg", { width: 600, height: 800 }]]);
    const { html } = await renderStory("![A train](/uploads/train.jpg)", {
      imageSizes: sizes,
      resolveUrl: (u) => `http://localhost:1337${u}`,
    });
    expect(html).toBe(
      '<figure class="portrait"><img src="http://localhost:1337/uploads/train.jpg" alt="A train" width="600" height="800" loading="lazy" decoding="async"></figure>',
    );
  });

  it("makes every landscape photo wide, small ones too, so all photos line up", async () => {
    const url = "https://res.cloudinary.com/demo/image/upload/v1/sky.jpg";
    const { html } = await renderStory(`![Sky](${url})`, { imageSizes: new Map([[url, { width: 640, height: 427 }]]) });
    expect(html).toMatch(/^<figure class="wide"><img /);
    expect(html).toContain('width="640" height="427"');
  });

  describe("photos written the old site's way", () => {
    const cat = "https://res.cloudinary.com/demo/image/upload/v1/cat.jpg";
    const sizes = new Map([[cat, { width: 1600, height: 900 }]]);
    const render = async (md: string) => (await renderStory(md, { imageSizes: sizes })).html;

    it("turns an italic line right under a photo into its caption", async () => {
      const html = await render(`![A cat](${cat})\n_Still here? Look at this cute cat._`);
      expect(html).toMatch(/^<figure class="wide"><img [^>]*alt="A cat"[^>]*><figcaption>Still here\? Look at this cute cat\.<\/figcaption><\/figure>$/);
    });

    it("keeps an italic line that is not under a photo as text", async () => {
      expect(await render("Hello\n_just italic_")).toBe("<p>Hello<br>\n<em>just italic</em></p>");
    });

    it("splits a photo out of the text before or after it", async () => {
      const html = await render(`Well, here it is.\n![A cat](${cat})\nAnd more text with [a link](https://x.example).`);
      expect(html).toMatch(/^<p>Well, here it is\.<\/p><figure class="wide"><img [^>]*><\/figure><p>And more text with <a href="https:\/\/x\.example"[^>]*>a link<\/a>\.<\/p>$/);
    });

    it("keeps a photo with a rule under it as a photo, not a heading in the contents", async () => {
      const { html, headings } = await renderStory(`![A cat](${cat})\n---\n\nText.`, { imageSizes: sizes });
      expect(headings).toEqual([]);
      expect(html).toMatch(/^<figure class="wide"><img [^>]*><\/figure>\n<p>Text\.<\/p>$/);
    });

    it("leaves photos inside a sentence alone", async () => {
      const html = await render(`Look ![a tiny icon](${cat}) here.`);
      expect(html).toMatch(/^<p>Look <img [^>]*> here\.<\/p>$/);
    });
  });

  it("counts photos without alt text (the build fails on them)", async () => {
    expect((await renderStory("![](a.jpg)\n\n![ ](b.jpg)\n\n![ok](c.jpg)")).imagesWithoutAlt).toBe(2);
    expect((await renderStory("![ok](c.jpg)")).imagesWithoutAlt).toBe(0);
  });

  it("estimates reading time at 220 words a minute, at least 1", async () => {
    expect((await renderStory("word ".repeat(10))).readingMinutes).toBe(1);
    expect((await renderStory("word ".repeat(221))).readingMinutes).toBe(2);
  });

  it("marks external links in guest stories ugc nofollow, but not ours", async () => {
    const md = "[a site](https://example.com) and [our page](/thailand)";
    expect(await renderMarkdown(md, { authorType: "guest" })).toContain('<a href="https://example.com" rel="ugc nofollow">');
    expect(await renderMarkdown(md, { authorType: "team" })).toContain('<a href="https://example.com">');
    expect(await renderMarkdown(md, { authorType: "guest" })).toContain('<a href="/thailand">');
  });

  it("turns full links to our own site into paths", async () => {
    expect(await renderMarkdown("[x](https://www.thejetlagchronicles.com/about#us)")).toContain('<a href="/about#us">');
  });

  it("wraps tables in a focusable scroll region so they never widen the page", async () => {
    const html = await renderMarkdown("| Item | Cost |\n|---|---|\n| Rent | 15,000 THB |");
    expect(html).toMatch(/^<div class="table-wrap" role="region" tabindex="0" aria-label="Table"><table>/);
    expect(html).toMatch(/<\/table><\/div>$/);
  });

  it("right-aligns number columns with the design's .num class and scopes header cells", async () => {
    const html = await renderMarkdown("| Item | THB |\n|---|---:|\n| Rent | 15,000 |");
    expect(html).toContain('<th scope="col">Item</th>');
    expect(html).toContain('<th class="num" scope="col">THB</th>');
    expect(html).toContain('<td class="num">15,000</td>');
    expect(html).not.toContain("align=");
  });

  it("keeps single line breaks (posts list costs one per line)", async () => {
    expect(await renderMarkdown("**Rent:** 10,000\n**Food:** 8,000")).toBe("<p><strong>Rent:</strong> 10,000<br>\n<strong>Food:</strong> 8,000</p>");
  });

  it("splits captions and credits", () => {
    expect(splitCaption("Dusk | Photo: Moni")).toEqual({ caption: "Dusk", credit: "Photo: Moni" });
    expect(splitCaption("Photo: Moni")).toEqual({ caption: null, credit: "Photo: Moni" });
    expect(splitCaption("Just a caption")).toEqual({ caption: "Just a caption", credit: null });
  });
});

describe("table of contents", () => {
  const headings = (n: number) => Array.from({ length: n }, (_, i) => ({ id: `s${i}`, text: `Section ${i}` }));

  it("is hidden below 4 sections", () => {
    expect(renderToStaticMarkup(<TableOfContents headings={headings(3)} />)).toBe("");
  });

  it("lists every section from 4 up", () => {
    const html = renderToStaticMarkup(<TableOfContents headings={headings(4)} />);
    expect(html.match(/<li>/g)).toHaveLength(4);
    expect(html).toContain('<a href="#s0">Section 0</a>');
  });
});

describe("byline", () => {
  it("shows the Updated date only when there is one", () => {
    const base = { author: "Moni & Dunny", publishedDate: "2025-04-12", readingMinutes: 9 };
    const without = renderToStaticMarkup(<Byline {...base} updatedDate={null} />);
    const withUpdate = renderToStaticMarkup(<Byline {...base} updatedDate="2026-03-03" />);
    expect(without).not.toContain("Updated");
    expect(without).toContain('Published <time dateTime="2025-04-12">12 April 2025</time>');
    expect(withUpdate).toContain('Updated <time dateTime="2026-03-03">3 March 2026</time>');
    expect(withUpdate).toContain("9 min read");
  });

  it("formats dates as calendar days in any time zone", () => {
    expect(formatDate("2026-01-01")).toBe("1 January 2026");
    expect(formatDate("2026-01-01T23:30:00.000Z")).toBe("1 January 2026");
  });
});

describe("author box", () => {
  it("team: links to About", () => {
    const html = renderToStaticMarkup(<AuthorBox author={team} />);
    expect(html).toContain("Written by");
    expect(html).toContain('<a class="author__link" href="/about">More about us');
  });

  it("guest: clay label and their link marked ugc nofollow", () => {
    const html = renderToStaticMarkup(<AuthorBox author={guest} />);
    expect(html).toContain('class="author author--guest"');
    expect(html).toContain("Guest author");
    expect(html).toContain('href="https://ana.example.com" rel="ugc nofollow"');
    expect(html).toContain("(external link)");
  });
});

describe("story page", () => {
  const render = async (body: string, extra: Partial<Post> = {}) =>
    renderToStaticMarkup(
      <StoryPage
        post={{ ...post, body, ...extra }}
        story={await renderStory(body)}
        eyebrow="Thailand"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Thailand", href: "/thailand" }, { label: post.title }]}
        more={null}
      />,
    );

  it("has one h1, the summary, the breadcrumb with the current page, the author and Write to us", async () => {
    const html = await render(sections(2));
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain('<h1 class="t-h1">30 Thailand Scams</h1>');
    expect(html).toContain('<p class="t-lead">The tuk-tuk detour and the closed temple.</p>');
    expect(html).toContain('<span aria-current="page">30 Thailand Scams</span>');
    expect(html).toContain('alt="A tuk-tuk at night"');
    expect(html).toContain("Been here? Write to us.");
    expect(html).toContain('aria-label="About the author"');
  });

  it("shows the table of contents only for 4+ sections", async () => {
    expect(await render(sections(3))).not.toContain("In this story");
    expect(await render(sections(4))).toContain("In this story");
  });

  it("shows the cover caption and credit only when filled in", async () => {
    expect(await render("Hi")).not.toContain("cover__caption");
    const html = await render("Hi", { coverCaption: "Bangkok at dusk.", coverCredit: "Moni" });
    expect(html).toContain('<p class="figcap cover__caption">Bangkok at dusk.<span class="credit">Photo: Moni</span></p>');
  });
});
