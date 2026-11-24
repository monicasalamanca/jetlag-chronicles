import { type StoryCardProps, StoryCard } from "@/components/cards/StoryCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SectionIntro, type SectionIntroProps } from "./SectionIntro";

export type CountryPageProps = {
  name: string;
  eyebrow: string;
  introHtml: string;
  photo: SectionIntroProps["photo"];
  stories: StoryCardProps[];
};

/** A country page (docs/design/pages/thailand.html): intro + hero, then every story, newest first. */
export function CountryPage({ name, eyebrow, introHtml, photo, stories }: CountryPageProps) {
  return (
    <div className="shell">
      <div className="section-page__crumbs">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Places", href: "/places" }, { label: name }]} />
      </div>
      <SectionIntro eyebrow={eyebrow} title={name} introHtml={introHtml} photo={photo} />
      <section className="section" aria-labelledby="stories-h">
        <div className="section__head">
          <h2 className="t-h2" id="stories-h">
            All {name} stories
          </h2>
          <span className="t-small t-muted">Newest first</span>
        </div>
        <div className="grid-cards">
          {stories.map((story) => (
            <StoryCard key={story.href} {...story} />
          ))}
        </div>
      </section>
    </div>
  );
}
