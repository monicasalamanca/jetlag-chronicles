import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/brand/Icon";
import { Logo } from "@/components/brand/Logo";
import { linkRel } from "@/lib/links";
import type { Author } from "@/lib/posts";

/** Team: ring mark, "More about us". Guest: their photo, a clay "Guest author" label and their own link (ugc nofollow). */
export function AuthorBox({ author }: { author: Author }) {
  const guest = author.type === "guest";
  return (
    <aside className={guest ? "author author--guest" : "author"} aria-label="About the author">
      <div>
        {author.photo ? (
          <Image
            className="author__photo"
            src={author.photo.url}
            alt={author.photoAlt ?? ""}
            width={author.photo.width ?? 144}
            height={author.photo.height ?? 144}
            sizes="4.5rem"
          />
        ) : (
          <span className="author__photo" aria-hidden="true">
            <Logo variant="ring" />
          </span>
        )}
      </div>
      <div className="author__body">
        <p className="eyebrow author__eyebrow">{guest ? "Guest author" : "Written by"}</p>
        <p className="author__name">{author.name}</p>
        {author.bio && <p className="author__bio">{author.bio}</p>}
        {guest ? (
          author.link && (
            <a className="author__link" href={author.link} rel={linkRel(author.link, { authorType: "guest" })}>
              Visit {author.name}
              <span className="sr-only"> (external link)</span>
              <Icon name="chevron-right" className="icon-sm" />
            </a>
          )
        ) : (
          <Link className="author__link" href="/about">
            More about us
            <Icon name="chevron-right" className="icon-sm" />
          </Link>
        )}
      </div>
    </aside>
  );
}
