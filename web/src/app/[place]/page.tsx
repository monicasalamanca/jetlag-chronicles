import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/layout/JsonLd";
import { CountryPage } from "@/components/sections/CountryPage";
import { LifeAbroadPage } from "@/components/sections/LifeAbroadPage";
import { storyCards } from "@/lib/cards";
import { getCountryPage, getLifeAbroadPage, getSectionParams } from "@/lib/content";
import { renderIntro } from "@/lib/markdown";
import { continentLabel, countryHero, storyCount } from "@/lib/places";
import { LIFE_ABROAD_LABEL, LIFE_ABROAD_PREFIX } from "@/lib/posts";
import { collectionJsonLd, descriptionFromMarkdown, sectionMetadata } from "@/lib/seo";

type Props = { params: Promise<{ place: string }> };

// /<country> and /lifestyle share this segment with their stories (/<place>/<slug>), so both live here.
// A country appears only once it has a published story; anything else is a 404.
export const dynamicParams = true;

export async function generateStaticParams() {
  return getSectionParams();
}

// Until the Life Abroad single type is published in Strapi.
const LIFE_ABROAD_FALLBACK =
  "The unglamorous half of moving abroad: visas, money, taxes and what to do in your first 90 days. Written from experience, with the mistakes left in.";

const countryFallback = (name: string) => `Our stories from ${name}, newest first.`;

async function lifeAbroad() {
  const page = await getLifeAbroadPage();
  const description = page.seoDescription?.trim() || descriptionFromMarkdown(page.intro) || LIFE_ABROAD_FALLBACK;
  return { page, description, path: `/${LIFE_ABROAD_PREFIX}` };
}

async function country(slug: string) {
  const data = await getCountryPage(slug);
  if (!data) return null;
  const { country: c, stories } = data;
  const description = c.seoDescription?.trim() || descriptionFromMarkdown(c.intro) || countryFallback(c.name);
  return { ...data, hero: countryHero(c, stories[0]), description, path: `/${c.slug}` };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { place } = await params;
  if (place === LIFE_ABROAD_PREFIX) {
    const { page, description, path } = await lifeAbroad();
    const cover = page.stories[0]?.coverPhoto;
    return sectionMetadata({
      name: LIFE_ABROAD_LABEL,
      seoTitle: page.seoTitle,
      description,
      path,
      image: cover ? { url: cover.url, alt: page.stories[0].coverAlt } : null,
    });
  }
  const data = await country(place);
  if (!data) return {};
  return sectionMetadata({
    name: data.country.name,
    seoTitle: data.country.seoTitle,
    description: data.description,
    path: data.path,
    image: data.hero ? { url: data.hero.photo.url, alt: data.hero.alt } : null,
  });
}

export default async function PlaceRoute({ params }: Props) {
  const { place } = await params;

  if (place === LIFE_ABROAD_PREFIX) {
    const { page, description, path } = await lifeAbroad();
    const cards = await storyCards(page.stories);
    return (
      <>
        <JsonLd
          data={collectionJsonLd({ name: LIFE_ABROAD_LABEL, description, path, breadcrumb: [], stories: cards })}
        />
        <LifeAbroadPage introHtml={await renderIntro(page.intro, LIFE_ABROAD_FALLBACK)} stories={cards} />
      </>
    );
  }

  const data = await country(place);
  if (!data) notFound();
  const { country: c, stories, hero, description, path } = data;
  const cards = await storyCards(stories);
  return (
    <>
      <JsonLd
        data={collectionJsonLd({
          name: c.name,
          description,
          path,
          breadcrumb: [{ name: "Places", path: "/places" }],
          stories: cards,
        })}
      />
      <CountryPage
        name={c.name}
        eyebrow={`${continentLabel(c.continent)} · ${storyCount(stories.length)}`}
        introHtml={await renderIntro(c.intro, countryFallback(c.name))}
        photo={hero}
        stories={cards}
      />
    </>
  );
}
