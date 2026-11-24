import type { Metadata } from "next";
import { JsonLd } from "@/components/layout/JsonLd";
import { PlacesPage } from "@/components/sections/PlacesPage";
import { getPlaces } from "@/lib/content";
import { renderIntro } from "@/lib/markdown";
import { collectionJsonLd, sectionMetadata } from "@/lib/seo";

// Fixed copy (Places has no Strapi single type in the plan); edit here.
const INTRO =
  "Everywhere we’ve lived, or stayed long enough to have opinions about the noodles. Pick a country and start with the newest story.";
const DESCRIPTION = "Every country we’ve written about, by continent: Thailand, Malaysia, Vietnam, Colombia and more. Pick one and start with the newest story.";

export async function generateMetadata(): Promise<Metadata> {
  const groups = await getPlaces();
  const photo = groups[0]?.countries[0]?.photo;
  return sectionMetadata({ name: "Places", description: DESCRIPTION, path: "/places", image: photo ? { url: photo.url, alt: "" } : null });
}

export default async function PlacesRoute() {
  const groups = await getPlaces();
  const countries = groups.flatMap((g) => g.countries);
  return (
    <>
      <JsonLd
        data={collectionJsonLd({
          name: "Places",
          description: DESCRIPTION,
          path: "/places",
          breadcrumb: [],
          stories: countries.map((c) => ({ title: c.name, href: c.href })),
        })}
      />
      <PlacesPage introHtml={await renderIntro(INTRO)} groups={groups} />
    </>
  );
}
