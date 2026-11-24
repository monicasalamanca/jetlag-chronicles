import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/dates";
import type { Media } from "@/lib/posts";

export type StoryCardProps = {
  href: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: Media | null;
  publishedDate: string;
  readingMinutes: number;
  variant?: "standard" | "featured" | "compact";
  /** Heading level inside its section (h3 under a section h2 by default; h1 for the homepage's featured story). */
  headingLevel?: 1 | 2 | 3;
  /** The page's largest image (LCP): preloaded and fetched first instead of lazy-loaded. */
  preload?: boolean;
};

const IMAGE_SIZES = {
  standard: "(min-width: 64rem) 22rem, (min-width: 48rem) 45vw, 100vw",
  featured: "(min-width: 72rem) 72rem, 100vw",
  compact: "5.5rem",
};

/** One link per card (the title, stretched over the card); the photo is decorative because the title says it all. */
export function StoryCard({
  href,
  title,
  eyebrow,
  summary,
  image,
  publishedDate,
  readingMinutes,
  variant = "standard",
  headingLevel = 3,
  preload = false,
}: StoryCardProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article className={variant === "standard" ? "story-card" : `story-card story-card--${variant}`}>
      <span className="story-card__media" aria-hidden="true">
        {image && (
          <Image
            src={image.url}
            alt=""
            width={image.width ?? 1200}
            height={image.height ?? 900}
            sizes={IMAGE_SIZES[variant]}
            {...(preload && { preload: true, fetchPriority: "high" as const })}
          />
        )}
      </span>
      <div className="story-card__body">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Heading className="story-card__title">
          <Link className="story-card__link" href={href}>
            {title}
          </Link>
        </Heading>
        <p className="story-card__summary">{summary}</p>
        <p className="story-card__meta">
          <time dateTime={publishedDate}>{formatDate(publishedDate)}</time> · {readingMinutes} min read
        </p>
      </div>
    </article>
  );
}
