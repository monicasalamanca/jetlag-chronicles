import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type HastNode = { type: string; tagName?: string; properties?: Record<string, unknown>; children?: HastNode[] };

/**
 * Wraps every table in a scrollable, keyboard-focusable region (story.css `.table-wrap`), so a wide table
 * scrolls on its own and never makes the page scroll sideways on a phone. Runs after sanitizing.
 */
export function rehypeWrapTables() {
  const wrap = (node: HastNode) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      wrap(child);
      if (child.type !== "element" || child.tagName !== "table") return child;
      return {
        type: "element",
        tagName: "div",
        properties: { className: ["table-wrap"], role: "region", tabIndex: 0, ariaLabel: "Table" },
        children: [child],
      };
    });
  };
  return (tree: HastNode) => wrap(tree);
}

/** Story body Markdown → sanitized HTML. Raw HTML in the Markdown is dropped, never rendered. */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeWrapTables)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}
