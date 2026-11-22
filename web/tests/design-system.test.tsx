import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Logo } from "@/components/brand/Logo";

const src = path.resolve(import.meta.dirname, "../src");
const read = (p: string) => readFileSync(path.join(src, p), "utf8");
const walk = (dir: string): string[] =>
  readdirSync(path.join(src, dir)).flatMap((f) => {
    const rel = path.join(dir, f);
    return statSync(path.join(src, rel)).isDirectory() ? walk(rel) : [rel];
  });

const tokens = read("styles/tokens.css");
const [lightBlock, darkBlock] = tokens.split("@media (prefers-color-scheme: dark)");
const names = (css: string) => new Set([...css.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));

describe("tokens only", () => {
  // Files allowed to hold raw values: the tokens themselves, and metadata that cannot read CSS variables.
  const allowed = new Set(["styles/tokens.css", "app/layout.tsx", "app/manifest.ts", "components/brand/logo-svg.ts"]);
  const files = [...walk("components"), ...walk("styles"), ...walk("app")].filter(
    (f) => /\.(tsx?|css)$/.test(f) && !allowed.has(f),
  );

  it.each(files)("%s has no hard-coded colours", (file) => {
    expect(read(file)).not.toMatch(/#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/);
  });

  it("every CSS variable a stylesheet uses is defined in tokens.css (or by next/font)", () => {
    const defined = names(tokens);
    defined.add("--font-source-serif").add("--font-source-sans");
    const used = walk("styles").flatMap((f) => [...read(f).matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1]));
    expect(used.filter((v) => !defined.has(v))).toEqual([]);
  });

  it("gives every colour and logo token a dark value", () => {
    const colours = [...names(lightBlock)].filter((n) => n.startsWith("--color-") || n.startsWith("--logo-"));
    const dark = names(darkBlock);
    expect(colours.filter((n) => !dark.has(n))).toEqual([]);
  });
});

describe("logo", () => {
  it("is recoloured by tokens and hidden from assistive tech (the link carries the name)", () => {
    const html = renderToStaticMarkup(<Logo />);
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("var(--logo-ink)");
    expect(html).toContain("var(--logo-accent)");
    expect(html).not.toMatch(/#[0-9a-fA-F]{6}/);
  });

  it("full logo and ring mark can share a page without clashing ids", () => {
    const ids = (html: string) => [...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
    const full = ids(renderToStaticMarkup(<Logo />));
    const ring = ids(renderToStaticMarkup(<Logo variant="ring" />));
    expect(full.length).toBeGreaterThan(0);
    expect(full.filter((id) => ring.includes(id))).toEqual([]);
  });
});
