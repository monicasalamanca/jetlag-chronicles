import { type StoryCardProps, StoryCard } from "@/components/cards/StoryCard";
import { storyCount } from "@/lib/places";
import { SectionIntro } from "./SectionIntro";

/** /lifestyle (docs/design/pages/life-abroad.html): intro, the newest story featured, then the rest. */
export function LifeAbroadPage({ introHtml, stories }: { introHtml: string; stories: StoryCardProps[] }) {
  const [featured, ...rest] = stories;
  return (
    <div className="shell">
      <SectionIntro eyebrow={storyCount(stories.length)} title="Life Abroad" introHtml={introHtml} />
      {featured && (
        <section className="section" aria-labelledby="la-h">
          <h2 className="sr-only" id="la-h">
            Life Abroad stories
          </h2>
          <StoryCard {...featured} variant="featured" headingLevel={2} />
        </section>
      )}
      {rest.length > 0 && (
        <section className="section" aria-label="More Life Abroad stories">
          <div className="grid-cards">
            {rest.map((story) => (
              <StoryCard key={story.href} {...story} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
