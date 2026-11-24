import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/layout/JsonLd";
import { storyCards } from "@/lib/cards";
import { getHome } from "@/lib/content";
import { homeStories, topCountries } from "@/lib/home";
import { renderIntro } from "@/lib/markdown";
import { homeJsonLd, sectionMetadata } from "@/lib/seo";
import { siteName } from "@/lib/site";

// Used until the Home page single type is published in Strapi.
const WHO_WE_ARE = `We’re Moni & Dunny, a Canadian-Colombian couple who packed up, moved abroad and kept notes.

This is where the notes live: the visa that nearly broke us, the lease we should have read twice, the night market that made it all worth it. Real stories, a few real numbers and, we hope, a few real laughs.`;
const LIFE_ABROAD_INTRO = "Visas, money and moving: what we wish someone had told us before we left.";
const DESCRIPTION =
  "Moni & Dunny’s stories from living abroad in Thailand, Malaysia, Vietnam, Colombia and beyond: the places, the visas, the money and the night markets.";

export async function generateMetadata(): Promise<Metadata> {
  const { home, newest } = await getHome();
  const cover = newest[0]?.coverPhoto;
  return sectionMetadata({
    name: siteName,
    seoTitle: home.seoTitle || siteName,
    description: home.seoDescription?.trim() || DESCRIPTION,
    path: "/",
    image: cover ? { url: cover.url, alt: newest[0].coverAlt } : null,
  });
}

export default async function Home() {
  const { home, newest, lifeAbroad, places } = await getHome();
  const stories = homeStories(await storyCards(newest), await storyCards(lifeAbroad));
  return (
    <>
      <JsonLd data={homeJsonLd(home.seoDescription?.trim() || DESCRIPTION)} />
      <HomePage
        featured={stories.featured}
        whoWeAreHtml={await renderIntro(home.whoWeAre, WHO_WE_ARE)}
        photo={home.photo ? { photo: home.photo, alt: home.photoAlt ?? "" } : null}
        latest={stories.latest}
        countries={topCountries(places)}
        lifeAbroadIntro={home.lifeAbroadIntro?.trim() || LIFE_ABROAD_INTRO}
        lifeAbroad={stories.lifeAbroad}
      />
    </>
  );
}
