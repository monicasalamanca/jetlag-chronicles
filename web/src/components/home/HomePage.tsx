import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/brand/Icon";
import { Logo } from "@/components/brand/Logo";
import { CountryCard } from "@/components/cards/CountryCard";
import { type StoryCardProps, StoryCard } from "@/components/cards/StoryCard";
import type { CountrySummary } from "@/lib/places";
import type { Media } from "@/lib/posts";

export type HomePageProps = {
  featured: StoryCardProps | null;
  /** Sanitized HTML from renderIntro(): its first paragraph is the lead. */
  whoWeAreHtml: string;
  photo: { photo: Media; alt: string } | null;
  latest: StoryCardProps[];
  countries: CountrySummary[];
  lifeAbroadIntro: string;
  lifeAbroad: StoryCardProps[];
};

function MoreLink({ href, children }: { href: string; children: string }) {
  return (
    <Link className="link-more" href={href}>
      {children}
      <Icon name="chevron-right" className="icon-sm" />
    </Link>
  );
}

function Route() {
  return (
    <div className="route" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

/**
 * The homepage (plan §7.1, docs/design/pages/home.html). The featured story's title is the page's h1 and its
 * photo is the LCP image. Sections with nothing to show are left out.
 */
export function HomePage({ featured, whoWeAreHtml, photo, latest, countries, lifeAbroadIntro, lifeAbroad }: HomePageProps) {
  return (
    <div className="shell">
      {featured ? (
        <div className="home__featured">
          <StoryCard {...featured} variant="featured" headingLevel={1} preload />
        </div>
      ) : (
        <h1 className="sr-only">The Jet Lag Chronicles</h1>
      )}

      <section className="section" aria-labelledby="who-h">
        <div className="split">
          <div className="home__who">
            <Route />
            <h2 className="t-h2" id="who-h">
              Who we are
            </h2>
            <div className="prose-block" dangerouslySetInnerHTML={{ __html: whoWeAreHtml }} />
            <MoreLink href="/about">More about us</MoreLink>
          </div>
          {photo ? (
            <div className="home__photo">
              <Image
                src={photo.photo.url}
                alt={photo.alt}
                width={photo.photo.width ?? 1200}
                height={photo.photo.height ?? 900}
                sizes="(min-width: 72rem) 34rem, (min-width: 48rem) 45vw, 100vw"
              />
            </div>
          ) : (
            <div className="photo-placeholder" aria-hidden="true">
              <Logo variant="ring" />
            </div>
          )}
        </div>
      </section>

      {latest.length > 0 && (
        <section className="section" aria-labelledby="latest-h">
          <div className="section__head">
            <h2 className="t-h2" id="latest-h">
              Latest stories
            </h2>
            <MoreLink href="/stories">All stories</MoreLink>
          </div>
          <div className="grid-cards">
            {latest.map((story) => (
              <StoryCard key={story.href} {...story} />
            ))}
          </div>
        </section>
      )}

      {countries.length > 0 && (
        <section className="section" aria-labelledby="where-h">
          <div className="section__head">
            <h2 className="t-h2" id="where-h">
              Where we’ve been
            </h2>
            <MoreLink href="/places">All places</MoreLink>
          </div>
          <div className="grid-countries">
            {countries.map((country) => (
              <CountryCard key={country.href} {...country} />
            ))}
          </div>
        </section>
      )}

      {lifeAbroad.length > 0 && (
        <section className="section" aria-labelledby="life-h">
          <div className="section__head section__head--route">
            <Route />
            <div className="section__head home__head-inner">
              <h2 className="t-h2" id="life-h">
                Life Abroad
              </h2>
              <MoreLink href="/lifestyle">All Life Abroad stories</MoreLink>
            </div>
          </div>
          {lifeAbroadIntro && <p className="t-lead home__life-intro">{lifeAbroadIntro}</p>}
          <div className="grid-cards">
            {lifeAbroad.map((story) => (
              <StoryCard key={story.href} {...story} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
