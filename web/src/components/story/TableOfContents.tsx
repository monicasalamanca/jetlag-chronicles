import { type StoryHeading, TOC_MIN_SECTIONS } from "@/lib/markdown";

/** "In this story": shown only for stories with 4 or more sections. */
export function TableOfContents({ headings }: { headings: StoryHeading[] }) {
  if (headings.length < TOC_MIN_SECTIONS) return null;
  return (
    <nav className="toc" aria-labelledby="toc-title">
      <p className="eyebrow toc__title" id="toc-title">
        In this story
      </p>
      <ol>
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
