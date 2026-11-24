import Image from "next/image";
import type { Media } from "@/lib/posts";

export type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  /** Sanitized HTML from renderIntro(): its first paragraph is the lead. */
  introHtml: string;
  photo?: { photo: Media; alt: string; caption: string | null; credit: string | null } | null;
};

/** Opens Places, a country, Life Abroad and All stories (design-system.md, component 16). One h1 per page. */
export function SectionIntro({ eyebrow, title, introHtml, photo }: SectionIntroProps) {
  return (
    <section className="section-intro" aria-labelledby="si-h">
      <div className="section-intro__text">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="t-h1" id="si-h">
          {title}
        </h1>
        {introHtml && <div className="prose-block" dangerouslySetInnerHTML={{ __html: introHtml }} />}
      </div>
      {photo && (
        <figure>
          <div className="section-intro__media">
            <Image
              src={photo.photo.url}
              alt={photo.alt}
              width={photo.photo.width ?? 1600}
              height={photo.photo.height ?? 900}
              sizes="(min-width: 72rem) 72rem, 100vw"
              preload
            />
          </div>
          {(photo.caption || photo.credit) && (
            <p className="figcap">
              {photo.caption}
              {photo.credit && <span className="credit">Photo: {photo.credit}</span>}
            </p>
          )}
        </figure>
      )}
    </section>
  );
}
