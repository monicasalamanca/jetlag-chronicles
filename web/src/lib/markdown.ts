import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import cloudinaryLoader from "@/lib/cloudinary-loader";
import { internalPath, linkRel } from "@/lib/links";

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

export type StoryHeading = { id: string; text: string };
export type ImageSize = { width: number; height: number };

export type RenderOptions = {
  /** Who wrote the story: links in guest (reader) stories get rel="ugc nofollow". */
  authorType?: "team" | "guest";
  /** Known sizes of body photos by URL (from Strapi's media library), so the page doesn't jump while they load. */
  imageSizes?: ReadonlyMap<string, ImageSize>;
  /** Turns a relative upload URL (local Strapi) into an absolute one. */
  resolveUrl?: (url: string) => string;
};

export type RenderedStory = {
  /** Sanitized HTML for the story-grid. */
  html: string;
  /** The H2 sections, in order (the table of contents). */
  headings: StoryHeading[];
  readingMinutes: number;
  /** Photos with no alt text. The build fails on these (see content.ts); Strapi refuses to publish them. */
  imagesWithoutAlt: number;
};

/** A table of contents only helps once a story has this many sections. */
export const TOC_MIN_SECTIONS = 4;
export const WORDS_PER_MINUTE = 220;

const PHOTO_WIDTHS = [480, 800, 1200, 1600];
const PHOTO_SIZES = "(min-width: 56rem) 56rem, 100vw";

function textOf(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

function slugify(text: string): string {
  return (
    text
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

const isBlank = (n: HastNode) => n.type === "text" && !(n.value ?? "").trim();
const isElement = (n: HastNode | undefined, tag: string): n is HastNode => n?.type === "element" && n.tagName === tag;

/** The one element on a line (ignoring whitespace), when it is a `tag`. */
function only(line: HastNode[] | undefined, tag: string): HastNode | null {
  const content = (line ?? []).filter((n) => !isBlank(n));
  return content.length === 1 && isElement(content[0], tag) ? content[0] : null;
}

function paragraph(lines: HastNode[][]): HastNode | null {
  const children = lines.flatMap((line, i) => (i === 0 ? line : [{ type: "element", tagName: "br", properties: {}, children: [] }, ...line]));
  const first = children[0];
  const last = children.at(-1);
  if (first?.type === "text") first.value = (first.value ?? "").trimStart();
  if (last?.type === "text") last.value = (last.value ?? "").trimEnd();
  return children.some((n) => !isBlank(n)) ? { type: "element", tagName: "p", properties: {}, children } : null;
}

/**
 * Photos on their own line always become figures, however the line was written. Old posts (and people typing in
 * Strapi) often put a photo straight under or over text without a blank line, add an italic caption line right
 * under it, or a `---` under it (which Markdown reads as a heading). Each photo line becomes its own paragraph
 * (→ a figure below), and an italic line right under a photo becomes its caption.
 */
function unpackPhotos(node: HastNode): HastNode[] {
  if (/^h[1-6]$/.test(node.tagName ?? "")) {
    const img = only(node.children, "img");
    return img ? [{ type: "element", tagName: "p", properties: {}, children: [img] }] : [node];
  }
  if (node.tagName !== "p") return [node];
  const lines: HastNode[][] = [[]];
  for (const child of node.children ?? []) {
    if (isElement(child, "br")) lines.push([]);
    else lines.at(-1)!.push(child);
  }
  if (lines.length < 2 || !lines.some((line) => only(line, "img"))) return [node];

  const out: HastNode[] = [];
  let text: HastNode[][] = [];
  const flush = () => {
    const p = paragraph(text);
    if (p) out.push(p);
    text = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const img = only(lines[i], "img");
    if (!img) {
      text.push(lines[i]);
      continue;
    }
    flush();
    const caption = only(lines[i + 1], "em");
    if (caption && typeof img.properties?.title !== "string") {
      img.properties = { ...img.properties, title: textOf(caption).trim() };
      i++;
    }
    out.push({ type: "element", tagName: "p", properties: {}, children: [img] });
  }
  flush();
  return out;
}

/** "The night market | Photo: Dunny" → caption + credit. A title of only "Photo: …" is just a credit. */
export function splitCaption(title: string): { caption: string | null; credit: string | null } {
  const match = /^(.*?)\s*\|\s*(Photo:.*)$/i.exec(title.trim()) ?? /^()(Photo:.*)$/i.exec(title.trim());
  if (!match) return { caption: title.trim() || null, credit: null };
  return { caption: match[1].trim() || null, credit: match[2].trim() };
}

function rehypeStory(options: RenderOptions, out: Omit<RenderedStory, "html">) {
  const resolve = options.resolveUrl ?? ((url: string) => url);
  const usedIds = new Map<string, number>();

  const uniqueId = (text: string) => {
    const base = slugify(text);
    const n = (usedIds.get(base) ?? 0) + 1;
    usedIds.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  };

  const image = (img: HastNode): { size: ImageSize | undefined; title: string | null } => {
    const props = (img.properties ??= {});
    const original = String(props.src ?? "");
    const src = resolve(original);
    const size = options.imageSizes?.get(original) ?? options.imageSizes?.get(src);
    const alt = typeof props.alt === "string" ? props.alt.trim() : "";
    if (!alt) out.imagesWithoutAlt += 1;
    const title = typeof props.title === "string" ? props.title : null;
    const isCloudinary = cloudinaryLoader({ src, width: 1 }) !== src;
    img.properties = {
      src: isCloudinary ? cloudinaryLoader({ src, width: 1200 }) : src,
      ...(isCloudinary && {
        srcSet: PHOTO_WIDTHS.map((w) => `${cloudinaryLoader({ src, width: w })} ${w}w`).join(", "),
        sizes: PHOTO_SIZES,
      }),
      alt,
      ...(size && { width: size.width, height: size.height }),
      loading: "lazy",
      decoding: "async",
    };
    return { size, title };
  };

  const figure = (img: HastNode): HastNode => {
    const { size, title } = image(img);
    const { caption, credit } = title ? splitCaption(title) : { caption: null, credit: null };
    // As in the design: every landscape photo goes wide, portraits stay narrow.
    const shape = size ? (size.height > size.width ? "portrait" : "wide") : undefined;
    const captionChildren: HastNode[] = [];
    if (caption) captionChildren.push({ type: "text", value: caption });
    if (credit) {
      captionChildren.push({
        type: "element",
        tagName: "span",
        properties: { className: ["credit"] },
        children: [{ type: "text", value: credit }],
      });
    }
    return {
      type: "element",
      tagName: "figure",
      properties: shape ? { className: [shape] } : {},
      children: [
        img,
        ...(captionChildren.length > 0
          ? [{ type: "element", tagName: "figcaption", properties: {}, children: captionChildren }]
          : []),
      ],
    };
  };

  const visit = (node: HastNode): HastNode => {
    if (node.type !== "element" && node.type !== "root") return node;

    // A paragraph holding only a photo becomes a captioned figure (the photo's Markdown title is the caption).
    if (node.tagName === "p") {
      const content = (node.children ?? []).filter((c) => !isBlank(c));
      if (content.length === 1 && content[0].type === "element" && content[0].tagName === "img") return figure(content[0]);
    }
    if (node.tagName === "img") {
      image(node);
      return node;
    }
    if (node.tagName === "h2" || node.tagName === "h3") {
      const text = textOf(node).trim();
      const id = uniqueId(text);
      node.properties = { ...node.properties, id };
      if (node.tagName === "h2") out.headings.push({ id, text });
    }
    // Table cells: right-aligned columns (|---:|) use the design's .num style; header cells get a scope.
    if (node.tagName === "th" || node.tagName === "td") {
      const { align, ...rest } = node.properties ?? {};
      node.properties = {
        ...rest,
        ...(align === "right" && { className: ["num"] }),
        ...(node.tagName === "th" && { scope: "col" }),
      };
    }
    if (node.tagName === "a") {
      const href = String(node.properties?.href ?? "");
      const path = internalPath(href);
      const rel = linkRel(href, { authorType: options.authorType });
      node.properties = { ...node.properties, href: path ?? href, ...(rel && { rel: rel.split(" ") }) };
    }

    node.children = (node.children ?? []).flatMap(unpackPhotos).map(visit);

    // A wide table scrolls inside its own focusable region, never the page.
    if (node.tagName === "table") {
      return {
        type: "element",
        tagName: "div",
        properties: { className: ["table-wrap"], role: "region", tabIndex: 0, ariaLabel: "Table" },
        children: [node],
      };
    }
    return node;
  };

  return () => (tree: HastNode) => {
    const words = textOf(tree).split(/\s+/).filter(Boolean).length;
    out.readingMinutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
    visit(tree);
  };
}

/**
 * Story body Markdown → sanitized HTML plus what the page needs around it. Raw HTML in the Markdown is dropped,
 * never rendered. Our own changes (ids, figures, rel) run after sanitizing.
 */
export async function renderStory(markdown: string, options: RenderOptions = {}): Promise<RenderedStory> {
  const out: Omit<RenderedStory, "html"> = { headings: [], readingMinutes: 1, imagesWithoutAlt: 0 };
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    // A single line break is a line break, as on the old site and as people expect when typing in Strapi.
    .use(remarkBreaks)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStory(options, out))
    .use(rehypeStringify)
    .process(markdown);
  return { html: String(file), ...out };
}

/** Just the HTML (e.g. intros and simple pages). */
export async function renderMarkdown(markdown: string, options: RenderOptions = {}): Promise<string> {
  return (await renderStory(markdown, options)).html;
}

/** Every image URL in a Markdown body, to look up their sizes. */
export function markdownImageUrls(markdown: string): string[] {
  return [...new Set([...markdown.matchAll(/!\[[^\]]*\]\(\s*<?([^)\s>]+)/g)].map((m) => m[1]))];
}
