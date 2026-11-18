import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { StoryArticle } from "@/components/story/StoryArticle";
import { renderMarkdown } from "@/lib/markdown";

describe("story page", () => {
  it("renders the title as the only h1, with the country and the body", async () => {
    const html = renderToStaticMarkup(
      <StoryArticle
        title="30 Thailand Scams"
        bodyHtml={await renderMarkdown("## The tuk-tuk\n\nThe Grand Palace is **not** closed today.")}
        country={{ name: "Thailand", slug: "thailand" }}
      />,
    );
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("<h1>30 Thailand Scams</h1>");
    expect(html).toContain("<p>Thailand</p>");
    expect(html).toContain("<strong>not</strong>");
  });

  it("drops raw HTML and scripts from the Markdown body", async () => {
    const html = await renderMarkdown('Hi <script>alert(1)</script> <img src=x onerror="alert(1)">\n\n[x](javascript:alert(1))');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("javascript:");
  });

  it("supports tables (cost-of-living posts use them)", async () => {
    const html = await renderMarkdown("| Item | Cost |\n|---|---|\n| Rent | 15,000 THB |");
    expect(html).toContain("<table>");
  });
});
