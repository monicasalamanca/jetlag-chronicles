import Image from "next/image";
import Link from "next/link";
import { type CountrySummary, storyCount } from "@/lib/places";

/** Country card (design-system.md, component 6): 4:5 photo, then the name and story count. One link. */
export function CountryCard({ name, href, storyCount: count, photo }: CountrySummary) {
  return (
    <article className="country-card">
      <span className="country-card__media" aria-hidden="true">
        {photo && (
          <Image
            src={photo.url}
            alt=""
            width={photo.width ?? 800}
            height={photo.height ?? 1000}
            sizes="(min-width: 64rem) 17rem, (min-width: 48rem) 30vw, 50vw"
          />
        )}
      </span>
      <h3 className="country-card__name">
        <Link className="country-card__link" href={href}>
          {name}
          <span className="sr-only">, </span>
          <span className="country-card__count">{storyCount(count)}</span>
        </Link>
      </h3>
    </article>
  );
}
