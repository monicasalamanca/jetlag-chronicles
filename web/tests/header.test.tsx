import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { navCurrent } from "@/components/layout/nav";
import { NavMenus } from "@/components/layout/NavMenus";
import { SiteHeader } from "@/components/layout/SiteHeader";

const render = (path: string) => renderToStaticMarkup(<SiteHeader nav={<NavMenus currentPath={path} />} />);

describe("site header", () => {
  it("links the logo home with a text name", () => {
    expect(render("/")).toContain('<a class="site-logo" aria-label="The Jet Lag Chronicles, home" href="/">');
  });

  it("has the four menu items in order, in the desktop nav and the phone menu", () => {
    const html = render("/");
    const labels = [...html.matchAll(/<a href="[^"]+"[^>]*>([^<]+)<\/a>/g)].map((m) => m[1]);
    expect(labels).toEqual(["Places", "Life Abroad", "Stories", "About", "Places", "Life Abroad", "Stories", "About"]);
    expect(html).toContain('href="/lifestyle"');
    expect(html.match(/<nav [^>]*aria-label="Main"/g)).toHaveLength(2);
  });

  it("uses a native <details> menu on phones (works without JavaScript)", () => {
    const html = render("/");
    expect(html).toMatch(/<details class="menu"><summary><span>Menu<\/span>/);
    expect(html).not.toContain("<details class=\"menu\" open");
  });

  it("marks the current page, not by colour alone", () => {
    const html = render("/stories");
    expect(html.match(/aria-current="page"/g)).toHaveLength(2);
    expect(html).toContain('<a aria-current="page" href="/stories">Stories</a>');
  });

  it("marks the section for a page inside it", () => {
    const html = render("/lifestyle/leaving-your-country-2026");
    expect(html).toContain('<a aria-current="true" href="/lifestyle">Life Abroad</a>');
    expect(html).not.toContain('aria-current="page"');
  });
});

describe("navCurrent", () => {
  it.each([
    ["/places", "/places", "page"],
    ["/places", "/places/", "page"],
    ["/stories", "/stories/2", "true"],
    ["/lifestyle", "/lifestyles", undefined],
    ["/about", "/", undefined],
    // Country pages and their stories sit under Places.
    ["/places", "/thailand", "true"],
    ["/places", "/thailand/ode-to-bangkok-love-letter-to-the-city", "true"],
    ["/places", "/lifestyle/leaving-your-country-2026", undefined],
    ["/places", "/about", undefined],
    ["/places", "/", undefined],
  ])("%s at %s", (href, path, expected) => {
    expect(navCurrent(href, path)).toBe(expected);
  });
});
