import { CountryCard } from "@/components/cards/CountryCard";
import { type ContinentGroup, countryCount, storyCount } from "@/lib/places";
import { SectionIntro } from "./SectionIntro";

/** /places (docs/design/pages/places.html): countries by continent. */
export function PlacesPage({ introHtml, groups }: { introHtml: string; groups: ContinentGroup[] }) {
  return (
    <div className="shell">
      <SectionIntro title="Places" introHtml={introHtml} />
      <section className="section" aria-label="Countries by continent">
        {groups.map((group) => (
          <div className="continent" key={group.id}>
            <div className="continent__title">
              <h2 className="t-h3">{group.label}</h2>
              <span className="continent__count">
                {countryCount(group.countries.length)} · {storyCount(group.storyCount)}
              </span>
            </div>
            <div className="grid-countries">
              {group.countries.map((country) => (
                <CountryCard key={country.href} {...country} />
              ))}
            </div>
          </div>
        ))}
      </section>
      <p className="t-small t-muted places-page__note">
        More continents appear here as we write from them. A country shows up only once it has a story.
      </p>
    </div>
  );
}
