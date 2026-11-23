import { logoSvg } from "@/components/brand/logo-svg";
import { shareImageUrl } from "@/lib/cloudinary-loader";
import { type Post, storyEyebrow } from "@/lib/posts";

/**
 * The social share image (design-system.md §9): the cover photo under a bottom-weighted scrim, the white logo
 * top-left, then the eyebrow and title. Drawn by next/og (Satori), which can't read CSS variables, so the few
 * values it needs are copied here from tokens.css (tests/share-image.test.ts keeps them in step).
 */
export const SHARE_SIZE = { width: 1200, height: 630 } as const;
export const SHARE_SAFE_AREA = 64;
export const SHARE_TITLE_LONG = 90;
export const SHARE_TITLE_VERY_LONG = 105;
/** Beyond this even 48px needs a fourth line, so the title is cut at a word with an ellipsis. */
export const SHARE_TITLE_MAX = 120;

export const shareColours = {
  /** Behind the photo while it loads, and when a story has no cover: --color-page (dark). */
  background: "#12161C",
  /** --color-on-scrim */
  text: "#FFFFFF",
  /** --color-scrim's rgb, at .86 / .64 / 0 from the bottom up. */
  scrim: "linear-gradient(to top, rgba(18, 22, 28, 0.86) 0%, rgba(18, 22, 28, 0.64) 55%, rgba(18, 22, 28, 0) 100%)",
  /** The logo on a photo: white ink with the dark-mode accent (--logo-accent, dark). */
  logoInk: "#FFFFFF",
  logoAccent: "#2EA3F2",
} as const;

export type ShareImage = {
  photo: string | null;
  eyebrow: string;
  title: string;
  /** 64px; 56px over 90 characters and 48px over 105, so every title fits in three lines. */
  titleSize: number;
};

export function shareImage(post: Pick<Post, "title" | "section" | "country" | "city" | "coverPhoto">): ShareImage {
  const full = post.title.trim();
  const title = full.length <= SHARE_TITLE_MAX ? full : `${full.slice(0, SHARE_TITLE_MAX).replace(/[\s,;:–—-]+\S*$/, "")}…`;
  return {
    photo: post.coverPhoto ? shareImageUrl(post.coverPhoto.url) : null,
    eyebrow: storyEyebrow(post),
    title,
    titleSize: title.length > SHARE_TITLE_VERY_LONG ? 48 : title.length > SHARE_TITLE_LONG ? 56 : 64,
  };
}

/** The full logo as a white SVG data URI, 230px wide. */
export const shareLogo = (() => {
  const { viewBox, inner } = logoSvg.full;
  const [, , w, h] = viewBox.split(" ").map(Number);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${inner
    .replaceAll("var(--logo-ink)", shareColours.logoInk)
    .replaceAll("var(--logo-accent)", shareColours.logoAccent)}</svg>`;
  return {
    src: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
    width: 230,
    height: Math.round((230 * h) / w),
  };
})();
