import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/layout/SiteFooter";

const render = (showToolkit = false) => renderToStaticMarkup(<SiteFooter showToolkit={showToolkit} year={2026} />);

describe("site footer", () => {
  it("never puts the contact address in the HTML as plain text", () => {
    const html = render();
    expect(html).not.toContain("info@thejetlagchronicles.com");
    expect(html).not.toContain("mailto:");
    expect(html).toContain("info (at) thejetlagchronicles.com");
  });

  it("names each social network in text", () => {
    const html = render();
    for (const name of ["Instagram", "YouTube", "X"]) expect(html).toContain(`>${name}</a>`);
    expect(html).toContain('href="https://www.instagram.com/thejetlaggers_ig"');
  });

  it("links RSS, Privacy and the ring mark home, with the copyright", () => {
    const html = render();
    expect(html).toContain('<a href="/rss.xml">RSS</a>');
    expect(html).toContain('<a href="/privacy">Privacy</a>');
    expect(html).toContain('aria-label="The Jet Lag Chronicles, home"');
    expect(html).toContain("© 2026 Moni &amp; Dunny");
  });

  it("shows the Toolkit link only when the Toolkit is live", () => {
    expect(render(false)).not.toContain("/toolkit");
    expect(render(true)).toContain('<a href="/toolkit">Our Travel Toolkit</a>');
  });
});
