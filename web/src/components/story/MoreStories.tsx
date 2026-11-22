import Link from "next/link";
import { Icon } from "@/components/brand/Icon";
import { StoryCard, type StoryCardProps } from "@/components/cards/StoryCard";

export type MoreStoriesProps = {
  /** "Thailand" or "Life Abroad". */
  label: string;
  href: string;
  stories: StoryCardProps[];
};

/** "More from Thailand": up to 3 cards and a link to the full list. Hidden when there's nothing else yet. */
export function MoreStories({ label, href, stories }: MoreStoriesProps) {
  if (stories.length === 0) return null;
  return (
    <div className="section">
      <section className="more-from" aria-labelledby="more-from-title">
        <div className="section__head">
          <h2 className="t-h3" id="more-from-title">
            More from {label}
          </h2>
          <Link className="link-more" href={href}>
            All {label} stories
            <Icon name="chevron-right" className="icon-sm" />
          </Link>
        </div>
        <div className="grid-cards">
          {stories.map((s) => (
            <StoryCard key={s.href} {...s} />
          ))}
        </div>
      </section>
    </div>
  );
}
