import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { Post } from "@/lib/posts";
import { shareColours, shareImage, shareLogo } from "@/lib/share-image";

const post: Pick<Post, "title" | "section" | "country" | "city" | "coverPhoto"> = {
  title: "Ode to Bangkok: a love letter to the city",
  section: "place",
  country: { name: "Thailand", slug: "thailand" },
  city: "Bangkok",
  coverPhoto: { url: "https://res.cloudinary.com/demo/image/upload/v1/bkk.jpg", width: 1600, height: 1200 },
};

describe("share image", () => {
  it("uses the 1200×630 crop of the cover, the eyebrow and the title at 64px", () => {
    expect(shareImage(post)).toEqual({
      photo: "https://res.cloudinary.com/demo/image/upload/c_fill,g_auto,w_1200,h_630,f_jpg,q_auto/v1/bkk.jpg",
      eyebrow: "Thailand · Bangkok",
      title: "Ode to Bangkok: a love letter to the city",
      titleSize: 64,
    });
  });

  it("shrinks long titles so they stay within three lines: 56px over 90 characters, 48px over 105", () => {
    const longest = "Why More Canadians Are Getting a Plan B: Second Passports, Offshore Assets & an Exit Strategy That Actually Works";
    const vietnam = "Vietnam Visa Reality for Digital Nomads: The 90-Day Hack, Border Runs, and What’s Actually Legal";
    expect(shareImage({ ...post, title: longest }).titleSize).toBe(48);
    expect(shareImage({ ...post, title: vietnam }).titleSize).toBe(56);
    expect(shareImage({ ...post, title: "x".repeat(90) }).titleSize).toBe(64);
  });

  it("cuts titles over 120 characters at a word, with an ellipsis", () => {
    const title = `${"Slow travel and fast Wi-Fi, ".repeat(5)}the end`;
    const short = shareImage({ ...post, title }).title;
    expect(short.length).toBeLessThanOrEqual(121);
    expect(short).toMatch(/[a-z]…$/);
    expect(short.startsWith("Slow travel and fast Wi-Fi, Slow travel")).toBe(true);
  });

  it("says Life Abroad for Life Abroad stories, and has no photo when there is no cover", () => {
    const s = shareImage({ ...post, section: "life_abroad", country: null, city: null, coverPhoto: null });
    expect(s.eyebrow).toBe("Life Abroad");
    expect(s.photo).toBeNull();
  });

  it("draws the logo in white with the accent, no CSS variables left", () => {
    const svg = Buffer.from(shareLogo.src.split(",")[1], "base64").toString("utf8");
    expect(svg).not.toContain("var(");
    expect(svg).toContain(shareColours.logoInk);
    expect(svg).toContain(shareColours.logoAccent);
    expect(shareLogo).toMatchObject({ width: 230, height: 57 });
  });

  it("keeps its colours in step with tokens.css", () => {
    const tokens = readFileSync(path.resolve(import.meta.dirname, "../src/styles/tokens.css"), "utf8");
    const dark = tokens.split("@media (prefers-color-scheme: dark)")[1];
    const value = (css: string, name: string) => new RegExp(`${name}:\\s*([^;]+);`).exec(css)?.[1].trim();
    expect(value(dark, "--color-page")).toBe(shareColours.background);
    expect(value(dark, "--color-on-scrim")).toBe(shareColours.text);
    expect(value(dark, "--logo-accent")).toBe(shareColours.logoAccent);
    expect(value(tokens, "--color-scrim")).toBe("rgb(18 22 28 / 0.64)");
    expect(shareColours.scrim).toContain("rgba(18, 22, 28, 0.64) 55%");
  });
});
